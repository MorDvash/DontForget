<template>
  <div>
    <q-btn
      v-for="data in dataBtn"
      flat
      no-caps
      class="column q-mt-sm"
      :key="data.key"
      :label="data.label"
      :icon="data.icon"
      @click="btnFunction(data.function , data.href)"
    />
  </div>
</template>

<script>
import {openURL} from 'quasar'
import {mapActions, mapState} from "vuex";

export default {
  name: "BtnSettings",
  props: ['dataBtn'],
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['forgetPassword', 'signOut', 'deleteUser']),
    btnFunction(functionName, href) {
      switch (functionName) {
        case 'resetPass': {
          this.$q.loading.show()
          this.forgetPassword(this.user.email).then(() => {
            this.$q.loading.hide()
          })
          break
        }
        case 'deleteAccount': {
          this.$q.dialog({
            title: this.$t('sure'),
            message: this.$t('deleteAccountMessage'),
            cancel: true,
          }).onOk(() => {
            this.$q.loading.show()
            this.deleteUser().then(() => {
              this.$q.loading.hide()
              this.$router.push({name: 'login'});
            })
          })
          break
        }
        case 'logout': {
          const self = this
          this.signOut().then(() => {
            self.$router.push({name: 'login'})
          })
          break
        }
        case 'pushTo': {
          openURL(href)
          break
        }
        case 'emailUs': {
          window.location.href = 'mailto:mordvash1@gmail.com?subject=Sky-Check Feedback'
          break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
