<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
  import SidebarNav from "./(components)/sidebar-nav.svelte";

  const sidebarNavItems = [
    {
      title: "Profile",
      href: "/account"
    },
    {
      title: "Preferences",
      href: "/account/preferences"
    },
    {
      title: "Security",
      href: "/account/security"
    }
  ];
</script>

<div class="container space-y-6 p-10 pb-16">
  <div class="space-y-0.5">
    <h2 class="text-2xl font-bold tracking-tight">Account</h2>
    <p class="text-muted-foreground">
      Manage your account settings and preferences
    </p>
  </div>
  <Separator class="my-6" />
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <aside class="-mx-4 lg:w-1/5">
      <SidebarNav items={sidebarNavItems} />
    </aside>
    <div class="flex-1 lg:max-w-2xl">
      <slot />
    </div>
  </div>
</div>