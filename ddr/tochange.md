## List of things that we still want to change coding and architecture wise

### Change lint/prettier

- No Semicolons, when we have a builder with multiple lines, we want to be able to change the order of the lines without having to change the semicolons.
- trailing commas on every line in case of multi line arguments, also for being able to add something to the end without changing the line before it.
  - This also helps to prevent merge conflicts.

### Use TS Rest instead of TSOA

After having worked with both TSOA and TS Rest, I prefer TS Rest. The reasons are:

- TS Rest leverages Zod, which is a powerful schema validation library that allows for more flexible and expressive validation rules.
- TS Rest does not need generated code, on either side (Backend and Frontend).
  - This is much easier to maintain. Currently, when changing a type or controller, we need to generate controller code in the backend and client code on in the frontend.
