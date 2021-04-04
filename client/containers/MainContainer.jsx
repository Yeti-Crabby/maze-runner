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
 // import from child components...
 
 // const initialState = {
 //   totalMarkets: 0,
 //   totalCards: 0,
 //   marketList: [],
 //   lastMarketId: 10000,
 //   newLocation: '',
 // };

 class MainContainer extends Component {
   constructor(props) {
     super(props);
     this.state = {
       board: {},
       mouseIsPressed: false
     };
   }

 // [{x:0, y:0}, {x:0, y:1}, {x:0, y:2} {x:1, y:0}, {x:1, y:1}, {x:1, y:2}]
 
  componentDidMount() {
    const board = {};
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board[`${i},${j}`] = {
          visited: false,
        }
      }
    }
     this.setState({board})
   }

   handleMouseDown(property) {
     const board = {...this.state.board}
     board[property].visited = true;
     board[property].wall = true;
     this.setState({board: board, mouseIsPressed: true});
     console.log("MOUSE DOWN")
     console.log(board)
   }
  // <button onmousedown={() => {handleMouseDown(x,y); onmouseover={() => {handleMouseEnter(x,y)}}}
  // onmouseup={()=>{handleMouseUp(x,y)}}
  //}><button/> 
  // <button2 onmousedown={() => {handleMouseDown(x,y); handleMouseEnter(x,y);}
  // onmouseup={()=>{handleMouseUp(x,y)}}
  //}><button/> 
   handleMouseEnter(property) {
     if(this.state.mouseIsPressed === false){
       return;
     }
    const board = {...this.state.board}
    board[property].visited = true;
    board[property].wall = true;
    this.setState({board: board});
    console.log(board)
    //  if (!this.state.mouseIsPressed) return;
    //  const board = this.state.board.slice();
    //  board[`${x},${y}`].visited = true;
    //  board[`${x},${y}`].wall = true;
    //  this.setState({board: board});
     console.log("HOVERING")
   }

   handleMouseUp() {
     this.setState({mouseIsPressed: false});
     console.log("MOUSE UP")
   }

   render() {
     const { board } = this.state;
     const grid = [];

     for(const property in board){
      let id = property;
      if(board[property].wall === true){
        grid.push(<button id={id} className = 'wallGrid' 
        onMouseDown={() => {this.handleMouseDown(property)}} 
        onMouseOver={() => {this.handleMouseEnter(property)}} 
        onMouseUp={() => {this.handleMouseUp(property)}}>
        </button>)
      }
      else {
      grid.push(<button id={id} className = 'regularGrid' 
      onMouseDown={() => {this.handleMouseDown(property)}} 
      onMouseOver={() => {this.handleMouseEnter(property)}} 
      onMouseUp={() => {this.handleMouseUp(property)}}>
      </button>)
      }
    }
     
 
    //  board.forEach(node => {
    //     let id = [node.x, node.y]; //[0,0]
    //     if(node.x === 0 && node.y === 0 || node.x === 9 && node.y === 9){
    //       grid.push(<button id={id} className = 'head' 
    //       onmousedown={() => {this.handleMouseDown(node.x,node.y)}} 
    //       onmouseover={() => {this.handleMouseEnter(node.x,node.y)}} 
    //       onmouseup={() => {this.handleMouseUp(node.x,node.y)}}></button>)
    //     }
    //      else {
    //        grid.push(<button id={id} className = 'regularGrid' 
    //        onmousedown={() => {this.handleMouseDown(node.x,node.y)}} 
    //        onmouseover={() => {this.handleMouseEnter(node.x,node.y)}} 
    //        onmouseup={() => {this.handleMouseUp(node.x,node.y)}}></button>)
         
    //   }
    // })
    //  console.log(grid)
     return(
       <div className='gridContainer'>
         {grid}
       </div>
     );
   };
};

//  const getNewBoardWithWallToggled = (board, x, y) => {
//    const newBoard = board.slice();
//    const node = newBoard[x][y];
//    const wallNode = {
//      ...node,
//      isWall: !node.isWall, //help
//    };
//    newBoard[x][y] = wallNode;
//    return newBoard;
//  };

 export default MainContainer;