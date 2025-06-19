import type { User } from "@/types"

export interface UserApi {
  getUserById(id: number): Promise<User>
  signIn(email: string, password: string): Promise<User>
  signUp(data: { name: string; email: string; password: string }): Promise<User>
}