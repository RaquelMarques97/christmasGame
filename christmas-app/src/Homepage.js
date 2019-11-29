import React from 'react';
import './HomePage.css';


function Home(props) {

    return (
        <div className='intro'>
            <div className='story'>
                <h1 className='name'>Clumsy Santa </h1>

                <p>Once upon a time..."somehow"...</p>
                <p>Santa got distracted and lost a lot of presents </p>
                <p>along the way...</p>
                <img className='inlove' src='inlove.gif' alt=''></img>
            </div>
            <div className='start'>
                <p>Will you help him to recover them?</p>
                <div>
                    <button className='go' onClick={props.playCallback}>Play</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
