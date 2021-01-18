<template>
  <q-page class="flex column" :class="bgClass">
    <div class="col q-pt-lg q-px-md">
    <q-input v-model="search" :placeholder="search" @keyup.enter="getWeatherBySearch"  dark>
      <template v-slot:before>
        <q-icon name="my_location" @click="getMyLocation" />
      </template>
      <template v-slot:append>
        <q-btn round dense flat icon="search" @click="getWeatherBySearch" />
      </template>
    </q-input>
  </div>
    <template v-if="weatherData">
    <div class="col text-white text-center">
    <div class="text-h4 text-weight-light">
      {{ weatherData.name }}
      </div>
      <div class="text-h6 text-weight-light">
        {{ weatherData.weather[0].description }}
      </div>
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span>{{ Math.round(weatherData.main.temp) }}</span>
          <span class="text-h4 relative-position degree">&deg;C</span>
      </div>

    </div>
    <div class="col text-center ">
      <img :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`">
    </div>
    </template>
    <template v-else>
      <div class="col column text-center text-white">
      <div class="col text-h2 text-weight-light">
        {{ $t('Searchforweather') }}
      </div>
        <q-btn
          class="col" flat color="white" icon="my_location" label="find my location" @click="getMyLocation" />
      </div>
    </template>
    <div class="col skyline">
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
data(){
    return{
      search: '',
      weatherData: null,
      lat: null,
      lon: null,
      apiUrl : 'https://api.openweathermap.org/data/2.5/weather',
      ApiKey : "3a030bd9f5810c975727dfb010bfe81c",
      lang : 'he'
      }
},
  computed: {
    bgClass(){
      if(this.weatherData){
        if (this.weatherData.weather[0].icon.endsWith('n')){
          return 'bg-night'
        }else {
          return 'bg-day'
        }
      }
    }
  },
  methods :{
    getMyLocation(){
      this.$q.loading.show()
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude
        this.lon = position.coords.longitude
          this.getWeatherByCords()
      })
    },
    getWeatherByCords(){
      this.$q.loading.show()
    this.$axios(`${this.apiUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.ApiKey}&units=metric&lang=${this.lang}`).then(res =>{
      this.weatherData = res.data
      this.$q.loading.hide()
    })
    },
    getWeatherBySearch(){
      this.$q.loading.show()
      this.$axios(`${this.apiUrl}?q=${this.search}&appid=${this.ApiKey}&units=metric&lang=${this.lang}`).then(res =>{
        this.weatherData = res.data
        this.$q.loading.hide()
      })
    }
  }
}
</script>

<style lang="scss">
.q-page{
  background: linear-gradient(to bottom,
    #4ca1af, #c4e0e5)
}
.bg-night{
  background: linear-gradient(to right, #232526, #414345);
}
.bg-day{
  background: linear-gradient(to right, #00b4db, #0083b0);
}
.degree{
  top:-44px
}
.skyline{
  flex : 0 0 100px;
  background-size: contain;
  background-image: url(../../../public/skyline2.png);
}
</style>
