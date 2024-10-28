import { ChevronRight } from "lucide-react";
import React from "react";

function HeroHeaderSection() {
  return (
    <div className="flex justify-center mt-0 lg:mt-20">
      <div className="inline-flex  items-center gap-1 bg-[#F4F5F6] border-[#fff] border-2 p-1 rounded-[100px] pr-[10px]">
        <div className="text-white inline-block bg-primary p-2 rounded-[100px] text-[10px] font-semibold">
          New
        </div>
        <p className="text-[#31373D]">Vann de Cleef wins today’s vote</p>
        <div>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}

export default HeroHeaderSection;
