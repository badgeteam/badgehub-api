# Variant Map in App Metadata
The App Metadata JSON constains a variant_map property.
This property constains a record that maps from badge slug to an object with a `revision` and a variant json file path.

The idea is that we don't want badges to have to download the variant data of other badges.

## Why does the variant json not contian a list of targets/badges?
Because the appmetadata already has that information in the variant_map property.

## What if I want my app to have 2 variants for the same badge?
That is not possible, we think this edge case should be handled by making a different project for that second variant.

## Why does the variant_map contain a revision
Because we want to allow firmware to optimize for the case where only one of the variant changes and the other ones stays the same.

## Why is the revision in the variant_map instead of in the variant json?
When the BadgeHub client on the badge needs to check for updates, it needs to fetch the latest metdata json in any case so that it has the updated variant_map. 
By putting the revision in the variant_map, we can avoid forcing the badgehub client to download the variant json file as well if there is no update for that variant.
And we don't want any unnecessary duplication of properties.
