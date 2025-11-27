import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.tsx";
import { AuthContext } from "./contexts/AuthContext.tsx";
import { ListingContext } from "./contexts/ListingContext.tsx";
import { MobileMenuContextProvider } from "./contexts/MobileMenuContext.tsx";


// Ponto de partida da aplicação.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MobileMenuContextProvider>
      <AuthContext>
        <ListingContext>
          <App />
        </ListingContext>
      </AuthContext>
    </MobileMenuContextProvider>
  </StrictMode>
);
