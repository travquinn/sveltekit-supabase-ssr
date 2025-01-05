// +page.server.ts
import { superValidate } from 'sveltekit-superforms/server';
import { userSchema } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import { users } from '$lib/server/db/schema';
import type { Actions } from './$types';

// Create form validation schemas using drizzle-zod
const emailFormSchema = userSchema.pick({ email: true }).extend({
  password: z.string().min(8)
});

const nicknameFormSchema = userSchema.pick({ nickname: true });
const phoneFormSchema = userSchema.pick({ phone: true });

export const load = async ({ locals: { getSession } }) => {
  const session = await getSession();
  
  return {
    session,
    emailForm: await superValidate(emailFormSchema),
    nicknameForm: await superValidate(nicknameFormSchema),
    phoneForm: await superValidate(phoneFormSchema)
  };
};

export const actions: Actions = {
  update_nickname: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, nicknameFormSchema);
    
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await db.transaction(async (tx) => {
        await tx.update(users)
          .set({ nickname: form.data.nickname })
          .where(eq(users.id, session.user.id));
        
        await supabase.auth.updateUser({
          data: { nickname: form.data.nickname }
        });
      });

      await supabase.auth.refreshSession();
      return { form };
    } catch (error) {
      return fail(500, { form, error: 'Failed to update nickname' });
    }
  },

  // Similar pattern for other actions
  update_phone: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, phoneFormSchema);
    
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await db.transaction(async (tx) => {
        await tx.update(users)
          .set({ phone: form.data.phone })
          .where(eq(users.id, session.user.id));
          
        await supabase.auth.updateUser({
          phone: form.data.phone
        });
      });

      return {
        form,
        verify: true,
        phone: form.data.phone
      };
    } catch (error) {
      return fail(500, { form, error: 'Failed to update phone' });
    }
  }
};
