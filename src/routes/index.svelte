<script lang="ts">
  import Login from '$lib/login.svelte';
  import { user } from '$lib/user';

  //   const  local_user =$ user;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Login />

{#if $user}
  <p>Hello {$user.username}</p>
{/if}
