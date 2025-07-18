export interface Service {
  id: string;
  title: string;
  thumbnail: string;
  subtitle: string;
  desc: string;
  credits: number;
  endpoint: string;
  fieldname?: string;
}

export interface Category {
  services: Service[];
}

export interface Categories {
  [key: string]: Category;
}
export interface ScanResult {
  id: string;
  timestamp: string;
  data: {
    [key: string]: string | number | boolean;
  };
  status: 'success' | 'error';
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: ScanResult[];
}


// src/types/auth.ts
export interface RegisterFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password2: string;
  dob: string;
  phone: string;
  address: string;
  pin_code: string;
  city: string;
  state: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}