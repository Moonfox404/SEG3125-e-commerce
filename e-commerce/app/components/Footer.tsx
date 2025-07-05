"use client";
import React from "react";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-primary text-corns ink py-8 w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col items-center md:items-start text-accent">
          <Logo />
          <p className="mt-2 text-md text-white font-bold text-center md:text-left">
            Quality furniture to grow your home.
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-white text-md">
          <a href="/" className="hover:text-accent">
            Home
          </a>
          <a href="/" className="hover:text-accent">
            Shop
          </a>
          <a href="/about" className="hover:text-accent">
            About Us
          </a>
          <a href="/contact" className="hover:text-accent">
            Contact
          </a>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            aria-label="Facebook"
            className="hover:text-accent text-white text-2xl"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            aria-label="Instagram"
            className="hover:text-accent text-white text-2xl"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Furniture Forest. All rights reserved.
      </div>
    </footer>
  );
}
