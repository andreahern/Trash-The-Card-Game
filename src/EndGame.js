import React, { Component } from 'react'

class EndGame extends Component {
    render() {
        return (
            <div>
                <h1>Player {this.props.playerWon} has Won The Game!</h1>
                <a href="#" onClick={() => this.props.fullReset()}>Play New Game</a>
            </div>
        )
    }
}

export default EndGame