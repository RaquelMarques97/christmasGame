import React from 'react';
import { Component } from 'react';
import './Gift.css';

class Gift extends Component {
    constructor(props) {
        super(props);

        this.state = {
            giftPositionX: window.innerWidth,
            giftPositionY: Math.random() * (window.innerHeight - 60),
            speed: Math.random() * (20 - 10) + 10,
            intervalId: null
        }
    }

    componentDidMount() {
        var moveIntervalId = setInterval(this.moveGift, 100);

        this.setState({
            intervalId: moveIntervalId
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    /*---------------------------------------------*/


    moveGift = () => {
        const newX = this.state.giftPositionX - this.state.speed;

        // Verificar se o presente já saiu do ecrã à esquerda
        if (newX < -60) {
            // Remover gift
            clearInterval(this.state.intervalId);
            this.props.removeCallback(this.props.giftKey);
        } else {
            // Continua a andar
            this.setState({
                giftPositionX: newX
            });

            this.props.moveCallback(newX, this.state.giftPositionY, 60, 60, this.props.giftKey, 'gift');
        }
    }

    /*---------------------------------------------*/

    render() {
        return (
            <div className='gift' style={{ top: this.state.giftPositionY, left: this.state.giftPositionX }}>
                <img className='presents1' src='presents1.png' alt=''></img>
            </div>
        )
    }
}


export default Gift;  