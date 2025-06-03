'use-client'

import { LoginForm } from "@/components/loginForm/LoginForm"
import Login from "./login.jsx";
import Secure from "./Secure.jsx";
import "./page.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function LoginPage() {

    
  // return (
  //   <LoginForm />
  // )
    return(
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/secure" element={<Secure />} />
        </Routes>
      </Router>

      
      </>

    )
}