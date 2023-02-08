<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter'

export default {
    props: ["movie"],
    methods: {
        ...mapActions(useCounterStore, ["movieById"]),
        showDetail(id) {
            this.movieById(id)
            this.$router.push(`/detail/${this.movie.id}`)
        }
    }
}
</script>
<template>
    <div class="movie">
        <div class="movie-image">
            <span class="play">
                <span class="name">{{ movie.title }}</span>
            </span>
            <a @click.prevent="showDetail(movie.id)" href="#">
                <img :src="movie.image" alt="image" />
            </a>
        </div>
        <div class="rating">
            <p>RATING : {{ movie.rating }}</p>
            <div class="stars">
                <div class="stars-in">{{ movie.rating }} </div>
            </div>
            <span class="comments">{{ movie.rank }}</span>
        </div>
    </div>
</template>