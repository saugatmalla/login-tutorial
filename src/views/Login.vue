<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center">Login</h3>
          <div class="form-group">
            <input :class="{ 'is-invalid': errors.email}" v-model="email" type="email" placeholder="Email" class="form-control">
            <div class="errors" v-if="errors.email">
              <small v-for="(error, index) in errors.email" :key="index" class="text-danger"> {{error}} </small>
            </div>
          </div>
          <div class="form-group">
            <input :class="{ 'is-invalid': errors.password}" v-model="password" type="password" placeholder="Password" class="form-control">
            <div class="errors" v-if="errors.password">
              <small v-for="(error, index) in errors.password" :key="index" class="text-danger"> {{error}} </small>
            </div>
          </div>
          <div class="form-group">
            <button @click="loginUser" class="btn text-center form-control btn-success">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import config from '@/config';

export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('auth')){
      return next({ path: '/'});
    }

    next();
  }, 

  data(){
    return {
      password: '',
      email: '',
      errors: {},
    }
  },

  methods: {
    loginUser() {
      Axios.post(`${config.apiUrl}/auth/login`, {
        
        email: this.email,
        password: this.password,

      }).then((response) =>{
        this.$root.auth = response.data.data;
        localStorage.setItem("auth", JSON.stringify(response.data.data));

        this.$router.push('/');

      }).catch (({ response }) => {
        if (response.status === 401) {
          this.errors = {
            email: ['These credentials do not match our records.']
          };
        } else {
          this.errors = response.data;
        }
        
      })
    }
    
  }
}
</script>
