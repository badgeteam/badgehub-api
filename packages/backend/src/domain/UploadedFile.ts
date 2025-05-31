export type UploadedFile =
  | {
      mimetype: string;
      fileContent: Uint8Array;
      size: number;
      directory?: undefined;
      fileName?: undefined;
    }
  | {
      mimetype: string;
      size: number;
      fileContent: Uint8Array;
      directory: string;
      fileName: string;
    };
