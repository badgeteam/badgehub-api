# How we handle identity and access managemen and on which layer in the architecture

## Keycloak

A key component in our identity and access management is Keycloak, which is an open-source Identity and Access Management solution.
It provides features such as Single Sign-On (SSO), user federation, identity brokering, and social login.

From the api SIDE, we need to communicate with Keycloak to validate JWT tokens.

### Mapping a keycloak user to a user in the application

So in keycloak, users are identified by their keycloak user id. this user id is accessible in the JWT token under the property `sub`.
Users are registered without any interaction with the badgehub server, which means that we don't have the registered users in our database after registration.
The question then is, do we need a user table? Let's say we don't have a user table, then:

- We would have to query keycloak every time we want to get user information.
- We would have to send a command to keycloak if the users wants to change their username.
  The above is fine actually, and I think other user related data will be stored in the tables for those data. For example, a user has projects, but this stored as a user_id in the project table, not in a user table.
  In the previous badgehub, the user table had the following data:
  - id: number; email: string; admin?: boolean; name: string; password: string; remember_token?: string; editor?: string; public?: boolean; show_projects?: boolean; email_verified_at?: TimestampTZ;
    Seems like all of this data could be stored in keycloak, and we don't need to query it very often.
- One use case to consider is the following: on a project page, you want to be able to show all the collaborators with their names.
  To do this, it would mean that we need to query keycloak for every user that is a collaborator on the project. This is a bit inefficient, but we can use caching to mitigate this. The bigger downside is that we then have an extra dependency from our app to keycloak.
  Now the thing is that this functionality is not all that important and there are solutions for it. What is important then is that when we implement this, we don't put the fetching of the user data in the domain logic, but rather we make it a frontend presentation concern. This means that we will create an extra api that will allow resolving user_ids to their names, but we keep it separated from the badgehub domain logic, we put it in a separate bounded context so to say.

So this means that for now, we have decided to use keycloak as the only source of truth for any user data.
Now on the other hand, we don't want to query keycloak for user data. So to start, we could go with a user_cache, and when any call is made to the server, we extract the user data from the keycloak JWT token and store it in the user_cache. This means that if a users changes his name and does not go back to badgehub, we have stale data, but this seems acceptable because this is just presentation.
For MVP scope: no user names, no user table, we use keycloak sub ids as user ids in our project table.

## JWT validation and parsing.

The JWT tokens are validated and parsed middleware that executed before it reaches the REST controllers.
In this way, we will get validated user information in the REST controllers.

## Authorization

The authorization is done in the REST controllers, where we check if the user has the required roles to access the project.
It is not possible to do this in generic middleware, because the roles are specific to the project being accessed.

### Authorization options considered

### generic middleware by using {userid}/private in url

We contemplated that we could put make a /user/private path and that we could then make the rule that only the user can access their own resources.
But this would already be problematic from the moment that we would want to allow multiple users to edit a project.

### Storing projects that a user has access to in keycloak

Another approach could be to to store the projects that a user has edit rights for in keycloak. Problem with this is that we would have the user->project link info in 2 places then.

### Passing the user id to the domain logic

Another thing that you could possibly do is pass the user id to the badgehub data domain object and check whether the user is authorized there. But we prefer to keep identity and access management separated from the domain logic.
