# Agenda Fácil NAF

### Integrantes
- **João Vitor Queiroz Villas Boas**
- **Rafaella Pringi de Oliveira Andrade**
- **Flavio Pinheiro Ferreira Martins**

---

### Situação Problema: *AgendaFácil NAF*

#### Tecnologias Utilizadas
Para o desenvolvimento da plataforma, foram utilizadas as seguintes tecnologias:
- **JavaScript - Linguagem de programação usada para fazer páginas interativas da Internet.**
- **NodeJS - Tecnologia usada para executar código JavaScript em ambiente de servidor.**
- **Java - Linguagem de programação orientada a objetos, multiplataforma e robusta.**
- **TypeScript - Superconjunto do JavaScript que adiciona tipagem estática opcional à linguagem.**
- **Express.js - simplifica a criação de aplicativos e APIs no lado do servidor.**
- **Cors - Um midleware que permite com que o front se comunique com o back sem restrições.**
- **FS - file system para os arquivos do banco JSON.**
- **Nodemailer - Biblioteca usada para envio de e-mail.**
- **Mailtrap - Envio de fake "SMTP"**
- **Vite - Ferramenta de compilação e servidor de desenvolvimento para projetos front-end.**
- **ReactJS - Framework JavaScript para desenvolvimento front-end.**
- **Tailwind CSS - Framework CSS que permite criar estilos personalizados.**
- **React Icons - Biblioteca de icones para o React.**
- **React Router DOM - Biblioteca para gerir rotas em aplicações React.**

- **GitHub - Plataforma de desensolvimento colaborativo.**

#### Instruções para Executar/Abrir o MVP
1. Na página inicial, o usuário pode **cadastrar-se** ou **fazer login**, caso já tenha uma conta.
2. Após essa etapa, o usuário é redirecionado para a **página de agendamento**.
3. O usuário seleciona o **local, data e horário** para o agendamento e clica em **Enviar**.
4. Ao enviar as informações, uma **confirmação** é exibida e um **e-mail de confirmação** é enviado automaticamente.
5. Após concluir o agendamento, o usuário pode **avaliar os serviços da NAF** e/ou **fechar a página**.

#### Informações Adicionais
# REQUISITOS DO PROJETO

## Funcionais

| **Prioridade** | **Descrição**                                                                                  |
|----------------|-----------------------------------------------------------------------------------------------|
| 1              | O sistema deve permitir o Cadastro e Login básico (e-mail e senha) para usuários. |
| 2              | O sistema deve permitir que o NAF (Administrador) faça Login com um perfil pré-cadastrado. |
| 3              | O sistema deve exibir os Serviços Principais disponíveis (ex: Declaração IR). |
| 4              | O sistema deve exibir o Calendário com os slots de horários disponíveis para agendamento. |
| 5              | O sistema deve permitir a Seleção do serviço, cidade, data e horário e a Realização do Agendamento.  |
| 6              | O sistema deve registrar o agendamento e enviar uma Confirmação Simples por e-mail.  |
| 7              | O sistema deve permitir ao ustário Consultar seus agendamentos futuros.  |
| 8              | O sistema deve permitir ao NAF Visualizar a lista de todos os agendamentos (simplesmente uma lista).  |

## Não Funcionais

| **Prioridade** | **Descrição**                                                                                  |
|----------------|-----------------------------------------------------------------------------------------------|
| 1              | O sistema deve ter uma interface web responsiva que funcione em desktop e celular. |
| 2              | A solução deve ser compatível com diferentes dispositivos e navegadores, permitindo o acesso tanto em computadores quanto em dispositivos móveis |
| 3              | O sistema deve ser capaz de suportar um número de usuários e agendamentos sem comprometer o desempenho. |
| 4              | O tempo de carregamento das telas principais (login, agendamento) não deve exceder 5 segundos (tolerância maior no MVP). |

---

### MVP Definido: **Protótipo do MVP**

### Objetivos e Benefícios do Produto
O projeto tem como objetivo facilitar o agendamento de atendimentos no Núcleo de Apoio Contábil e Fiscal (**NAF**) do **Unifeso**, oferecendo acesso rápido e autônomo aos serviços fiscais. A plataforma também promove um ambiente de aprendizado prático para estudantes, beneficiando a comunidade.

#### Principais Benefícios
- **Facilidade no Agendamento:** Agendamentos e acompanhamentos de atendimentos podem ser feitos online, oferecendo mais agilidade e conveniência.
- **Otimização do Atendimento:** A plataforma auxilia o NAF na organização dos horários, aumentando a capacidade de atendimento.
- **Lembretes Automáticos:** Envio de lembretes por e-mail para que os usuários não percam seus horários.
- **Segurança de Dados:** Proteção das informações dos usuários, garantindo privacidade e segurança.
- **Aprimoramento Contínuo:** Coleta de feedback dos usuários para melhoria contínua dos serviços.

---

### Público-Alvo da Solução
A plataforma é direcionada para:
- **População Local:** Pessoas que buscam suporte em questões fiscais e contábeis, especialmente durante a época de declaração do Imposto de Renda.
- **Estudantes e Professores do Unifeso:** Membros do NAF que buscam organizar e aplicar de forma prática os conhecimentos adquiridos em sala de aula.

---

### Dores do Público-Alvo
- **Dificuldade de Acesso a Orientações Fiscais:** Falta de recursos e conhecimento em questões fiscais, especialmente durante o período de declaração do Imposto de Renda.
- **Desafios no Agendamento:** A ausência de uma plataforma prática pode tornar o agendamento confuso e inconveniente.
- **Necessidade de Organização para o NAF:** Professores e alunos precisam de um sistema eficiente para gerenciar os atendimentos, garantindo qualidade e consistência no serviço.

---

https://agenda-unifeso.vercel.app
