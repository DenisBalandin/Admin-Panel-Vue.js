<template>
  <div
    class="loginreg_holder"
    :style="{backgroundImage: 'url('+require('../../../.././public/img/img2.jpg')+')'}"
  >
    <div class="left_side">
      <img
        class="logo"
        src="../../../.././public/img/logo_color.png"
      />
      <div>
        <form @submit.prevent="logIn">
          <div>
            <label for="email">Email:</label>
            <input name="email" type="email" v-model="administrator.email" />
          </div>
          <div>
            <label for="password">Password:</label>
            <input name="password" type="password" v-model="administrator.password" />
          </div>
          <button class='btn' @click="logIn">Log In!</button>
          <transition name='slide'>
            <p class='error' v-if="feedback">{{feedback}}</p>
          </transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      administrator: {
        email: null,
        password: null,
      },
      feedback: null,
    };
  },
  methods: {
    logIn() {
      if (this.administrator.email && this.administrator.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(
            this.administrator.email,
            this.administrator.password
          )
          .then(() => {
            this.$router.push({ name: 'Home' });
          })
          .catch(err => {
            console.error(err);
            this.feedback = err.message;
          });
      } else {
        this.feedback = 'Please enter both email and password.';
      }
    },
  },
};
</script>

<style scoped>
  /*============================ LOGIN REGISTER  =====================================*/
.loginreg_holder {
  background-color: #2a79c1;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  min-height: 600px;
  background-size: cover;
  background-position: center center;
  z-index: 99999;
  top: 0;
}

.loginreg_holder .left_side {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 400px;
  background-color: white;
  padding: 50px;
  box-sizing: border-box;
  box-shadow: 0px 0px 15px grey;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loginreg_holder .left_side .logo {
  margin-bottom: 50px;
  width: 80%;
  max-width: 300px;
}

.loginreg_holder .left_side form {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.loginreg_holder .left_side form > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 15px;
  position: relative;
}

input {
  padding: 10px 15px;
  border: none;
  background-color: #f7f7f7 !important;
  outline: none;
  font-size: 16px;
}

.loginreg_holder .left_side form .btn {
  width: 100%;
}

.loginreg_holder .left_side a {
  color: #00314b;
  font-weight: bold;
  text-decoration: underline;
  text-underline-position: under;
  text-align: center;
  font-size: 14px;
  width: 100%;
  margin-top: 10px;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.loginreg_holder .left_side a:hover {
  opacity: 1;
}

.error {
  position: relative;
  color: #fa5019;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  transition: max-height 1s;
}

.md-toolbar-row.md-offset {
  display: none !important;
}

.btn {
  padding: 10px 30px;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  border: none;
  color: white;
  background-color: #2a79c1;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.inner_nav {
  overflow: hidden;
  overflow-x: auto;
}

.inner_nav .btn {
  background-color: #efefef;
  color: rgba(0, 49, 75, 0.48);
}

.inner_nav .active_btn .btn,
.inner_nav .router-link-active .btn {
  background-color: #2a79c1;
  color: white;
}

.top_btn {
  position: fixed;
  top: 64px;
  right: 50px;
  z-index: 4;
}

.inner_btn_holder {
  text-align: right;
}

.back_btn {
  right: auto;
  left: 250px;
  background-color: transparent;
  color: #2a79c1;
}

.txt_btn,
.delete_btn {
  background-color: transparent;
  color: #2a79c1;
}

.delete_btn {
  color: #fa3019;
}

button.btn:hover {
  background-color: #22619b;
}

button.txt_btn:hover,
.back_btn:hover {
  color: #22619b;
  background-color: transparent !important;
}

button.sml_btn {
  font-size: 14px;
}

button.delete_btn:hover {
  background-color: transparent;
  color: #e82d17;
}

.inner_nav button.btn:hover {
  color: white;
}

label {
  font-size: 15px;
  color: black;
}
</style>

