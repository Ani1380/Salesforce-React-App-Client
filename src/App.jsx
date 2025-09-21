import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, ClerkLoaded } from "@clerk/clerk-react";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ClerkLoaded>
      <BrowserRouter>
        <Routes>
          {/* Public Home Page */}
          <Route
            path="/"
            element={
                <>
              <SignedOut>
                <Home />
              </SignedOut>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              </>
            }
          />
          {/* Catch all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ClerkLoaded>
  );
}

export default App;
