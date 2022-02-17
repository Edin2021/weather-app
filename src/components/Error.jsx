import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

function Error() {
  const { error, setError } = useGlobalContext();

  useEffect(() => {
    let intreval = setInterval(() => {
      setError(false);
    }, 2000);
    return () => clearInterval(intreval);
  }, [error]);

  if (!error) return <></>;
  return (
    <div className="error-message">Oops.. Couldn't find that location.</div>
  );
}

export default Error;
