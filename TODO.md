## Things to do in the frontend
- [ ] Implement Server assisted pagination for the main page.
- [ ] use nullable for optional properties instead so zod typing matches exactly
  - => unfortunately not possible for appmetadata json  
- [ ] Implement Server assisted search for the main page.
- [ ] Badge multi select on app edit page

# Niceties

- [ ] Project zip download button on detail page
- [ ] Icons should fill the rounded square, not be centered in it
- [ ] Nicer handling of user not logged case on my projects page.
- [ ] Improve the styling of inputs on edit page to match the design better, particularly border color on hover
- [ ] Project Media, allow creators to upload screenshots and show them on the app detail page (See commit 94c89f8ec4c5f5dfb4f3b0dafc8d5aca5522ebe3)
- [ ] Add edit button to app cards in case the logged in user is the creator of the app, then use that also on myProjects page for simplification.
- [ ] Save & Publish button should be disabled if there are no changes compared to the current 
- [ ] Page should not keep scroll location when project data is refreshed.

# Misc
- [ ] Add filter parameters to the URL so that the user can share the filtered view with others and so that refresh retains the filters.
- [ ] Clean up Catalog slug vs name mess
- [ ] to make updating an app more simple, git reference should be moved to the app metadata

# Important things
- [ ] User name resolving: we only store user subs in the database, but when a list of apps is shown, we want to show the user's name, not the sub. So we need to resolve the user name from the sub.
  - So we need to decide how we do this: will we let the frontend request it from keycloack, or will be let the backend resolve it and then send that back instead of the user sub? Checking this with Parko
- [ ] Badges and Categories should be configurable per environment
- [ ] use env vars for frontend keycloak config packages/frontend/src/components/ProfileIcon.tsx
- [ ] Users need to be able to create and revoke tokens for the API, so that this can be used for: 
  - app upload/edit from BADGE
  - app upload/edit from CLI, eg github action
- [ ] Metrics reporting and download counting
  - For download counts, the idea is that the badge will send a badge id in the request, so we can count the unique number of badges that downloaded an app.
  - We should also think about app usage metrics, firmware could help with this from the launcher.
