<script>
  import { v4 as uuid } from "uuid";
  import { append, filter } from "ramda";
  import { slide } from "svelte/transition";
  import { elasticInOut } from "svelte/easing";

  let state = {
    todos: [],
    input: ""
  };

  function addTodo() {
    if (state.input) {
      state = {
        ...state,
        todos: [
          ...state.todos,
          {
            text: state.input,
            id: uuid()
          }
        ],
        input: ""
      };
    }
  }

  const doesNotMatchId = matchId => ({ id }) => id !== matchId;

  function removeTodo(id) {
    if (id) {
      state = { ...state, todos: filter(doesNotMatchId(id))(state.todos) };
    }
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: cadetblue;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 300;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" />
  <script src="https://use.fontawesome.com/releases/v5.3.1/js/all.js">

  </script>
</svelte:head>

<main class="container is-fluid">
  <div class="columns is-centered is-vcentered is-mobile">
    <div class="column is-narrow" style="width: 70%">
      <h1 class="has-text-centered title" id="title">TODO APP</h1>
      <form
        class="field has-addons"
        style="justify-content: center"
        on:submit|preventDefault={addTodo}>
        <div class="control">
          <input
            bind:value={state.input}
            class="input"
            type="text"
            placeholder="TODO" />
        </div>
        <div class="control">
          <button class="button is-primary">
            <span class="icon is-small">
              <i class="fas fa-plus" />
            </span>
          </button>
        </div>
      </form>
      <ul />
      <ul class:list={state.todos.length > 0}>
        {#each state.todos as todo (todo.id)}
          <li
            class="list-item"
            transition:slide={{ duration: 300, easing: elasticInOut }}>
            <div class="is-flex" style="align-items: center">
              <span class="is-pulled-left">{todo.text}</span>
              <div style="flex: 1" />
              <button
                class="button is-text is-pulled-right is-small"
                on:click={() => removeTodo(todo.id)}>
                <span class="icon">
                  <i class="fas fa-times" />
                </span>
              </button>
            </div>
          </li>
        {:else}
          <li
            class="has-text-centered"
            transition:slide={{ delay: 600, duration: 300, easing: elasticInOut }}>
            No Todos!
          </li>
        {/each}
      </ul>
    </div>
  </div>
</main>
