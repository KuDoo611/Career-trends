import fetchData from "../api/fetchData";
import type { User } from "../model/UserModel";

export async function login(email: string, password: string) {
  try {
    console.log("Attempting login for email:", email);
    
  // First, get all users to check if email exists
  const users = await fetchData<User[]>("/api/users", { method: "GET" });
    
    // Find user by email
    const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error("Tài khoản không tồn tại trong hệ thống");
    }
    
    // For demonstration: Simple password validation
    // In real app, backend should handle password hashing and validation
    if (!password || password.trim().length === 0) {
      throw new Error("Vui lòng nhập mật khẩu");
    }
    
    // TODO: Replace with actual backend authentication when available
    // For now, accept any non-empty password for existing users
    console.log("Login successful for user:", user.email);
    console.log("User details:", { userCode: user.userCode, name: user.fullName, role: user.role });
    
    return user;
    
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
}

export async function getUser(userCode: string) {
  return await fetchData<User>(`/api/users/${encodeURIComponent(userCode)}`);
}

export async function getAllUsers() {
  return await fetchData<User[]>("/api/users");
}

// Create a new user (registration)
export async function registerUser(newUser: Partial<User>) {
  // The API is expected to accept POST /api/users with user payload
  // Return the created user object from backend
  return await fetchData<User>("/api/users", { method: 'POST', body: newUser });
}
