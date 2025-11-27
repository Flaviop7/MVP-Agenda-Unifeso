import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs/promises'; // Importando o 'File System' (para ler/escrever arquivos)
import path from 'path'; 
import nodemailer from "nodemailer";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do Nodemailer
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587, 
  auth: {
    user: "9e1cc0241881f1", 
    pass: "****892a"       
  }
})

// Inicializa o Express
const app = express();

// Define a porta
const PORT = 3001;

// Define o caminho para o banco de dados
const dbPath = path.join(__dirname, 'db.json');

// Middlewares
app.use(cors());       // Permite acesso do front-end
app.use(express.json()); // Permite o servidor entender JSON

// Função para ler o banco
async function readDB() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler db.json, retornando estrutura padrão.', error);
    return { users: [], appointments: [], settings: { cidades: [], servicos: [] } };
  }
}

async function writeDB(data: any) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Erro ao escrever no db.json.', error);
  }
}


// Rotas da API
app.get('/', (req: Request, res: Response) => {
  res.send('API RODANDO COM O SERVIDOR COMPLETO!');
});

app.get("/cidades", async (req: Request, res: Response) => {
  try {
    const db = await readDB();
    const cidades = db.settings?.cidades || [];
    res.json(cidades);
  } catch (error) {
    console.error("Erro ao buscar cidades.", error);
    res.status(500).json({message: "Erro ao buscar cidades."});
  }
});

app.get("/servicos", async (req: Request, res: Response) => {
  try {
    const db = await readDB();
    const servicos = db.settings?.servicos || [];
    res.json(servicos);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    res.status(500).json({message: "Erro ao buscar serviços."});
  }
});


