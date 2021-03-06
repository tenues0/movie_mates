//login
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      console.log("going to dashboard")
      // If successful, redirect the browser to the profile page
      document.location.replace('/api/dashboard');
      console.log("You are logged in.")
    } else {
      alert('Failed to login.');
    }
  }
};

//document.queryselectors for login and signup
document.querySelector('.login').addEventListener('submit', loginFormHandler);