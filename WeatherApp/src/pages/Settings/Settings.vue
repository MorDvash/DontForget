<template>
  <q-page class="flex column backGroundApp">
    <h4 class="text-center text-white">{{ $t('Settings') }}</h4>
    <q-list class="rounded-borders" >
      <expansion-item :settings="settings"/>
    </q-list>
  </q-page>
</template>
<script>
import ExpansionItem from "components/Settings/ExpansionItem";

export default {
  name: "Settings",
  components: {ExpansionItem},
  data() {
    return {
      settings: [
        {
          title: this.$t('AccountProfile'),
          caption: 'profile',
          key: 'AccountProfile',
          icon: 'perm_identity',
          group: 'sameGroup',
          btn: [
            {label: this.$t('resetPass'), key: 'resetPass', function: 'resetPass'},
            {label: this.$t('deleteAccount'), key: 'deleteAccount', function: 'deleteAccount'},
            {label: this.$t('logout'), key: 'logout', function: 'logout'}
          ]
        },
        {
          title: this.$t('lang'),
          caption: '',
          key: 'lang',
          icon: 'fas fa-language',
          group: 'sameGroup',
          options: [
            {label: this.$t('english'), value: 'en-us'},
            {label: this.$t('hebrew'), value: 'he'},
          ]
        },
        {
          title: this.$t('Content'),
          caption: '',
          key: 'Content',
          icon: 'far fa-comment-dots',
          group: 'sameGroup',
          btn: [
            {
              label: this.$t('ContentWithWhatsapp'), key: 'whatsapp', icon: 'fab fa-whatsapp', function: 'pushTo',
              href: 'https://api.whatsapp.com/send?phone=972507129929&text=%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%20%D7%A9%D7%99%D7%A6%D7%A8%D7%95%20%D7%90%D7%99%D7%AA%D7%99%20%D7%A7%D7%A9%D7%A8'
            },
            {
              label: this.$t('ContentWithFacebook'), key: 'deleteAccount', icon: 'fab fa-facebook', function: 'pushTo',
              href: 'https://www.facebook.com/mor.dvash.7'
            },
            {label: this.$t('ContentWithEmail'), key: 'email', icon: 'far fa-envelope', function: 'emailUs'},
          ]
        },
        {
          title: this.$t('Info'),
          caption: '',
          key: 'Info',
          icon: 'fas fa-info',
          group: 'sameGroup'
        },
        // {
        //   title: this.$t('Mode'),
        //   caption: '',
        //   key: 'Mode',
        //   icon: 'fas fa-moon',
        //   group: 'sameGroup',
        //   btn: [
        //     {label: this.$t('lightMode') ,key: 'lightMode', function: 'lightMode'},
        //     {label: this.$t('darkMode') , key: 'darkMode', function: 'darkMode'}
        //   ]
        // },
      ],
    }
  },
}

</script>

<style scoped>

</style>
