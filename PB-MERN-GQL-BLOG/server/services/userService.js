import User from '../models/User.js';

const userService = {
   getAllUsers: async () => {
       return await User.find();
   },
   getUserById: async (id) => {
        // do NOT return password hash
       const user = await User.findById(id);
       user.password = undefined;
       return user;
   },
   createUser: async (userData) => {
       const newUser = new User(userData);
       return await newUser.save();
   },
   updateUser: async (id, userData) => {
       return await User.findByIdAndUpdate(id, userData, { new: true });
   },
   deleteUser: async (id) => {
       return await User.findByIdAndDelete(id);
   },
   addroleToUser: async (userId, role) => {
       const user = await User.findById(userId);
       if (!user) throw new Error('User not found');
       if (!user.roles.includes(role)) {
           user.roles.push(role);
           await user.save();
       }
       return user;
   },
   removeRoleFromUser: async (userId, role) => {
       const user = await User.findById(userId);
       if (!user) throw new Error('User not found');
       user.roles = user.roles.filter(r => r !== role);
       await user.save();
       return user;
   }
};

export default userService;