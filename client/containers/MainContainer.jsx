/**
 * ************************************
 *
 * @module  MainContainer
 * @author
 * @date
 * @description stateful component that renders TotalsDisplay and MarketsContainer
 *
 * ************************************
 */

import React, { Component } from 'react';
import Navbar from '../Navbar.jsx';
import '../styles.scss';

class MainContainer extends Component {
  constructor(props) {
    // path refers to nodes of shortest path
    // onFire refers to nodes propagated from algo search
    super(props);
    this.state = {
      board: {},
      mouseIsPressed: false,
      entryNodeMode: false,
      targetNodeMode: false,
      wallMode: false,
      headPosition: '6,11',
      targetPosition: '6,18',
      path: [],
      onFire: [],
    };
    this.addWallMode = this.addWallMode.bind(this);
    this.entryNodeMode = this.entryNodeMode.bind(this);
    this.targetNodeMode = this.targetNodeMode.bind(this);
    this.algorithm = this.algorithm.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
  }

  // creation of available coordinates
  componentDidMount() {
    const board = {};
    this.setState({onFire: []});
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 30; j++) {
        board[`${i},${j}`] = {
          visited: false,
        };
      }
    }
    this.setState({ board });
  }

  // logic to be in add wall mode
  addWallMode() {
    this.setState(
      {
        entryNodeMode: false,
        targetNodeMode: false,
        wallMode: true,
      }
    );
  }

  // logic to be in add head node
  entryNodeMode() {
    this.setState(
      {
        entryNodeMode: true,
        targetNodeMode: false,
        wallMode: false,
      }
    );
  }

  // logic to be in add tail node
  targetNodeMode() {
    this.setState(
      {
        entryNodeMode: false,
        targetNodeMode: true,
        wallMode: false,
      }
    );
  }

  // logic to add walls when mouse button down
  handleMouseDown(property) {
    if (this.state.wallMode === false) {
      return;
    }
    const board = { ...this.state.board };
    board[property].visited = true;
    board[property].wall = true;
    this.setState({ board: board, mouseIsPressed: true });
  }

  // logic to paint walls by hovering cursor on grid
  handleMouseEnter(property) {
    if (this.state.wallMode === false || this.state.mouseIsPressed === false) {
      return;
    }
    const board = { ...this.state.board };
    board[property].visited = true;
    board[property].wall = true;
    this.setState({ board: board });
  }

  // logic to stop painting walls when mouse button is released
  handleMouseUp() {
    if (this.state.wallMode === false) return;
    this.setState({ mouseIsPressed: false });
  }

  // adding a head node
  handleHead(coordinates) {
    if (this.state.entryNodeMode === false) return;
    this.setState({ headPosition: coordinates });
  }

  // adding a tail node
  handleTarget(coordinates) {
    if (this.state.targetNodeMode === false) return;
    this.setState({ targetPosition: coordinates });
  }

  // logic to remove all walls/paths and reset head/tail node
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
      headPosition: '6,11',
      targetPosition: '6,18',
      path: [],
      onFire: [],
    });
  }

  // algo to find shortest path between head and tail node
  algorithm() {

    if (this.state.path.length !== 0) {
      const board = Object.assign(this.state.board);
      for (const property in board) {
        board[property].visited = false;
        if (board[property].previousNode) delete board[property].previousNode;
      }
      this.setState({
        board: board,
        path: [],
      });
    }

    const nodes = Object.assign(this.state.board);
    const head = this.state.headPosition;
    const target = this.state.targetPosition;

    nodes[head].visited = true;
    nodes[head].previousNode = null;
    const queue = [{ [head]: nodes[head] }];
    const fire = this.state.onFire.slice();

    function helper(queue, fire) {
      for (let i = 0; i < queue.length; i++) {
        if (Object.keys(queue[i]) == target) {
          const path = [];
          let previousNode = queue[i][target].previousNode;
          while (previousNode !== null) {
            path.push(previousNode);
            previousNode = nodes[previousNode].previousNode;
          }
          return path;
        }
      }
      // queue -------> [{'0,0': {visited: true}}]
      const position = Object.keys(queue[0]);
      // position = ['0,0']
      const string = position[0];
      // string -> '0,0'
      const arrPosition = position[0].split(',');
      // 'arrPosition -> ['0', '0']
      // console.log('arrPosition', JSON.stringify(arrPosition))
      //want to check [-1,0] [1,0] [0,1] [0,-1]
      // i = -1 and i = 1
      for (let i = -1; i < 2; i++) {
        if (i !== 0) {
          const newPosition = `${Number(arrPosition[0]) + i},${Number(
            arrPosition[1]
          )}`; // <--- '-1,0'
          const newPosition2 = `${Number(arrPosition[0])},${
            Number(arrPosition[1]) + i
          }`; // <--- '0,-1'
          // console.log('new', 'i', i, newPosition, newPosition2)
          // console.log('check','i', i, nodes[newPosition])
          if (
            nodes[newPosition] !== undefined &&
            nodes[newPosition].visited === false
          ) {
            nodes[newPosition].visited = true;
            fire.push(newPosition);
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
      if (queue.length === 0) {
        return undefined;
      }
      return helper(queue.slice(), fire);
    }

    const array = helper(queue, fire);
    if (array === undefined) {
      alert('No path found. Try again.');
    }
    array.pop();
    const path = array.reverse();
    fire.pop();
    const finalFire = fire.slice();

    setTimeout(
      function () {
        console.log('settimeeout');
        return this.setState({
          onFire: [],
          path: path,
        });
      }.bind(this),
      finalFire.length * 25
    );
    this.setState({ path: path, onFire: finalFire });
  }

  render() {
    const { board } = this.state;
    const grid = [];

    for (const property in board) {
      const id = property;

      // populating grid with propagation nodes from algo search
      if (this.state.onFire.includes(property) && this.state.onFire.length !== 0) {
        grid.push(
          <button
            id={id}
            key={id}
            className={
              'onFire' +
              ' ' +
              'anim-delay-' +
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
            onFocus={() => void 0}
          ></button>
        );
      }
      // populating grid with nodes of shortest path
      else if (this.state.path.includes(property)) {
        grid.push(
          <button
            id={id}
            key={id}
            className={
              'path' + ' ' + 'anim-delay-2-' + this.state.path.indexOf(property)
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
            onFocus={() => void 0}
          ></button>
        );
      // populating grid with head node
      } else if (property === this.state.headPosition) {
        grid.push(
          <button
            id={id}
            key={id}
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
            onFocus={() => void 0}
          ></button>
        );
      // populating grid with tail node
      } else if (property === this.state.targetPosition) {
        grid.push(
          <button
            id={id}
            key={id}
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
            onFocus={() => void 0}
          ></button>
        );
      // populating grid with wall nodes 
      } else if (board[property].wall === true) {
        grid.push(
          <button
            id={id}
            key={id}
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
            onFocus={() => void 0}
          ></button>
        );
      // pushing all remaining nodes to the grid
      } else {
        grid.push(
          <button
            id={id}
            key={id}
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
            onFocus={() => void 0}
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
