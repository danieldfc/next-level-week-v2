export default interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  whatsapp?: string;
  remember_token?: string;
}