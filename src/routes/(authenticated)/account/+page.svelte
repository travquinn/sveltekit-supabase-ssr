<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import type { PageData } from './$types';

  export let data: PageData;

  const { form, errors, enhance } = superForm(data.emailForm);
</script>

<form method="POST" action="?/convert_email" use:enhance>
  <div class="space-y-4">
    <Input
      type="email"
      name="email"
      bind:value={$form.email}
      error={$errors.email}
    />
    <Input
      type="password"
      name="password"
      bind:value={$form.password}
      error={$errors.password}
    />
    <Button type="submit">Update Email</Button>
  </div>
</form>
