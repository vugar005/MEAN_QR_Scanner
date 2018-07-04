interface Author {
  id: number;
  name: string;
}
export interface QrCode {
  id: number;
  url: string;
  encryptedUrl: string;
  date: string;
  author: Author;
}
