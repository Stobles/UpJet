export type UserRoles = "Admin" | "Manager" | "User";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRoles;
}
