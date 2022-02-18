import { useGlobalContext } from "./context";
import BackgroundImage from "./components/BackgroundImage";
import ChangeLayoutBtn from "./components/ChangeLayoutBtn";
import LayoutOne from "./layouts/LayoutOne";
import LayoutTwo from "./layouts/LayoutTwo";
import Error from "./components/Error";
import Loader from "./components/Loader";

function App() {
  const { loading, layout } = useGlobalContext();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Error />
          <BackgroundImage layout={layout} />
          <ChangeLayoutBtn />
          {layout === "LAYOUT_ONE" ? <LayoutOne /> : <LayoutTwo />}
        </>
      )}
    </>
  );
}

export default App;
