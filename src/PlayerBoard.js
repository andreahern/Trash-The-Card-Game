import React, { Component } from 'react'

class PlayerBoard extends Component {
    handleClick = (player, hand, index) => {
        if(this.getValue(hand) === index + 1 || hand.charAt(0) === 'J') {
            this.props.handleClick(player, hand, index)
        }
    }

    getValue = (card) => {
        let num = ''
        if(card[0] === 'A') return 1
        for(let i = 0; i < card.length; i++) {
            if(card[i] >= '0' && card[i] <= '9') num = num.concat(card[i])
        } 
        return parseInt(num)
    }


    render() {
        const positions = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', "Queen", "King"]
        return (
            <div className="Board">
                <div className='BoardMenu'>
                <div className='Hand'>{this.props.hand}</div>
                    <h1>Player {this.props.currentPlayer} is playing</h1>
                </div>                
                <div className="Series">
                    {this.props.cards.map((card, index) => {
                        return <div className='Card' value={card} key={index} onClick={() => this.handleClick(this.props.currentPlayer, this.props.hand, index)}>{this.props.flipped[index] === 1 ? card : (positions[index])}
                        </div>
                    })} 
                </div>
            </div>
        )
    }
}

export default PlayerBoard