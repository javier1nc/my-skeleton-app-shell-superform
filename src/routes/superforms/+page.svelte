<script lang="ts">
import { superForm } from "sveltekit-superforms/client"
import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
import { z } from 'zod';


export let data;

const userSchema = z.object({
    firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      employeeNumber: z.number().min(1)
});

const { form, errors, enhance } = superForm(data.form, {
  validators: userSchema
});
// const { form, errors, enhance, constraints } = superForm(data.form, {
// 	validators: {
// 		firstName: (name) => name.length < 3 ? 'Name must be at least 3 characters' : null,
// 	}
// });

</script>

<SuperDebug data={form}/>

<div class='form-wrapper'>
  <form method="POST" use:enhance>
    <div>
      <label for="name">First Name</label>
      <input class="input" title="Input (text)" type="text" name="firstName" bind:value={$form.firstName}/>
      {#if $errors.firstName}
        <p class='error-para'>{$errors.firstName}</p>
      {/if}
    </div>

    <div>
      <label for="name">Last Name</label>
      <input class="input" title="Input (text)" type="text" name="lastName" bind:value={$form.lastName}/>
      {#if $errors.lastName}
        <p class='error-para'>{$errors.lastName}</p>
      {/if}
    </div>

    <div>
      <label for="email">E-mail</label>
      <input class="input" title="Input (text)" type="email" name="email" bind:value={$form.email}/>
      {#if $errors.email}
        <p class='error-para'>{$errors.email}</p>
      {/if}
    </div>

    <div>
      <label for="email">Employee Number</label>
      <input class="input" title="Input (text)" type="number" name="employeeNumber" bind:value={$form.employeeNumber}/>
      {#if $errors.employeeNumber}
        <p class='error-para'>{$errors.employeeNumber}</p>
      {/if}
    </div>
    <div><button class="btn variant-filled">Submit</button></div>
  </form>
</div>

<style>
.form-wrapper{
  display: flex;
  justify-content: center;
}
button {
    background-color: #008001;
    border-radius: 5px;
    border: none;
    padding: 10px;
  }
  button:hover {
    background-color: #AAD922;
  }
  .error-para{
    color: red;
    font-size: 12px;
  }
</style>
