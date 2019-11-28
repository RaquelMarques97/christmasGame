import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
    return (

        <div className='start'>
            Santa lost lots of presents along the way, help him to recover them!
        <div> <NavLink exact to="/GameView" className='play'>Play</NavLink></div>
        </div>
    );
}

export default Home;
