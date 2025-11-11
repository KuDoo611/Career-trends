import React, { useEffect, useState } from "react";
import fetchData from "../api/fetchData";
import type { User } from "../model/UserModel";
import { AuthContext } from "./authContextBase";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("ct_user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { localStorage.removeItem("ct_user"); }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("AuthContext: Starting login process");
      
      // Validate input
      if (!email || email.trim().length === 0) {
        throw new Error("Vui lòng nhập email");
      }
      
      if (!password || password.trim().length === 0) {
        throw new Error("Vui lòng nhập mật khẩu");
      }
      
  // Get all users from database
  console.log("Fetching users from API...");
  const users = await fetchData<User[]>("/api/users", { method: "GET" });
      console.log("API Response - Users:", users);
      console.log("Total users found:", users.length);
      
      // Find user by email
      console.log("Looking for user with email:", email);
      const foundUser = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
      console.log("Found user:", foundUser);
      
      if (!foundUser) {
        console.log("User not found for email:", email);
        throw new Error("Email hoặc mật khẩu không đúng");
      }
      
      // Log password comparison details
      console.log("Password validation:");
      console.log("- Input password:", `"${password}"`);
      console.log("- Input password length:", password.length);
      console.log("- Stored password:", `"${foundUser.password}"`);
      console.log("- Stored password length:", foundUser.password?.length);
      console.log("- Password exists in user object:", !!foundUser.password);
      
      // Validate password - check if it matches the stored password
      if (!foundUser.password) {
        console.log("ERROR: No password field in user object");
        throw new Error("Lỗi hệ thống: Không tìm thấy thông tin mật khẩu");
      }
      
      // Trim whitespace and compare
      const trimmedInputPassword = password.trim();
      const trimmedStoredPassword = foundUser.password.trim();
      
      console.log("After trimming:");
      console.log("- Input password:", `"${trimmedInputPassword}"`);
      console.log("- Stored password:", `"${trimmedStoredPassword}"`);
      console.log("- Passwords match:", trimmedInputPassword === trimmedStoredPassword);
      
      if (trimmedStoredPassword !== trimmedInputPassword) {
        console.log("Password mismatch!");
        throw new Error("Email hoặc mật khẩu không đúng");
      }
      
      console.log("AuthContext: User authenticated successfully");
      
      // Don't store password in localStorage for security
      const userWithoutPassword = {
        ...foundUser,
        password: undefined
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem("ct_user", JSON.stringify(userWithoutPassword));
      console.log("AuthContext: User stored in localStorage");
      
      return userWithoutPassword;
    } catch (error) {
      console.error("AuthContext login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ct_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
