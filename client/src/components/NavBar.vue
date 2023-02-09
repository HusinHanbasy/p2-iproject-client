<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    data() {
        return {
            search: '',
            page: '1',
            genre: '',
            limit: 20,
        }
    },

    computed: {
        ...mapState(useCounterStore, ["isLogin"])
    },
    methods: {
        ...mapActions(useCounterStore, ['logout', 'getMovies']),
        buttonLogin() {
            this.$router.push('/login')
        },
        buttonLogout() {
            this.logout()
        },
        filterGenre() {
            const data = {
                search: this.search,
                page: this.page,
                genre: this.genre,
                limit: this.limit
            }
            this.getMovies(data)
        },
        buttonSearch() {
            const data = {
                search: this.search,
                page: this.page,
                genre: this.genre,
                limit: this.limit
            }
            this.getMovies(data)
        },
        buttonAll() {
            const data = {
                search: '',
                page: this.page,
                genre: '',
                limit: this.limit
            }
            this.getMovies(data)
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
            <div id="sub-navigation">
                <ul>
                    <li><a @click.prevent="buttonAll" href="#">SHOW ALL</a></li>
                    <li><a href="#">LATEST TRAILERS</a></li>
                    <li><a href="#">TOP RATED</a></li>
                    <li>
                        <select @click.prevent="filterGenre" v-model="genre"
                            style="background-color: black; color: white; padding-top:1%; text-align: center;">
                            <option value=''>GENRE</option>
                            <option value="Action">ACTION</option>
                            <option value="Adventure">ADVENTURE</option>
                            <option value="Animation">ANIMATION</option>
                            <option value="Biography">BIOGRAPHY</option>
                            <option value="Comedy">COMEDY</option>
                            <option value="Crime">CRIME</option>
                            <option value="Drama">DRAMA</option>
                            <option value="Family">FAMILY</option>
                            <option value="Fantasy">FANTASY</option>
                            <option value="Film-noir">FILM-NOIR</option>
                            <option value="History">HISTORY</option>
                            <option value="Horror">HORROR</option>
                            <option value="Music">MUSIC</option>
                            <option value="Musical">MUSICAL</option>
                            <option value="Mystery">MYSTERY</option>
                            <option value="Romance">ROMANCE</option>
                            <option value="Ski-fi">SKI-FI</option>
                            <option value="Thriller">THRILLER</option>
                            <option value="War">WAR</option>
                            <option value="Western">WESTERN</option>
                        </select>
                    </li>
                </ul>
                <div id="search">
                    <form accept-charset="utf-8">
                        <label for="search-field">SEARCH</label>
                        <input v-model="search" type="text" name="search field" class="blink search-field" />
                        <input @click.prevent="buttonSearch" type="submit" value="GO!" class="search-button" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>