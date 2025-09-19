// src/services/authService.ts
import { useAuthStore } from '../store/authStore';

export function isUserLoggedIn() {
  // Option 1: Check Zustand store (works in components)
  const isAuthenticated = useAuthStore.getState().isAuthenticated;
  return isAuthenticated;

  // Option 2: Check token in localStorage (works anywhere)
  // return !!localStorage.getItem('token');
}
// usage example
// import { isUserLoggedIn } from '../services/authService';
// if (isUserLoggedIn()) {
//   // User is logged in
// } else {
//   // Redirect to login or show message
// }

// check if user has a specific role
export function userHasRole(role: string) {
  const user = useAuthStore.getState().user;
  return user?.roles.includes(role);
}

//usage example
// if (userHasRole('admin')) {
//   // Show admin features
// } else {
//   // Hide admin features
// }