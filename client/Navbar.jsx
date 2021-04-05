import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 2,
//   },
// }));

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const classes = useStyles();
    return (
      <div 
      // className={classes.root}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" 
            // className={classes.title}
            >
              Path Finder
            </Typography>
            <Button id="startNode" color="inherit">Start Node</Button>
            <Button id="targetNode" color="inherit">Target Node</Button>
            <Button onClick={this.props.addWallMode} id="wallNode" color="inherit">Add Walls</Button>
            <Button id="clearBoard" color="inherit">Clear Board</Button>
            <Button id="runAlgo" color="inherit">Run Algo</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar; 


// from kevin's 
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 2,
//   },
// }));
// export default function Navbar() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             Path Finder
//           </Typography>
//           <Button id="startNode" color="inherit">Start Node</Button>
//           <Button id="targetNode" color="inherit">Target Node</Button>          
//           <Button id="wallNode" color="inherit">Add Wall</Button>
//           <Button id="clearBoard" color="inherit">Clear Board</Button>
//           <Button id="runAlgo" color="inherit">Run Algo</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
