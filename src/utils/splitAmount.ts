const isFloat = (str: string) => {
  return !isNaN(parseFloat(str));
};

// parses a string like 'aguinaldo 30k' and returns ['aguinaldo', 30000]
const splitAmount = (description: string): [string, number] => {
  let desc = description?.trim();

  if (!desc) return ['', 0];

  let amount = 0;
  const tokens = description.split(' ');
  let last = tokens[tokens.length - 1];

  let multiplier = 1;
  const lastCharacter = last[last.length - 1];
  // check for short-hand numbers like 25k or 1.2M
  switch (lastCharacter.toUpperCase()) {
    case 'K':
      multiplier = 1000;
      last = last.slice(0, -1);
      break;
    case 'M':
      multiplier = 1000000;
      last = last.slice(0, -1);
      break;
    default:
      break;
  }

  if (isFloat(last)) {
    amount = parseFloat(last) * multiplier;
    // remove amount from description
    let descArray = desc?.split(' ');
    descArray.pop();
    desc = descArray.join(' ').trim();
  }

  return [desc, amount];
};

export default splitAmount;
