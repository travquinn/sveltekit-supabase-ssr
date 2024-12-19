<script lang="ts">
  import { run } from 'svelte/legacy';
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { toast } from "svelte-sonner";

  let { data, form } = $props();
  let { session } = $state(data);
  
  run(() => {
    ({ session } = data);
  });

  const provider = session?.user.app_metadata.provider;
</script>

{#if session}
  <Card.Root>
    <Card.Header>
      <Card.Title>Profile</Card.Title>
      <Card.Description>
        View and update your profile information
      </Card.Description>
    </Card.Header>
    <Card.Content class="space-y-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={session.user.email || ""} 
            disabled 
          />
        </div>

        <div class="space-y-2">
          <Label for="phone">Phone Number</Label>
          <form method="POST" action="?/update_phone" class="flex gap-2">
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              placeholder={session.user.phone || "Add phone number"} 
            />
            <Button type="submit">Update</Button>
          </form>
        </div>

        <div class="space-y-2">
          <Label for="nickname">Nickname</Label>
          <form method="POST" action="?/update_nickname" class="flex gap-2">
            <Input 
              id="nickname" 
              name="nickname" 
              type="text" 
              value={form?.data?.nickname ?? session.user.user_metadata.nickname ?? ""} 
              placeholder="Add nickname"
            />
            <Button type="submit">Update</Button>
            <Button 
              type="submit" 
              formaction="?/delete_nickname" 
              variant="destructive"
            >
              Delete
            </Button>
          </form>
        </div>

        {#if provider === 'email'}
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <form method="POST" action="?/update_password" class="flex gap-2">
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="New password" 
              />
              <Button type="submit">Change</Button>
            </form>
          </div>
        {/if}

        {#if session.user.is_anonymous}
          <Card.Root>
            <Card.Header>
              <Card.Title>Convert Account</Card.Title>
              <Card.Description>
                Convert your anonymous account to a permanent one
              </Card.Description>
            </Card.Header>
            <Card.Content class="space-y-4">
              <form method="POST" action="?/convert_provider">
                <Button type="submit" name="provider" value="github" class="w-full">
                  Continue with GitHub
                </Button>
              </form>

              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <span class="w-full border-t"></span>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <form method="POST" action="?/convert_email" class="space-y-4">
                <div class="space-y-2">
                  <Label for="convert-email">Email</Label>
                  <Input
                    id="convert-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <Label for="convert-password">Password</Label>
                  <Input
                    id="convert-password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <Button type="submit" class="w-full">
                  Create Account
                </Button>
              </form>
            </Card.Content>
          </Card.Root>
        {/if}
      </div>
    </Card.Content>
  </Card.Root>
{/if}

{#if form?.message}
  <p class="mt-4 text-sm text-muted-foreground">{form.message}</p>
{/if}

{#if form?.error}
  <p class="mt-4 text-sm text-destructive">{form.error}</p>
{/if}

{#if form?.verify}
  <Card.Root class="mt-4">
    <Card.Header>
      <Card.Title>Verify Phone Number</Card.Title>
      <Card.Description>
        Enter the verification code sent to {form?.phone}
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <form method="POST" action="?/verify_otp" class="flex gap-2">
        <Input 
          name="otp" 
          type="text" 
          placeholder="Enter verification code" 
          required 
        />
        <input name="phone" type="hidden" value={form?.phone}>
        <Button type="submit">Verify</Button>
      </form>
    </Card.Content>
  </Card.Root>
{/if}
