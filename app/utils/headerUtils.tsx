import { BASE_URL } from '@/app/utils/globalUtils';

export function showFavorites(e: React.MouseEvent, 
  setDisplayFaves: (display: boolean) => void) {
  e.preventDefault();
  setDisplayFaves(true);
}

export async function logOut(e: React.MouseEvent,
  resetApp: () => void ) {
  e.preventDefault();

  if (confirm('Are you sure you want to sign out?')) {
    const path = '/auth/logout';
    const response = await fetch(BASE_URL + path, {
      method: 'POST',
      credentials: 'include'
    })
  
    if (response.ok) {
      resetApp()
    } else {
      throw new Error("There was an error signing out");
    }
  }
}