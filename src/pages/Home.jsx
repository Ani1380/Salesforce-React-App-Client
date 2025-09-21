import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";
import "../styles/Auth.css";
import logo from "../assets/logo.svg";


export default function Home() {
  const [mode, setMode] = useState("signin");

  return (
    <div className="auth-container">
      {/* Branding */}
      <div className="auth-branding">
        <img src={logo} alt="App Logo" width={200} height={100} />
      </div>

      {/* Clerk SignIn / SignUp Card */}
        {mode === "signin" ? (
          <SignIn
            appearance={{
              elements: {
                footerAction: "hidden", // hides "New here? Sign up"
              },
            }}
          />
        ) : (
          <SignUp
            appearance={{
              elements: {
                footerAction: "hidden", // hides "Already have an account? Sign in"
              },
            }}
          />
        )}

      {/* Toggle */}
      <div
        className="auth-toggle"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
      >
        {mode === "signin"
          ? "New here? Sign up"
          : "Already have an account? Sign in"}
      </div>
    </div>
  );
}
