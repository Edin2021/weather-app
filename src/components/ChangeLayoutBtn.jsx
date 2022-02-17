import { useGlobalContext } from "../context";
import changeLayoutIcon from "../images/icons/change-layout-icon.png";

function ChangeLayoutBtn() {
  const { toggleLayout } = useGlobalContext();

  return (
    <button onClick={toggleLayout} type="button" className="change-layout-btn">
      <span className="visually-hidden">change layout button</span>
      <img src={changeLayoutIcon} alt="" />
    </button>
  );
}

export default ChangeLayoutBtn;
