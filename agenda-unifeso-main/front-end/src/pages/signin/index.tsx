
import { LoginForm } from "../../components";


// Página de login
export const SigninPage = () => {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="h-full w-1/4 hidden md:block"></div>
      <LoginForm />
    </div>
  );
};
