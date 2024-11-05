import React from "react";
import HeroHeaderSection from "./HeroHeaderSection";
import MainButton from "../common/MainButton";
import { cn } from "@/lib/utils";
import { gilroyBold } from "@/lib/utils";
import { HeroYoutubeModal } from "../modals/HeroYoutubeModal";
import Link from "next/link";

function HeroSection() {
  return (
    <section>
      <HeroHeaderSection />
      <div>
        <div
          className={cn(
            gilroyBold.className,
            "text-4xl md:text-[92px] text-center text-primary md:leading-[5.5rem] my-8"
          )}
        >
          Together <br /> We Create and Empower.
        </div>

        <p className="mb-8 text-[22px] text-center text-[#31373D]">
          A decentralized platform for governance, media archiving, and
          transparent funding.
        </p>

        <div className="flex flex-wrap w-full items-center lg:flex-row flex-col gap-[12px] justify-center">
          <Link href="/explore">
            <MainButton
              text="Fund a Project"
              size="normal"
              width="120px"
              className="border-none rounded-[12px]"
            />
          </Link>
          <Link href="/explore">
            <MainButton
              text="Explore Media Archive"
              size="normal"
              width="120px"
              className="rounded-[12px] border-[1px] border-[#EDEEF0] bg-white hover:bg-white text-[#31373D]"
            />
          </Link>
        </div>

        <div className="flex w-full justify-center">
          <HeroYoutubeModal />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
