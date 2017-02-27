// why are they different sizes? who knows
function numItems (key: string) {
  if (['8Z', '8Y'].indexOf(key) >= 0) {
    return 8;
  } else if (['8E', '8D', '8C', '8B', '9A', '9B'].indexOf(key) >= 0) {
    return 5;
  } else {
    return 4;
  }
}

function twoDigitNum (i: number) {
  const str = i.toString();
  if (str.length === 1) {
    return `0${i}`;
  } else if (str.length === 3) {
    return '00';
  } else {
    return str;
  }
}

// no IUO
const alphabet = 'ZYXWVTSRQPNMLKJHGFEDCBABCDEFGHJ'.split('');

// lead: 8Z, counter: 1
function generateCode (lead: string, counter: number) {
  let codes = [];
  const letter = 65;
  for (let i = 0; i < numItems(lead); i++, counter++) {
    codes.push(`${lead}${twoDigitNum(counter)}${String.fromCharCode(letter + i)}`);
  }
  return {codes, counter};
}

function generateCodes () {
  let lead = 8, counter = 1;
  let res: string[][] = [];

  for (let prizeKey of alphabet) {
    let prize = generateCode(`${lead}${prizeKey}`, counter);

    res.push(prize.codes);

    counter = prize.counter;
    if (counter >= 100) {
      lead++;
      // it resets to 2, idk why
      counter = 2;
    }
  }

  return res;
}

const prizeNames = {
  '8B': '$20k College Tuition',
  '8C': '$35k Vehicle of Your Choice',
  '8D': '$40k Home Makeover',
  '8E': '$100k Cash or Luxury Car',
  '8F': '$5k Cash',
  '8G': '$5k Groceries',
  '8H': '$1.5k Gas Grill and Groceries',
  '8J': '$1.5k LED HD TV',
  '8K': '$1k Cash',
  '8L': '$1k Grocery Gift Card',
  '8M': '$1k Laptop Computer',
  '8N': '$500 Grocery Gift Card',
  '8P': '$300 Smart Watch',
  '8Q': '$200 Family Picnic',
  '8R': '$200 Cash',
  '8S': '$100 Grocery Gift Card',
  '8T': '$100 Cash',
  '8V': '$50 Grocery Gift Card',
  '8W': '$25 Grocery Gift Card',
  '8X': '$25 Gift Card Mall',
  '8Y': '$1mil Vacation Home',
  '8Z': '$1mil Cash',
  '9A': '$10k 4-Wheeler',
  '9B': '$10k Family Vacation',
  '9C': '$25 Cash',
  '9D': '$25 Fandango Gift Card',
  '9E': '$15 Grocery Gift Card',
  '9F': '$10 Grocery Gift Card',
  '9G': '$10 Cash',
  '9H': '$5 Grocery Gift Card',
  '9J': '$5 Cash'
};

export { generateCodes, prizeNames }
