const generateLetterMap = (word) => {
  const letters = word.split('');
  const map = {};
  letters.forEach((letter, idx) => {
    if (map[letter]) {
      map[letter].push(idx);
    } else {
      map[letter] = [idx];
    }
  })
  return map;
}

export const gradeGuess = (guess, target) => {
  const targetMap = generateLetterMap(target);
  const guessMap = generateLetterMap(guess);

  return guess.split('').map((letter, idx) => {
    if (!targetMap[letter]) {
      return 'grey';
    } else if (targetMap[letter].includes(idx)) {
      return 'green';
    } else if (targetMap[letter]) {
      if (targetMap[letter].length < guessMap[letter].length) {
        const correctGuessesMade = guessMap[letter].filter((index) => targetMap[letter].includes(index));
        if (correctGuessesMade.length === targetMap[letter].length) return 'grey';
      }
      return 'yellow';
    }
  })
}

