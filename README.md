# namingway
Generates a list of last names that can be made with the letters of two given
last names. `namingway` is an homage to the character from Final Fantasy IV
that would let you change your name.

## Usage

```bash
node index.js name1 name2
node index.js name1 name2 --strict
```

## Strict Mode

If you pass the `--strict` flag as the last parameter, the matching logic will
not reuse letters when determining matches (e.g., Smith and Johnson will not
produce Simmons because there is only one M in the source names).

## Source

Data pulled from US Census Bureau, File B: Surnames Occurring 100 or more times,
at https://www.census.gov/topics/population/genealogy/data/2010_surnames.html.
