import React, { Component } from 'react'

class EndRound extends Component {
    render() {
        return (
            <div>
                <h1>Player {this.props.playerWon} has Won This Round!</h1>
                <a href="#" onClick={() => this.props.reset()}>Play Next Round</a>
            </div>
        )
    }
}

export default EndRound