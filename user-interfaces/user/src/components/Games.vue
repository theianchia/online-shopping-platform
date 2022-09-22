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
              :src="game.item_image"
              class="white--text align-end game-image"
              height="500px"
              contain
              @click="showGame(game.item_name)"
            >
            </v-img>
            <v-card-title @click="showGame(game.item_name)">
              <v-spacer />
              <div class="text-center">
                <h3 v-text="game.item_name"></h3>
                <p v-text="game.item_platform" class="medium-15 mb-n5"></p>
              </div>
              <v-spacer />
            </v-card-title>
            <v-card-actions>
              <v-btn color="#353535" class="mx-auto">
                <v-card-subtitle
                  class="white-15"
                  @click="handleAddToCart(game.item_name)"
                  >Add to Cart</v-card-subtitle
                >
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
      @next="handlePageNext"
    ></v-pagination>
  </div>
</template>



<script>
import axios from "axios";

export default {
  name: "Games",
  data() {
    return {
      game_id: 0,
      page: 1,
      games_per_page: 2,
      total_pages: 4,
      games: {
        item_name: "",
        item_price: 0,
        item_desc: "",
        item_image: "",
        item_platform: "",
        item_stock: 0,
      },
      prev_page_item_name: "",
    };
  },
  methods: {
    getNumPages() {
      const path = "api/get-num-items";
      axios.get(path).then((res) => {
        this.total_pages = Math.ceil(res.data / this.games_per_page) + 2;
      });
    },
    getGamesByEsk(esk) {
      const path = "api/get-all-items";
      console.log(esk);
      axios
        .post(path, esk)
        .then((res) => {
          console.log(res);
          this.games = res.data;
          console.log(this.games);
          console.log(this.$router);
          console.log(this.$store);
          console.log(this.$store.getters.getCart);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showGame(name) {
      console.log(name);
      this.$router.push({
        name: "Game",
        query: { item_name: name },
      });
    },
    handlePageNext(value) {
      this.page = value;
      let esk = { data: "empty" };
      if (this.games.length !== undefined && this.games.length !== 1) {
        const item_name = this.games[this.games_per_page - 1].item_name;
        console.log(item_name);
        esk = { esk: { item_name: item_name } };
      }
      this.prev_page_item_name = this.games[0].item_name;
      this.getGamesByEsk(esk);
    },
    // handlePagePrev(value) {
    //   this.page = value;
    //   let esk = { data: "empty" };
    //   if (this.prev_page_item_name !== "") {
    //     esk = { esk: { item_name: this.prev_page_item_name } };
    //   }
    // },
    handleAddToCart(gameId) {
      console.log(this.$store.getters.getCart);
      const game = this.games.find((cartGame) => cartGame.id === gameId);
      console.log(game);
      this.$store.dispatch("addGameToCart", game);
    },
  },
  created() {
    this.getNumPages();
    const esk = { data: "empty" };
    this.getGamesByEsk(esk);
  },
};
</script>

<style scoped>
.game-image {
  cursor: pointer;
}
</style>
