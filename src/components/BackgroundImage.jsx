import { useGlobalContext } from "../context";

function BackgroundImage({ layout }) {
  const { backgroundImage, IS_DAY_NIGHT } = useGlobalContext();

  const isLayoutTwo = layout === "LAYOUT_TWO";
  const img = backgroundImage
    ? `${require(`../images/weather-backgrounds/${IS_DAY_NIGHT}/${backgroundImage}.jpg`)}`
    : "";

  return (
    <div className="background-image">
      <img
        src={img}
        alt=""
        className={isLayoutTwo ? "layout-two-styles" : ""}
      />
    </div>
  );
}

export default BackgroundImage;
