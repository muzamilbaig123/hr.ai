<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Page</title>
  <style>
/* styles.css */
body {
  font-family: Arial, sans-serif;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  background-color: #f0e6ff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.logo h1 {
  color: #6b46c1;
  font-size: 24px;
}

.form h2 {
  margin-bottom: 20px;
  color: #333;
}

.google-login {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  width: 100%;
}

.google-login img {
  width: 20px;
  margin-right: 10px;
}

.divider {
  margin: 10px 0;
  font-size: 14px;
  color: #888;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.password-field {
  position: relative;
}

.password-field .toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.forgot-password {
  display: block;
  margin: 10px 0;
  color: #6b46c1;
  font-size: 14px;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #6b46c1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #5a3ea3;
}

.signup-text {
  margin-top: 10px;
  font-size: 14px;
}

.signup-text a {
  color: #6b46c1;
  text-decoration: none;
}

.signup-text a:hover {
  text-decoration: underline;
}

  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <h1>Hr.ai</h1>
    </div>
    <form id="loginForm" class="form">
      <h2>Welcome!</h2>
      <button class="google-login">
        <img src="https://app.resumesranker.com/google.svg" alt="Google Icon"> Sign in with Google
      </button>
      <p class="divider">or continue with email</p>
      <input type="email" id="email" placeholder="Please enter your email" required>
      <div class="password-field">
        <input type="password" id="password" placeholder="Please enter your password" required>
        <button type="button" class="toggle-password">👁️</button>
      </div>
      <a href="#" class="forgot-password">Forgot Password?</a>
      <button type="submit" class="login-btn">Log In</button>
      <p class="signup-text">
        Don't have an account? <a href="/hr.ai/signup.php">Sign up</a>
      </p>
    </form>
  </div>


  <script>
        // script.js
    document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Save data to localStorage
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  alert("Login data saved in the frontend!");
});

// Toggle password visibility
document.querySelector(".toggle-password").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

  </script>
</body>
</html>
