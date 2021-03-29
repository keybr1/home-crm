<template>
    <div class="col s12 m6 l4">
        <div class="card green accent-2 bill-card">
            <div class="card-content white-text">
            <span class="card-title">Счет в валюте</span>

            <p 
                v-for="curr in currs"
                :key="curr"
                class="currency-line"
            >
                <span>
                    {{ getCurrency(curr) | currency(curr) }}    
                </span>
            </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['rates'],
    data() {
        return {
            currs: ['RUB', 'USD', 'EUR', 'CNY']
        }
    },
    computed: {
        base() {
            return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
        }
    },
    methods: {
        getCurrency(curr) {
            return this.base * this.rates[curr] 
        }
    }
}
</script>