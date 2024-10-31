<script lang="ts">
    import Calendar from "lucide-svelte/icons/calendar";
    import House from "lucide-svelte/icons/house";
    import Inbox from "lucide-svelte/icons/inbox";
    import Search from "lucide-svelte/icons/search";
    import Settings from "lucide-svelte/icons/settings";
    import ChevronUp from "lucide-svelte/icons/chevron-up";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    
    // Menu items.
    const items = [
     {
      title: "Home",
      url: "/",
      icon: House,
     },
     {
      title: "App",
      url: "/app",
      icon: Inbox,
     },
     {
      title: "Self",
      url: "/self",
      icon: Inbox,
     },
    ];
</script>

<Sidebar.Provider>
    <Sidebar.Root>
     <Sidebar.Header />
     <Sidebar.Content>
         <Sidebar.Group>
         <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
         <Sidebar.GroupContent>
         <Sidebar.Menu>
         {#each items as item (item.title)}
             <Sidebar.MenuItem>
             <Sidebar.MenuButton>
             {#snippet child({ props })}
             <a href={item.url} {...props}>
                 <item.icon />
                 <span>{item.title}</span>
             </a>
             {/snippet}
             <form method="POST" action="auth?/signout">
                 <button>Logout</button>
             </form>
             </Sidebar.MenuButton>
             </Sidebar.MenuItem>
         {/each}
         </Sidebar.Menu>
         </Sidebar.GroupContent>
         </Sidebar.Group>
     </Sidebar.Content>
     <Sidebar.Footer>
      <Sidebar.Menu>
       <Sidebar.MenuItem>
        <DropdownMenu.Root>
         <DropdownMenu.Trigger>
          {#snippet child({ props })}
           <Sidebar.MenuButton
            {...props}
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
           >
            Username
            <ChevronUp class="ml-auto" />
           </Sidebar.MenuButton>
          {/snippet}
         </DropdownMenu.Trigger>
         <DropdownMenu.Content
          side="top"
          class="w-[--bits-dropdown-menu-anchor-width]"
         >
          <DropdownMenu.Item>
           <span>Account</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
           <span>Billing</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
           <span>Sign out</span>
          </DropdownMenu.Item>
         </DropdownMenu.Content>
        </DropdownMenu.Root>
       </Sidebar.MenuItem>
      </Sidebar.Menu>
     </Sidebar.Footer>
    </Sidebar.Root>
    <Sidebar.Inset>
     <header class="flex h-12 items-center justify-between px-4">
      <Sidebar.Trigger />
     </header>
    </Sidebar.Inset>
   </Sidebar.Provider>