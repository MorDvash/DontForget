<template>
  <q-dialog v-model="popup.status" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Your address</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="popup.task.nameTask" autofocus @keyup.enter="popup = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel"   @click="$emit('trunToFalse')"  />
        <q-btn flat label="Add address"  @click="$emit('trunToFalse')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "EditTask",
  props:['popup'],
  data() {
    return {
      address: ''
    }
  },
  computed:{

  }
}
</script>

<style scoped>

</style>
