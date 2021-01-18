<template>
  <q-layout class="constrain" >
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
// import LoginPage from "pages/Login/LoginPage";
// import {mapState} from "vuex";

export default {
  name: "loginLayout"
//   components: {
//     LoginPage
//   },
//   computed: {...mapState ('user',['settings'])}
}

</script>


<style>
.light {
  background: #fafafa;
  color: #1D1D1D;
}

.dark {
  background: #111111;
  color: #ffffff;
}

.dark header, .dark aside, .dark footer, .dark input, .dark textarea{
  background: #1D1D1D;
  color: white;
}
</style>
