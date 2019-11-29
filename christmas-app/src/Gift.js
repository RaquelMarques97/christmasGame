import React from 'react';
import { Component } from 'react';
import './Gift.css';

class Gift extends Component {
    constructor(props) {
        super(props);

        var giftType = Math.random() > 0.8 ? 'star' : 'gift';
        var giftImage;

        if (giftType === 'gift') {
            var id = Math.round(Math.random() * 5);

            giftImage = `presents-${id}.png`;
        }



        this.state = {
            giftPositionX: window.innerWidth,
            giftPositionY: Math.random() * (window.innerHeight - 60),
            speed: Math.random() * (20 - 10) + 10,
            intervalId: null,
            type: giftType,
            image: giftImage
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

            this.props.moveCallback(newX, this.state.giftPositionY, 60, 60, this.props.giftKey, this.state.type);
        }
    }

    /*---------------------------------------------*/

    render() {
        switch (this.state.type) {
            case 'star':
                return (
                    <div className='gift' style={{ top: this.state.giftPositionY, left: this.state.giftPositionX }}>
                        <img className='presents1' src='star.png' alt=''></img>
                    </div>
                );

            case 'gift':
                return (
                    <div className='gift' style={{ top: this.state.giftPositionY, left: this.state.giftPositionX }}>
                        <img className='presents1' src={this.state.image} alt=''></img>
                    </div>
                );
            default:
                break;
        }
    }
}


export default Gift;  