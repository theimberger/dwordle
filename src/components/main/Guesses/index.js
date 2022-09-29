import React from 'react';
import Guess from './Guess';

const Guesses = ({ guessList, target, guessNumber }) => {

  return (
    <ul className='guess-list'>
      { guessList.map((g, i) => (
        <Guess
          data={ g }
          target={target}
          guessNumber={ guessNumber }
          index={ i }
        />
      ))}
    </ul>
  );
};

export default Guesses;