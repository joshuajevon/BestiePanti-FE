function SubmitForm(e) {
  e.preventDefault();

  // Get form values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const token = localStorage.getItem("jwtToken");

  const data = {
    email,
    password,
  };

  // Send the data to the server
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errors) => {
          // Handle validation errors
          displayValidationErrors(errors);
          throw new Error("Validation failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      // alert("Login successful!");
      localStorage.setItem("jwtToken", data.token);
      console.log(data.token)
      // window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.message !== "Validation failed") {
        alert("Login failed: " + error.message);
      }
    });
}

// Function to display validation errors
function displayValidationErrors(errors) {
  // Clear previous error messages
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });

  // Display new error messages
  for (const field in errors) {
    console.log(field);
    const errorMessage = errors[field];
    const errorElement = document.getElementById(`${field}-error-message`);
    if (errorElement) {
      errorElement.textContent = errorMessage;
    } else {
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("login-error-message").textContent = errorMessage;
    }
  }
}

function togglePassword() {
  inputPassword = document.querySelector("#password-login");
  eye = document.querySelector("#eye");
  eyeSlash = document.querySelector("#eye-slash");
  if (inputPassword.type === "password") {
    inputPassword.type = "text";
    eyeSlash.classList.add("hidden");
    eye.classList.remove("hidden");
  } else {
    inputPassword.type = "password";
    eye.classList.add("hidden");
    eyeSlash.classList.remove("hidden");
  }
}