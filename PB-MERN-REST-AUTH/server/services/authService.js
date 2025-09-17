import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authService = {
   login: async (userId, password) => {
       const user = await User.findOne({ userId });
       if (!user) throw new Error('User not found');
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) throw new Error('Invalid credentials');
       const token = jwt.sign({ id: user._id, roles: user.roles,userId: user.userId, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });
       return { token, user: { id: user._id, userId: user.userId, email: user.email, name: user.name, roles: user.roles } };
   }
};

export default authService;