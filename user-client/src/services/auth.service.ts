import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../apis";
import axios from "axios";

interface LoginResponse {
  AT: string;
  RT: string;
  role: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  user_name: string;
  email: string;
  password: string;
}

// login service
export const loginService = createAsyncThunk<LoginResponse, LoginCredentials>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.post<LoginResponse>("/login", credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Unknown error");
      }
    }
  }
);

// register service
export const registerService = createAsyncThunk<void, RegisterCredentials>(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      await authApi.post<void>("/register", credentials);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Unknown error");
      }
    }
  }
);
