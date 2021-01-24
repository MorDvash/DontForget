<template>
  <q-input v-if="TaskFotter"
           :class="inputData.bgColor"
           :color="inputData.color"
           :label-color="inputData.labelColor"
           clearable
           rounded
           outlined
           v-model="inputData.input"
           :label="inputData.label"
           @keyup.esc="inputData.input = ''"
  >
    <template v-slot:append>
      <q-icon
        :name="inputData.icon"
        :color="inputData.color"
        class="cursor-pointer"/>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "InputText",
  props: ['TaskFotter','inputData'],
}
</script>

<style scoped>

</style>
