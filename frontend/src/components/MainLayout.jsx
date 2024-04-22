import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      {/* everythins inside MainLayout will be included inside this {children} */}
      <Footer />
    </div>
  );
};

export default MainLayout;
