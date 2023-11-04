

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  
  // State variables to store user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle user registration
  async function registerUser(event) {
    event.preventDefault();

    // Send a POST request to the server for user registration
    const response = await fetch("http://localhost:9000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    // Parse the response data
    const data = await response.json();

    if (data.status === "ok") {
      // If registration is successful, navigate to the login page
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-3xl text-center font-semibold mb-4">Signup</h1>

        <form onSubmit={registerUser}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Username"
            className="w-full p-2 mb-4 border rounded-md"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded-md"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Signup
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="mb-2">OR</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
