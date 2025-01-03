export interface User {
  expires: Date;
  name: string;
  email: string;
  role: string;
  cart: string[];
  wishlist: string[];
  _id: string;
}