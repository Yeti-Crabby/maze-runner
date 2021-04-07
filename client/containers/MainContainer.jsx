import React, { Component } from 'react';
import Navbar from '../Navbar.jsx';
import '../styles.scss';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      mouseIsPressed: false,
      entryNodeMode: false,
      targetNodeMode: false,
      wallMode: false,
      headPosition: '0,0',
      targetPosition: '9,9',
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
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 30; j++) {
        board[`${i},${j}`] = {
          visited: false,
        };
      }
    }
    this.setState({ board });
    // console.log(this.state);
  }
  // enable wall mode
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
  entryNodeMode() {
    this.setState(
      {
        entryNodeMode: true,
        targetNodeMode: false,
        wallMode: false,
      },
      function () {
        // console.log('entrynodemode', this.state);
      }
    );
  }
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
  handleMouseDown(property) {
    if (this.state.wallMode === false) {
      return;
    }
    const board = { ...this.state.board };
    board[property].visited = true;
    board[property].wall = true;
    this.setState({ board: board, mouseIsPressed: true });
  }
  handleMouseEnter(property) {
    if (this.state.wallMode === false || this.state.mouseIsPressed === false) {
      return;
    }
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
  algorithm() {
    const { headPosition, targetPosition, board, path, onFire } = this.state;

    if (path.length !== 0) {
      const board = Object.assign(board);
      // console.log('1', JSON.stringify(board));
      for (const property in board) {
        // console.log(this.state.board[property])
        board[property].visited = false;
        if (board[property].previousNode) delete board[property].previousNode;
      }
      // console.log('2', JSON.stringify(board));
      this.setState({
        board: board,
        path: [],
      });
    }

    const nodes = Object.assign(board);
    const head = headPosition;
    const target = targetPosition;
    nodes[head].visited = true;
    nodes[head].previousNode = null;

    const queue = [{ [head]: nodes[head] }];
    const fire = onFire.slice();

    const helper = (queue, fire) => {
      // console.log('base queue every time helper is called', JSON.stringify(queue))
      // console.log('fire:', fire);
      for (let i = 0; i < queue.length; i++) {
        if (Object.keys(queue[i]) == target) {
          const path = [];
          let previousNode = queue[i][target].previousNode;
          while (previousNode !== null) {
            path.push(previousNode);
            previousNode = nodes[previousNode].previousNode;
          }
          // console.log('path1', path);
          return path;
        }
      }
      const position = Object.keys(queue[0]);
      let string = position[0];
      const arrPosition = position[0].split(',');

      for (let i = -1; i < 2; i++) {
        if (i !== 0) {
          const newPosition = `${Number(arrPosition[0]) + i},${Number(
            arrPosition[1]
          )}`;
          const newPosition2 = `${Number(arrPosition[0])},${
            Number(arrPosition[1]) + i
          }`;

          if (
            nodes[newPosition] !== undefined &&
            nodes[newPosition].visited === false
          ) {
            nodes[newPosition].visited = true;
            fire.push(newPosition);
            // console.log("nodes[newPosition", nodes[newPosition])
            nodes[newPosition].previousNode = string;
            queue.push({ [newPosition]: nodes[newPosition] });
          }
          if (
            nodes[newPosition2] !== undefined &&
            nodes[newPosition2].visited === false
          ) {
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

      return helper(queue.slice(), fire);
    };

    const array = helper(queue, fire);
    if (array === undefined) {
      alert('No path found. Try again.');
    }
    array.pop();
    const path1 = array.reverse();
    // console.log('path', path);
    // console.log('fire', fire);
    fire.pop();
    const finalFire = fire.slice();

    setTimeout(
      function () {
        console.log('settimeeout');
        return this.setState({
          onFire: [],
          path: path1,
        });
      }.bind(this),
      finalFire.length * 25
    );
    this.setState({ path: path, onFire: finalFire });
  }

  render() {
    const { board, onFire, path, headPosition, targetPosition } = this.state;
    const grid = [];
    for (const property in board) {
      let id = property;
      if (onFire.includes(property) && onFire.length !== 0) {
        grid.push(
          <button
            id={id}
            className={
              'onFire' + ' ' + 'anim-delay-' + onFire.indexOf(property)
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
      } else if (path.includes(property)) {
        grid.push(
          <button
            id={id}
            className={'path' + ' ' + 'anim-delay-2-' + path.indexOf(property)}
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
      } else if (property === headPosition) {
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
      } else if (property === targetPosition) {
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
      } else if (board[property].wall === true) {
        grid.push(
          <button
            id={id}
            className="wallGrid"
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
