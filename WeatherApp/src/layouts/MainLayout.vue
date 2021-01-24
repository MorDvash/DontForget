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

    <lay-out-for-mobile v-if="this.$q.platform.is.mobile && mainLayOut"/>

<!--    <q-drawer v-if="this.$q.platform.is.desktop "-->
<!--              v-model="leftDrawerOpen"-->
<!--              show-if-above-->
<!--              bordered-->
<!--              content-class="bg-grey-1"-->
<!--    >-->
<!--      <q-list>-->
<!--        <q-item-label-->
<!--          header-->
<!--          class="text-grey-8"-->
<!--        >-->
<!--          Essential Links-->
<!--        </q-item-label>-->
<!--        <EssentialLink-->
<!--          v-for="link in essentialLinks"-->
<!--          :key="link.title"-->
<!--          v-bind="link"-->
<!--        />-->
<!--      </q-list>-->
<!--    </q-drawer>-->

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/LayOut/EssentialLink.vue'
import LayOutForMobile from "components/LayOut/LayOutForMobile";
import {mapGetters, mapState} from "vuex";


export default {
  name: 'MainLayout',
  components: {LayOutForMobile, EssentialLink},
  data() {
    return {
      text: '',
      leftDrawerOpen: false,
    }
  },
  computed: {
    ...mapGetters('user', ['mainLayOut']),
  },
}
</script>
<style lang="scss" scoped>

</style>
