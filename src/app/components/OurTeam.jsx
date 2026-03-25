"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import "./OurTeam.css";

import MariamPhoto from "../../../assets/team/mariam.jpeg";
import AsifPhoto from "../../../assets/team/asif.png";
import KimPhoto from "../../../assets/team/kim.jpeg";
import MohamedPhoto from "../../../assets/team/JEFF II.png";
import AshishPhoto from "../../../assets/team/ASHISH.jpg.jpeg";
import DavidPhoto from "../../../assets/team/DAVID.jpg.jpeg";


const CEO = {
  name: "Shiine Yusuf",
  title: "Comex Group — Chief Executive Officer",
  initials: "SY",
  quote:
    "Our mission is simple: put our clients' capital in the right place at the right time — and deliver returns that consistently beat the market.",
};

const TEAM = [
  { name: "Asif Mansuri",    role: "Chief Operating Officer", company: "Comex Group",    photo: AsifPhoto },
  { name: "Kim Dongyoon",    role: "Chief Information Officer", company: "Comex Group",  photo: KimPhoto },
  { name: "Ashish Bhadesia", role: "Chief Financial Officer",   company: "Comex Group",  photo: AshishPhoto },
  { name: "Vincent Onyango", role: "Internal Auditor",          company: "Comex Group",  initials: "VO" },
  { name: "David Njuki",     role: "Project Manager",           company: "Comex Builders", photo: DavidPhoto },
  { name: "Mohamed Noor",    role: "General Manager",           company: "Comex Living", photo: MohamedPhoto },
  { name: "Mariam Mamuli",   role: "General Manager",           company: "Comex Homes",  photo: MariamPhoto },
];

const STATS = [
  { value: "4",     label: "Business Divisions" },
  { value: "8",     label: "Senior Leaders" },
  { value: "9–15%", label: "Guaranteed Returns" },
  { value: "500+",  label: "Happy Investors" },
];

export default function OurTeam() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div style={{ paddingTop: "90px" }}>
      <div className="team-page">

        {/* HEADER */}
        <div className="team-header" data-aos="fade-up">
          <div className="team-tag">
            <div className="team-tag-dot" />
            <span>The People Behind the Vision</span>
          </div>
          <h1 className="team-h1">
            Leadership <em>Across</em><br />Every Frontier
          </h1>
          <p className="team-sub">
            A diverse team of seasoned professionals driving Comex Group&apos;s
            vision across real estate development, living, and homes.
          </p>
        </div>

        {/* STATS */}
        <div className="team-stats">
          {STATS.map((s, i) => (
            <div className="team-stat" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="team-stat-value">{s.value}</div>
              <div className="team-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CEO SPOTLIGHT */}
        <div className="team-ceo" data-aos="fade-up">
          <div className="ceo-avatar-wrap">{CEO.initials}</div>
          <div>
            <div className="ceo-name">{CEO.name}</div>
            <div className="ceo-title">{CEO.title}</div>
            <p className="ceo-quote">&ldquo;{CEO.quote}&rdquo;</p>
          </div>
        </div>

        {/* ROSTER */}
        <div className="team-roster-wrap">
          <div className="team-roster-label">Group Leadership</div>
          <div className="team-roster-grid">
            {TEAM.map((member, i) => (
              <div className="roster-card" key={i} data-aos="fade-up" data-aos-delay={i * 60}>
                <div className={`r-avatar${member.photo ? " has-photo" : ""}`}>
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={72}
                      height={72}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  ) : (
                    member.initials
                  )}
                </div>
                <div className="r-info">
                  <div className="r-name">{member.name}</div>
                  <div className="r-role">{member.role}</div>
                  <div className="r-company">{member.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}