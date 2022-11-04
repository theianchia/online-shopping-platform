let cart = window.localStorage.getItem('cart');
let num_items_in_cart = window.localStorage.getItem('num_items_in_cart');

const state = {
  cart: cart ? JSON.parse(cart) : [],
  num_items_in_cart: num_items_in_cart ? JSON.parse(num_items_in_cart) : 0,
};

const getters = {
  getCart(state) {
    return state.cart;
  },
  getNumItemsInCart(state) {
    return state.num_items_in_cart;
  }
};

const actions = {
  addGameToCart(context, game) {
    const cartItem = context.state.cart.find((item) => item.game.item_name === game.item_name);
    if (!cartItem) {
      context.commit('pushGameToCart', game);
    } else {
      context.commit('incrementGameCartQuantity', cartItem);
    }
    context.commit('decrementGameStock', game);
    context.commit('saveCart');
  },
  decrementGameInCartQuantity(context, game) {
    const cartItem = context.state.cart.find((item) => item.game.item_name === game.item_name);
    if (cartItem.quantity > 1) {
      context.commit('decrementGameCartQuantity', cartItem, game);
    } else {
      context.commit('removeGameFromCart', cartItem);
    }
    context.commit('incrementGameStock', game);
    context.commit('saveCart');
  },
  incrementGameInCartQuantity(context, game) {
    const cartItem = context.state.cart.find((item) => item.game.item_name === game.item_name);
    context.commit('incrementGameCartQuantity', cartItem);
    context.commit('decrementGameStock', game);
    context.commit('saveCart');
  },
  clearCart(context) {
    context.commit('clearCart');
  }
};
const mutations = {
  pushGameToCart(state, cartGame) {
    state.cart.push({
      game: cartGame,
      quantity: 1,
    });
    state.num_items_in_cart += 1;
    console.log(state.num_items_in_cart);
  },
  incrementGameCartQuantity(state, cartItem) {
    cartItem.quantity += 1;
  },
  decrementGameCartQuantity(state, cartItem, game) {
    cartItem.quantity -= 1;
  },
  decrementGameStock(state, game) {
    game.item_stock -= 1;
  },
  incrementGameStock(state, game) {
    game.item_stock += 1;
  },
  removeGameFromCart(state, cartItem) {
    const index = state.cart.indexOf(cartItem);
    if (index !== -1) {
      state.cart.splice(index, 1);
    }
    state.num_items_in_cart -= 1;
  },
  saveCart(state) {
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
    window.localStorage.setItem('num_items_in_cart', JSON.stringify(state.num_items_in_cart));
  },
  clearCart(state) {
    window.localStorage.clear();
    state.cart = [];
    state.num_items_in_cart = 0;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};