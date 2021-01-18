<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn no-caps color="white" text-color="black" :label="$t('ChangeLang')" @click="changeLang"/>
  </div>
</template>

<script>
export default {
name: "ChangeLangButton",
  data(){
  return{}
  },
  methods: {
    changeLang() {
      const set = {name: 'lang'};
      if ( this.$i18n.locale === 'en-us') set.value = 'he';
      else set.value = 'en-us';
      this.$i18n.locale = set.value;
      import('quasar/lang/' + set.value).then(lang => {
        this.$q.lang.set(lang.default)
      })
    },
  }
}
</script>

<style scoped>

</style>
