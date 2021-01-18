<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #fff">
      <q-toolbar>
        <q-btn v-if="this.$q.platform.is.desktop"
               class="text-primary"
               flat
               dense
               round
               icon="menu"
               aria-label="Menu"
               @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-teal absolute-center headerTitle">
          Dont forget
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-footer v-if="this.$q.platform.is.mobile && mainLayOut"
              bordered class="bg-white text-primary ">
      <q-tabs
        no-caps
        dense
        class="bg-grey-2 text-primary"
      >
        <q-route-tab
          v-for="link in essentialLinks"
          :key="link.key"
          :icon="link.icon"
          :label="link.title"
          :to="link.link"
        />
      </q-tabs>
    </q-footer>

    <q-drawer v-if="this.$q.platform.is.desktop "
              v-model="leftDrawerOpen"
              show-if-above
              bordered
              content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {mapGetters} from "vuex";


export default {
  name: 'MainLayout',
  components: {EssentialLink},
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: this.$t('skyList'),
          caption: '',
          key: 'sky',
          icon: 'fas fa-list-ul',
          link: `/sky-check/${this.$route.params.id}`
        },
        {
          title: this.$t('Weather'),
          caption: '',
          key: 'weather',
          icon: 'fas fa-cloud-sun',
          link: `/weather/${this.$route.params.id}`
        },
        {
          title: this.$t('Setting'),
          caption: '',
          key: 'Settings',
          icon: 'settings',
          link: '/setting'
        },
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['mainLayOut']),
  },
}
</script>
<style lang="scss" scoped>

</style>
