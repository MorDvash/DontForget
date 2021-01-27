<template>
  <div>
    <q-expansion-item
      v-for="setting in settings"
      class="q-mt-sm"
      :group="setting.group"
      header-class="text-white"
      switch-toggle-side
      expand-separator
      :key="setting.key"
      :icon="setting.icon"
      :label="setting.title"
    >
      <q-card>
        <q-card-section>
          <BtnSettings v-if="setting.key !== 'lang' || setting.key !== 'Info'" :data-btn="setting.btn"/>
          <option-group-settings v-if="setting.key === 'lang'"  :options="setting.options"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>

import BtnSettings from "components/Settings/BtnSettings";
import OptionGroupSettings from "components/Settings/OptionGroupSettings";
export default {
  name: "ExpansionItem",
  components: {OptionGroupSettings, BtnSettings},
  props: ['settings'],
  data() {
    return {}
  },

}
</script>

<style scoped>

</style>
