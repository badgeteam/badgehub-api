# File Writing Setup decision record

## Everything in the database

for simplicity, this way we don't need to deal with file system stuff. Means no separate backup, less chance of inconsistency between file data and metadata.

## Separate table for file data

Still we want to make a clear distinction between writing file data and writing file metadata.
The reason for this is that file data is orders of magnitude bigger than file metadata, which influences how long and how much resources it takes to write and store this data.
If we would just store the file data in the same table as the metadata, we would have to load the whole file data into the same table in the same operation, this would make optimizations like not storing the same file data twice harder. It would also make it harder to still change the file storage location if that becomes a need.
Since at the moment of making this decision, we already have code for keeping these separate, stemming from when we wrote it to the file system, we will keep even though YAGNI might apply.
