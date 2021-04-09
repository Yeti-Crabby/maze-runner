import React from "react";

//map takes several destructured properties and returns map
function Map({ tiles, setTiles, activeTile, tileset, size }) {
  //function to clone a matrix used inside of dropTile
  function cloneMatrix(m) {
    const clone = new Array(m.length);
    for (let i = 0; i < m.length; ++i) {
      clone[i] = m[i].slice(0);
    }
    return clone;
  }
  //this allows us to drop tiles from the palette onto our map
  function dropTile({ x, y }) {
    //clone previous matrix state in order to alter the copy
    //then set the tiles to the copy
    setTiles((prev) => {
      const clone = cloneMatrix(prev);
      const tile = {
        //pull in values
        ...clone[y][x],
        v: activeTile,
      };
      //swap values from clone to active tile
      clone[y][x] = tile;
      return clone;
    });
  }
  return (
    <div
      style={{
        boxSizing: "border-box",
        backgroundColor: "white",
        width: size.width,
      }}
    >
      {/* display our tiles which will be composed of divs  */}
      {tiles.map((row, y) => (
        <div style={{ display: "flex" }}>
          {row.map((tile, x) => (
            <div
              //change this for dragging functionality
              onClick={() => dropTile({ x, y })}
              style={{
                borderBottom: "1px solid #333",
                borderRight: "1px solid #333",
                background: `url(../../../../../public/rpg-nature-tileset/${tileset}.png) -${tile.v.x}px -${tile.v.y}px no-repeat`,
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

export default Map;
