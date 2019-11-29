import React from 'react';
import { Component } from 'react';
import './Santa.css';


class Santa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionX: 10,
            positionY: 0,
        }
    }

    moveSantaDown = () => {
        // Window (viewport) height: window.innerHeight
        if (this.state.positionY < window.innerHeight - 55) {
            var newY = this.state.positionY + 10;

            this.setState({
                positionY: newY
            });

            this.props.moveCallback(this.state.positionX, newY);
        }

    }

    moveSantaUp = () => {
        if (this.state.positionY > 0) {
            var newY = this.state.positionY - 10;

            this.setState({
                positionY: newY
            });

            this.props.moveCallback(this.state.positionX, newY);
        }

    }


    handleKeyPress = (event) => {
        //keycode up=38  down= 40 (console.log (event.keyCode))
        switch (event.keyCode) {
            case 38:
                this.moveSantaUp();
                break;
            case 40:
                this.moveSantaDown();
                break;
            default:
                break;
        }
    }



    // controling the keyboard keys:
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }



    render() {

        return (

            <div className='santa' style={{ top: this.state.positionY }}>
                <img className='santa' src='santa.gif' alt=''></img>
            </div>


        )
    }

}

export default Santa;