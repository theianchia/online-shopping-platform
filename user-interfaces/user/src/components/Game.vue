<template>
  <div class="text-center">
    <v-container fluid>
      <v-card class="d-flex flex-column">
        <v-row class="ma-5">
          <v-col cols="3" class="d-flex flex-column">
            <v-img :src="game.item_image" position="left" contain max-height="500px">
            </v-img>
          </v-col>
          <v-col class="d-flex flex-column">
            <v-card-title v-text="game.item_name" class="bold-30"> </v-card-title>
            <v-card-subtitle class="text-left medium-20 mt-2 mb-n4">
              Platform:
              <span v-text="game.item_platform"></span>
            </v-card-subtitle>
            <v-card-subtitle class="text-left medium-20"
              >Description:</v-card-subtitle
            >
            <v-card-subtitle class="text-left medium-15 mt-n5" v-text="game.item_desc"></v-card-subtitle>
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

export default {
  name: 'Game',
  data() {
    return {
      item_name: this.$route.query.item_name,
      game: {
        item_name: '',
        item_price: 0,
        item_desc: '',
        item_image: '',
        item_platform: '',
        item_stock: 0,
      },
    };
  },
  methods: {
    getGame() {
      const payload = { 'key': { 'item_name': this.item_name }};
      const path = `api/get-item`;
      axios
        .post(path, payload)
        .then((res) => {
          console.log(res.data.Item);
          this.game = res.data.Item;
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
};
</script>
