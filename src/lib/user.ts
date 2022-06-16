import type { CredentialResponse } from 'google-one-tap';
import { derived, writable, type Writable } from 'svelte/store';
import { api_endpoint } from './api';

interface User {
  username: string;
}

const userStore: Writable<User | undefined> = writable(undefined);
export const user = derived(userStore, ($userStore) => $userStore);

export async function check_login() {
  const request = await fetch(api_endpoint + '/api/v1/check_login', {
    method: 'GET',
    credentials: 'same-origin'
  });
  const logged_in = request.status === 200;

  const json = await request.json();

  console.log('check response', request, json);

  const user = logged_in ? json : undefined;
  userStore.update(() => user);

  return user;
}

export async function handleCredentialResponse({ credential }: CredentialResponse) {
  const response = await fetch(api_endpoint + '/api/v1/login', {
    method: 'POST',
    credentials: 'same-origin',
    body: credential
  });
  console.log('login response', response);

  return await check_login();
}
