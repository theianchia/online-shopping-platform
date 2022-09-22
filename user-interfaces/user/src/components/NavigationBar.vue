<template>
  <div>
    <v-app-bar color="#3C6E71" dense height="120" elevation="0">
      <v-btn to="/" class="py-7" :ripple="false" plain>
        <v-img class="mx-5" src="../assets/shop_logo.png" max-height="100" max-width="100"></v-img>
        <v-toolbar-title>
          <h1 class="navbar-title">GamerSG</h1>
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon class="mx-5">
        <v-icon large color="#FFFFFF">mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
};
</script>
