import { useGlobalContext } from "./context";
import BackgroundImage from "./components/BackgroundImage";
import ChangeLayoutBtn from "./components/ChangeLayoutBtn";
import LayoutOne from "./layouts/LayoutOne";
import LayoutTwo from "./layouts/LayoutTwo";
import LoaderOne from "./loaders/LoaderOne";
import LoaderTwo from "./loaders/LoaderTwo";
import Error from "./components/Error";

function App() {
  const { loading, layout } = useGlobalContext();

  const loader = layout === "LAYOUT_ONE" ? <LoaderOne /> : <LoaderTwo />;

  return (
    <>
      {loading ? (
        loader
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
