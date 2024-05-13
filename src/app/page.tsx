
import ScrollUp from "@/components/Common/ScrollUp";
import Company from "@/components/Companies";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Slider from "@/components/Slider";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tekisky Pvt Ltd",
  description: "",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      {/* <Features /> */}
      <Slider/>
      <Video />
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      <Company/>
      {/* <Blog /> */}
      <Contact />
    </>
  );
}
