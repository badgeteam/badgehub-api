# Variant Map in App Metadata
The App Metadata JSON constains a variant_map property.
This property contains a record that maps from badge slug to json file path.

The idea is that we don't want badges to have to download the variant data of other badges.

## Why does the variant json not contain a list of targets/badges?
Because the appmetadata already has that information in the variant_map property.

## What if I want my app to have 2 variants for the same badge?
That is not possible, we think this edge case should be handled by making a different project for that second variant.
