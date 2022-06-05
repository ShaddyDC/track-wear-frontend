<script lang="ts">
  import type { CredentialResponse } from 'google-one-tap';
  import Cookies from 'js-cookie';

  export let logged_in = false;

  async function handleCredentialResponse(response: CredentialResponse) {
    console.log('Encoded JWT ID token: ' + response.credential);
    const res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      mode: 'cors',
      body: response.credential
    });
    const token = await res.text();
    console.log(res, token);

    const valid = await fetch('http://localhost:8000//check_login', {
      method: 'POST',
      mode: 'cors',
      body: token
    });

    logged_in = (await valid.text()) === 'valid';
    if (logged_in) Cookies.set('token', token);
    console.log('Looged in', logged_in);
  }
  const google_loaded = async () => {
    const token = Cookies.get('token');
    const valid = await fetch('http://localhost:8000//check_login', {
      method: 'POST',
      mode: 'cors',
      body: token
    });
    logged_in = (await valid.text()) === 'valid';
    if (logged_in) return;

    google.accounts.id.initialize({
      client_id: '513324624986-fn538769dc89nlp075t083h03ihnjldi.apps.googleusercontent.com',
      callback: handleCredentialResponse
      //   auto_select: true,
    });
    const button = document.getElementById('buttonDiv');
    if (!button) throw new Error('Button not found');

    google.accounts.id.renderButton(
      button,
      { theme: 'outline', size: 'large' } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  };
</script>

<head>
  <script src="https://accounts.google.com/gsi/client" async defer on:load={google_loaded}></script>
</head>

<h1>Welcome to the signin page</h1>
{#if logged_in}
  <p>Logged in!</p>
{:else}
  <p>Please log in</p>
  <div id="buttonDiv" />
{/if}
