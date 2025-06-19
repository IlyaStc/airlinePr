import { setToStorage } from "../utils"
import axios from "./axios-instance"
import type { UserApi } from "./user-api"
import type { User } from "@/types"

const BASE_URL = "/user"
const BASE_URLAuth = "/auth"

export const userApi: UserApi = {
  async getUserById(id: number) {
    const res = await axios.get<User>(`${BASE_URL}/${id}`)
    return res.data
  },
  async signIn(email: string, password: string) {
    const res = await axios.post<any>(`${BASE_URLAuth}/signIn`, { email, password })
    setToStorage("jwtToken", res.data.access_token)
    console.log("User signed in, token set:", res.data)
    return res.data.user
  },
  async signUp(data: { name: string; email: string; password: string }) {
    const res = await axios.post<any>(`${BASE_URLAuth}/signUp`, data)
    setToStorage("jwtToken", res.data.access_token)
    return res.data.user
  },
}