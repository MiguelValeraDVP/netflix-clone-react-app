// Contact.js

import React, { useEffect, useRef, useState } from "react";
import "./contact.css";
import { BsWhatsapp } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { AiFillLinkedin } from "react-icons/ai";
import emailjs from "emailjs-com";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Contact = () => {
  const form = useRef();
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsTop(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_2e87yvg",
      "template_shq1f4s",
      form.current,
      "G-2V_h30ttQT8gm5U"
    );
    e.target.reset();
  };
  return (
    <>
      {isTop && <Navbar />}
      <div className="contact-container">
        <h2>
          <span>Dev contact</span>
        </h2>
        <p>
          If you have any questions or would like to get in touch, feel free to
          reach out through the following channels:
        </p>
        <div className="contact-links">
          <div className="contact-link">
            <h3>
              WhatsApp <BsWhatsapp color="green" size={20} />
            </h3>
            <a
              href="https://api.whatsapp.com/send?phone=59894297270"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send Message
            </a>
          </div>
          <div className="contact-link">
            <h3>
              Email <SiGmail color="red" size={20} />
            </h3>
            <a href="mailto:miguel.valera.97@gmail.com">Send Email</a>
          </div>
          <div className="contact-link">
            <h3>
              LinkedIn <AiFillLinkedin color="#8ab4f8" size={20} />
            </h3>
            <a
              href="https://www.linkedin.com/in/miguel-valera-developer/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send Message
            </a>
          </div>
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            id="name"
            className="contact-form-inputs"
            placeholder="Type your full name"
            required
          />
          <input
            className="contact-form-inputs"
            type="email"
            name="email"
            id="email"
            placeholder="enter your email address"
            required
          />
          <textarea
            type="text"
            name="message"
            id="message"
            rows={7}
            required
            className="contact-form-inputs"
            placeholder="Typer your message, i will text you back as soon as possible."
          ></textarea>
          <button className="btn btn-primary">Send message</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
