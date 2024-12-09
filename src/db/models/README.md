## Philosophy of the db models

In the db models, we try to stick to 2 principles

- DRY, no data duplication, unless it's accidental duplication
- No arrays. Arrays make querying and switching to another DB more difficult. So instead of arrays, we try to work with relation tables.
  - There is currently an exception here for the MetaDataFileContents, there the mappings are records and arrays and records with arrays, this is because the data comes from the json file and we could also just store it as stringified JSON.
