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
import DavidPhoto from "../../../assets/team/DAVID.jpeg";
import VincentPhoto from "../../../assets/team/vincent.jpeg";
import ShiinePhoto from "../../../assets/team/Shiine.jpeg";
import KenPhoto from "../../../assets/team/KEN.png";

const CEO = {
  name: "Shiine Yusuf",
  title: "Comex Group — Chief Executive Officer",
  photo: ShiinePhoto,
  quote:
    "We design and deliver spaces where investors achieve reliable returns and tenants experience quality, comfort, and a true sense of community—creating lasting value for all.",
};

const TEAM = [
  { name: "Asif Mansuri",    role: "Chief Operating Officer",   company: "Comex Group",    photo: AsifPhoto },
  { name: "Kim Dongyoon",    role: "Chief Investment Officer",  company: "Comex Group",    photo: KimPhoto },
  { name: "Ashish Bhadesia", role: "Chief Finance Officer",     company: "Comex Group",    photo: AshishPhoto },
  { name: "CPA(K) Vincent Onyango", role: "Internal Auditor",          company: "Comex Group",    photo: VincentPhoto },
  { name: "David Njuki",     role: "Project Manager",           company: "Comex Builders", photo: DavidPhoto },
  { name: "Mohamed Noor",    role: "General Manager",           company: "Comex Living",   photo: MohamedPhoto },
  { name: "Mariam Mamuli",   role: "General Manager",           company: "Comex Homes",    photo: MariamPhoto },
  { name: "Kennedy Mugo",   role: "Head Of Marketing",           company: "Comex Group",    photo: KenPhoto },
];

const STATS = [
  { value: "4",      label: "Business Divisions" },
  { value: "8",      label: "Senior Leaders" },
  { value: "9–15%",  label: "Guaranteed Returns" },
  { value: "1000+",  label: "Happy Investors" },
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
            A dynamic collective of experienced professionals, driven by Comex Group&apos;s
            vision to redefine real estate, elevate living standards, and create homes that inspire communities.
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
          <div className="ceo-avatar-wrap">
            {CEO.photo ? (
              <Image
                src={CEO.photo}
                alt={CEO.name}
                width={160}
                height={160}
                style={{ objectFit: "cover", width: "100%", height: "100%", objectPosition: "center top" }}
              />
            ) : (
              CEO.initials
            )}
          </div>
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
                      width={100}
                      height={100}
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