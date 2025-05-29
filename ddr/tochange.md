## List of things that we still want to change coding and architecture wise

### Change lint/prettier

- No Semicolons, when we have a builder with multiple lines, we want to be able to change the order of the lines without having to change the semicolons.
- trailing commas on every line in case of multi line arguments, also for being able to add something to the end without changing the line before it.
  - This also helps to prevent merge conflicts.

### Use Node.js' 2022 feature to run typescript directly without transpiling

Node.js now supports running TypeScript files directly without the need for a separate transpilation step. This can simplify the development process and reduce build times.
