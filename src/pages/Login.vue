<template>
  <q-page class="q-pa-md" style="margin: 0 auto; max-width: 400px">
    <q-form @submit.prevent="onSubmit">
      <q-card>
        <q-card-section>
          <q-input
            filled
            name="email"
            label="Email"
            v-model="form.model.email"
            :error="form.hasErrorField('email')"
          >
            <template v-slot:error>
              <div
                v-for="error in form.getFieldErrors('email', true)"
                :key="error"
              >{{ $t('formsErrors.' + error) }}</div>
            </template>
          </q-input>

          <q-input
            filled
            name="password"
            type="password"
            label="Пароль"
            v-model="form.model.password"
            :error="form.hasErrorField('password')"
          >
            <template v-slot:error>
              <div
                v-for="error in form.getFieldErrors('password', true)"
                :key="error"
              >{{ $t('formsErrors.' + error) }}</div>
            </template>
          </q-input>

          <div class="q-mt-sm">
            <q-btn :disable="form.busy" label="Войти" type="submit" color="primary" />
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropOptions, SetupContext } from '@vue/composition-api';
import AuthStorage from '@/storages/auth';
import * as UserModel from '@/models/User';

export interface Props extends PropOptions {}

function useBase (props: Props, ctx: SetupContext) {
  const form = ref(new UserModel.FormUserLogin());

  async function onSubmit () {
    try {
      form.value.clearErrors();
      const { data } = await form.value.submit();
      const user = data.user as UserModel.User;
      if (user.role === UserModel.UserRole.Admin) {
        AuthStorage.setToken(data.token);
        AuthStorage.updateUser(user);
        await ctx.root.$router.push({ path: '/' });
      } else {
        form.value.setFields({
          email: {
            errors: ['У этого пользователя нет прав администратора.']
          }
        });
      }
    } catch (err) {}
  }

  return {
    form,
    onSubmit
  }
}

export default defineComponent({
  setup (props: Props, ctx) {
    const base = useBase(props, ctx);
    return {
      ...base
    }
  }
})
</script>
