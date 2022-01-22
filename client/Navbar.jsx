import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppBar position="static" className="navbarContainer">
          <Toolbar>
            <Button className = 'navbarButton' onClick={this.props.entryNodeMode} id="startNode" color="inherit">Set Start Node</Button>
            <Button className = 'navbarButton' onClick={this.props.targetNodeMode} id="targetNode" color="inherit">Set Target Node</Button>
            <Button className = 'navbarButton' onClick={this.props.addWallMode} id="wallNode" color="inherit">Add Walls</Button>
            <Button className = 'navbarButton' onClick={this.props.clearBoard} id="clearBoard" color="inherit">Clear Board</Button>
            <Button className = 'navbarButton' onClick={this.props.runAlgo} id="algo" color="inherit">Run Algorithm</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar; 