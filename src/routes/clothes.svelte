<script lang="ts">
  import Login from '$lib/login.svelte';
  import Nav from '$lib/nav.svelte';
  import { user } from '$lib/user';

  interface Cloth {
    id: number;
    user_id: number;
    cloth_name: string;
  }

  let clothes: Cloth[] | undefined;

  async function update() {
    if (!$user) return;

    const request = await fetch('https://localhost/api/v1/clothes', {
      method: 'GET',
      credentials: 'same-origin'
    });

    clothes = await request.json();
  }

  user.subscribe(update);

  function remove(id: number) {
    fetch('https://localhost/api/v1/cloth/' + id, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then(update);
  }
</script>

<h1>Welcome to SvelteKit</h1>

<Nav />

<Login />

{#if $user && clothes}
  <ul>
    {#each clothes as cloth}
      <li>
        <p>{cloth.cloth_name}</p>
        <img src="/api/v1/cloth/{cloth.id}/image" alt="" />
        <button on:click={() => remove(cloth.id)}>Remove</button>
      </li>
    {/each}
  </ul>
{/if}
