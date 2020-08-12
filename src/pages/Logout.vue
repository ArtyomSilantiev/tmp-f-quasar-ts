<template>
  <q-page class="q-pa-md" style="margin: 0 auto; max-width: 400px">
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import AuthStorage from '@/storages/auth';

export default defineComponent({
  setup (props, ctx) {
    onMounted(async () => {
      await AuthStorage.logout();
      await ctx.root.$router.replace({ path: '/auth/login' });
    });
    return {}
  }
})
</script>
