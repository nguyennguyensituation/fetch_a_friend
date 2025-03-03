import { BASE_URL } from '@/app/utils/globalUtils';

export const handleSignIn = async (event: React.FormEvent,
  setUsername: (name: string) => void,
  setMessage: (message: string) => void
) => {
  const formData = new FormData(event.target as HTMLFormElement);
  const path = "/auth/login";
  const name = formData.get('name');
  const email = formData.get('email');
  const request = new Request(BASE_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email })
  });

  const response = await fetch(request);
  
  if (response.ok) {
    setUsername(name as string);
  } else {
    setMessage('There was an error signing in. Please try again.')
    throw new Error("There was an error signing in");
  } 
}