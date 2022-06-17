<script lang="ts">
  import { check_login, handleCredentialResponse, user } from './user';

  const google_loaded = async () => {
    if (await check_login()) return;

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: true
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

{#if !$user}
  <p>Please log in</p>
  <div id="buttonDiv" />
{/if}
