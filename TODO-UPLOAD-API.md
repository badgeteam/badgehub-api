# Upload API

## Done

### db-migrate

installed db-migrate and added the new table structure as a migration

### sql-tagged-template

all sql code is now using sql-tagged-templates which helps with readability, README.md was also updated for this

### Insert Project

You can now insert a project, which will also create an empty version and metadata and this project can then be retrieved

### Publish project

The publish patch api on a project will mark the latest version as published now

### Write API only enabled in development mode

Since we don't have security on our api yet, I added code that makes sure that the upload api only works when the NODE_ENV is set to development

### Auto run db-migrate:up on start

## TODO

### Single File upload

You should be able to upload a file and this file should be put in the db and stored on disk using it's hash as the filename, like git does it, so also with 2-letter subdirs ideally.
if the file path is /metadata.json, then data should be extracted and filled in on the app_metadata_jsons table

### Single File download

### Zip upload

When you upload a zip, file upload should be done for all the files in the zip (so also extracting metadata)
**Q**: should zip upload also do publish?
**A**: no, it should not, there is an api for that. optionally, we can make it a query param later

### Zip download

### (one/many) to many relations from the [relations](src/db/models/app/relations) dir

- Currently, the only one that is really needed is the file to version relation, others can wait.
- this will allow eg. finding all the collaborators on a project, but also all projects that a user has collaborated on...

### Test with frontend for feature parity compared to master

- The public api has not changed that much but we should make 100% sure that we don't have a downgrade after merging this PR

### Maybe change http status codes and message

- currently, it will return 204 for the write api's, maybe that should be 200 OK?
- if you do a publish but it is already published, maybe that should be a different status code?

### Maybe improve SQL debugging

- We currently don't see the sql queries printed, even if they fail, maybe we should add that.

### Change it to make it clear that draft version is always unpublished

=> so publish should also create a new version