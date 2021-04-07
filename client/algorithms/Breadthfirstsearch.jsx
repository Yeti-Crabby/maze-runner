// react hook? 
// turn it into a react component at all?
Algorithm() {
    if (this.state.path.length !== 0) {
      const board = Object.assign(this.state.board);
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

    const nodes = Object.assign(this.state.board);
    const head = this.state.headPosition;
    const target = this.state.targetPosition;
    nodes[head].visited = true;
    nodes[head].previousNode = null;

    const queue = [{ [head]: nodes[head] }];
    const fire = this.state.onFire.slice();

    function helper(queue, fire) {
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
            // nodes[newPosition2].previousNode = {[position]: nodes[position]};
            nodes[newPosition2].previousNode = string;
            queue.push({ [newPosition2]: nodes[newPosition2] });
          }
        }
      }
      queue.shift();
      // console.log('queue', queue);
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
    // console.log('path', path);
    // console.log('fire', fire);
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
              'onFire' + ' ' + 'anim-delay-' + this.state.onFire.indexOf(property)
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
      }

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