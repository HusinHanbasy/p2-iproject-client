<script>
import { mapActions, mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import Swal from 'sweetalert2'

export default {
    computed: {
        ...mapWritableState(useCounterStore, ["movie", "transactionToken", "orderNumber"])
    },
    methods: {
        ...mapActions(useCounterStore, ['movieById', 'midtransToken', 'statusUpdate']),
        async buttonBuy(id) {
            await this.midtransToken(id)
            const callback = this.statusUpdate
            window.snap.pay(this.transactionToken, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    callback(result.order_id)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'thank you',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    // alert("payment success!"); console.log(result);
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    // alert("wating your payment!"); console.log(result);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    // alert("payment failed!"); console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    // alert('you closed the popup without finishing the payment');
                }
            })
        }
    },
    async created() {
        const id = this.$route.params.id
        await this.movieById(id)
    }
}
</script>

<template>

    <div style="display:flex" id="shell">
        <iframe width="560" height="315" :src="movie.trailer" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
        </iframe>
        <div style="display:table-row;color:aqua; padding-left: 3%">
            <h1>
                TITLE : {{ movie.title }}
            </h1>
            <h1>
                YEAR : {{ movie.year }}
            </h1>
            <h1>
                GENRE : {{ movie.genre[0] }}, {{ movie.genre[1] }}
            </h1>
            <h1>
                WRITER : {{ movie.writers[0] }} ,{{ movie.writers[1] }}
            </h1>
            <h1>
                DIRECTOR : {{ movie.director[0] }}
            </h1>
            <h1>
                RANK : {{ movie.rank }}
                RATING : {{ movie.rating }}
            </h1>
            <h1>
                DESCRIPTION : {{ movie.description }}
            </h1>
            <button style="width:30%" v-if="!orderNumber" @click.prevent="buttonBuy(movie.id)" class="btn btn primary">
                BUY TICKET
            </button>
            <h1 v-if="orderNumber" style="color:red">
                TOKEN : {{ orderNumber }}
            </h1>
        </div>
    </div>







</template>