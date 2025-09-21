import '../styles/Dashboard.css';
import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import axios from "axios";
import Todo from '../components/ToDo';
import FloatingButton from '../components/FloatingButton';


export default function Dashboard() {
  const { user } = useUser();
  const [ access_token, setAccessToken ] = useState('');
  const [ instanceURL, setInstanceURL ] = useState('');
  const [todos, setTodos] = useState([]);
  
  const fetchTodos = async () => {
    try{
            const keyObj = await axios.post("http://localhost:4321/sf-auth");
            setAccessToken(keyObj.data.access_token);
            setInstanceURL(keyObj.data.instance_url);
            const response = await axios.get(`http://localhost:4321/get-todo?authToken=${access_token}&instanceURL=${instanceURL}`);
            setTodos(response.data.records);
            
        } catch (err){
            console.error("Error in request: ",err);
        } finally {
            console.log("finally executed")
        }
  }
  useEffect(()=>{
    fetchTodos()
  }, [access_token, instanceURL, user]);

//   const getCardColor = (todo) => {
//     if (todo.Is_Completed__c) return "rgba(0, 128, 0, 0.4)";
//     switch (todo.Priority__c) {
//       case "High":
//         return "rgba(255, 0, 0, 0.4)";
//       case "Medium":
//         return "rgba(184, 134, 11, 0.4)"; // dark yellow / goldenrod
//       case "Low":
//         return "rgba(255, 255, 0, 0.4)";
//       default:
//         return "gray";
//     }
//   };

  todos.map((todo) => {
    console.warn(JSON.stringify(todo.Priority__c));
  });

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">
            <img src={logo} alt="App Logo" width={70} height={40} />
          </span>
        </div>
        <UserButton afterSignOutUrl="/" />
      </nav>
      <main className="welcome">
        <h1> To-Dos </h1>
        <div className="todo-container">
        {todos.map((todo) => (
            <Todo todoObj={todo} key={todo.Id}/>
        ))}
        </div>
        <FloatingButton refreshTodos={fetchTodos}/>
      </main>
    </div>
  );
}
