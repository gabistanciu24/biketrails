import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Trails from "./container/Trails";
import CTA from "./container/CTA";

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <Trails />
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
