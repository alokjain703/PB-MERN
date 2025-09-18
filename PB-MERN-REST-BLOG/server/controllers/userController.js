  import userService from '../services/userService.js';

const userController = {
   getUsers: async (req, res) => {
       try {
           const users = await userService.getAllUsers();
           res.json(users);
       } catch (err) {
           res.status(500).json({ message: err.message });
       }
   },
   getUser: async (req, res) => {
       try {
           const user = await userService.getUserById(req.params.id);
           if (!user) return res.status(404).json({ message: 'User not found' });
           res.json(user);
       } catch (err) {
           res.status(500).json({ message: err.message });
       }
   },
   createUser: async (req, res) => {
       try {
        console.log("Creating user with data:", req.body);
           const newUser = await userService.createUser(req.body);
           res.status(201).json(newUser);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   },

   updateUser: async (req, res) => {
       try {
           const updatedUser = await userService.updateUser(req.params.id, req.body);
           if (!updatedUser) return res.status(404).json({ message: 'User not found' });
           res.json(updatedUser);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   },
   deleteUser: async (req, res) => {
       try {
           const deletedUser = await userService.deleteUser(req.params.id);
           if (!deletedUser) return res.status(404).json({ message: 'User not found' });
           res.json({ message: 'User deleted' });
       } catch (err) {
           res.status(500).json({ message: err.message });
       }
   },
};
export default userController;