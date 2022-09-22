<template>
  <div class="text-center">
    <v-container fluid>
      <v-row class="ma-5">
        <v-col
          v-for="(game, i) in games"
          :key="i"
          :cols="4"
          class="d-flex flex-column"
        >
          <v-card>
            <v-img
              :src="game.image"
              class="white--text align-end game-image"
              height="500px"
              contain
              @click="showGame(game.id)"
            >
            </v-img>
            <v-card-title @click="showGame(game.id)">
              <v-spacer />
              <div class="text-center">
                <h3 v-text="game.title"></h3>
                <p v-text="game.platform" class="medium-15 mb-n5"></p>
              </div>
              <v-spacer />
            </v-card-title>
            <v-card-actions>
              <v-btn color="#353535" class="mx-auto">
                <v-card-subtitle
                class="white-15"
                @click="handleAddToCart(game.id)"
                >Add to Cart</v-card-subtitle>
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      v-model="page"
      circle
      class="mb-5"
      color="#3C6E71"
      :length="this.total_pages"
      @input="handlePageChange"
    ></v-pagination>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Games',
  data() {
    return {
      game_id: 0,
      page: 1,
      games_per_page: 2,
      total_pages: 0,
      games: {
        title: '',
        id: 0,
        price: 0,
        description: '',
        image: '',
        plaform: '',
        stock: 0,
      },
    };
  },
  methods: {
    getGames() {
      const path = 'api/games';
      axios
        .get(path)
        .then((res) => {
          this.total_pages = Math.ceil(
            res.data.data.games.length / this.games_per_page,
          );
          this.games = res.data.data.games.slice(
            this.games_per_page * (this.page - 1),
            this.games_per_page * this.page,
          );
          console.log(this.games);
          console.log(this.$router);
          console.log(this.$store);
          console.log(this.$store.getters.getCart);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showGame(gameId) {
      console.log(gameId);
      this.$router.push({
        name: 'Game',
        query: { game_id: gameId },
      });
    },
    handlePageChange(value) {
      this.page = value;
      this.getGames();
    },
    handleAddToCart(gameId) {
      console.log(this.$store.getters.getCart);
      const game = this.games.find((cartGame) => cartGame.id === gameId);
      console.log(game);
      this.$store.dispatch('addGameToCart', game);
    },
  },
  created() {
    this.getGames();
  },
});
</script>

<style scoped>
.game-image {
  cursor: pointer;
}
</style>
