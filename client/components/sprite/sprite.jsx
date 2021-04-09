import React from "react";

//create a sprite ;
// image : allows for us to send a different image for different sprites
//  data : contains our x,y position and height and width values
function Sprite({ image, data }) {
  const { y, x, w, h } = data;
  return (
    <div
      className="sprite__skin"
      style={{
        display: "inline-block",
        height: `${h}px`,
        width: `${w}px`,
        backgroundImage: "url(${image})",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "-${x}px -${y}px",
      }}
    ></div>
  );
}

export default Sprite;
