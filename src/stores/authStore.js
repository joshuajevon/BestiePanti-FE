import { defineStore } from "pinia";

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

    async loginWithGoogle() {
      window.location.href = `${
        import.meta.env.VITE_API_URL
      }/api/v1/login/google`;
    },

    async register(form) {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/register`;

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

        return true;
      } catch (error) {
        console.error("Registration error:", error);
        return false;
      }
    },

    async changePassword(form) {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/change-password`;
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(apiUrl, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
          mode: "cors",
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessages = errorData;
          return errorData
        }

        const data = await response.json();

        return data;
      } catch (error) {
        console.error("Registration error:", error);
        return false;
      }
    },

    async verifyOTP(form) {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/verify-otp`;

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

        await this.login(form);

        return true;
      } catch (error) {
        console.error("Registration error:", error);
        return false;
      }
    },

    async fetchUserGoogle(token) {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/user`;

        const response = await fetch(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        this.user = data;
        this.token = token;

        return true;
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Optionally, log the user out if fetching the user fails
        this.logout();
      }
    },

    async fetchUser() {
      if (!this.token) return;

      try {
        // Replace with your actual endpoint for fetching user data
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/user`;

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
        this.user = data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Optionally, log the user out if fetching the user fails
        this.logout();
      }
    },

    async forgetPasswordVerifyEmail(form) {
      const apiUrl = `${
        import.meta.env.VITE_API_URL
      }/api/v1/forgot-password/verify-email`;

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

        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },

    async forgetPasswordVerifyOTP(form) {
      const apiUrl = `${
        import.meta.env.VITE_API_URL
      }/api/v1/forgot-password/verify-otp`;

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

        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },

    async forgetPasswordResetPassword(form) {
      const apiUrl = `${
        import.meta.env.VITE_API_URL
      }/api/v1/forgot-password/reset-password`;

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

        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },

    async logout() {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/logout`;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          localStorage.removeItem("token");
          this.user = null;
          this.token = null;
          window.location.reload(true);
          return true;
        } else {
          console.error("Logout failed with status:", response.status);
          return false;
        }
      } catch (error) {
        console.error("Logout error:", error);
        return false;
      }
    },

    isAuthenticated() {
      return !!this.token;
    },
  },
});
