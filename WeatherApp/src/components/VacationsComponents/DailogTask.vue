<template>
  <q-card>
    <q-toolbar>
      <q-icon name="fas fa-snowboarding"/>
      <q-toolbar-title>
        <span class="text-weight-bold">
          {{ $t('Addvacation') }}
        </span>
      </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup/>
    </q-toolbar>
    <q-form @submit="save">
      <q-card-section>
        <q-input outlined class="row q-mb-md"
                 ref="Qautocomplete"
                 autofocus
                 v-model="vacation.placeName"
                 :label="$t('location')"
                 :rules="[ val => !!val || $t('pleaseEnterUserVacation'),]"
        >
          <template v-slot:prepend>
            <q-icon name="place"/>
          </template>
        </q-input>
        <q-date
          v-model="vacation.rangeDate"
          range
          :subtitle="$t('pickDate')"
          :options="options"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn type="submit" flat :label="$t('save')" v-close-popup/>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import {date} from 'quasar'
import {mapActions} from "vuex";

export default {
  name: "DailogTask",
  data() {
    return {
      vacation: {
        placeName: '',
        rangeDate: {
          from: '',
          to: ''
        },
      }
    }
  },
  mounted() {
    let defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(41.89193, 12.51133));

    let input = document.getElementById(this.$refs.Qautocomplete.$refs.input.id);
    let options = {
      bounds: defaultBounds,
      types: ['address']
    };
    let autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.addListener("place_changed" , ()=> {
        this.vacation.placeName = autocomplete.getPlace().formatted_address;
      })
  },
  methods: {
    ...mapActions("vacations", ["InsertVacation"]),
    options(dateRange) {
      let timeStamp = Date.now()
      return dateRange >= date.formatDate(timeStamp, 'YYYY/MM/DD')
    },
    save() {
      this.$q.loading.show()
      this.InsertVacation(this.vacation).then(() => {
        this.$q.loading.hide()
      })
    },
  }
}
</script>

<style scoped>


</style>
