import React from "react";
import "../stylesheets/footer.css";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div>
        <p>Created by:</p>
        <div className='links-container'>
            <div className='teammember'>
            <a href="https://www.linkedin.com/in/lorarusinouskaya/" target="_blank">
                <FaLinkedinIn />
            </a>
            <a href="https://github.com/Arol15" target="_blank">
                <FaGithub />
            </a>
            <span>Lora</span>
            </div>
            <div className='teammember'>
            <a href="https://www.linkedin.com/in/lukenicholsontx/" target="_blank">
                <FaLinkedinIn />
            </a>
            <a href="https://github.com/lukenicholson" target="_blank">
                <FaGithub />
            </a>
            <span>Luke</span>
            </div>
            <div className='teammember'>
            <a href="https://www.linkedin.com/in/rocky-yang-8a6669b8/" target="_blank">
                <FaLinkedinIn />
            </a>
            <a href="https://github.com/rockyboyyang" target="_blank">
                <FaGithub />
            </a>
            <span>Rocky</span>
            </div>
            <div className='teammember'>
            <a href="https://www.linkedin.com/in/senyoagawu/" target="_blank">
                <FaLinkedinIn />
            </a>
            <a href="https://github.com/sdkag" target="_blank">
                <FaGithub />
            </a>
            <span>Senyo</span>
            </div>
        </div>
        <div className='project-name'>
          {"Swipefair © "} {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
//https://www.linkedin.com/in/rocky-yang-8a6669b8/