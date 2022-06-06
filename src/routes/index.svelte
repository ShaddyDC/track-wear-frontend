<script lang="ts">
  import Login from '$lib/login.svelte';
  import Nav from '$lib/nav.svelte';
  import { user } from '$lib/user';

  //   const  local_user =$ user;
</script>

<h1>Welcome to SvelteKit</h1>
<Nav />

<Login />

{#if $user}
  <p>Hello {$user.username}</p>
{/if}
