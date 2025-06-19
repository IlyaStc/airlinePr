import { makeObservable, observable, action, computed, runInAction } from "mobx"
import type { User } from "@/types"
import type { UserApi } from "@/lib/api/user-api"
import type { RootStore } from "./root-store"
import { object } from "zod"

export class UserStore {
  user: User | null = null
  isLoading = false
  error: string | null = null
  pointsToNextTier: "500" | "1000" | "2000" = "500"

  constructor(
    private rootStore: RootStore,
    private userApi: UserApi
  ) {
    makeObservable(this, {
      user: observable,
      isLoading: observable,
      error: observable,
      signIn: action,
      signUp: action,
      signOut: action,
      fetchUser: action,
      isAuthenticated: computed,
      name: computed,
      tier: computed,
    })
  }

  get isAuthenticated() {
    return !!this.user
  }

  get name() {
    return this.user?.name || ""
  }

  get tier() {
    return this.user?.role || "Member"
  }

  async signIn(email: string, password: string): Promise<boolean> {
    this.isLoading = true
    this.error = null
    try {
      const user = await this.userApi.signIn(email, password)
      runInAction(() => {
        this.user = user
      })
      return true
    } catch (error: any) {
      runInAction(() => {
        this.error = error?.message || "Failed to sign in"
      })
      return false
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  async signUp(name: string, email: string, password: string): Promise<boolean> {
    this.isLoading = true
    this.error = null
    try {
      const user = await this.userApi.signUp({ name, email, password })
      runInAction(() => {
        this.user = user
      })
      return true
    } catch (error: any) {
      runInAction(() => {
        this.error = error?.message || "Failed to sign up"
      })
      return false
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  async fetchUser(id: number) {
    this.isLoading = true
    this.error = null
    try {
      const user = await this.userApi.getUserById(id)
      runInAction(() => {
        this.user = user
      })
    } catch (error: any) {
      runInAction(() => {
        this.error = error?.message || "Failed to fetch user"
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  signOut() {
    this.user = null
    this.error = null

  }
}