<template>
  <div class="text-center">
    <v-container fluid>
      <v-card class="d-flex flex-column">
        <v-row class="ma-5">
          <v-col cols="3" class="d-flex flex-column">
            <v-img :src="game.image" position="left" contain max-height="500px">
            </v-img>
          </v-col>
          <v-col class="d-flex flex-column">
            <v-card-title v-text="game.title" class="bold-30"> </v-card-title>
            <v-card-subtitle class="text-left medium-15 mt-2 mb-n4">
              Platform:
              <span v-text="game.platform"></span>
            </v-card-subtitle>
            <v-card-subtitle class="text-left medium-15"
              >Description:</v-card-subtitle
            >
            <v-card-subtitle v-text="game.description"></v-card-subtitle>
            <v-spacer></v-spacer>
            <v-card-actions class="ml-auto">
              <v-btn color="#353535">
                <v-card-subtitle
                class="white-15"
                @click="handleAddToCart()"
                >Add to Cart</v-card-subtitle>
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Game',
  data() {
    return {
      id: this.$route.query.game_id,
      game: {
        id: 0,
        title: '',
        price: 0,
        description: '',
        image: '',
        platform: '',
        stock: 0,
      },
    };
  },
  methods: {
    getGame() {
      const path = `api/games/${this.id}`;
      axios
        .get(path)
        .then((res) => {
          console.log(res.data.data);
          this.game = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleAddToCart() {
      this.$store.dispatch('addGameToCart', this.game);
    },
  },
  created() {
    this.getGame();
  },
});
</script>
