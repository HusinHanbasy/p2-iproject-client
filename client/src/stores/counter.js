import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
const baseUrl = "http://localhost:3000"

export const useCounterStore = defineStore('counter', {
  state: () => ({
    totalPage: 0,
    orderNumber: '',
    email: '',
    status: '',
    totalMovies: 0,
    pagination: 0,
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
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You have successfully registered and logged in',
            showConfirmButton: false,
            timer: 2500
          })
          // this.isLogin = response.data.access_token
        })
        .catch((error) => {
          // console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
          })
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
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You have successfully logged in',
            showConfirmButton: false,
            timer: 2500
          })
          localStorage.access_token = response.data.access_token
          this.isLogin = response.data.access_token
          this.router.push('/')
          this.movie = []

        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
          })
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
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You have successfully logged in',
            showConfirmButton: false,
            timer: 2500
          })
          console.log(response);
          localStorage.access_token = response.data.access_token;
          this.isLogin = response.data.access_token
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
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()
          this.isLogin = ''
          this.router.push('/')
          Swal.fire(
            'you have successfully logged out',
          )
        }
      })
    },
    getMovies(params) {
      axios({
        method: 'GET',
        url: `${baseUrl}/movies`,
        params: params,
        headers: {
          'X-RapidAPI-Key': '2e49e0f5b0msh29f18cffd1cf153p1e2596jsnb0ce53987731',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
      })
        .then((response) => {
          console.log(response);
          this.movies = response.data.data
          this.totalMovies = response.data.data.length
          this.totalPage = response.data.totalPage
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
          'X-RapidAPI-Key': '2e49e0f5b0msh29f18cffd1cf153p1e2596jsnb0ce53987731',
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
