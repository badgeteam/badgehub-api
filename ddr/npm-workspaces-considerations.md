# Workspaces Setup DDR

## Why we use workspaces in this repository

### ts-rest unique symbols issue
We switched to using workspaces in this repository because we ran into problems with ts-rest. Withouth workspaces, the ts-rest package would be separately installed in root, frontend and backend.
This duplicate ts-rest package caused issues with typing because ts-rest uses unique symbols in types.
With workspaces, we can have a single ts-rest package that is shared across the frontend and backend, which solves the typing issues.

### Only one install needed
Using workspaces allows to run the npm install command only once in the root directory, which will install all dependencies for the frontend and backend. This is more convenient than having to run npm install in each subdirectory separately.

### Conveniently run commands in both frontend and backend
With the --workspace(s) flag, we can run commands in both the frontend and backend at the same time. For example, we can run `npm run dev --workspaces` to start both the frontend and backend in development mode. This is more convenient than having to run the command in each subdirectory separately.

### Why is the shared packages not a workspace
This would require us to build and do an npm install every time we change the contracts package, which is not convenient and can cause a lot of wasted time when this is forgotten.
Note: this does have the disadvantage that the typescript code needs to be compatible with the tsconfig of the frontend and backend, but this is ok because we want similar ts config rules in any case.

## Why not use pnpm workspaces
We agree with the [motivation of pnpm](https://pnpm.io/motivation), but we decided to not use pnpm workspaces for now.

The considerations were:
- Everybody knows npm and it works well enough for us. We don't need the performance benefits or other benefits of pnpm workspaces at this time.
- To change this, this would require a discussion and a check with all team members, and we have better things to discuss at the moment.
- It would require a little extra setup (RUN npm install -g corepack@latest RUN corepack enable pnpm) which introduces another vector of setup issues.
