<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center">Signup</h3>
          <div class="form-group">
            <input
              :class="{ 'is-invalid': errors.name, 'is-valid': !errors.name && this.submitted}"
              type="text"
              v-model="name"
              placeholder="Name"
              class="form-control"
            />
            <div class="errors" v-if="errors.name">
              <small
                class="text-danger"
                v-for="(error, index) in errors.name"
                :key="index"
              >{{error}}</small>
            </div>
          </div>
          <div class="form-group">
            <input
              :class="{ 'is-invalid': errors.email, 'is-valid': !errors.email && this.submitted}"
              type="email"
              v-model="email"
              placeholder="Email"
              class="form-control"
            />
            <div class="errors" v-if="errors.email">
              <small
                class="text-danger"
                v-for="(error, index) in errors.email"
                :key="index"
              >{{error}}</small>
            </div>
          </div>
          <div class="form-group">
            <input
              :class="{ 'is-invalid': errors.password, 'is-valid': !errors.password && this.submitted}"
              type="password"
              v-model="password"
              placeholder="Password"
              class="form-control"
            />
            <div class="errors" v-if="errors.password">
              <small
                class="text-danger"
                v-for="(error, index) in errors.password"
                :key="index"
              >{{error}}</small>
            </div>
          </div>
          <div class="form-group">
            <button
              @click="registerUser"
              :disabled="loading"
              class="btn text-center form-control btn-success"
            >
              <i class="fas fa-spin fa-spinner" v-if="loading"></i>
              {{ loading ? '' : 'Signup'}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import config from "@/config";

export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("auth")) {
      return next({ path: "/" });
    }

    next();
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },
  methods: {
    registerUser() {
      this.loading = true;
      Axios.post(`${config.apiUrl}/api/auth/register`, {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.submitted = false;
          this.loading = true;
          const { data } = response.data;
          localStorage.setItem("auth", JSON.stringify(data));
          this.$root.auth = data;

          this.$router.push("/");
        })
        .catch(({ response }) => {
          this.loading = false;
          this.submitted = true;
          this.errors = response.data;
          console.log(this.errors);
        });
    }
  }
};
</script>
