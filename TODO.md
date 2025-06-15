## Things to do in the frontend

- [x] Add a loading spinner to the main page while the data is being fetched.
- [x] Make the main page testable. To do this, we need to:
  - [x] create a mock tsRestclient that can be injected into the HomePage component.
  - [x] Check that the HomePage.test.tsx is now working.
- [x] Add test ids to the main page elements.
  - [x] Add a test id to the main page.
  - [x] Add a test id to the loading spinner.
  - [x] Add a test id to the error message.
  - [x] Add a test id to the app cards.
  - [x] Add a test id to the filter dropdowns.
  - [x] Add a test id to the sort dropdown.
  - [x] Add a test id to app cards container.
- [x] Update the HomePage.test.tsx to use the test ids.
- [ ] try to implement keycloak authentication.
- [x] Implement filtering for the main page.
- [x] Implement pagination for the main page.
- [x] Implement the search bar for the main page.
- [x] Implement showing the description
- [ ] Implement showing the icon if there is one
- [x] Implement showing the real description
- [x] Change "Microcontroller" to "Badge" in filters
- [x] Implement sorting for the main page.
- [x] Implement the app detail page.
- [ ] Implement project/app creation UI and logic (form, validation, API integration, feedback)
- [x] Implement login functionality (UI, authentication flow, error handling)
- [ ] Implement "My Projects" page (list projects created by the logged-in user)
- [ ] Deployment: Make new frontend the homepage of the api
- [ ] Make top level dev command that starts the frontend in dev mode and starts the backend
  - make top level package json
  - Move tsconfigs to top level? Not immediately, is an optimization
- [x] Add link to API docs in header in frontend to replace old api homepage
- [x] app icon caching: currently the app icon is fetched from the backend every time the app detail page is loaded. We need to change the setup so that the app icons can be cached on the client side.

- [ ] Implement Server assisted pagination for the main page.
- [ ] use nullable for optional properties instead so zod typing matches exactly
- [ ] Implement Server assisted search for the main page.

# Niceties

- [x] All thing not implemented yet, so the things that are using dummy data, should have some visual indication, maybe like a grey or red border around them
- [ ] Project zip download button on detail page
- [ ] Icons should fill the rounded square, not be centered in it
- [ ] Nicer handling of user not logged case on my projects page.

# Misc
- [x] Throw descriptive error in case some required .env variable is not set
- [x] Fix repopulate db script 
  - [x] currently it results in an empty mockup-data.sql file
  - [x] currently it seems there is a timezone dependency that causes different data to be generated on different machines
- [ ] use env vars for frontend keycloak config packages/frontend/src/components/ProfileIcon.tsx
- [ ] Use hidden iframe (see silentCheckSsoRedirectUri documentation in keycloak-js) to check if user is logged in.
  - This will improve the homepage loading time and user experience.
- [ ] Add filter parameters to the URL so that the user can share the filtered view with others and so that refresh retains the filters.
