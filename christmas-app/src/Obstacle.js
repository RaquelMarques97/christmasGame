import React from 'react';
import { Component } from 'react';
import './Obstacle.css';

class Obstacle extends Component {
    constructor(props) {
        super(props);

        var id = Math.round(Math.random() * 2);
        var obstacleImage = `obstacles-${id}.png`;

        this.state = {
            obstaclePositionX: window.innerWidth,
            obstaclePositionY: Math.random() * (window.innerHeight - 60),
            speed: Math.random() * (20 - 10) + 10,
            intervalId: null,
            image: obstacleImage
        }
    }

    componentDidMount() {
        var moveIntervalId = setInterval(this.moveObstacle, 100);

        this.setState({
            intervalId: moveIntervalId
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    /*---------------------------------------------*/


    moveObstacle = () => {
        const newX = this.state.obstaclePositionX - this.state.speed;

        // Verificar se o obstaculo já saiu do ecrã à esquerda
        if (newX < -60) {
            // Remover obstaculo
            clearInterval(this.state.intervalId);
            this.props.removeCallback(this.props.obstacleKey);
        } else {
            // Continua a andar
            this.setState({
                obstaclePositionX: newX
            });

            this.props.moveCallback(newX, this.state.obstaclePositionY, 60, 60, this.props.obstacleKey, 'obstacle');
        }
    }

    /*---------------------------------------------*/

    render() {
        return (
            <div className='obstacle' style={{ top: this.state.obstaclePositionY, left: this.state.obstaclePositionX }}>
                <img className='alien' src={this.state.image} alt=''></img>
            </div>
        )
    }
}



export default Obstacle;  