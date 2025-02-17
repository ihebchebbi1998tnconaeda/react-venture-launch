export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  startingPrice?: string;
}

export interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

export const fonts = [
  { name: "Montserrat", value: "Montserrat" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Roboto", value: "Roboto" },
  { name: "Lato", value: "Lato" },
  { name: "Oswald", value: "Oswald" },
  { name: "Playfair Display", value: "Playfair Display" },
  { name: "Poppins", value: "Poppins" },
];