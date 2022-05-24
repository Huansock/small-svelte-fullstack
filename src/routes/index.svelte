<script context="module" lang="ts">
    let todoslist :Todo[]
import type { Load } from "@sveltejs/kit";
 export const load: Load = async ({ fetch }) => {
    const res = await fetch("/Tlqkf");
    if (res.ok) {
      const todos = await res.json();
      todoslist = todos
      return {
        props: { todos }
      }
    }

    const { message } = await res.json();
    return {
      error: new Error(message)
    }
  };
 
</script>

<form method="post" action="/Tlqkf" >
  <input type="text" name="text" >
  
</form>
<h1>방명록 목록</h1>
{#each todoslist as todo}

<div class="todo">
<h4>{todo.id}</h4>
<h1>{todo.content}</h1>
<h3>{todo.createdAt}</h3>
</div>


{/each}
<style>
  .todo{
      display: flex;
      text-align: center;
      justify-content: space-between;
  }
  .todo h1,h4,h3{
margin-left: 2rem;
margin-right: 3rem;
  }
  form{
    margin: 0 auto;
    text-align: center;
  }
  form input{
    height:5rem;
    width: 90%;
    margin: 2rem 2rem;
    font-size: 40px;
    text-align: center;
  }
</style>