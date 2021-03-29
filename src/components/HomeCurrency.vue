<template>
    <div class="col s12 m6 l8">
        <div class="card green accent-4 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Курс валют</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Валюта</th>
                            <th>Курс</th>
                            <th>Дата</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="curr in curriences" :key="curr">
                            <td>{{curr}}</td>
                            <td>{{rates[curr].toFixed(3)}}</td>
                            <td>{{date | date('date')}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['rates', 'date'],
    data() {
        return {
            curriences:  ['RUB', 'USD', 'EUR', 'CNY']
        }
    }
}
</script>