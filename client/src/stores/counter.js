import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = "http://localhost:3000"



export const useCounterStore = defineStore('counter', {
  state: () => ({
    email: '',
    totalMovies: 0,
    movies: [],
    isLogin: localStorage.access_token,
  }),
  actions: {
    register(data) {
      axios({
        url: `${baseUrl}/register`,
        method: "POST",
        data: {
          username: data.username,
          email: data.email,
          password: data.password
        }
      })
        .then((response) => {
          console.log(response);
          this.router.push('/login')
        })
        .catch((error) => {
          console.log(error);
        })
    },
    login(data) {
      axios({
        url: `${baseUrl}/login`,
        method: "POST",
        data: {
          email: data.email,
          password: data.password
        }
      })
        .then((response) => {
          console.log(response);
          this.router.push('/')
          localStorage.access_token = response.access_token
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
})
