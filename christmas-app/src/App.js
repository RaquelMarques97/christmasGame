import React from 'react';
import './App.css';
import { Component } from 'react';
import Game from './Game.js'
import GameOver from './GameOver.js';
import Home from './Homepage.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'home'
    }
  }

  onGameOver = () => {
    this.setState({
      currentPage: 'gameOver'
    })
  }

  onPlay = () => {
    this.setState({
      currentPage: 'play'
    })
  }

  onTryAgain = () => {
    this.setState({
      currentPage: 'play'
    })
  }

  render() {
    switch (this.state.currentPage) {
      case 'home':
        return (
          <Home playCallback={this.onPlay} />
        );

      case 'play':
        return (
          <Game gameOverCallback={this.onGameOver} />
        );

      case 'gameOver':
        return (
          <GameOver tryAgainCallback={this.onTryAgain} />
        );

      default:
        break;
    }
  }

}

export default App;
