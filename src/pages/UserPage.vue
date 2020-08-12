<template>
  <q-page class="q-pa-md q-gutter-md">
    <std-breadcrumbs-component />

    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="tab1" label="Информация" />
        <q-tab name="tab2" label="Смена пароля" />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
      >
        <q-tab-panel name="tab1">
          <q-list>
            <q-item>
              ID: {{ user.id }}
            </q-item>
            <q-item>
              Email: {{ user.email }}
            </q-item>
            <q-item>
              Роль: {{ user.role }}
            </q-item>
            <q-item>
              Имя: {{ user.firstName }}
            </q-item>
            <q-item>
              Фамилия: {{ user.firstName }}
            </q-item>
            <q-item>
              Дата регистрации: {{ user.createdAt | date('DD.MM.YYYY HH:mm') }}
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="tab2">
          <q-form @submit.prevent="changePassSubmit">
            <q-input
              filled
              name="oldPassword"
              type="password"
              label="Старый пароль"
              v-model="changePassForm.model.oldPassword"
              :error="changePassForm.hasErrorField('oldPassword')"
            >
              <template v-slot:error>
                <div
                  v-for="error in changePassForm.getFieldErrors('oldPassword', true)"
                  :key="error"
                >{{ $t('formsErrors.' + error) }}</div>
              </template>
            </q-input>

            <q-input
              filled
              name="newPassword"
              type="password"
              label="Новый пароль"
              v-model="changePassForm.model.newPassword"
              :error="changePassForm.hasErrorField('newPassword')"
            >
              <template v-slot:error>
                <div
                  v-for="error in changePassForm.getFieldErrors('newPassword', true)"
                  :key="error"
                >{{ $t('formsErrors.' + error) }}</div>
              </template>
            </q-input>

            <q-input
              filled
              name="newPasswordConfirmation"
              type="password"
              label="Новый пароль ещё раз"
              v-model="changePassForm.model.newPasswordConfirmation"
              :error="changePassForm.hasErrorField('newPasswordConfirmation')"
            >
              <template v-slot:error>
                <div
                  v-for="error in changePassForm.getFieldErrors('newPasswordConfirmation', true)"
                  :key="error"
                >{{ $t('formsErrors.' + error) }}</div>
              </template>
            </q-input>

            <div class="q-mt-sm">
              <q-btn :disable="changePassForm.busy" label="Отправить" type="submit" color="primary" />
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, PropOptions, PropType, SetupContext, onMounted, watch } from '@vue/composition-api';
import AuthStorage from '@/storages/auth';
import StdBreadcrumbsComponent from "@/components/StdBreadcrumbsComponent.vue";
import { FormUserPasswordChange } from '@/models/User';
import { Dialog } from 'quasar';

export interface Props extends PropOptions {}

export default defineComponent({
  name: 'UserPage',

  components: {
    StdBreadcrumbsComponent
  },

  meta () {
    return {
      title: 'Пользователь'
    };
  },

  setup (props: Props, ctx: SetupContext) {
    const base = useBase(props, ctx);
    return {
      ...base
    };
  }
});

function useBase (props: Props, ctx: SetupContext) {
  const user = ref(AuthStorage.getUser());
  const tab = ref('tab1');
  const changePassForm = ref(new FormUserPasswordChange());

  async function changePassSubmit () {
    try {
      await changePassForm.value.submit();
      changePassForm.value = new FormUserPasswordChange();
      Dialog.create({
        title: '',
        message: 'Пароль сменён',
      });
    } catch (error) {
      console.error(error);
    }
  }

  watch(() => tab.value, (newVal) => {
    if (newVal === 'tab2') {
      changePassForm.value = new FormUserPasswordChange();
    }
  });

  return { user, tab, changePassForm, changePassSubmit };
}
</script>
