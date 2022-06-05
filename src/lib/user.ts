import type { CredentialResponse } from 'google-one-tap';
import Cookies from 'js-cookie';
import { derived, writable, type Writable } from 'svelte/store';

interface User {
  username: string;
}

const userStore: Writable<User | undefined> = writable(undefined);
export const user = derived(userStore, ($userStore) => $userStore);

export async function check_login() {
  const session = Cookies.get('session');
  const request = await fetch('http://localhost:8000/api/v1/check_login', {
    method: 'POST',
    mode: 'cors',
    body: session
  });
  const logged_in = request.status === 200;

  const user = logged_in ? await request.json() : undefined;
  userStore.update(() => user);

  return user;
}

export async function handleCredentialResponse({ credential }: CredentialResponse) {
  const response = await fetch('http://localhost:8000/api/v1/login', {
    method: 'POST',
    mode: 'cors',
    body: credential
  });
  const session = await response.text();
  Cookies.set('session', session);

  return await check_login();
}