// Rota de Registro (POST /register)
app.post('/register', async (req: Request, res: Response) => {
  console.log('Recebida requisição em POST /register');
  
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    const db = await readDB();
    if (!db.users) db.users = [];

    const userExists = db.users.find((user: any) => user.email === email);
    if (userExists) {
      return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
    }

    const newUser = {
      id: db.users.length + 1,
      name,
      email,
      password,
      role: "user" 
    };

    db.users.push(newUser);
    await writeDB(db);

    const userResponse = { id: newUser.id, name: newUser.name, email: newUser.email };
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: userResponse });

  } catch (error) {
    console.error('Erro inesperado em /register:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});


// Rota de Login (POST /login)
app.post('/login', async (req: Request, res: Response) => {
  console.log('Recebida requisição em POST /login');
  
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const db = await readDB();
    if (!db.users) db.users = [];

    const user = db.users.find((u: any) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const userResponse = { id: user.id, name: user.name, email: user.email, role: user.role };
    
    console.log('Login bem-sucedido para:', user.email);
    res.status(200).json({ message: 'Login bem-sucedido!', user: userResponse });

  } catch (error) {
    console.error('Erro inesperado em /login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

// Rota de Agendamento (POST /agendamentos)
app.post('/agendamentos', async(req: Request, res: Response) => {
  console.log('Recebida requisição em POST /agendamentos');

  try {
    const {local, data, horario, userId} = req.body;

    if (!local || !data || !horario || !userId) {
      return res.status(400).json({message: 'Local, data, horário e ID do usuário'});
    }

    const db = await readDB();

    const userExists = db.users.find((u: any) => u.id === userId);
    if(!userExists) {
      return res.status(404).json({message: "Usuário não encontrado"});
    }

    const newAppointment = {
      id: db.appointments.length + 1,
      local,
      data,
      horario,
      userId 
    };

    db.appointments.push(newAppointment);
    await writeDB(db);
    
    try{
      console.log ("Enviando e-mail de confirmação...");

      const emailDoUsuario = userExists.email;
      const nomeDoUsuario = userExists.name;

      await transporter.sendMail ({
        from: '"Agenda Fácil NAF" <nao-responder@networkInterfaces.com>',
        to: emailDoUsuario,
        subject: "Confirmação de Agendamento",
        text: `Olá ${nomeDoUsuario}, seu agendamento foi confirmado com sucesso! Detalhes: ${local}, Data: ${data}, Horário: ${horario}.`,
        html: `
          <h1>Olá, ${nomeDoUsuario}!</h1>
          <p>Seu agendamento foi confirmado com sucesso!</p>
          <h3>Detalhes:</h3>
          <ul>
            <li><strong>Local:</strong> ${local}</li>
            <li><strong>Data:</strong> ${data}</li>
            <li><strong>Horário:</strong> ${horario}</li>
          </ul>
          <p>Obrigado por usar o Agenda Fácil NAF.</p>
        `
      });
      console.log("E-mail enviado com sucesso para:", emailDoUsuario);
  
    } catch (emailError) {
      console.error("ERRO AO ENVIAR E-MAIL:", emailError);
    }

    res.status(201).json({message: 'Agendamento criado com sucesso!', appointment: newAppointment});

  } catch (error) {
    console.error('Erro inesperado em /agendamento:', error);
    res.status(500).json({message: 'Erro interno no servidor.'});
  }
});

// Criar Cidade
app.post('/cidades', async (req: Request, res: Response) => {
  try {
    const {nome} = req.body;
    if (!nome) return res.status(400).json({message: 'O nome da cidade é obrigatório'});

    const db = await readDB();
    if (!db.settings) db.settings = {cidades: [], servicos: []};

    const novaCidade = {
      id: db.settings.cidades.length > 0 ? db.settings.cidades[db.settings.cidades.length - 1].id + 1 : 1,
      nome
    };
    db.settings.cidades.push(novaCidade);
    await writeDB(db);

    res.status(201).json({message: 'Cidade adicionada com sucesso!', cidade: novaCidade});
  } catch (error) {
    res.status(500).json({message: 'Erro ao adicionar cidade.'});
  }
});

// Deletar Cidade
app.delete('/cidades/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const db = await readDB();

    if (!db.settings || !db.settings.cidades) {
      return res.status(404).json({message: 'Nenhuma cidade encontrada.'}); 
    }

    const listaAtualizada = db.settings.cidades.filter((c: any) => c.id !== id);
    if (listaAtualizada.length === db.settings.cidades.length) {
      return res.status(404).json({message: "Cidade não encontrada."});
    }

    db.settings.cidades = listaAtualizada;
    await writeDB(db);

    res.status(200).json({message: 'Cidade removida com sucesso!'});
  
  } catch (error) {
    res.status(500).json({message: 'Erro ao remover cidade.'});
  }
});

// Criar Serviço
app.post('/servicos', async (req: Request, res: Response) => {
  try {
    const {nome} = req.body;
    if (!nome) return res.status(400).json({message: 'O nome do serviço é obrigatório'});

    const db = await readDB();
    if (!db.settings) db.settings = {cidades: [], servicos: []};
    if (!db.settings.servicos) db.settings.servicos = [];


    const novoServico = {
      id: db.settings.servicos.length > 0 ? db.settings.servicos[db.settings.servicos.length - 1].id + 1 : 1,
      nome
    };
    db.settings.servicos.push(novoServico);
    await writeDB(db);

    res.status(201).json({message: 'Serviço adicionada com sucesso!', servico: novoServico});
  } catch (error) {
    res.status(500).json({message: 'Erro ao adicionar serviço.'});
  }
});

// Deletar Serviço
app.delete('/servicos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const db = await readDB();

    // serviços
    if (!db.settings || !db.settings.servicos) {
      return res.status(404).json({message: 'Nenhum servico encontrado.'}); 
    }

    const listaAtualizada = db.settings.servicos.filter((s: any) => s.id !== id);

  
    if (listaAtualizada.length === db.settings.servicos.length) {
      return res.status(404).json({message: "Serviço não encontrado."});
    }

    db.settings.servicos = listaAtualizada;
    await writeDB(db);

    res.status(200).json({message: 'Serviço removido com sucesso!'});
  
  } catch (error) {
    res.status(500).json({message: 'Erro ao remover serviço.'});
  }
});


// Rota para Listar Agendamentos de Usuário
app.get('/agendamentos/usuario/:userId', async (req: Request, res: Response) => {
  try {
    // Pega o ID do usuário da URL
    const userId = parseInt(req.params.userId);

    if (!userId) {
      return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
    }

    const db = await readDB();

    // filtra os agendamentos que pertecem aos usuários
    const meusAgendamentos = db.appointments.filter((app: any) => app.userId === userId);

    //Devolve a lista
    res.json(meusAgendamentos);

  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ message: 'Erro interno ao buscar agendamentos.' });
  }
});


// Inicia o Servidor 
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});