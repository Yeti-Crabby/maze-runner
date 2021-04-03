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
       nodes: []
     };
   }
 
   componentDidMount(){
     const nodes = [];
     for(let i=0; i<10; i++){
       const currentRow = [];
       for(let j=0; j<10; j++){
         const thisNode = {
           x: j,
           y: i,
           // headNode: [0,0],
           // target: [9,9]
         }
         currentRow.push(thisNode);
       }
       nodes.push(currentRow)
     }
     // console.log(nodes);
     this.setState({nodes})
   }
 
   render() {
     const { nodes } = this.state;
     const grid = [];
 
     nodes.forEach(row => {
       for(let i=0; i<row.length; i++){
         let id = [row[i].x, row[i].y]
         if(row[i].x === 0 && row[i].y === 0 || row[i].x === 9 && row[i].y === 9){
           grid.push(<div className = 'gridColor' id={id}></div>)
         }
         else {
           grid.push(<div className = 'grid' id={id}></div>)
         }
         // console.log('id', id
       }
     })
     console.log(grid)
     return(
       <div className='gridContainer'>
         {grid}
       </div>
     );
   }
 
 }
 
 export default MainContainer;