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
      <v-row>
        <v-col class="text-left ml-7" v-if="showPagePrev">
          <v-btn outlined class="buttons" @click="handlePagePrev">
            <p class="ma-auto">Prev</p>
            <v-icon class="mr-n2">mdi-chevron-left</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-right mr-7" v-if="showPageNext">
          <v-btn outlined class="buttons"  @click="handlePageNext">
            <p class="ma-auto">Next</p>
            <v-icon class="mr-n2">mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      
    </v-container>
  </div>
</template>



<script>
import axios from "axios";
import { consoleError } from "vuetify/lib/util/console";

export default {
  name: "Games",
  data() {
    return {
      game_id: 0,
      page: 0,
      games_per_page: 2,
      total_pages: 0,
      esk_list: [{ data: "empty" }],
      games: {
        item_name: "",
        item_price: 0,
        item_desc: "",
        item_image: "",
        item_platform: "",
        item_stock: 0,
      },
    };
  },
  computed: {
    showPagePrev() {
      return this.page > 0 ? true : false;
    },
    showPageNext() {
      return this.page < (this.total_pages - 1) ? true : false;
    },
  },
  methods: {
    getNumPages() {
      const path = "api/get-num-items";
      axios.get(path).then((res) => {
        this.total_pages = Math.ceil(res.data / this.games_per_page);
      });
    },
    getGamesByEsk(esk) {
      const path = "api/get-all-items";
      axios
        .post(path, esk)
        .then((res) => {
          this.games = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showGame(name) {
      this.$router.push({
        name: "Game",
        query: { item_name: name },
      });
    },
    handlePageNext() {
      console.log(this.total_pages);
      this.page += 1;
      let esk = { data: "empty" };
      if (this.games.length !== undefined && this.games.length !== 1) {
        const item_name = this.games[this.games_per_page - 1].item_name;
        esk = { esk: { item_name: item_name } };
        this.esk_list.push(esk);
      }
      this.getGamesByEsk(esk);
    },
    handlePagePrev() {
      this.page -= 1;
      let esk = this.esk_list[this.page];
      this.getGamesByEsk(esk);
    },
    handleAddToCart(gameId) {
      const game = this.games.find((cartGame) => cartGame.id === gameId);
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
.buttons {
  color: white !important;
  background-color: #3c6e71 !important;
}
</style>
