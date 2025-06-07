## Things to do in the frontend

- [x] Add a loading spinner to the main page while the data is being fetched.
- [x] Make the main page testable. To do this, we need to:
  - [x] create a mock tsRestclient that can be injected into the App component.
  - [x] Check that the App.test.tsx is now working.
- [x] Add test ids to the main page elements.
  - [x] Add a test id to the main page.
  - [x] Add a test id to the loading spinner.
  - [x] Add a test id to the error message.
  - [x] Add a test id to the app cards.
  - [x] Add a test id to the filter dropdowns.
  - [x] Add a test id to the sort dropdown.
  - [x] Add a test id to app cards container.
- [x] Update the App.test.tsx to use the test ids.
- [ ] try to implement keycloak authentication.
- [x] Implement filtering for the main page.
- [x] Implement pagination for the main page.
- [x] Implement the search bar for the main page.
- [x] Implement showing the description
- [ ] Implement showing the icon if there is one
- [x] Implement showing the real description
- [x] Change "Microcontroller" to "Badge" in filters
- [x] Implement sorting for the main page.
- [ ] Implement the app detail page.
- [ ] Implement project/app creation UI and logic (form, validation, API integration, feedback)
- [ ] Implement login functionality (UI, authentication flow, error handling)
- [ ] Implement "My Projects" page (list projects created by the logged-in user)
- [ ] Deployment: Make new frontend the homepage of the api
- [ ] Make top level dev command that starts the frontend in dev mode and starts the backend
  - make top level package json
  - Move tsconfigs to top level? Not immediately, is an optimization

# Optimizations

- [ ] Implement Server assisted pagination for the main page.
- [ ] use nullable for optional properties instead so zod typing matches exactly
- [ ] Implement Server assisted search for the main page.

# Niceties

- [x] All thing not implemented yet, so the things that are using dummy data, should have some visual indication, maybe like a grey or red border around them
- [ ] Project zip download button on detail page

# Components/elements with `todoElement` class (to review/implement)

- [ ] Header: Navigation bar (`<nav>`) for main site links
  - [ ] AppCard: Individual app card component (`<div>`) for displaying app details
    - [ ] Requires implementing the app upload/creation functionality
    - [ ] Requires finding or deciding on docs and community link
- [ ] Footer: Footer section (`<footer>`) at the bottom of the site
  - [ ] Requires Adding an About page or just link to github README.md
  - [ ] Requires Adding a Contact page or link to github issues
  - [ ] Requires Adding a terms of service or links to github license file
- [ ] Hero: Main hero section (`<div>`) likely for the landing page
- [ ] Filters: Filter controls (`<div>`) for browsing/filtering apps
- [ ] AppMedia: Media section (`<section>`) for app screenshots or videos
  - [ ] Requires backend support for project description media
- [ ] AppSidebarSimilar: Sidebar section (`<section>`) for similar apps, and links to similar apps
- [ ] AppReviews: Reviews section (`<section>`) for app reviews, and review form (`<form>`) for submitting a review
- [ ] AppSidebarAuthor: Sidebar section (`<section>`) for app author details, and author action button
