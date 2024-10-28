"use client";
import NavBar from "@/components/common/NavBar";
import AlertSection from "@/components/sections/AlertSection";
import CRMSection from "@/components/sections/CRMSection";
import DataModellingSection from "@/components/sections/DataModellingSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import LovedByBuildersSection from "@/components/sections/LovedByBuildersSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import MoreFeaturesSection from "@/components/sections/MoreFeaturesSection";
import ReadyToBuildSection from "@/components/sections/ReadyToBuildSection";
import SecurityScaleSection from "@/components/sections/SecurityScaleSection";
import HeaderImage from "../../public/images/blur (1).png";
import Image from "next/image";

export default function Home() {
  /*const fetchUser = async () => {
    try {
      const res = await fetch('https://dia-backend.numbersprotocol.io/api/v3/auth/users/signup-web3/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            "import_wallet": true,
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "private_key": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "referral_code": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "username": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "device": {
              "fcm_token": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              "platform": "web",
              "device_identifier": "4"
            }
          }
        )
      })
      console.log(res)
    }catch(error){
      console.log(error)
    }
  }*/
  return (
    <main>
      <div className="absolute !top-0 w-full hidden lg:flex -z-50 h-[100vh] justify-center">
        <Image src={HeaderImage} alt="banner-image" />
      </div>
      <div className="flex flex-col-reverse md:flex-col">
        <AlertSection />
        <NavBar name="Homepage" />
      </div>

      <div className="mt-8 md:mt-[81px] flex flex-col gap-12 md:gap-[150px] px-4 md:px-[50px]">
        <HeroSection />
        {/* <button onClick={fetchUser}>Dot it</button> */}
        <MarqueeSection />
        <CRMSection />
        <DataModellingSection />
        <SecurityScaleSection />
      </div>

      <div className="mt-8 md:mt-[81px] flex flex-col">
        <MoreFeaturesSection />
        <LovedByBuildersSection />
        <ReadyToBuildSection />
        <FooterSection />
      </div>
    </main>
  );
}
