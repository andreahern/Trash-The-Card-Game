import React, { Component } from 'react'
import PlayerBoard from './PlayerBoard'

class BoardController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            player1Flipped: new Array(props.player1Size).fill(0),
            player2Flipped: new Array(props.player2Size).fill(0) 
        }
    }

    flippedAll = () => {
        if(this.props.player === 1 && this.state.player1Flipped.every( (val, i, arr) => val === 1 )) {
            this.props.callWin(1)
        } else if(this.props.player === -1 && this.state.player2Flipped.every( (val, i, arr) => val === 1 )) {
            this.props.callWin(2)
        }
    }


    clickHandler = (player, hand, index) => {
        this.props.handleSwap(player, hand, index)
        if(player === 1) {
            let player1Flipped = this.state.player1Flipped
            player1Flipped[index] = 1
            this.setState=({
                player1Flipped: player1Flipped
            })
        } else {
            let player2Flipped = this.state.player2Flipped
            player2Flipped[index] = 1
            this.setState=({
                player2Flipped: player2Flipped
            })            
        }
        this.flippedAll()
    }

    render() {
        return (
            <div>
                {this.props.player === 1 ? <PlayerBoard cards={this.props.player1Cards} currentPlayer={1} hand={this.props.hand} flipped={this.state.player1Flipped} handleClick={this.clickHandler}/> : <PlayerBoard cards={this.props.player2Cards} currentPlayer={2} hand={this.props.hand} flipped={this.state.player2Flipped} handleClick={this.clickHandler}/>}
            </div>
        )
    }
}

export default BoardController