<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  // import LoginForm from "$lib/components/login-form.svelte";
  let { form } = $props();
</script>

<div class="flex h-screen w-full items-center justify center px-4">  
  <Card.Root class="mx-auto max-w-sm">
    <Card.Header>
      <Card.Title class="text-2xl">Login</Card.Title>
      <Card.Description>Enter your email below to login to your account</Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="grid gap-4">
        <form method="POST" action="?/signin_email">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <!-- <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="##" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
              <form method="POST" action="?/reset">
                <input name="email" placeholder="email" type="email">
                <button style="margin-top: 12px;">Reset Your Password</button>
                </form>
            </div> -->
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" class="w-full">Login</Button>
        </form>
        <!-- oauth providers -->
        <form method="POST" action="?/oauth">
          <Button type="submit" variant="outline" class="w-full" name="provider" value="github">Login with Github</Button>
        </form>
        <form method="POST" action="?/oauth">
          <Button type="submit" variant="outline" class="w-full" name="provider" value="gitlab">Login with Gitlab</Button>
        </form>
        <form method="POST" action="?/oauth">
          <Button type="submit" variant="outline" class="w-full" name="provider" value="google">Login with Google</Button>
        </form>
        <form method="POST" action="?/oauth">
          <Button type="submit" variant="outline" class="w-full" name="provider" value="azure">Login with Microsoft</Button>
        </form>
      </div>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="##" class="underline"> Sign up </a>
      </div>
    </Card.Content>
  </Card.Root>
  
  <!-- <form method="POST" action="?/signin_email">
  <input name="email" placeholder="email" type="email" value={form?.data?.email ?? ""}>
  <input name="password" placeholder="password" type="password">
  <button style="margin-top: 12px;">Login</button>
  <button formaction="?/signup" style="margin-top: 12px;">Signup</button>
  </form> -->

  <!-- <form method="POST" action="?/oauth">
  <button style="margin-top: 12px;" name="provider" value="github">Login with GitHub</button>
  </form> -->

  <!-- <form method="POST" action="?/oauth">
  <button style="margin-top: 12px;" name="provider" value="azure">Login with Azure</button>
  </form> -->

  <!-- <form method="POST" action="?/magic">
  <input name="email" placeholder="email" type="email">
  <button style="margin-top: 12px;">Login with magic link</button>
  </form> -->

  <!-- <form method="POST" action="?/signin_otp">
  <input name="phone" placeholder="phone number" type="text">
  <button style="margin-top: 12px;">Login with phone OTP</button>
  </form> -->

  <!-- <form method="POST" action="?/anon">
  <button style="margin-top: 12px;">Login Anonymously</button>
  </form> -->

  <!-- <form method="POST" action="?/reset">
  <input name="email" placeholder="email" type="email">
  <button style="margin-top: 12px;">Reset Your Password</button>
  </form> -->

  {#if form?.message}
    <p>{form.message}</p>
  {/if}
  {#if form?.error}
    <p style="color: red;">{form.error}</p>
  {/if}
  {#if form?.verify}
    <form method="POST" action="?/verify_otp">
      <input name="otp" placeholder={`OTP sent to ${form?.phone}`} type="text">
      <input name="phone" type="hidden" value={form?.phone}>
      <button style="margin-top: 12px;">Verify</button>
    </form>
  {/if}

</div>
