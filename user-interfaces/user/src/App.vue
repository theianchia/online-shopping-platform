<template>
  <v-app>
    <NavigationBar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import HelloWorld from './components/HelloWorld.vue';
import NavigationBar from './components/NavigationBar.vue';
import Games from './components/Games.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    NavigationBar,
    Games,
  },
});
</script>
