import { memo, useEffect } from "react";

import ReactDOM from "react-dom";
import { useRef } from "react";

function Portal({ children }: any) {
  const portal = useRef(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(portal.current);
    portal.current.classList.add("modal");
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.body.removeChild(portal.current);
    };
  }, []);

  return portal.current
    ? ReactDOM.createPortal(children, portal.current)
    : null;
}

export default memo(Portal);
