"use client";
import Image from "next/image";
import Logo from "../../../assets/logo.png";
import Link from "next/link";
import { LANDINGS, ORG } from "../data/seo";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Footer() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  });

  return (
    <div data-aos="fade-up" className="main-footer">
      <div className="top">
        <div className="area">
          <div className="right-area-side">
            <Image
              src={Logo}
              className="footer-image"
              priority="true"
              alt="Comex Homes logo"
            />
          </div>

          <div className="logo-line"></div>
        </div>
        <div className="area">
          <div className="right-area-side">
            <h3>Office Hours</h3>
            <p>Monday - Friday 07:30am to 16:30pm</p>
            <p>Saturday - Closed</p>
          </div>

          <div className="area-line"></div>
        </div>
        <div className="right-area-side">
          <h3>comex homes</h3>
          <p>Telkom Plaza, 1st Floor, Hurlingham, Nairobi</p>
          <p>Phone : +254709501501</p>
        </div>
      </div>

      <nav aria-label="Apartments for sale" style={{ padding: "12px 16px", textAlign: "center", fontSize: 13, lineHeight: 1.9 }}>
        <Link href="/properties">All properties</Link> · <Link href="/guides">Guides</Link>
        {LANDINGS.map((l) => (
          <span key={l.slug}> · <Link href={`/${l.slug}`}>{l.h1}</Link></span>
        ))}
      </nav>
      <nav aria-label="Follow Comex Homes" style={{ padding: "4px 16px 12px", textAlign: "center", fontSize: 14 }}>
        {ORG.sameAs.map((u, i) => (
          <span key={u}>{i > 0 && " · "}<a href={u} target="_blank" rel="noopener me" data-track="social_click">{u.includes("facebook") ? "Facebook" : u.includes("instagram") ? "Instagram" : u.includes("x.com") ? "X" : "LinkedIn"}</a></span>
        ))}
      </nav>
      <div className="bottom">
        <p>Comex Homes &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default Footer;