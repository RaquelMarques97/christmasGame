import React from 'react';
import { Component } from 'react';
import './Game.css';
import Gift from './Gift.js';
import Santa from './Santa.js';
import Obstacle from './Obstacle.js';


class Game extends Component {
    constructor(props) {
        super(props);

        // Ler record do local storage
        var record = localStorage.getItem('record')

        this.state = {
            santaPositionX: 10,
            santaPositionY: 0,
            points: 0,
            record: record,
            giftsArray: [],
            obstacleArray: [],
            countdown: 3,
            giftIntervalId: null,
            obstacleIntervalId: null,
            countdownIntervalId: null
        }

    }

    componentDidMount() {
        var giftInterval = setInterval(this.newGift, 2000);
        var obstacleInterval = setInterval(this.newObstacle, 2500);
        var countdownInterval = setInterval(this.countdown, 500);

        this.setState({
            giftIntervalId: giftInterval,
            obstacleIntervalId: obstacleInterval,
            countdownIntervalId: countdownInterval
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.giftIntervalId);
        clearInterval(this.state.obstacleIntervalId);
    }

    /*---------------------------------------------*/

    countdown = () => {
        var newCountdown = this.state.countdown - 1;
        this.setState({ countdown: newCountdown })

        if (newCountdown === 0) {
            clearInterval(this.state.countdownIntervalId);
        }
    }

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

    // adicionar dinamicamente itens ao obsctacleArraykey
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
            localStorage.setItem('record', this.state.points);//here I'm saving the record in local storage if the user makes more points than the record
        }
        this.props.gameOverCallback()
    }

    detectCollisionCallback = (x, y, w, h, key, type) => {
        // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        var santaX = this.state.santaPositionX;
        var santaY = this.state.santaPositionY;
        var santaW = 300;
        var santaH = 120;

        if (santaX < x + w &&
            santaX + santaW > x &&
            santaY < y + h &&
            santaY + santaH > y) {

            switch (type) {
                case 'star':
                    this.setState({
                        points: this.state.points + 10
                    });
                    this.removeGift(key);
                    document.getElementById("hohoho").play();
                    break;

                case 'gift':
                    this.setState({
                        points: this.state.points + 1
                    });
                    this.removeGift(key);
                    document.getElementById("hohoho").play();
                    break;

                default:
                    this.gameOver();
                    break;
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
        const { countdown } = this.state;

        if (countdown > 0) {
            return (
                <div className='countdown'>
                    {countdown}
                </div>
            )

        } else {

            return (
                <div className='game-container'>
                    <div className="stars"></div>
                    <div className="twinkling"></div>
                    <div className="clouds"></div>

                    <audio id="background-music" src="./background.mp3" autoPlay loop />

                    <div className='score'>
                        <img className='presents1' src='presents-1.png' alt=''></img>
                        <p>{this.state.points} (record: {this.state.record})</p>
                    </div>
                    <Santa moveCallback={this.saveSantaPositionCallback} />
                    <audio id="hohoho" src="./hohoho.wav" />
                    {
                        this.state.giftsArray.filter(gift => gift !== null).map((giftId) => (
                            <Gift key={giftId} giftKey={giftId} removeCallback={this.removeGift} moveCallback={this.detectCollisionCallback} />
                        ))
                    }
                    {
                        this.state.obstacleArray.filter(obstacle => obstacle !== null).map((obstacleId) => (
                            <Obstacle key={obstacleId} obstacleKey={obstacleId} removeCallback={this.removeObstacle} moveCallback={this.detectCollisionCallback} />
                        ))
                    }
                </div>
            )
        }
    }
}

export default Game;