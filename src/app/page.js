import dynamic from "next/dynamic";
import "./globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Process from "./components/Process";
import Properties from "./components/Properties";
import MapComponent from "./components/MapComponent";
import Getproperty from "./components/Getproperty";
import Whycomex from "./components/Whycomex";
import Contactus from "./components/Contactus";
import PopupModal from "./components/PopupModal";
import HomeSeo from "./components/HomeSeo";
const Homebanner = dynamic(() => import("./components/Homebanner"), {
  ssr: false,
});
const Cover = dynamic(() => import("./components/Cover"), { ssr: false });
const Covertwo = dynamic(() => import("./components/Covertwo"), { ssr: false });
const Revealarea = dynamic(() => import("./components/Revealarea"), {
  ssr: false,
});

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>

      <PopupModal />
      <Homebanner />
      <Getproperty />
      <Covertwo />
      <Revealarea />
      <Properties />
      <HomeSeo />
      <Whycomex />
      {/* <Process /> */}
      <Cover />
      <MapComponent />
      <Contactus />
    </>
  );
}
