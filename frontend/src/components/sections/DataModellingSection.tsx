import React from "react";
import CustomHeader from "../common/CustomHeader";
import ReviewCard from "../cards/ReviewCard";

function DataModellingSection() {
  const cardData = {
    avatarUrl: "/images/filip.png",
    review:
      "Fundbrave an incredibly versatile platform, allowing you to build the tools you need for resilient governance, media archiving, and funding of public goods. It gives you the flexibility to create a decentralized system that's perfectly tailored to your community, your data, and your processes, all while prioritizing privacy, security, and user empowerment.",
    name: "Filip Mark",
    position: "Chief of Staff, PassionFoot",
  };
  return (
    <section>
      <div>
        <CustomHeader
          title="A platform should do more than connect."
          description="FundBrave empowers users to govern, archive, and fund projects seamlessly while safeguarding their identity."
        />
      </div>

      <div className="w-full flex flex-col gap-[28px] items-center justify-center my-[64px] bg-white">
        <img
          src="/images/CRM2.png"
          alt="crm image"
          className="w-[calc(100vw-1.5rem)] md:w-[calc(100vw-8rem)]"
        />
      </div>

      <div>
        <ReviewCard {...cardData} />
      </div>
    </section>
  );
}

export default DataModellingSection;
