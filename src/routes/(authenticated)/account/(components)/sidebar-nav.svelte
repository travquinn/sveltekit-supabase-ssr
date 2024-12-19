<script lang="ts">
  import { page } from "$app/stores";
  import * as Button from "$lib/components/ui/button";
  import type { SidebarNavItem } from "$lib/types";

  let { items } = $props<{ items: SidebarNavItem[] }>();
</script>

<nav class="grid gap-2">
  {#each items as item}
    <Button.Root
      variant={$page.url.pathname === item.href ? "secondary" : "ghost"}
      class="w-full justify-start"
      href={item.href}
    >
      {item.title}
    </Button.Root>
  {/each}
</nav>