import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './Words.js';



class Hangman extends Component {

  static defaultProps = {
    maksimalSalah: 5,
    icon: ["12345", "1234", "123", "12", "1", ""]
  }

  constructor(props) {
    super(props);
    this.state = {
      skor: 0,
      salah: 0,
      guessed: new Set([]),
      jawaban: randomWord()
    }
  }

  handleGuess = e => {
    let letter = e.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      salah: st.salah + (st.jawaban.includes(letter) ? 0 : 1)
    }));
  }

  guessedWord() {
    return this.state.jawaban.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button
        className='btn btn-lg btn-primary m-2'
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  generateNyawa() {
    return this.props.icon[this.state.salah].split("").map(length => (
      <i className="icofont icofont-heart-alt mr-1 text-danger" id={length}></i>
    ));      
  }

  resetButton = () => {
    this.setState({
      skor:0,
      salah: 0,
      guessed: new Set([]),
      jawaban: randomWord()
    });
  }

  render() {
    const Kalah = this.state.salah >= this.props.maksimalSalah;
    const Menang = this.guessedWord().join("") === this.state.jawaban;
    
    let gameStat = this.generateButtons();
    let gameNyawa = this.generateNyawa();

    if (Menang) {
      this.setState({
        skor: this.state.skor + 1,
        salah: 0,
        guessed: new Set([]),
        jawaban: randomWord()
    });
      
    }

    if (Kalah) {
      gameStat = "Maaf Anda Kalah!!!"
    }

    return (
      <div className="Hangman container">
        <h1 className='text-center'>HANGMAN</h1> <br/>
         <div className="float-left kesalahan">Skor Anda: {this.state.skor} 
         </div> 
        <div className="float-right kesalahan">
          {gameNyawa}  
        </div>
        <div className="text-center"><br/><br/>
          <p>Tebak Bahasa Pemrograman : </p>
          <p className='mt-5 jawaban'>
            {!Kalah ? this.guessedWord() : this.state.jawaban}
          </p>
          <p>{gameStat}</p>
          <button className='btn btn-info' onClick={this.resetButton}>Reset</button>
        </div>
      </div>
    )
  }
}

export default Hangman;