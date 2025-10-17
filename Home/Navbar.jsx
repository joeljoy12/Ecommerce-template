"use client";

import React, { useState } from "react";
import Link from "next/link";
import siteConfig from "@/data/siteConfig.json";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navbar } = siteConfig;

  return (
    <header
      className="shadow-md fixed top-0 left-0 w-full z-50"
      style={{ backgroundColor: navbar.backgroundColor }}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center font-bold text-2xl tracking-tight"
          style={{ color: navbar.textColor }}
        >
          <span style={{ color: navbar.highlightColor }}>
            {navbar.logo.highlight}
          </span>
          {navbar.logo.rest}
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex space-x-8 text-base font-medium"
          style={{ color: navbar.textColor }}
        >
          {navbar.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition"
              style={{ color: navbar.textColor }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = navbar.highlightColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = navbar.textColor)
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href={navbar.cta.cart.href}
            className="inline-flex items-center px-4 py-2 rounded-lg transition"
            style={{
              color: navbar.highlightColor,
              border: `1px solid ${navbar.highlightColor}`
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = navbar.highlightColor;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = navbar.highlightColor;
            }}
          >
            {navbar.cta.cart.label}
          </Link>
          <Link
            href={navbar.cta.signup.href}
            className="inline-flex items-center px-4 py-2 text-white rounded-lg transition"
            style={{ backgroundColor: navbar.highlightColor }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = navbar.highlightHover)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = navbar.highlightColor)
            }
          >
            {navbar.cta.signup.label}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          style={{ color: navbar.textColor }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav
          className="md:hidden shadow-lg px-6 py-4 space-y-3"
          style={{ backgroundColor: navbar.backgroundColor }}
        >
          {navbar.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block transition"
              style={{ color: navbar.textColor }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = navbar.highlightColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = navbar.textColor)
              }
            >
              {link.label}
            </Link>
          ))}
          <div className="flex space-x-4 pt-4">
            <Link
              href={navbar.cta.cart.href}
              className="w-1/2 text-center px-4 py-2 rounded-lg transition"
              style={{
                color: navbar.highlightColor,
                border: `1px solid ${navbar.highlightColor}`
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = navbar.highlightColor;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = navbar.highlightColor;
              }}
            >
              {navbar.cta.cart.label}
            </Link>
            <Link
              href={navbar.cta.signup.href}
              className="w-1/2 text-center px-4 py-2 text-white rounded-lg transition"
              style={{ backgroundColor: navbar.highlightColor }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = navbar.highlightHover)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = navbar.highlightColor)
              }
            >
              {navbar.cta.signup.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
