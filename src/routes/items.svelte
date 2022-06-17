<script lang="ts">
  import { api_endpoint } from '$lib/api';

  import Login from '$lib/login.svelte';
  import Nav from '$lib/nav.svelte';
  import { user } from '$lib/user';

  interface Item {
    id: number;
    user_id: number;
    item_name: string;
    count: number;
  }

  let items: Item[] | undefined;

  async function update() {
    if (!$user) return;

    const request = await fetch(api_endpoint + '/api/v1/items', {
      method: 'GET',
      credentials: 'same-origin'
    });

    items = await request.json();
    console.log(items);
  }

  user.subscribe(update);

  function remove(id: number) {
    fetch(api_endpoint + '/api/v1/item/' + id, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then(update);
  }

  function use(id: number) {
    fetch(api_endpoint + `/api/v1/item/${id}/add_use`, {
      method: 'POST',
      credentials: 'same-origin'
    }).then(update);
  }
</script>

<h1>Welcome to SvelteKit</h1>

<Nav />

<Login />

{#if $user && items}
  <ul>
    {#each items as item}
      <li>
        <p>{item.item_name} - {item.count}</p>
        <img src="/api/v1/item/{item.id}/image" alt="" />
        <button on:click={() => remove(item.id)}>Remove</button>
        <button on:click={() => use(item.id)}>Use</button>
      </li>
    {/each}
  </ul>
{/if}
