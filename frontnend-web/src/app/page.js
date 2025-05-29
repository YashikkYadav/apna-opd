import About from "./components/common-components/about";
import Article from "./components/home-components/article";
import Banner from "./components/home-components/banner";
import Consult from "./components/home-components/consult";
import FourPoints from "./components/home-components/fourPoints";
import GetInTouch from "./components/common-components/getInTouch";
import WhatOurUsers from "./components/home-components/whatOurUsers";

export default function Home() {
  return (
    <div className="pt-[80px]">
      <Banner />
      <FourPoints />
      <Consult />
      <WhatOurUsers />
      {/* <Article/> */}
      <About />
      <GetInTouch />
    </div>
  );
}
