<script lang="ts">
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';
    import { ChevronRight } from 'lucide-svelte';
  
    const breadcrumbs = derived(page, $page => {
      const segments = $page.url.pathname.split('/').filter(Boolean);
      return segments.map((segment, index) => ({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        url: '/' + segments.slice(0, index + 1).join('/')
      }));
    });
</script>

<nav class="flex items-center text-sm font-medium" aria-label="Breadcrumb">
    <ul class="flex items-center gap-1.5">
        <li>
            <a href="/app" class="text-muted-foreground hover:text-foreground transition-colors">
                Home
            </a>
        </li>
        {#each $breadcrumbs as crumb, index}
            <ChevronRight class="h-4 w-4 text-muted-foreground" />
            <li>
                {#if index === $breadcrumbs.length - 1}
                    <span class="text-foreground font-medium">
                        {crumb.name}
                    </span>
                {:else}
                    <a href={crumb.url} class="text-muted-foreground hover:text-foreground transition-colors">
                        {crumb.name}
                    </a>
                {/if}
            </li>
        {/each}
    </ul>
</nav>