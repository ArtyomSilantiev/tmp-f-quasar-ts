<template>
  <q-page class="q-pa-md q-gutter-md">
    <std-breadcrumbs-component />

    <q-card>
      <q-card-section>
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
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, PropOptions, PropType, SetupContext, onMounted } from '@vue/composition-api';
import AuthStorage from '@/storages/auth';
import StdBreadcrumbsComponent from "@/components/StdBreadcrumbsComponent.vue";

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
  return { user };
}
</script>
