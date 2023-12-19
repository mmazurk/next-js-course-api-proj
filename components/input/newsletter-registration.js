import classes from "./newsletter-registration.module.css";
import { useRef } from "react";

function NewsletterRegistration() {
  const emailAddress = useRef();

  async function registrationHandler(event) {
    event.preventDefault();
    const email = emailAddress.current.value;
    if (!email || email.length === 0) {
      return console.error("bad email");
    }

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const message = await response.json();
      console.log(message);
    } catch (error) {
      console.error(error);
    }
    emailAddress.current.value = "";

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailAddress}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
