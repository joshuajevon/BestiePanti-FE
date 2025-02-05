function SubmitForm(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmation_password =
    document.getElementById("confirm-password").value;
  const phone = document.getElementById("phone").value;
  const dob = document.getElementById("dob").value;
  const address = document.getElementById("address").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  // Prepare the data object
  const data = {
    name,
    email,
    password,
    confirmation_password,
    phone,
    gender,
    dob,
    address,
  };

  // Send the data to the server
  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      alert("Registration successful!");
      // window.location.href = "/login";
    })
    .catch((error) => {
      console.error("Error:", error);
      // General error handling (e.g., network errors)
      if (error.message !== "Validation failed") {
        alert("Registration failed: " + error.message);
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
    const errorMessage = errors[field];
    const errorElement = document.getElementById(`${field}-error-message`);
    if (errorElement) {
      errorElement.textContent = errorMessage;
    }
  }
}

function togglePassword() {
  inputPassword = $("#password");
  eye = $("#eye-1");
  eyeSlash = $("#eye-slash-1");
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

function toggleConfirmPassword() {
  inputConfirmPassword = $("#confirm-password");
  eye = $("#eye-2");
  eyeSlash = $("#eye-slash-2");
  if (inputConfirmPassword.type === "password") {
    inputConfirmPassword.type = "text";
    eyeSlash.classList.add("hidden");
    eye.classList.remove("hidden");
  } else {
    inputConfirmPassword.type = "password";
    eye.classList.add("hidden");
    eyeSlash.classList.remove("hidden");
  }
}
