import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Trails from "./container/Trails";

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <Trails />
    </MainLayout>
  );
};

export default HomePage;
