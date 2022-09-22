let cart = window.localStorage.getItem('cart');

const state = {
  cart: cart ? JSON.parse(cart) : [],
};

const getters = {
  getCart(state) {
    return state.cart;
  }
};

const actions = {
  addGameToCart(context, game) {
    console.log('addGameToCart');
    if (game.item_stock > 0) {
      const cartItem = context.state.cart.find((item) => item.item_name === game.item_name);
      if (!cartItem) {
        context.commit('pushGameToCart', game);
      } else {
        context.commit('incrementGameCartQuantity', cartItem);
      }
      context.commit('decrementGameQuantity', game);
      context.commit('saveCart');
    }
  },
  decrementGameInCartQuantity(context, game) {
    const cartItem = context.state.cart.find((item) => item.item_name === game.item_name);
    if (cartItem.item_stock > 1) {
      context.commit('decrementGameCartQuantity', cartItem);
    } else {
      context.commit('removeGameFromCart', cartItem);
    }
    context.commit('saveCart');
  },
};

const mutations = {
  pushGameToCart(state, cartGame) {
    console.log('pushGameToCart');
    state.cart.push({
      game: cartGame,
      quantity: 1,
    });
  },
  incrementGameCartQuantity(state, cartItem) {
    cartItem.quantity += 1;
  },
  decrementGameQuantity(state, game) {
    game.item_stock -= 1;
  },
  decrementGameCartQuantity(state, cartItem) {
    cartItem.quantity -= 1;
  },
  removeGameFromCart(state, cartItem) {
    const index = state.cart.indexOf(cartItem);
    if (index !== -1) {
      state.cart.splice(index, 1);
    }
  },
  saveCart(state) {
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};