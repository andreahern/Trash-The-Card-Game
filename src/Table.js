import React, { Component } from 'react'
import BoardController from './BoardController.js';
import EndRound from './EndRound.js'
import EndGame from './EndGame.js'
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: this.shuffle(['AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD',
            'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS']),
            removedCard: '',
            trash: [],
            currentPlayer: 1,
            gameInSession: false,
            playerPlaying: false,
            player1Size: 10,
            player2Size: 10,
            player1Cards: [],
            player2Cards: [],
            playerWon: 0
        }
        
   }

    drawCards = () => {
        let deck = this.state.deck
        if(deck.length === 0) return
        let topCard = deck.shift()
        this.setState({
            deck: deck,
            removedCard: topCard,
            playerPlaying: true

        })
    }

    takeTrash = () => {
        let trash = this.state.trash
        let topDiscard = trash.pop()
        this.setState({
            trash: trash,
            removedCard: topDiscard,
            playerPlaying: true
        })
    }

    shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    } 

    resetGame = () => {
        let deck = this.state.deck
        let trash = this.state.trash
        let player1Cards = this.state.player1Cards
        let player2Cards = this.state.player2Cards
        deck = deck.concat(trash)
        deck = deck.concat(player1Cards)
        deck = deck.concat(player2Cards)
        if(this.state.removedCard.length !== 0) deck = deck.concat(this.state.removedCard)
        trash = []
        this.shuffle(deck)  
        this.setState({
            deck: deck,
            removedCard: '',
            trash: trash,
            currentPlayer: 1,
            gameInSession: false,
            playerPlaying: false,
            player1Cards: [],
            player2Cards:[],
            playerWon: 0
        })
    }

    initialize = () => {
        this.setState({
            deck: this.shuffle(['AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD',
            'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
            'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS']),
            removedCard: '',
            trash: [],
            currentPlayer: 1,
            gameInSession: false,
            playerPlaying: false,
            player1Size: 10,
            player2Size: 10,
            player1Cards: [],
            player2Cards: [],
            playerWon: 0
        })      
    }

    dealCards = () => {
        let cardsLeftForPlayer1 = this.state.player1Size
        let cardsLeftForPlayer2 = this.state.player2Size
        let player1Cards = this.state.player1Cards
        let player2Cards = this.state.player2Cards
        let deck = this.state.deck
        let max = Math.max(cardsLeftForPlayer1, cardsLeftForPlayer2)

        for(let i = 0; i < max; i++) {
            if(cardsLeftForPlayer1 > 0) {
                player1Cards[i] = deck.shift()
                cardsLeftForPlayer1--
            } 
            if(cardsLeftForPlayer2 > 0) {
                player2Cards[i] = deck.shift()
                cardsLeftForPlayer2--
            }
        }

        this.setState({
            deck: deck,
            player1Cards: player1Cards,
            player2Cards: player2Cards,
            gameInSession: true
        })
    }

    endTurn = () => {
        let previousPlayer = this.state.currentPlayer
        let trash = this.state.trash
        trash = trash.concat(this.state.removedCard)
        this.setState({
            removedCard: '',
            trash: trash,
            currentPlayer: previousPlayer * -1,
            playerPlaying: false
        })
    }

    swap = (player, hand, index) => {
        if(player === 1) {
            let player1Cards = this.state.player1Cards
            let newHand = player1Cards[index]
            player1Cards[index] = hand
            this.setState({
                player1Cards: player1Cards,
                removedCard: newHand
            })
        } else {
            let player2Cards = this.state.player2Cards
            let newHand = player2Cards[index]
            player2Cards[index] = hand
            this.setState({
                player2Cards: player2Cards,
                removedCard: newHand
            })            
        }
    }

    roundWon = (playerWon) => {
        if(playerWon === 1) {
            let player1Size = this.state.player1Size
            this.setState({
                player1Size: player1Size-1,
                playerWon: 1
            })
        } else {
            let player2Size = this.state.player2Size
            this.setState({
                player2Size: player2Size-1,
                playerWon: 2
            })            
        }
    }

    render() {
        if(this.state.player1Size === 0 || this.state.player2Size === 0) return <EndGame playerWon={this.state.playerWon} fullReset={() => this.initialize()} />
        else if(this.state.playerWon !== 0) return <EndRound playerWon={this.state.playerWon} reset={() => this.resetGame()} />

        return (
            <div>
                <div className='Table'>
        <div className='Card' style={{marginRight: '150px'}}>Deck {this.state.deck.length}</div>
                    <div className='Card'>{this.state.trash.length > 0 ? [this.state.trash.slice(-1)] : <p>Trash</p>}</div>                    
                </div>

                <div className="Options">
                    <button onClick={() => this.dealCards()} disabled={this.state.gameInSession}>Deal</button>
                    <button onClick={() => this.drawCards()} disabled={!this.state.gameInSession || this.state.playerPlaying}>Draw</button>
                    <button onClick={() => this.takeTrash()} disabled={!this.state.gameInSession || this.state.playerPlaying || this.state.trash.length === 0}>Take Trash</button>
                    <button onClick={() => this.endTurn()} disabled={!this.state.gameInSession || !this.state.playerPlaying}>End Turn</button>
                    <button onClick={() => this.resetGame()} disabled={!this.state.gameInSession}>Reset</button>

                </div>
                <div>
                    {this.state.gameInSession ? <BoardController player = {this.state.currentPlayer}
                     player1Cards={this.state.player1Cards} 
                     player2Cards={this.state.player2Cards} 
                     player1Size={this.state.player1Size}
                     player2Size={this.state.player2Size}
                     hand={this.state.removedCard} 
                     handleSwap={this.swap} 
                     callWin={this.roundWon}
                     /> : null}
                </div>
            </div>
        );
    }
}

export default Table;

