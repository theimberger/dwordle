import React, { Component, useState } from 'react';
import Guesses from './Guesses';
import LetterInputs from './LetterInputs';
import { gradeGuess } from '../../lib/grade-guess';
import { fiveLetterWords } from '../../lib/dictionaries';

const example = 'lemon';
const emptyList = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
]

const alphabet = [
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '⌫',
  'z', 'x', 'c', 'v', 'b', 'n', 'm', '⏎',
];

class Main extends Component {
  state = {
    guessList: emptyList,
    guessNumber: 0,
    letterColors: {},
    invalidWord: false,
  }

  handleGuessSubmit = () => {
    const { guessList, guessNumber, letterColors } = this.state;
    const guessWord = guessList[guessNumber].join('');
    if (!fiveLetterWords.has(guessWord)) {
      this.setState({ invalidWord: true });
      return;
    }
    const updates = gradeGuess(guessWord, example);
    const newColors = { ...letterColors };
    guessList[guessNumber].forEach((letter, index) => {
      const colorUpdate = updates[index];
      const currentColor = newColors[letter];
      if (!currentColor || currentColor === 'grey') newColors[letter] = colorUpdate;
      else if (colorUpdate === 'green') newColors[letter] = 'green';
    });
    this.setState({ letterColors: newColors, guessNumber: guessNumber + 1 })
  }

  handleLetterInput = (l) => () => {
    const { guessList, guessNumber } = this.state;
    const newList = [ ...guessList ];
    let letterIndex = guessList[guessNumber].findIndex(lett => !lett)
    const isLast = letterIndex === -1;
    
    if (l === '⌫') {
      letterIndex = isLast ? 4 : letterIndex - 1;
      letterIndex = letterIndex > 0 ? letterIndex : 0;
      newList[guessNumber][letterIndex] = '';
    } else if (l === '⏎') {
      if (isLast) {
        this.handleGuessSubmit();
      }
      return;
    } else if (!isLast) {
      newList[guessNumber][letterIndex] = l;
    }

    this.setState({ guessList: newList });
  }

  handleTextInput = (e) => {
    const { key, metaKey, ctrlKey } = e;
    if (metaKey || ctrlKey || key === 'Tab') return // don't block keyboard shortcuts;

    e.preventDefault();
  
    let letter = key.toLowerCase();

    if (key === 'Backspace') letter = '⌫';
    if (key === 'Enter') letter = '⏎';

    if (!alphabet.includes(letter)) return;

    this.handleLetterInput(letter)();
  }

  render = () => {
    const {
      state: {
        guessList,
        guessNumber,
        letterColors,
        invalidWord,
      },
      handleLetterInput,
      handleTextInput,
    } = this;

    return (
      <>
        <Guesses
          guessList={ guessList }
          target={ example }
          guessNumber={ guessNumber }
        />
        <LetterInputs
          handleLetterInput={ handleLetterInput }
          letterColors={ letterColors }
        />
        <input
          className='hidden-text-input'
          onKeyDown={ handleTextInput }
          value=''
        />
      </>
    );
  }
}

export default Main;
