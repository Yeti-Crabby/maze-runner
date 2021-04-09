import React, { Component } from "react";
import Navbar from "../Navbar.jsx";
import "../../client/styles.scss";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      mouseIsPressed: false,
      entryNodeMode: false,
      targetNodeMode: false,
      wallMode: false,
      headPosition: "0,0",
      targetPosition: "9,9",
      path: [],
      onFire: [],
    };
    this.addWallMode = this.addWallMode.bind(this);
    this.entryNodeMode = this.entryNodeMode.bind(this);
    this.targetNodeMode = this.targetNodeMode.bind(this);
    this.algorithm = this.algorithm.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
  }

  // initialize the board state as an empty object
  // and populate it with object { `y, x`: { visited: false }, }
  componentDidMount() {
    const board = {};
    //create the grid (height 15 x width 30)
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 30; j++) {
        board[`${i},${j}`] = {
          visited: false,
        };
      }
    }
    this.setState({ board }); //set boards value
    // console.log(this.state);
  }

  // enable wall mode - allows you to make walls
  addWallMode() {
    this.setState(
      {
        entryNodeMode: false,
        targetNodeMode: false,
        wallMode: true,
      },
      function () {
        // console.log('addwallmode', this.state);
      }
    );
  }
  // enable entryNode - starting node
  entryNodeMode() {
    this.setState(
      {
        entryNodeMode: true,
        targetNodeMode: false,
        wallMode: false,
      },
      function () {
        console.log("entrynodemode", this.state);
      }
    );
  }
  // enable targetNode - target node
  targetNodeMode() {
    this.setState(
      {
        entryNodeMode: false,
        targetNodeMode: true,
        wallMode: false,
      },
      function () {
        // console.log('targetnodemode', this.state);
      }
    );
  }
  // EVENTS ----------------------------------------------------------------
  handleMouseDown(property) {
    if (this.state.wallMode === false) return; // if not in wall mode return

    const board = { ...this.state.board };
    board[property].visited = true;
    board[property].wall = true;
    this.setState({ board: board, mouseIsPressed: true });
  }
  handleMouseEnter(property) {
    if (this.state.wallMode === false || this.state.mouseIsPressed === false)
      return;

    const board = { ...this.state.board };
    board[property].visited = true;
    board[property].wall = true;
    this.setState({ board: board });
  }
  handleMouseUp() {
    if (this.state.wallMode === false) return;
    this.setState({ mouseIsPressed: false });
  }
  handleHead(coordinates) {
    if (this.state.entryNodeMode === false) return;
    this.setState({ headPosition: coordinates });
  }
  handleTarget(coordinates) {
    if (this.state.targetNodeMode === false) return;
    this.setState({ targetPosition: coordinates });
  }
  clearBoard() {
    const board = {};
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 30; j++) {
        board[`${i},${j}`] = {
          visited: false,
        };
      }
    }
    this.setState({
      board: board,
      mouseIsPressed: false,
      entryNodeMode: false,
      targetNodeMode: false,
      wallMode: false,
      path: [],
      onFire: [],
    });
  }
  //ALGORITHM ----------------------------------------------------------------
  algorithm() {
    const { headPosition, targetPosition, board, path, onFire } = this.state;
    // check if theres a path?

    if (this.state.path.length !== 0) {
      const board = Object.assign(this.state.board); //assign state to board

      for (const property in board) {
        // console.log("board:", board);  //board values look like {visited: true, previousNode: "0,0"}
        board[property].visited = false; //set all visited properties to false
        if (board[property].previousNode) delete board[property].previousNode; // Reset previous node
      }
      this.setState({ board: board, path: [] });
    }

    const nodes = Object.assign(this.state.board); // copy of board state
    const head = headPosition; // start position  "x,y"
    const target = targetPosition; // target position "x,y"

    nodes[head].visited = true; // assign visited head position to true {visited: true}
    nodes[head].previousNode = null; // assign previous node to null {previousNode: null}

    const queue = [{ [head]: nodes[head] }]; //  FIFO
    const fire = this.state.onFire.slice(); // assign fire to a shallow copy of the onFire array

    //takes in 2 arrays fire: array of strings ["0,0"] - queue: array of objects [{0,0}]
    //helper finding shortest path first
    // HELPER ----------------------------------------------------------------
    const helper = (queue, fire) => {
      // iterate through queue and build the path once target is found
      // queue -> [0: {1,0: {visited: true, previousNode: "0,0"}}]
      for (let i = 0; i < queue.length; i++) {
        //if target found
        if (Object.keys(queue[i]) == target) {
          const path = [];
          // assign previously checked node
          let previousNode = queue[i][target].previousNode;

          while (previousNode !== null) {
            path.push(previousNode); // create the path with while loop
            previousNode = nodes[previousNode].previousNode;
          }
          return path;
        }
      }
      const position = Object.keys(queue[0]); // position = ["1,0"]
      let string = position[0]; // string = "0,1"
      const arrPosition = position[0].split(","); // arrPosition = ["0", "0"]

      //iterate to find multiple x,y positions for FIRE 🔥️
      for (let i = -1; i < 2; i++) {
        if (i !== 0) {
          // newPosition & newPosition2 build x,y positions
          const newPosition = `${Number(arrPosition[0]) + i},${Number(
            arrPosition[1]
          )}`;
          const newPosition2 = `${Number(arrPosition[0])},${
            Number(arrPosition[1]) + i
          }`;
          // *I think we can add condition here to check if node is a wall ?
          // check if position exists and visited equals false
          if (nodes[newPosition] && nodes[newPosition].visited === false) {
            nodes[newPosition].visited = true; // if the node exists and it has not been visited, reassign visited to true
            fire.push(newPosition);
            // console.log("nodes[newPosition", nodes[newPosition])
            nodes[newPosition].previousNode = string;
            queue.push({ [newPosition]: nodes[newPosition] });
          }
          if (nodes[newPosition2] && nodes[newPosition2].visited === false) {
            nodes[newPosition2].visited = true;
            fire.push(newPosition2);
            nodes[newPosition2].previousNode = string;
            queue.push({ [newPosition2]: nodes[newPosition2] });
          }
        }
      }
      queue.shift();
      // console.log('queue', queue);
      if (queue.length === 0) return undefined;
      // recursive call for path find- takes copy of queue and fire
      return helper(queue.slice(), fire);
    };
    const array = helper(queue, fire);
    // console.log("array:", array);
    if (array === undefined) {
      alert("No path found. Try again.");
    }
    array.pop();
    const path1 = array.reverse(); //ensures animation path plays from start-node to target
    fire.pop(); //removes fire piece that hits target?
    const finalFire = fire.slice(); // assigns a copy of fire for state

    //resets fire animation and triggers final fire path?
    setTimeout(
      function () {
        return this.setState({
          onFire: [],
          path: path1,
        });
      }.bind(this),
      finalFire.length * 25
    );
    // updates state with path and finalFire values
    console.log("tile", this.props.tile);
    this.setState({ path: path, onFire: finalFire });
  }

  cloneMatrix(m) {
    const clone = new Array(m.length);
    for (let i = 0; i < m.length; ++i) {
      clone[i] = m[i].slice(0);
    }
    return clone;
  }
  dropTile({ x, y }) {
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

  render() {
    const { board, onFire, path, headPosition, targetPosition } = this.state;

    const grid = [];
    let className = ""; //create className for button below
    let style;

    //assign classNames to each coordinate
    for (const property in board) {
      //  store property value 0 , 0 in id
      let id = property;
      //  SET className BASED ON PROPERTY condition
      if (board[property].wall === true) {
        //keep walls up when re-running algorithm
        grid.push(
          <button
            id={id}
            className="wallGrid"
            style={{
              borderBottom: "1px solid #333",
              borderRight: "1px solid #333",
              background: `url(../../../../../public/rpg-nature-tileset/spring.png) -${this.props.activeTile.x}px -${this.props.activeTile.y}px no-repeat`,
            }}
            key={id}
            onMouseDown={() => {
              this.handleMouseDown(property);
            }}
            onMouseOver={() => {
              this.handleMouseEnter(property);
            }}
            onMouseUp={() => {
              this.handleMouseUp(property);
            }}
            onClick={() => {
              this.handleHead(property);
              this.handleTarget(property);
            }}
          ></button>
        );
      } else if (
        this.state.onFire.includes(property) &&
        this.state.onFire.length !== 0
      ) {
        grid.push(
          <button
            id={id}
            className={
              "onFire" +
              " " +
              "anim-delay-" +
              this.state.onFire.indexOf(property)
            }
            onMouseDown={() => {
              this.handleMouseDown(property);
            }}
            onMouseOver={() => {
              this.handleMouseEnter(property);
            }}
            onMouseUp={() => {
              this.handleMouseUp(property);
            }}
            onClick={() => {
              this.handleHead(property);
              this.handleTarget(property);
            }}
          ></button>
        );
        // }
      } else if (this.state.path.includes(property)) {
        grid.push(
          <button
            id={id}
            className={
              "path" + " " + "anim-delay-2-" + this.state.path.indexOf(property)
            }
            onMouseDown={() => {
              this.handleMouseDown(property);
            }}
            onMouseOver={() => {
              this.handleMouseEnter(property);
            }}
            onMouseUp={() => {
              this.handleMouseUp(property);
            }}
            onClick={() => {
              this.handleHead(property);
              this.handleTarget(property);
            }}
          ></button>
        );
      } else if (property === this.state.headPosition) {
        grid.push(
          <button
            id={id}
            className="head"
            onMouseDown={() => {
              this.handleMouseDown(property);
            }}
            onMouseOver={() => {
              this.handleMouseEnter(property);
            }}
            onMouseUp={() => {
              this.handleMouseUp(property);
            }}
            onClick={() => {
              this.handleHead(property);
              this.handleTarget(property);
            }}
          ></button>
        );
      } else if (property === this.state.targetPosition) {
        grid.push(
          <button
            id={id}
            className="target"
            onMouseDown={() => {
              this.handleMouseDown(property);
            }}
            onMouseOver={() => {
              this.handleMouseEnter(property);
            }}
            onMouseUp={() => {
              this.handleMouseUp(property);
            }}
            onClick={() => {
              this.handleHead(property);
              this.handleTarget(property);
            }}
          ></button>
        );
      } else {
        grid.push(
          <button
            id={id}
            className="regularGrid"
            onMouseDown={() => {
              this.handleMouseDown(property);
            }}
            onMouseOver={() => {
              this.handleMouseEnter(property);
            }}
            onMouseUp={() => {
              this.handleMouseUp(property);
            }}
            onClick={() => {
              this.handleHead(property);
              this.handleTarget(property);
            }}
          ></button>
        );
      }
    }

    return (
      <div>
        <div className="navbar">
          <Navbar
            clearBoard={this.clearBoard}
            runAlgo={this.algorithm}
            addWallMode={this.addWallMode}
            entryNodeMode={this.entryNodeMode}
            targetNodeMode={this.targetNodeMode}
          />
        </div>
        <div className="gap"></div>
        <div className="gridContainer">{grid}</div>
      </div>
    );
  }
}
export default MainContainer;
