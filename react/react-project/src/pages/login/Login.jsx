import React, { useState, useEffect } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [status, setStatus] = useState("empty");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(formData);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.email !== "" && formData.password !== "") {
      setStatus("typing");
    } else {
      setStatus("empity");
    }
  }, [formData]);

  if (error) {
    console.log(typeof error);
  }

  if (status === "success") {
    return <h1>You're logged In</h1>;
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
          />
        </div>
        <input
          type="submit"
          disabled={status !== "typing" || status === "submitting"}
          value={status === "submitting" ? "Logging in..." : "login"}
        />
      </form>

      {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
    </section>
  );
};

function submitForm({ email, password }) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let invalidEmail = email.toLowerCase() !== "lima@gmail.com";
      let invalidPassword = password.toLowerCase() !== "lima";
      if (invalidEmail || invalidPassword) {
        reject(new Error("Invalid Email Address"));
      } else {
        resolve();
      }
    }, 1500);
  });
}

export default Login;
