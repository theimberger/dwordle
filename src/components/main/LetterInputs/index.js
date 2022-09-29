import React from 'react';

const alphabet = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '⌫'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '⏎'],
];

const LetterInputs = ({ handleLetterInput, letterColors }) => {

  return (
    <ul className='letter-inputs'>
      {alphabet.map((row) => (
        <li className='letter-inputs__row'>
          <ul className='letter-inputs__row__letters'>
            {row.map((letter) => {
              let letterClass = 'letter-inputs__row__letter'
              if (letterColors[letter]) {
                letterClass = `${letterClass} ${letterClass}--${letterColors[letter]}`;
              }
              return (
                <li
                  className={letterClass}
                  onClick={handleLetterInput(letter)}
                >
                  {letter}
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default LetterInputs;