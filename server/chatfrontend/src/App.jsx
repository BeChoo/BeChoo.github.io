import { useState } from "react"; // Importing useState hook for managing state
import "./App.css"; // Importing CSS file for styling
import AuthPage from "./AuthPage"; // Importing AuthPage component
import ChatsPage from "./ChatsPage"; // Importing ChatsPage component

function App() {
  // Using useState hook to manage user state
  const [user, setUser] = useState(undefined); // Initialize user state to undefined

  // Conditionally rendering AuthPage or ChatsPage based on user state
  if (!user) {
    // If user is not logged in, render AuthPage
    return <AuthPage onAuth={(user) => setUser(user)} />; // Pass onAuth prop to AuthPage to update user state
  } else {
    // If user is logged in, render ChatsPage
    return <ChatsPage user={user} />; // Pass user prop to ChatsPage
  }
}

export default App; // Exporting App component
