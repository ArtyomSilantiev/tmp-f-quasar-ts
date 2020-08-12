<template>
  <q-page class="q-pa-md">
    <std-breadcrumbs-component />
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
