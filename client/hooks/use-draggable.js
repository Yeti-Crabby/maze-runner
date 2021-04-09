import { useState, useEffect } from "react";

export default function useDraggable(handleId) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = document.getElementById("handle");
    handle.addEventListener("mousedown", function (e) {
      e.preventDefault();
      handle.style.pointerEvents = "none";

      document.body.addEventListener("mousemove", move);
      document.body.addEventListener(
        "mouseup",
        () => {
          document.body.removeEventListener("mousemove", move);
          handle.style.pointerEvents = "initial";
        },
        false
      );
    });

    return () => {
      document.body.removeEventListener("mouseup", move);
      document.body.removeEventListener("mousemove", move);
      document.body.removeEventListener("mousemove", move);
    };
  }, []);

  function move(e) {
    const pos = {
      x: e.clientX,
      y: e.clientY,
    };

    setPosition(pos);
  }
  
 //object with the key : position that returns the getter to the position state
  return {
    position,
  };
}
