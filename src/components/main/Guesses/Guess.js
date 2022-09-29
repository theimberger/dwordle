import React from 'react';
import { gradeGuess } from '../../../lib/grade-guess';

const Guesses = ({
  data,
  target,
  guessNumber,
  index
}) => {
  const colors = guessNumber > index ? gradeGuess(data.join(''), target) : ['', '', '', '', ''];

  return (
    <li className='word-item'>
      <ul className='word-item__letters'>
      {data.map((letter, idx) =>
        <li className={ `word-item__letters__letter word-item__letters__letter--${colors[idx]}` }>
          {letter}
        </li>
      )}
      </ul>
    </li>
  );
};

export default Guesses;