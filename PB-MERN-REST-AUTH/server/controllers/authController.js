import authService from '../services/authService.js';

const authController = {
   login: async (req, res) => {
    console.log("Login attempt with data:", req.body);
       try {
           const { userId, password } = req.body;
           const result = await authService.login(userId, password);
           res.json(result);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   },
    addRole: async (req, res) => {
       try {
           const { userId, roleName } = req.body;
           const result = await authService.addRole(userId, roleName);
           res.json(result);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   },

   removeRole: async (req, res) => {
       try {
           const { userId, roleName } = req.body;
           const result = await authService.removeRole(userId, roleName);
           res.json(result);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   }
};

export default authController;