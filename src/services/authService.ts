// // src/services/authService.ts
// import apiClient from '@/lib/api-client';
// import { RegisterFormData } from '@/types';

// interface AuthResponse {
//   token: string;
//   user: {
//     id: string;
//     email: string;
//     // Add other user properties as needed
//   };
// }

// export const authService = {
//   async register(userData: RegisterFormData): Promise<AuthResponse> {
//     try {
//       const response = await apiClient.post<AuthResponse>('/register', userData);
//       return response.data;

//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
//       throw new Error(errorMessage);
//     }
//   },

//   async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
//     try {
//       console.log("Signing in");
//       const response = await apiClient.post<AuthResponse>('/login', JSON.stringify(credentials), {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//         return response.data;
//       }
//       throw new Error('No token received');

//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials and try again.';
//       console.error('Login error:', error);
//       throw new Error(errorMessage);
//     }
//   },
// async forgotPassword(email: string): Promise<void> {
//   try {
//     const response = await apiClient.post('/forgot_password', { email });
//     return response.data;
//   } catch (error: any) {
//     if (error.response?.data?.error) {
//       throw new Error(error.response.data.error);
//     }
//     throw new Error('Failed to send reset link. Please try again.');
//   }
// },
//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('token');
//   },

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   },

//   getUser(): { id: string; email: string } | null {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   },

//   async refreshToken(): Promise<void> {
//     try {
//       const response = await apiClient.post<AuthResponse>('/refresh-token');
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//       } else {
//         throw new Error('No token received');
//       }

//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || 'Token refresh failed. Please try again.';
//       console.error('Token refresh error:', error);
//       throw new Error(errorMessage);
//     }
//   },

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     window.location.href = '/auth/login';
//   },

//   handleTokenExpiration(): void {
//     if (!this.isAuthenticated()) {
//       this.logout();
//     }
//   },
// };
// src/services/authService.ts
import apiClient from "@/lib/api-client";
import { RegisterFormData } from "@/types";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    // Add other user properties as needed
  };
}

export const authService = {
  async register(userData: RegisterFormData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/register",
        userData
      );

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      console.error("Registration error:", error);
      throw new Error(errorMessage);
    }
  },

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/login",
        credentials
      );

      if (!response.data?.token) {
        throw new Error("Authentication failed: No token received");
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error: any) {
      // Specific handling for Axios errors
      if (error.response) {
        // The request was made, but the server responded with an error status
        const serverError =
          error.response.data?.error ||
          error.response.data?.message ||
          error.response.data ||
          `Login failed with status: ${error.response.status}`;

        throw new Error(
          typeof serverError === "string"
            ? serverError
            : JSON.stringify(serverError)
        );
      }

      // Network errors or other issues
      throw new Error(
        error.message ||
          "Login failed. Please check your connection and try again."
      );
    }
  },
  async forgotPassword(email: string): Promise<any> {
    try {
      const response = await apiClient.post("/forgot_password", { email });

      if (response.data?.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to send reset link. Please try again.";
      console.error("Forgot password error:", error);
      throw new Error(errorMessage);
    }
  },

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await apiClient.post("/change_password", {
        old_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: newPassword,
      });

      if (response.data?.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError =
          error.response.data?.error ||
          error.response.data?.message ||
          error.response.data ||
          `Request failed with status: ${error.response.status}`;

        throw new Error(
          typeof serverError === "string"
            ? serverError
            : JSON.stringify(serverError)
        );
      }

      throw new Error(
        error.message || "Failed to change password. Please try again."
      );
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  getUser(): { id: string; email: string } | null {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      this.logout();
      return null;
    }
  },

  async refreshToken(): Promise<void> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No token available to refresh");
      }

      const response = await apiClient.post<AuthResponse>(
        "/refresh-token",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.data?.token) {
        throw new Error("Token refresh failed: No token received");
      }

      localStorage.setItem("token", response.data.token);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Token refresh failed. Please login again.";
      console.error("Token refresh error:", error);
      this.logout();
      throw new Error(errorMessage);
    }
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Optional: Call logout endpoint if your API requires it
    try {
      apiClient.post("/logout").catch(() => {});
    } finally {
      window.location.href = "/auth/login";
    }
  },

  handleTokenExpiration(error: any): boolean {
    // Check if error is due to token expiration
    if (error?.response?.status === 401) {
      this.logout();
      return true;
    }
    return false;
  },
};
