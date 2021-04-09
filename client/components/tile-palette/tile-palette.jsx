import React from "react";

//passing in destructed props used in our app/index
export default function TilePalette({
  tileset,
  position,
  size,
  activeTile,
  setActiveTile,
}) {
  const { width, height } = size;
  const tiles = [];
  // a mutable unique id to represent our tiles
  let id = 0;

  //build a tile matrix (height is represented by rows)
  for (let y = 0; y < height; y = y + 32) {
    const row = [];
    for (let x = 0; x < width; x = x + 32) {
      row.push({ x, y, id: id++ });
    }
    tiles.push(row);
  }
  // console.dir('what does tile matrix look like': tiles);

  return (
    <div
      id="palette"
      style={{
        position: "absolute",
        border: "1px solid black",
        top: position.y,
        left: position.x,
        zIndex: 100,
        backgroundColor: "white",
      }}
    >
      <img id="handle" src="../../../public/img/drag-handle.png" alt="" />
      <div
        style={{
          background: `url(/sprites/${tileset}.png) -${activeTile.x}px -${activeTile.y}px no-repeat`,
          width: 32,
          height: 32,
        }}
      />
      {/* mapping over (tiles matrix) rows - each itteration gives us a row and a index we will name y - 
          since each itteration is returning a row we are going to be returning a div with a collection of tiles  
      */}
      {tiles.map((row, y) => (
        <div style={{ display: "flex" }}>
          {/* this will return a div that will represent a single spot in our map */}
          {row.map((tile, x) => (
            <div
              onClick={() => setActiveTile({ x: x * 32, y: y * 32 })}
              style={{
                borderTop: "1px solid #333",
                borderRight: "1px solid #333",
                // ${tileset} use this instead of spring for mutability
                background: `url(../../../../../../public/rpg-nature-tileset/spring.png) -${
                  x * 32
                }px -${y * 32}px no-repeat`,
                width: 32,
                height: 32,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
