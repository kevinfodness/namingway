const { readFile } = require('fs/promises');

(async () => {
  let compareNames = [];
  let strict = false;

  // Process arguments.
  process.argv.slice(2).forEach((argument) => {
    if (argument.substring(0, 2) === '--') {
      if (argument === '--strict') {
        strict = true;
      }
    } else {
      compareNames.push(argument.toUpperCase());
    }
  });

  // Ensure we have at least two names.
  if (compareNames.length < 2) {
    console.error('You must provide at least two names to compare.');
    process.exit(1);
  }

  // Get a full list of letters from the inputs.
  const allLetters = compareNames.reduce((acc, item) => [...acc, ...item.split('')], []);

  // Get a unique list of letters from the inputs.
  const letters = allLetters.reduce((acc, item) => {
    if (!acc.includes(item)) {
      acc.push(item);
    }

    return acc;
  }, []);

  // Read in the list of names and convert it to an array.
  const namesRaw = await readFile('./names.txt');
  const names = namesRaw.toString().split("\n");

  // Loop the names and find ones that can be made from just the unique letters.
  const found = [];
  names.forEach((name) => {
    const remainingLetters = strict ? [...allLetters] : [];
    for (let i = 0; i < name.length; i ++) {
      // Determine if the unique letters contains this letter at all.
      if (!letters.includes(name.charAt(i))) {
        return;
      }

      // If we're in strict mode, ensure the letter exists in the remaining letters, then remove it.
      if (strict) {
        const pos = remainingLetters.findIndex((letter) => letter === name.charAt(i));
        if (pos === -1) {
          return;
        }
        remainingLetters.splice(pos, 1);
      }
    }

    found.push(name);
  });

  // Print results alphabetically.
  found.sort();
  found.forEach((name) => console.log(name));
  console.log(`Found: ${found.length}`);
})();

