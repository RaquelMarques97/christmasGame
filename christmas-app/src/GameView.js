import React from 'react';
import { Component } from 'react';
import Game from './Game.js'
import GameOver from './GameOver.js';




class GameView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHomePage: true,
            isGameOver: false
        }
    }

    onGameOver = () => {
        this.setState({
            isGameOver: true
        })
    }

    render() {

        if (this.state.isGameOver) {
            return (

                <div>
                    <GameOver />
                </div>
            );
        } else {
            return (


                <Game gameOverCallback={this.onGameOver} />
            );

        }
    }

}

export default GameView;
