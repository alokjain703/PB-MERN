import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// simulate enums for roles
export const Roles = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
};

const authService = {
  login: async (userId, password) => {
    const user = await User.findOne({ userId });
    if (!user) throw new Error("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const token = jwt.sign(
      {
        id: user._id,
        roles: user.roles,
        userId: user.userId,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    );
    return {
      token,
      user: {
        id: user._id,
        userId: user.userId,
        email: user.email,
        name: user.name,
        roles: user.roles,
      },
    };
  },

  addRole: async (userId, roleName) => {
    if (!Object.values(Roles).includes(roleName)) {
      throw new Error("Invalid role");
    }
    const user = await User.findOne({ userId });
    if (!user) throw new Error("User not found");

    if (!user.roles.includes(roleName)) {
      user.roles.push(roleName);
      await user.save();
    }
    return user;
  },

  removeRole: async (userId, roleName) => {
    if (!Object.values(Roles).includes(roleName)) {
      throw new Error("Invalid role");
    }
    const user = await User.findOne({ userId });
    if (!user) throw new Error("User not found");

    user.roles = user.roles.filter((r) => r !== roleName);
    await user.save();
    return user;
  },

  getAvailableRoles: () => {
    return Object.values(Roles);
  },

  getRolesForUser: async (userId) => {
    const user = await User.findOne({ userId });
    if (!user) throw new Error("User not found");
    return user.roles;
  },
};

export default authService;
