import { useGlobalContext } from "../context";
import loaderOneDesktopSvg from "../images/loader-svgs/loader-one-desktop.svg";
import loaderOneMobileSvg from "../images/loader-svgs/loader-one-mobile.svg";
import loaderTwoDesktopSvg from "../images/loader-svgs/loader-two-desktop.svg";
import loaderTwoMobileSvg from "../images/loader-svgs/loader-two-mobile.svg";

function Loader() {
  const { layout } = useGlobalContext();
  return (
    <>
      {layout === "LAYOUT_ONE" ? (
        <>
          <img id="loaderOneDesktop" src={loaderOneDesktopSvg} alt="" />
          <img id="loaderOneMobile" src={loaderOneMobileSvg} alt="" />
        </>
      ) : (
        <>
          <img id="loaderTwoDesktop" src={loaderTwoDesktopSvg} alt="" />
          <img id="loaderTwoMobile" src={loaderTwoMobileSvg} alt="" />
        </>
      )}
    </>
  );
}

export default Loader;
