# Keycloak configuration

To make Keycloak work with BadgeHub, it needs some configuration.

_(Some settings might be redundant, this is what it made it work for me)_

First, make sure you select the correct realm in the dropdown menu in the top left corner.
In the `.env` file, it's the last part of `KEYCLOAK_ISSUER`.

## Client settings

1. In the left menu, select "Clients"
2. Below Client ID, select the client you use (see `KEYCLOAK_CLIENT_ID` in `.env`)

- Root URL: URL of the BadgeHub frontend
- Home URL: URL of the BadgeHub frontend
- Valid redirect URIs: URL of the BadgeHub frontend + '*'. Also add your local development URL 
if you're developing locally, like `http://localhost:5173/*`
- Valid post logout redirect URIs: same as Valid redirect URIs
- Web origins: same as Valid redirect URIs, but without a `*` and without a slash at the end

- Client authentication: off
- Authorization: off
- Authentication flow: check Standard flow, uncheck all others

## Advenced client settings

1. Go to Client settings (see above)
2. Select the Adveanced tab

- Proof Key for Code Exchange Code Challenge Method: S256

## Realm settings

1. In the left menu, select "Realm settings"
2. Select the Security Defences tab

- Content-Security-Policy: After `form-action`, add the url of the BadgeHub frontend and possibly 
your local development URL. Separate with spaces, end the list of urls with a semicolon.
- Do the same for `frame-ancestors`.

## Theming

To install the BadgeHub theme in Keycloak:

- Go to [keycloak-theme](https://github.com/BadgeHubCrew/badgehub-app/blob/6d2383819f68e00fd52a984dba8c81a27e0ea339/keycloak-theme/BadgeHub.zip) or [keycloak-theme](https://github.com/BadgeHubCrew/badgehub-app/blob/feature/keycloak-theme/keycloak-theme/BadgeHub.zip)
- Download BadgeHub.zip (see the download raw file icon)
- Unzip BadgeHub.zip
- Move the resulting BadgeHub directory to the Keycloak `themes` directory (`/opt/keycloak/themes`)
- Then, in Keycloak, in Realm settings on the Themes tab, you can select the BadgeHub theme

The theme is for the login page only.