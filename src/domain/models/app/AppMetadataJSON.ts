// This represents the contents of the metadata.json file that we have in the app.
// This is only put into the database for making interesting read queries possible.
// These contents should never be updated directly, but instead the metadata.json file should be modified and then read out again in order to fill the fields here.
// Metadata for a published version cannot be edited, except by republishing this version which would overwrite the old version.
import { BadgeSlug } from "@db/models/DBBadge";
import { HasCategory } from "@domain/models/app/Category";

export interface AppMetadataJSON extends HasCategory {
  name: string;
  description?: string;
  author?: string; // The name of the author
  icon?: string; // The relative icon path
  license_file?: string; // Optional path of the license file for this project. If not set, then LICENSE.md will be used.
  is_library?: boolean; // Whether this app can be used as a library by other apps
  is_hidden?: boolean; // Whether this app should be shown in the launcher or not. Only useful for libraries.
  semantic_version?: string; // Changed! [Semantic version](https://semver.org/) of the app, the semantic versioning is mostly relevant if the app is a library. Authors who don't use this semantic versioning will get a 0.x version with x just an number like we previously had the revision number.
  interpreter?: string; // Changed! For example 'python' or the app slug of a 3rd party dependency of this app.
  main_executable?: string; // Relative path of the executable file from this package that is the main executable file of this app.
  main_executable_overrides?: Record<BadgeSlug, string>; // Optional field to allow overriding the main_executable for a certain badge.
  file_mappings?: Array<{ source: string; destination: string }>; // Changed! Mapping to tell the badge where some files in this app should be placed on the filesystem. Source is a relative path. Desitination can either be relative or absolute.
  file_mappings_overrides?: Record<
    BadgeSlug,
    Array<{ source: string; destination: string }>
  >; // Changed! optional field to allow overriding or adding a file mapping for a device name slug (key).
}
