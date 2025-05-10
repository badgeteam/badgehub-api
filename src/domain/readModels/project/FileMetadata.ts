import { DatedData } from "./DatedData";

export interface FileMetadata extends DatedData {
  dir: string; // directory of the file in the project, empty string if top level
  name: string; // file name without extension
  ext: string; // file extension
  mimetype: string; // Can include info about the programming language
  size_of_content: number;
  sha256: string; // lowercase hex sha256 digest, allows verifying whether content is the same as other file.
  // Computed
  size_formatted: string; // Human readable size_of_content
  full_path: string; // full path of file with filename and extensions (dir+'/'+name+'.'+ext)
}
