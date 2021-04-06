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

// import from child components...

// const initialState = { // do we need this here?
// };

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

  // [{x:0, y:0}, {x:0, y:1}, {x:0, y:2} {x:1, y:0}, {x:1, y:1}, {x:1, y:2}]

  componentDidMount() {
    const board = {};
    this.state.onFire = [];
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 30; j++) {
        board[`${i},${j}`] = {
          visited: false,
        };
      }
    }
    this.setState({ board });
    console.log(this.state);
  }

  addWallMode() {
    this.setState(
      {
        entryNodeMode: false,
        targetNodeMode: false,
        wallMode: true,
      },
      function () {
        console.log('addwallmode', this.state);
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
        console.log('entrynodemode', this.state);
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
        console.log('targetnodemode', this.state);
      }
    );
  }

  handleMouseDown(property) {
    console.log(property);
    if (this.state.wallMode === false) {
      return;
    }
    const board = { ...this.state.board };
    board[property].visited = true;
    board[property].wall = true;
    this.setState({ board: board, mouseIsPressed: true });
    console.log('MOUSE DOWN');
    console.log(board);
  }
  // <button onmousedown={() => {handleMouseDown(x,y); onmouseover={() => {handleMouseEnter(x,y)}}}
  // onmouseup={()=>{handleMouseUp(x,y)}}
  //}><button/>
  // <button2 onmousedown={() => {handleMouseDown(x,y); handleMouseEnter(x,y);}
  // onmouseup={()=>{handleMouseUp(x,y)}}
  //}><button/>
  handleMouseEnter(property) {
    if (this.state.wallMode === false || this.state.mouseIsPressed === false) {
      // console.log('wtf this is false');
      return;
    }
    const board = { ...this.state.board };
    board[property].visited = true;
    board[property].wall = true;
    this.setState({ board: board });
    // console.log(board)
    //  if (!this.state.mouseIsPressed) return;
    //  const board = this.state.board.slice();
    //  board[`${x},${y}`].visited = true;
    //  board[`${x},${y}`].wall = true;
    //  this.setState({board: board});
    //  console.log("HOVERING")kjhkjhkjhkj
  }

  handleMouseUp() {
    console.log('mouseUP');
    if (this.state.wallMode === false) return;
    this.setState({ mouseIsPressed: false });
    // console.log("MOUSE UP")
  }

  handleHead(coordinates) {
    if (this.state.entryNodeMode === false) return;
    this.setState({ headPosition: coordinates });
  }

  handleTarget(coordinates) {
    //coordinates = '0,2'
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
    /////
    if (this.state.path.length !== 0) {
      const board = Object.assign(this.state.board);
      console.log('1', JSON.stringify(board));
      for (const property in board) {
        // console.log(this.state.board[property])
        board[property].visited = false;
        if (board[property].previousNode) delete board[property].previousNode;
      }
      console.log('2', JSON.stringify(board));
      this.setState({
        board: board,
        path: [],
      });
    }

    const nodes = Object.assign(this.state.board);
    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < 10; j++) {
    //     nodes[`${i},${j}`] = {
    //       visited: false,
    //     }
    //   }
    // }
    const head = this.state.headPosition;
    const target = this.state.targetPosition;
    // const target = nodes['2,1']

    nodes[head].visited = true;
    nodes[head].previousNode = null;
    // nodes['0,0'].head = true;
    // nodes['2,1'].target = true;
    const queue = [{ [head]: nodes[head] }];
    const fire = this.state.onFire.slice();

    // // console.log(nodes)

    function helper(queue, fire) {
      // console.log('base queue every time helper is called', JSON.stringify(queue))
      console.log('fireeee', fire);
      for (let i = 0; i < queue.length; i++) {
        if (Object.keys(queue[i]) == target) {
          const path = [];
          // console.log('queuei', JSON.parse(JSON.stringify(queue[i])));
          let previousNode = queue[i][target].previousNode;
          //
          // console.log('previousNode', previousNode)
          // console.log('previousNode', Object.keys(previousNode))
          while (previousNode !== null) {
            // let key = Object.keys(previousNode);
            path.push(previousNode);
            previousNode = nodes[previousNode].previousNode;
          }
          // console.log('inside base case', JSON.stringify(nodes));
          console.log('path1', path);
          return path;
        }
      }
      // queue -------> [{'0,0': {visited: true}}]
      const position = Object.keys(queue[0]);
      // position = ['0,0']
      let string = position[0];
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
            // console.log("WHY THE FUCK", nodes[newPosition])

            nodes[newPosition].previousNode = string;
            // nodes[newPosition].previousNode = {[position]: nodes[position]};
            queue.push({ [newPosition]: nodes[newPosition] });
          }
          if (
            nodes[newPosition2] !== undefined &&
            nodes[newPosition2].visited === false
          ) {
            nodes[newPosition2].visited = true;
            fire.push(newPosition2);
            // nodes[newPosition2].previousNode = {[position]: nodes[position]};
            nodes[newPosition2].previousNode = string;
            queue.push({ [newPosition2]: nodes[newPosition2] });
          }
        }
      }
      queue.shift();
      console.log('queue', queue);
      if (queue.length === 0) {
        return undefined;
      } // <--- removes first element from array
      // console.log('queueEEE', JSON.stringify(queue))
      // console.log('NODEEEEEE', JSON.stringify(nodes))
      return helper(queue.slice(), fire);
    }

    const array = helper(queue, fire);
    if (array === undefined) {
      alert('No path found. Try again.');
    }
    array.pop();
    const path = array.reverse();
    console.log('path', path);
    console.log('fire', fire);
    // console.log(helper(queue))
    // console.log('2', path)
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
      let id = property;

      if (
        this.state.onFire.includes(property) &&
        this.state.onFire.length !== 0
      ) {
        grid.push(
          <button
            id={id}
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
          ></button>
        );
        // }
      }
      // if(this.state.path.includes(property))
      // }
      else if (this.state.path.includes(property)) {
        grid.push(
          <button
            id={id}
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
