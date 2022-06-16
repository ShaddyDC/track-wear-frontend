<script lang="ts">
  import { api_endpoint } from '$lib/api';

  import Login from '$lib/login.svelte';
  import Nav from '$lib/nav.svelte';
  import { user } from '$lib/user';

  interface Cloth {
    id: number;
    user_id: number;
    cloth_name: string;
    count: number;
  }

  let clothes: Cloth[] | undefined;

  async function update() {
    if (!$user) return;

    const request = await fetch(api_endpoint + '/api/v1/clothes', {
      method: 'GET',
      credentials: 'same-origin'
    });

    clothes = await request.json();
    console.log(clothes);
  }

  user.subscribe(update);

  function remove(id: number) {
    fetch(api_endpoint + '/api/v1/cloth/' + id, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then(update);
  }

  function wear(id: number) {
    fetch(api_endpoint + `/api/v1/cloth/${id}/add_wear`, {
      method: 'POST',
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
        <p>{cloth.cloth_name} - {cloth.count}</p>
        <img src="/api/v1/cloth/{cloth.id}/image" alt="" />
        <button on:click={() => remove(cloth.id)}>Remove</button>
        <button on:click={() => wear(cloth.id)}>Wear</button>
      </li>
    {/each}
  </ul>
{/if}
