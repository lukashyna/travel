export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }

  export interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    login: (body: LoginData) => Promise<void>;
    register: (body: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<AuthResponse>;
}