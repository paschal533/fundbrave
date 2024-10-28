import React from "react";
import CustomHeader from "../common/CustomHeader";
import ReviewCard from "../cards/ReviewCard";

function CRMSection() {
  return (
    <section>
      <h1 className="text-3xl md:text-[52px] font-bold text-center">
        Join Us in Building a Resilient Future
      </h1>
      <p className="mt-4 text-[#31373D] text-[22px] text-center">
        A Comprehensive Approach to Community Empowerment, Media Preservation,
        and Transparent Funding
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-14 gap-4">
        <div className="">
          <img
            className="w-full shadow-lg"
            src="/images/funding.png"
            alt="security"
          />
          <div className="w-full justify-center items-center flex align-middle">
            <img
              className="w-full  hidden lg:block"
              src="/images/Curve.png"
              alt="security"
            />
          </div>
        </div>
        <div>
          <img
            className="w-full shadow-lg"
            src="/images/voting.png"
            alt="security"
          />
        </div>
        <div className="">
          <div className="w-full justify-center items-center flex align-middle">
            <img
              className="w-full hidden lg:block"
              src="/images/Curve (1).png"
              alt="security"
            />
          </div>
          <img
            className="w-full shadow-lg"
            src="/images/media.png"
            alt="security"
          />
        </div>
      </div>
    </section>
  );
}

export default CRMSection;
