import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useAccount } from "../hooks/AccountHooks";
import logo from "../assets/logo.svg";
import axios from "axios";
import Todo from "../components/ToDo";
import FloatingButton from "../components/FloatingButton";

export default function Dashboard() {
  const { user } = useUser();
  const [todos, setTodos] = useState([]);
  const { accountId, setAccountId } = useAccount();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  console.log(`URL => ${API_BASE}`);

  const setUserId = async () => {
    try {
      const createdAt = (
        user.createdAt ? new Date(user.createdAt) : new Date()
      ).toISOString();
      const lastSignedInAt = (
        user.lastSignInAt ? new Date(user.lastSignInAt) : new Date()
      ).toISOString();
      const fullName = user.fullName;
      const clerkId = user.id;
      const clerkEmailId = user.emailAddresses[0].emailAddress;
      const reqBody = {
        fullName,
        lastSignedInAt,
        createdAt,
        clerkId,
        clerkEmailId,
      };
      const response = await axios.post(
        `${API_BASE}/create-account`,
        reqBody
      );
      setAccountId(response.data.accountId);
    } catch (error) {
      console.error(`Error in account sync: ${JSON.stringify(error)}`);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/get-todo?accountId=${accountId}`
      );
      setTodos(response.data.records);
    } catch (err) {
      console.error("Error in request: ", err);
    } finally {
      console.log("finally executed");
    }
  };

  useEffect(() => {
    setUserId();
  }, [user]);

  useEffect(() => {
    if (accountId) {
      fetchTodos(); // fetch todos when accountId becomes available
    }
  }, [accountId]);

  const deleteTodo = async (id) => {
    if (!id) {
      throw new Error("No valid Id is passed");
    }
    try {
      alert('You really wanna delete?');
      await axios.delete(`http://localhost:4321/delete-todo?todoId=${id}`);
      setTodos((prev) => prev.filter((todo) => todo.Id !== id));
    } catch (error) {
      console.error(`Error in deletion ${JSON.stringify(error)}`);
    }
  };

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
            <Todo todoObj={todo} deleteFunction={deleteTodo} key={todo.Id} />
          ))}
        </div>
        <FloatingButton refreshTodos={fetchTodos} />
      </main>
    </div>
  );
}
