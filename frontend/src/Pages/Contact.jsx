import React from "react";
import "./CSS/Contact.css"
import mail_icon from "../Components/Assets/mail_icon.png"
import location_icon from "../Components/Assets/location_icon.png"
import msg_icon from "../Components/Assets/msg_icon.png"
import phone_icon from "../Components/Assets/phone_icon.png"

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-col">
        <h3>Send us a message <img src={msg_icon} alt="" /> </h3>
        <p>
          Feel free to reach out through contact form or find our contact
          information below. Your feedback, questions, and suggestions are
          important to us as we strive to provide exceptional service to our
          university community.
        </p>
        <ul>
            <li><img src={mail_icon} alt="" />Contact@Bigos.dev</li>
            <li> <img src={phone_icon} alt="" />+49 152-651-1321</li>
            <li><img src={location_icon} alt="" />77 Ollenhaustrasse, Berlin<br /> 13401, Germany</li>
        </ul>
      </div>
      <div className="contact-col">
        <form>
            <label>Your name</label>
            <input type="text" name="name" placeholder="Enter your name" required/>
            <label>Phone Number</label>
            <input type="tel" name="phone" placeholder="Enter yOur mobile" required/>
            <label>Write your messages here</label>
            <textarea name="message" rows="6" placeholder="Enter your message" required></textarea>
            <button type="submit" className="btn dark-btn">Submit now</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;




