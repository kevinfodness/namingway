const { readFile } = require('fs/promises');

if (process.argv.length !== 4) {
  console.error('You must specify exactly two last names to compare.');
  process.exit(1);
}

(async () => {
  // All names in the data file are uppercase, so ensure our inputs are, too.
  const name1 = process.argv[2].toUpperCase();
  const name2 = process.argv[3].toUpperCase();

  // Get a unique list of letters from the inputs.
  const letters = [...name1.split(''), ...name2.split('')].reduce((acc, item) => {
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
    for (let i = 0; i < name.length; i ++) {
      if (!letters.includes(name.charAt(i))) {
        return;
      }
    }

    found.push(name);
  });

  // Print results alphabetically.
  found.sort();
  found.forEach((name) => console.log(name));
  console.log(`Found: ${found.length}`);
})();

