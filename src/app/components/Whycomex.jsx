"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowDownCircle } from "react-icons/fi";
import Image from "next/image";
import Balozi from "../../../assets/Lounge_angle 1.jpg";
import ReasonBox from "./ReasonBox";

function Whycomex() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  });

  const reasons = [
    {
      id: 1,
      title: "EXPECTED RENTAL YIELD OF ABOUT 10%",
      description:
        "Own a premium Nairobi apartment with an expected rental yield of about 10% a year: KES 29,000 a month on a KES 3.51M studio and KES 45,000 on a KES 5.46M one bedroom at Astana Residence. Rent is an estimate, not a guarantee.",
    },
    {
      id: 2,
      title: "GET HASSLE FREE MANAGEMENT",
      description:
        "Comex Homes does the work for you! We look for tenants, collect rent and manage the unit on your behalf. Yours is to monitor your investment.",
    },
    {
      id: 3,
      title: "GET FLEXIBLE PAYMENT PLAN",
      description:
        "A deposit of 25% to be made upon signing the offer letter. Balance payable in quarterly instalments during construction.",
    },
  ];

  return (
    <div data-aos="fade-up">
      <section className="why-comex">
        <div className="head">
          <h2 className="sec-title">Why Comex Homes</h2>
          {/* <hr className="center-line" /> */}
          <h2>Reasons To Invest In Real Estate With Us</h2>
        </div>

        <div className="why-comex-content">
          <div className="why-comex-text">
            {reasons.map((reason) => (
              <ReasonBox
                key={reason.id}
                title={reason.title}
                description={reason.description}
              />
            ))}
          </div>
          <div className="why-comex-text">
            <Image
              className="video"
              src={Balozi}
              priority="true"
              alt="Balozi Suites"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Whycomex;
