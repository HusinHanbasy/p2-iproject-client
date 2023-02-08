import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = "http://localhost:3000"

export const useCounterStore = defineStore('counter', {
  state: () => ({
    orderNumber: '',
    email: '',
    status: '',
    totalMovies: 0,
    movies: [],
    movie: [],
    isLogin: localStorage.access_token,
    transactionToken: ''
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
          // console.log(response);
          this.router.push('/')
          localStorage.access_token = response.data.access_token
          // this.isLogin = response.data.access_token
        })
        .catch((error) => {
          console.log(error);
        })
    },
    login(input) {
      axios({
        url: `${baseUrl}/login`,
        method: "POST",
        data: {
          email: input.email,
          password: input.password
        }
      })
        .then((response) => {
          // console.log(response.data.access_token);
          localStorage.access_token = response.data.access_token
          this.isLogin = response.data.access_token
          this.router.push('/')
          this.movie = []
        })
        .catch((error) => {
          console.log(error);
        })
    },
    googleLogin(data) {
      console.log(data);
      axios({
        method: "post",
        url: `${baseUrl}/google-login`,
        headers: {
          "google-auth-token": data.credential,
        },
      })
        .then((response) => {
          console.log(response);
          localStorage.access_token = response.data.access_token;
          this.isLogin = true;
          this.router.push("/");
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
          })
        })
    },
    logout() {
      localStorage.clear()
      this.router.push('/')
    },
    getMovies() {
      axios({
        method: 'GET',
        url: `${baseUrl}/movies`,
        headers: {
          'X-RapidAPI-Key': 'a19ac7857cmsh9fb1c28537353eep13be81jsnc2cf2963c3ac',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
      })
        .then((response) => {
          console.log(response);
          this.movies = response.data.data
        })
        .catch((error) => {
          console.log(error);
        })
    },
    movieById(id) {
      axios({
        method: 'GET',
        url: `${baseUrl}/movie/${id}`,
        headers: {
          'X-RapidAPI-Key': 'a19ac7857cmsh9fb1c28537353eep13be81jsnc2cf2963c3ac',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
      })
        .then(response => {
          // console.log(response);
          this.movie = response.data.data
          console.log(this.movie);
          return axios({
            method: "GET",
            url: `${baseUrl}/order/${this.movie.id}`,
            headers: {
              access_token: localStorage.access_token
            }
          })
        })
        .then(response => {
          console.log(response);
          if (response.data.order) {
            this.orderNumber = response.data.order.orderNumber
          } else {
            this.orderNumber = ''
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    midtransToken(id) {
      axios({
        method: "POST",
        url: `${baseUrl}/generate-midtrans/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          this.transactionToken = response.data.transactionToken
          // this.status = response.data.status
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    },
    statusUpdate(id) {
      console.log(id);
      axios({
        method: 'PATCH',
        url: `${baseUrl}/update-status/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log(response);
          this.orderNumber = response.data.data.orderNumber
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
})
