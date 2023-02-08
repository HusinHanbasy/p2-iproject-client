<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    data() {
        return {
            genre: ''
        }
    }
    ,
    computed: {
        ...mapState(useCounterStore, ["isLogin"])
    },
    methods: {
        ...mapActions(useCounterStore, ['logout']),
        buttonLogin() {
            this.$router.push('/login')
        },
        buttonLogout() {
            this.logout()
        }
    }
}

</script>
<template>
    <div id="shell">
        <div id="header">
            <h1 id="logo"><a href="#">BARAZIR MOVIE</a></h1>
            <div v-if="isLogin" class="social"> <span>FOLLOW US ON:</span>
                <ul>
                    <li><a class="twitter" href="#">twitter</a></li>
                    <li><a class="facebook" href="#">facebook</a></li>
                    <li><a class="vimeo" href="#">vimeo</a></li>
                    <li><a class="rss" href="#">rss</a></li>
                </ul>
            </div>
            <div id="navigation">
                <ul>
                    <li><a @click.prevent="$router.push('/')" class="active" href="#">HOME</a></li>
                    <li><a href="#">NEWS</a></li>
                    <li v-if="isLogin"><a href="#">BOOKING</a></li>
                    <li><a href="#">COMING SOON</a></li>
                    <li><a href="#">CONTACT</a></li>
                    <li v-if="!isLogin"><a @click.prevent="buttonLogin" href="#">LOGIN</a></li>
                    <li v-if="isLogin"><a @click.prevent="buttonLogout" href="#">LOGOUT</a></li>
                </ul>
            </div>
            <div v-if="$route.name !== 'login'" id="sub-navigation">
                <ul>
                    <li><a href="#">SHOW ALL</a></li>
                    <li><a href="#">LATEST TRAILERS</a></li>
                    <li><a href="#">TOP RATED</a></li>
                    <Select style="background-color: black; color: white; padding-top:1%; text-align: center;">
                        <option value="" disabled selected>GENRE</option>
                        <option value="action">ACTION</option>
                        <option value="adventure">ADVENTURE</option>
                        <option value="animation">ANIMATION</option>
                        <option value="biography">BIOGRAPHY</option>
                        <option value="comedy">COMEDY</option>
                        <option value="crime">CRIME</option>
                        <option value="drama">DRAMA</option>
                        <option value="family">FAMILY</option>
                        <option value="fantasy">FANTASY</option>
                        <option value="film-noir">FILM-NOIR</option>
                        <option value="history">HISTORY</option>
                        <option value="horror">HORROR</option>
                        <option value="music">MUSIC</option>
                        <option value="musical">MUSICAL</option>
                        <option value="mystery">MYSTERY</option>
                        <option value="romance">ROMANCE</option>
                        <option value="ski-fi">SKI-FI</option>
                        <option value="thriller">THRILLER</option>
                        <option value="war">WAR</option>
                        <option value="western">WESTERN</option>
                    </Select>
                </ul>
                <div id="search">
                    <form action="#" method="get" accept-charset="utf-8">
                        <label for="search-field">SEARCH</label>
                        <input type="text" name="search field" value="Enter search here" id="search-field"
                            class="blink search-field" />
                        <input type="submit" value="GO!" class="search-button" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>