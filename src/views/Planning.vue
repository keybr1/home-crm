<template>
    <div>
        <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{info.bill | currency('RUB')}}</h4>
        </div>

        <Loader v-if="loading" />

        <p v-else-if="!categories.length" class="center">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>


        <section v-else>
            <div 
                v-for="c in categories"
                :key="c.id"
            >
                <p>
                    <strong>{{c.title}}:</strong>
                   {{c.spent | currency}} из {{c.limit | currency}}
                </p>
                <div class="progress" v-tooltip="c.tooltip">
                    <div
                        class="determinate"
                        :class="[c.progressColor]"
                        :style="{width: c.progressPercent + '%'}"
                    >
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import {mapGetters} from 'vuex';
import currencyFilter from '@/filters/currency.filter'
export default {
    name: 'planning',
    metaInfo() {
        return {
            title: this.$title('Menu_Planning')
        }
    },
    data() {
        return {
            loading: true, 
            categories: []
        }
    },
    computed: {
        ...mapGetters(['info'])
    },
    async mounted() {
        const records = await this.$store.dispatch('fetchRecords')
        const categories = await this.$store.dispatch('fetchCategories')

        this.categories = categories.map(categ => {
            const spent = records
                .filter(r => r.categoryId === categ.id)
                .filter(r => r.type === 'outcome')
                .reduce((total, record) => {
                    return total += +record.amount
                }, 0)
            
            const percent = 100 * spent / categ.limit 
            const progressPercent = percent > 100 ? 100 : percent
            const progressColor = percent < 60
             ? 'green'
             : percent < 100
                ? 'yellow'
                : 'red'

            const tooltipValue = categ.limit - spent
            const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

            return {
                ...categ,
                progressPercent,
                progressColor,
                spent,
                tooltip
            }
        })


        this.loading = false
    },    
}
</script>