import React from "react";
import CustomStyledHeader from "../common/CustomStyledHeader";
import MainButton from "../common/MainButton";
import TweetCard from "../cards/TweetCard";

function LovedByBuildersSection() {
  const tweets = [
    {
      imageUrl: "/images/a_1.png",
      reviewerName: "Jane Doe",
      reviewerTag: "@jane_doe",
      review:
        "FundBrave has completely transformed our governance process. The decentralized voting system powered by Zeronym ensures privacy and security. Highly recommend it for civic groups!",
      timestamp: "9:45 AM - Aug 18, 2024",
    },

    {
      imageUrl: "/images/a_2.png",
      reviewerName: "John Smith",
      reviewerTag: "@johnsmith",
      review:
        "As a journalist covering refugee crises, the media archive feature with Numbers Protocol is an invaluable tool. I can upload authentic, censorship-resistant content that organizations like the UN rely on.",
      timestamp: "3:12 PM - Sep 5, 2024",
    },

    {
      imageUrl: "/images/a_3.png",
      reviewerName: "Emily Carter",
      reviewerTag: "@emily_c",
      review:
        "I’m so impressed by the open-source project funding feature. With Silk SDK, funding projects is as easy as sending an email. The platform's seamless reputation system encourages transparency.",
      timestamp: "11:27 AM - Sep 10, 2024",
    },

    {
      imageUrl: "/images/a_4.png",
      reviewerName: "Alex Martinez",
      reviewerTag: "@alexm_23",
      review:
        "Governance participation in FundBrave feels much more democratic. The privacy provided by Zeronym makes me feel confident in contributing without fear of identity exposure.",
      timestamp: "2:45 PM - Jul 22, 2024",
    },

    {
      imageUrl: "/images/a_5.png",
      reviewerName: "Sophia Wang",
      reviewerTag: "@sophiaw",
      review:
        "The Silk SDK integration for payments is a game-changer. I funded an open-source project using just my email—no KYC required. It’s seamless and secure.",
      timestamp: "7:35 PM - Aug 30, 2024",
    },

    {
      imageUrl: "/images/a_6.png",
      reviewerName: "Liam Evans",
      reviewerTag: "@liam_e",
      review:
        "FundBrave's media archive is incredible for preserving authentic content. Using Numbers Protocol ensures that the media we upload is verifiable and cannot be tampered with. Amazing work!",
      timestamp: "9:00 AM - Sep 20, 2024",
    },
  ];

  return (
    <section className="relative bg-[#232529] px-4 md:px-[94px] py-[116px]">
      <div>
        <CustomStyledHeader
          titleColored="Empowered by"
          titleUnColored="Communities"
          description="FundBrave is the decentralized platform for everyone who values privacy, transparency, and collective governance."
        />

        <MainButton
          text="More customer stories"
          size="small"
          className="border border-[#31373D] text-[#EDEEF0] rounded-[12px] bg-transparent mt-[32px]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[64px]">
        {tweets.map((item, index) => (
          <TweetCard {...item} key={index} />
        ))}
      </div>

      <div className=" hidden lg:block absolute bottom-2 left-0 w-full">
        <img
          src="/images/fade_gradient.png"
          alt="gradient"
          className="w-full"
        />
      </div>
    </section>
  );
}

export default LovedByBuildersSection;
