<template>
  <div class="text-center">
    <v-container fluid>
      <v-card v-if="isCartEmpty">
        <v-card-title><router-link :to="{path: `/`}"> Your cart is empty! Head back to the home page to browse through games! </router-link> </v-card-title>
      </v-card>
      <v-card v-for="(item, i) in cart" :key="i" class="rounded-xl">
        <v-row class="ma-5">
            <v-col cols="2" class="d-flex flex-column">
            <v-img
                :src="item.game.item_image"
                position="left"
                contain
                max-height="200px"
                class="cursor"
                @click="showGame(item.game.item_name)"
            >
            </v-img>
            </v-col>
            <v-col class="d-flex flex-column">
            <v-card-title
              v-text="item.game.item_name"
              class="bold-30 cursor"
              @click="showGame(item.game.item_name)"
            > </v-card-title>
            <v-card-subtitle class="text-left medium-20 mt-2 mb-n4">
                Platform:
                <span v-text="item.game.item_platform"></span>
            </v-card-subtitle>
            <v-card-subtitle class="text-left medium-20 mt-2 mb-n4">
                $
                <span v-text="item.game.item_price" class="ml-n1"></span>
            </v-card-subtitle>
            <v-spacer></v-spacer>
            <v-card-actions class="ml-auto">
              <v-btn outlined class="v-btn" icon @click="handleMinus(item.game)"><v-icon color="#5ba4a3" >mdi-minus</v-icon></v-btn>
              <v-card-subtitle class="medium-20" v-text="item.quantity"></v-card-subtitle>
              <v-btn outlined class="v-btn" icon @click="handlePlus(item.game)"><v-icon color="#5ba4a3">mdi-plus</v-icon></v-btn>
            </v-card-actions>
            </v-col>
        </v-row>
      </v-card>
      <v-card class="d-flex flex-column rounded-xl"  v-if="!isCartEmpty">
        <v-row>
          <v-col class="text-left mx-3">
            <v-card-subtitle class="medium-20">Total: ${{total_price}}</v-card-subtitle>
          </v-col>
          <v-col class="text-right mx-3">
            <v-btn class="ml-auto mt-2 buttons" rounded to="/checkout">Checkout</v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-snackbar v-model="no_stock">
        No additional stock available for this game!
        <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="no_stock = false"
            >
              Close
            </v-btn>
          </template>
      </v-snackbar>
    </v-container>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  name: "Cart",
  data() {
    return {
      cart: [],
      no_stock: false,
      total_price: 0,
    };
  },
  methods: {
    handleMinus(game) {
      const cartItem = this.cart.find((cartItem) => cartItem.game.item_name === game.item_name);
      this.$store.dispatch('decrementGameInCartQuantity', cartItem.game);
      this.getTotalPrice;
    },
    handlePlus(game) {
      const cartItem = this.cart.find((cartItem) => cartItem.game.item_name === game.item_name);
      if (game.item_stock > 1) {
        this.$store.dispatch('incrementGameInCartQuantity', cartItem.game);
      } else {
        this.no_stock = true;
      }
      this.getTotalPrice;
    },
    showGame(name) {
      this.$router.push({
        name: "Game",
        query: { item_name: name },
      });
    },
  },
  computed: {
    isCartEmpty() {
        return this.cart.length > 0 ? false : true;
    },
    getTotalPrice() {
      this.total_price = 0;
      this.cart.forEach(item => {
        this.total_price += item.game.item_price * item.quantity;
      });
      this.total_price = Math.round(this.total_price * 100) / 100;
    }
  },
  created() {
    this.cart = this.$store.getters.getCart;
    this.getTotalPrice();
  },
};
</script>

<style scoped>
.v-btn {
  min-width: 0;
}
</style>