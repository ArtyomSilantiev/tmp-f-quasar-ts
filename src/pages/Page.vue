<template>
  <q-page class="text-center q-mt-xl">
    <div>
      {{ $route.meta.name }} page!
    </div>
    <div class="q-mt-md">
      <q-btn to="/" label="Main page" />
    </div>
    <div class="q-mt-md">
      <span>token: {{ token }}</span>
    </div>
    <div class="q-mt-md">
      <div v-if="!token">
        <q-btn label="Login" @click="login" />
      </div>
      <div v-else >
        <q-btn label="Logout" @click="logout" />
        <q-space />
        <q-btn to="/guarded" label="Guarded this page" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthStorage from '../storages/Auth';

import { computed } from '@vue/composition-api';

export default Vue.extend({
  setup () {
    const token = computed(() => AuthStorage.getToken());
    return {
      token,
      login () {
        AuthStorage.setToken(Math.ceil(Math.random() * 8999 + 1000).toString(16));
      },
      logout () {
        AuthStorage.clearToken();
      }
    };
  }
})
</script>
