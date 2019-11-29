import React from 'react';
import './GameOver.css';





function GameOver(props) {
    return (
        <div className='gameover'>
            <div className="snow foreground"></div>
            <div className="snow foreground layered"></div>
            <div className="snow middleground"></div>
            <div className="snow middleground layered"></div>
            <div className="snow background"></div>
            <div className="snow background layered"></div>
            <audio id="crash" src="/crash.mp3" autoPlay />
            <div>We Crashed AGAIN?</div>
            <div className='rudolf'>That's it Rudolf!!!! I'm bying robots!!!</div>
            <div className='gif'><img src='robots.gif' alt='' ></img> </div>

            <button className='tryagain' onClick={props.tryAgainCallback}>Try Again</button>
            <div className='contact'>
                <div className='raquel'><img src="raquel.png" width='100px' alt="" /></div>
                <img src="linkedin.png" alt="" height="20rem"></img>
                <div className='linkedin'><a href="https://www.linkedin.com/in/ana-raquel-marques-85162679/">Raquel Marques</a></div>

            </div>
        </div >
    );
}

export default GameOver;