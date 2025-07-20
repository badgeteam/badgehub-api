# Application Variants
In BadgeHub, we want to support that one app can have multiple "variants". The idea is that there can be different settings depending on the target/badge.
For example, an app could have a variant for the mch2022 badge and a variant for the why2025 badge and specify a different main_executable for each variant.

## How to model this in the app config?
To model application variants, we use the application property in the appmetadata json.
the application property is an array of variants, where each variant can specify file mappings, main_executable, and other properties.

## Custom properties
Certain variants can also have custom properties that are not part of the appmetadata spec.

## Application versioning
For application versioning, the AppMetadata.json has the version property. This version is a string and should follow semantic versioning.
However, this version number is optional and is allowed to stay the same even though the app actually changes. 
To denote a unique, immutable (so that it can be used for caching) version of the application, we have the concept of a revision at the level of a project.
The revision property is enforced to be different for every published version of the application.

Now since an application can have multiple variants, there is a possibility that only one of the variant changes. When this happens, it would be unfortunate that all badges with unaffected variants also need to upgrade.

To tackle this problem we are considering these options:
- add an optional version_code property to the variants. If this is specified in a variant, then it should be specified in all variants and for each publication at least one of the variants' version_code should increase.
- this would mean that if a badgehub or launcher app on the badge wants to know whether there is an update for the app, it needs to request the variant details of the app to see if the version_code has changed.

- move the revision property to the variant with the same constraint as above.
 - if we continue on this train of thought, it actually means that we have different apps per variant in badgehub and that they just share a project
 - this would mean that you don't publish the project, but you publish a variant of the project.
 - this would also mean that you need to request a variant of an app if you do it by revision.
 - how does this look for the public API?
     - get app by revision: `/projects/{slug}/variants/{target}/{revision}`
     - but then what is the variant id? 
         - index in the array?
         - variant slug?
         - variant type? no not possibly, you could have a 2 variants of the same type, but for different targets.
         - target: 
             - this would mean that some urls (eg url for mch2022 and why2025) resolve to the same variant. but this is ok
             - also, the reason to allow for variants is so that multiple targets can be supported.
             - Is there a use case for an app with 2 variants for the same target?
                 - No, we don't think so, in that case, it has to be a different app, otherwise there is also no way to know which variant to use on the target.
                     - So target also corresponds to the waht the badgehub app store will use when it requests the app.
         => target is the variant id in the url.
         => a variant is identified by the project slug + target.
     - the get /projects endpoint should for each project also include the a variants object which would be a map from target to variant + revision (latest).
 - how does this look for the private api?
     - post and patch /api/v3/projects/{slug}: no change this only contains the top levele project metadata, which is only "source_code_url"
     - post /api/v3/projects/{slug}/draft/files/{filePath} stays the same, files are still bound to a version of the project which is for all the variants.
     - patch /api/v3/projects/{slug}/draft/metadata url stays the same, but the content of the metadata will change to include the variants.
     - we will have to introduce a new endpoint for adding and changing a variant.
       - post `/api/v3/projects/{slug}/variants/{target}`: this will allow to add a new variant or change an existing one.
           - now here we have some duplication because we currently had specified that the variant would contain a targets array.
           - so we will say that the variant objects will not contain a targets array, instead that info is in the toplevel metadata in the variants mapping object.
           - Similarly, we will not include the "revision" property in the variant object, but instead it will be in the variants mapping object.
           - so this means the api user needs to add a variant and then update the metadata to add the variants mapping.
           - so the simplest app update flow is:
             1. update files
             2. update metadata to increase the revision number in the variant mapping for the variants that were changed.
             3. publish the variants that were changed.
 - now this brings us to the question of how we specify that a project is firmware. It does not make sense that a project has a firmware variant, a library variant and an app variant.
     - So we want to specify this in the top level app metadata.
     - At the same time, we also want to specify that an app is micropython or appfs or badge_vms at the variant level.
     - but for a library, what would the variant look like? I think only apps have a type in the variant object.
     - => So we will have a top level "project_type": "app"|"firmware"|"library| property in the app metadata
         - and then the variant will have a "type": "micropython"|"appfs"|"badge_vms" property.
 - What do we do with the file mappings? Are file mappings obligatory?
     - We could make it optional, this would then be the same as mapping all files to the original file path.
       - This means that in case of a sideload, the installer in the firmware needs to manually enumerate the files.
       - Then the rule is that from the moment that there is a file mapping, that all required files need to be mapped.
       - When an app variant is requested and the variant does not have a file mapping, then all files are included.
 - what will that `/api/v3/projects/{slug}/variants/{target}/rev{number}` response look like
     - well it needs to contain a list of files specific for this variant, 
         - so this means it needs it to read the variant file to get the and interpret the file mappings.
         - so this means we need to store the the variant data in the database.
             - this is not fun and a lot of extra work.
         - But we could get away with just interpreting the json on the fly.
 - how will we support file mappings in the badgehub web ui?
 - so actually, we don't want to pull this concept of file mappings into badgehub, 
     - it's appfs specific concept.
     - on the other hand, "only a selection of the files being included for a variant" is not an appfs specific concept.
     - so we could split them up to solve this, but we don't want to do this at this point.
     - So the project response will just contian all files, we can optimize this later if needed.
 - Thinking about this more, I think we can just keep the current api mostly intact, we don't need to add the target to the url. Because it's not like the revision is a different project for different variants. 
     - We can just say tha the project version is the highest revision of all the variants.
     - So the project response will just contain all the variants and their latest revision.
     - It will be a bit weird, because you request revision 10 and then you get 2 variants with revision 8 and only one with revision 10 for example.
     - Since the project response does not contain the revision data, the badges will still get only info relevant for the variant they are interested in.
     - They will need to request the variant.json file to get the variant specific data.