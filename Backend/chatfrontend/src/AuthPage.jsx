// Functional component AuthPage
const AuthPage = (props) => {
    // Function to handle form submission
    const onSubmit = (e) => {
      e.preventDefault(); // Prevent default form submission
      const { value } = e.target[0]; // Extract username from form input
      // Call onAuth function passed as prop with username and secret
      props.onAuth({ username: value, secret: value });
    };
  
    return (
      // Render the authentication form
      <div className="background"> {/* Background container */}
        <form onSubmit={onSubmit} className="form-card"> {/* Form container */}
          <div className="form-title">Welcome 👋</div> {/* Title */}
          <div className="form-subtitle">Set a username to get started</div> {/* Subtitle */}
          <div className="auth"> {/* Authentication container */}
            <div className="auth-label">Username</div> {/* Label for username */}
            <input className="auth-input" name="username" /> {/* Input field for username */}
            <button className="auth-button" type="submit"> {/* Submit button */}
              Enter {/* Button text */}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AuthPage; // Export AuthPage component
  