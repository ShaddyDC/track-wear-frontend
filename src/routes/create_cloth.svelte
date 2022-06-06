<script lang="ts">
  import Login from '$lib/login.svelte';
  import Nav from '$lib/nav.svelte';
  import { user } from '$lib/user';

  let name = 'Piece';
  let file: FileList;

  let output = '';

  const post = async function (event: SubmitEvent) {
    const data = new FormData();

    const image = file[0];

    if (!image) return;

    data.append('name', name);
    data.append('image', image);

    const request = await fetch('https://localhost/api/v1/create_cloth', {
      method: 'POST',
      credentials: 'same-origin',
      body: data
    });

    output = await request.text();
  };
</script>

<h1>Welcome to SvelteKit</h1>

<Nav />

<Login />

{#if $user}
  <form on:submit|preventDefault={post}>
    <label for="name">Piece of clothing:</label><br />
    <input type="text" id="name" name="name" bind:value={name} /><br />
    <input type="file" id="image" name="image" bind:files={file} /><br />
    <input type="submit" value="Submit" />
  </form>
  <p>{output}</p>
{/if}
