<template>
  <amplify-authenticator class="amplify-authenticator">
    <amplify-sign-up
      header-text="Sign Up"
      slot="sign-up"
      :formFields.prop="formFields"
    ></amplify-sign-up>
    <amplify-sign-in slot="sign-in"></amplify-sign-in>
    <template>
      <v-row>
        <v-col cols="4">
          <v-card-title class="bold-30 mb-n5 ma-5"
            >Shipping Information</v-card-title
          >
          <v-card class="rounded-xl ma-5">
            <v-card-title>Name: {{ this.name }}</v-card-title>
            <v-card-title>Email: {{ this.email }}</v-card-title>
            <v-card-title>Number: {{ this.number }}</v-card-title>
            <v-card-title>Address: {{ this.address }}</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="7">
          <v-card-title class="bold-30 mb-n5 ma-5">Order Summary</v-card-title>
          <v-card v-for="(item, i) in cart" :key="i" class="rounded-xl">
            <v-row class="ma-5">
              <v-col cols="2" class="d-flex flex-column">
                <v-img
                  :src="item.game.item_image"
                  position="left"
                  contain
                  max-height="200px"
                  class="cursor"
                >
                </v-img>
              </v-col>
              <v-col class="d-flex flex-column">
                <v-card-title
                  v-text="item.game.item_name"
                  class="bold-30 cursor"
                >
                </v-card-title>
                <v-card-subtitle class="text-left medium-20 mt-2 mb-n4">
                  Platform:
                  <span v-text="item.game.item_platform"></span>
                </v-card-subtitle>
                <v-card-subtitle class="text-left medium-20 mt-2 mb-n4">
                  $
                  <span
                    v-text="Number(item.game.item_price).toFixed(2)"
                    class="ml-n1"
                  ></span>
                </v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-subtitle class="text-left medium-20 mt-2 mb-n4">
                  Quantity: <span v-text="item.quantity" class="ml-n1"></span>
                </v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="d-flex flex-column rounded-xl">
            <v-row>
              <v-col class="text-left mx-3">
                <v-card-subtitle class="medium-20"
                  >Total: ${{ total_price.toFixed(2) }}</v-card-subtitle
                >
              </v-col>
              <v-col class="text-right mx-3">
                <v-btn class="ml-auto mt-2 buttons" rounded @click="placeOrder"
                  >Place Order</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar.on">
        {{ snackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar.on = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </amplify-authenticator>
</template>

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Auth } from "aws-amplify";
import axios from "axios";

export default {
  name: "Checkout",
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
      Auth.currentAuthenticatedUser()
        .then((data) => {
          console.log(data);
          this.name = data.attributes.name;
          this.email = data.attributes.email;
          this.address = data.attributes.address;
          this.number = data.attributes.phone_number;
        })
        .catch((err) => console.log(err));
    });

    this.cart = this.$store.getters.getCart;
    this.getTotalPrice();
  },
  data() {
    return {
      snackbar: {
        on: false,
        message: "",
      },
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      name: "",
      email: "",
      address: "",
      number: "",
      country: "",
      cart: [],
      no_stock: false,
      total_price: 0,
      items: [],
      to: null,
      formFields: [
        {
          type: "name",
          label: "Name",
          placeholder: "Enter Name",
          inputProps: { required: true },
        },
        {
          type: "username",
          label: "Username",
          placeholder: "Enter Username",
          inputProps: { required: true },
        },
        ,
        {
          type: "email",
          label: "Email",
          placeholder: "Enter Email",
          inputProps: { required: true },
        },
        {
          type: "password",
          label: "Password",
          placeholder: "Enter Password",
          inputProps: { required: true, autocomplete: "new-password" },
        },
        {
          type: "phone_number",
          label: "Phone Number",
          dialCode: "+65",
          placeholder: "Enter Phone Number",
          inputProps: { required: true },
        },
        {
          type: "custom:Country",
          label: "Country of Residence",
          placeholder: "Enter Country of Residence",
          inputProps: { required: true },
        },
        {
          type: "address",
          label: "Address",
          placeholder: "Enter Address",
          inputProps: { required: true },
        },
      ],
    };
  },
  methods: {
    placeOrder() {
      const path = "po/place-order";
      this.getOrderDetails();
      const payload = {
        phone_number: this.number,
        user_name: this.name,
        email: this.email,
        items: this.items,
      };
      console.log(payload);
      axios
        .post(path, payload)
        .then((res) => {
          console.log(res);
          this.snackbar.on = true;
          this.snackbar.message = "Order successfully placed!";
          this.$store.dispatch("clearCart");
          this.activate();
        })
        .catch((error) => {
          console.error(error);
          this.snackbar.on = false;
          this.snackbar.message =
            "There was an error placing your order, please try again later.";
        });
    },
    getTotalPrice() {
      this.total_price = 0;
      this.cart.forEach((item) => {
        this.total_price += item.game.item_price * item.quantity;
      });
    },
    getOrderDetails() {
      this.items = [];
      for (let i = 0; i < this.cart.length; i++) {
        let result = {};
        result[this.cart[i].game.item_name] = this.cart[i].quantity;
        this.items.push(result);
      }
    },
    activate() {
      setTimeout(() => this.$router.push("/"), 3000);
    },
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
};
</script>