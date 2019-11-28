import React from 'react';
import { Component } from 'react';
import './Game.css';
import Gift from './Gift.js';
import Santa from './Santa.js';
import Obstacle from './Obstacle.js';


class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            santaPositionX: 10,
            santaPositionY: 0,
            obstaclePositionY: 0,
            obstaclePositionX: 0,
            points: 0,
            record: localStorage.getItem('record') != null ? localStorage.getItem('record') : 0,
            giftsArray: [],
            obstacleArray: []
        }
    }

    componentDidMount() {
        setInterval(this.newGift, 2000);
        setInterval(this.newObstacle, 2500);
    }


    /*---------------------------------------------*/
    // adicionar dinamicamente itens ao giftsArray
    newGift = () => {
        var gifts = this.state.giftsArray;

        gifts.push(gifts.length); // ID do gift para depois poder remover

        this.setState({
            giftsArray: gifts
        });
    }

    //eliminar Gift quando toca no santa ou no final da window
    removeGift = (key) => {
        var newGiftsArray = this.state.giftsArray;

        newGiftsArray[key] = null;

        this.setState({
            giftsArray: newGiftsArray
        });
    }

    // adicionar dinamicamente itens ao obsctacleArray
    newObstacle = () => {
        var obstacles = this.state.obstacleArray;

        obstacles.push(obstacles.length); // ID do obstacle para depois poder remover

        this.setState({
            obstacleArray: obstacles
        });
    }

    //eliminar Obstacle quando toca no santa ou no final da window
    removeObstacle = (key) => {
        var newObstacleArray = this.state.obstacleArray;

        newObstacleArray[key] = null;

        this.setState({
            obstacleArray: newObstacleArray
        });
    }


    gameOver = () => {
        if (this.state.points > this.state.record) {
            localStorage.setItem('record', (this.state));//here I'm saving the record in local storage if the user makes more points than the record
        }
        this.props.gameOverCallback()
    }

    detectCollisionCallback = (x, y, w, h, key, type) => {
        // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        var santaX = this.state.santaPositionX;
        var santaY = this.state.santaPositionY;
        var santaW = 250;
        var santaH = 100;

        if (santaX < x + w &&
            santaX + santaW > x &&
            santaY < y + h &&
            santaY + santaH > y) {

            if (type === 'gift') {
                // Remover o presente porque foi apanhado
                this.removeGift(key);

                // Somar o número de presentes apanhados
                this.setState({
                    points: this.state.points + 1
                });
            } else {
                this.gameOver();

            }
        }
    }

    saveSantaPositionCallback = (x, y) => {
        this.setState({
            santaPositionX: x,
            santaPositionY: y
        });
    }

    /*---------------------------------------------*/

    render() {
        return (
            <div className='game-container'>
                {/*} <div className='start'>
                    Santa lost lots of presents along the way, help him to recover them!
                    <button className='play'>Play</button>
        </div>*/}
                <div className='score'>
                    <img className='presents1' src='presents1.png' alt=''></img>
                    <h1>{this.state.points} (record: {this.state.record})</h1>
                </div>
                <Santa moveCallback={this.saveSantaPositionCallback} />
                {
                    this.state.giftsArray.filter(gift => gift !== null).map((giftId) => (
                        <Gift key={giftId} giftKey={giftId} removeCallback={this.removeGift} moveCallback={this.detectCollisionCallback} />
                    ))
                }
                {this.state.obstacleArray.filter(obstacle => obstacle !== null).map((obstacleId) => (
                    <Obstacle key={obstacleId} obstacleKey={obstacleId} removeCallback={this.removeObstacle} moveCallback={this.detectCollisionCallback} />
                ))
                }
            </div>
        )
    }
}

export default Game;