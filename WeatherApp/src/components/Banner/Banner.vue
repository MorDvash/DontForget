<template>
  <q-banner
    inline-actions
    :class="title.bgColor"
    class="text-white text-center ">
    <template v-slot:avatar>
      <q-icon :name="title.icon" color="white" />
    </template>
    <span class="text-bold text-subtitle1">{{title.msg}}</span>
  </q-banner>
</template>

<script>
export default {
  props: ['title'],
  name: "Banner"
}
</script>

<style scoped>


</style>
