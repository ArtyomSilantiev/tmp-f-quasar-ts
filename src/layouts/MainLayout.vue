<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Brand
        </q-toolbar-title>

        <div>
          <q-btn flat dense icon="logout" title="Выход" :to="{ path: '/logout' }" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item
          v-for="item in items"
          :key="item.link"
          clickable
          tag="a"
          :active="item.link === $route.path"
          :to="{ path: item.link }"
        >
          <q-item-section
            v-if="item.icon"
            avatar
          >
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label item.caption>
              {{ item.caption }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false,
      items: [
        {
          title: 'Главная',
          caption: '',
          icon: 'dashboard',
          link: '/'
        }, {
          title: 'Пользователь',
          caption: '',
          icon: 'account_circle',
          link: '/user'
        }
      ]
    }
  },

  mounted () {}
}
</script>
