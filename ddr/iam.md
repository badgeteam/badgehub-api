# How we handle identity and access managemen and on which layer in the architecture

## Keycloak

A key component in our identity and access management is Keycloak, which is an open-source Identity and Access Management solution.
It provides features such as Single Sign-On (SSO), user federation, identity brokering, and social login.

From the api SIDE, we need to communicate with Keycloak to validate JWT tokens.

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
