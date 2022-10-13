<template>
  
  <v-app style="background: #faf8f7;">
    <amplify-authenticator  username-alias="email">
      <amplify-sign-up
        header-text="Sign Up"
        slot="sign-up"
        username-alias="email"
        :formFields.prop="formFields"
      ></amplify-sign-up>
      <amplify-sign-in slot="sign-in" username-alias="email"></amplify-sign-in>
    </amplify-authenticator>
      <NavigationBar />
      <v-content>
        <router-view />
      </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import NavigationBar from './components/NavigationBar.vue';
import Games from './components/Games.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    NavigationBar,
    Games,
  },
  data() {
    return {
      formFields: [
        {
          type: 'name',
          label: 'Name',
          placeholder: 'Enter Name',
          inputProps: { required: true },
        },
        {
          type: 'email',
          label: 'Email',
          placeholder: 'Enter Email',
          inputProps: { required: true, autocomplete: 'username' },
        },
        {
          type: 'password',
          label: 'Password',
          placeholder: 'Enter Password',
          inputProps: { required: true, autocomplete: 'new-password' },
        },
        {
          type: 'phone_number',
          label: 'Phone Number',
          dialCode: '+65',
          placeholder: 'Enter Phone Number',
          inputProps: { required: true },
        },
        {
          type: 'custom:Location',
          label: 'Country of Residence',
          placeholder: 'Enter Country of Residence',
          inputProps: { required: true },
        },
        {
          type: 'address',
          label: 'Address',
          placeholder: 'Enter Address',
          inputProps: { required: true },
        },
      ]
    }
  }
};
</script>

