import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle user login
  async function loginUser(event) {
    event.preventDefault();

    // Send a POST request to the server for user login
    const response = await fetch("http://localhost:9000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // Parse the response data
    const data = await response.json();

    if (data.user) {
      // If the login is successful, store the token in localStorage
      localStorage.setItem("token", data.user);
      alert("Login successful");
      navigate("/home"); // Navigate to the home page
    } else {
      // If login fails, display an error message
      alert("Please check your username and password");
    }
  }

  return (
    <div className="login min-h-screen flex items-center justify-center bg-blue-400">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-3xl text-center font-semibold mb-4">Login</h1>

        <form onSubmit={loginUser}>
          <input
            value={email}
            type="email"
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
            onClick={loginUser}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="mb-2">OR</p>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;


