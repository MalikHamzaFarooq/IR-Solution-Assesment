import React from "react";
import { AuthContextProvider } from "./Components/Context/AuthContextProvider";
import SignInForm from "./Components/SignIn/SignInForm";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <SignInForm />
    </AuthContextProvider>
  );
};

export default App;
