### Why we use TS Rest instead of TSOA

After having worked with both TSOA and TS Rest, I prefer TS Rest. The reasons are:

- TS Rest leverages Zod, which is a powerful schema validation library that allows for more flexible and expressive validation rules.
- TS Rest does not need generated code, on either side (Backend and Frontend).
  - This is much easier to maintain. Currently, when changing a type or controller, we need to generate controller code in the backend and client code on in the frontend.
