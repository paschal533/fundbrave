import React from "react";
import FeatureCard from "../cards/FeatureCard";
import CustomStyledHeader from "../common/CustomStyledHeader";

function MoreFeaturesSection() {
  const features = [
    {
      iconUrl: "/images/f_1.png",
      title: "Decentralized Governance",
      description:
        "Empower communities with secure, decentralized voting using Zeronym for privacy-first identity verification.",
    },
    {
      iconUrl: "/images/f_2.png",
      title: "Censorship-Resistant Media Archive",
      description:
        "Store and verify media content in a decentralized archive using Numbers Protocol, ensuring immutability and authenticity.",
    },
    {
      iconUrl: "/images/f_3.png",
      title: "Public Goods Funding",
      description:
        "Support open-source projects through frictionless, privacy-focused payments powered by the Silk SDK.",
    },
    {
      iconUrl: "/images/f_4.png",
      title: "On-Chain Reputation System",
      description:
        "Build a verifiable reputation based on contributions to governance, archiving, and project funding, tied to your Zeronym-protected identity.",
    },
    {
      iconUrl: "/images/f_5.png",
      title: "User Dashboard",
      description:
        "Track your contributions, reputation, and engagement across the platform with a clear, intuitive interface.",
    },
    {
      iconUrl: "/images/f_6.png",
      title: "Privacy-First Identity",
      description:
        "Ensure user privacy through Zeronym, allowing users to engage in the ecosystem without revealing personal information.",
    },
  ];

  return (
    <section className="bg-[#232529] px-4 md:px-[94px] py-[116px]">
      <div>
        <CustomStyledHeader
          titleColored="And so"
          titleUnColored="much more..."
          description="Your community is always evolving. Why should your platform be any different?"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[64px]">
        {features.map((item, index) => (
          <FeatureCard {...item} key={index} />
        ))}
      </div>
    </section>
  );
}

export default MoreFeaturesSection;
