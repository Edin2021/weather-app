import { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";

function BackgroundImage({ layout }) {
  const { backgroundImage, IS_DAY_NIGHT } = useGlobalContext();

  const isLayoutTwo = layout === "LAYOUT_TWO";
  const img = backgroundImage
    ? `${require(`../images/weather-backgrounds/${IS_DAY_NIGHT}/${backgroundImage}.jpg`)}`
    : "";

  const bcgRef = useRef(null);

  // FIX | Mobile background image cropped on scroll because of the URL bars
  useEffect(() => {
    const resizeBackground = (e) => {
      const adjustedHeight = e.target.innerHeight + 5;
      bcgRef.current.style.height = `${adjustedHeight}px`;
    };

    window.addEventListener("resize", resizeBackground);
    return () => window.removeEventListener("resize", resizeBackground);
  });

  return (
    <div className="background-image" ref={bcgRef}>
      <img
        src={img}
        alt=""
        className={isLayoutTwo ? "layout-two-styles" : ""}
      />
    </div>
  );
}

export default BackgroundImage;
