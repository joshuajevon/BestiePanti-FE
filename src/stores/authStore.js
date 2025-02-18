import { defineStore } from "pinia";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    errorMessages: {},
  }),
  actions: {
    async login(form) {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/login`;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
          mode: "cors",
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessages = errorData;
          throw new Error("Validation failed");
        }

        const data = await response.json();
        this.token = data.token;
        localStorage.setItem("token", data.token);

        // Fetch user data immediately after login
        await this.fetchUser();

        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },

    async fetchUser() {
      if (!this.token) return;

      try {
        // Replace with your actual endpoint for fetching user data
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/profile`;

        const response = await fetch(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        this.user = data.user;
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Optionally, log the user out if fetching the user fails
        this.logout();
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      router.push("/login");
    },

    isAuthenticated() {
      return !!this.token;
    },
  },
});
