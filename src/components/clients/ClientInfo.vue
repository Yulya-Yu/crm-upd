<template>
    <div>
<h1>{{this.name}}</h1>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ClientInfo',
    data(){
        return {
            name: null,
            surname: null,
            fathername: null,
            id: null,
            telephone: null,
            email: null,
            type: null,
            company_name: null,
            time: null
        }
    },
        beforeMount() {
            this.getClient()
        },
        methods: {
            getClient (){
                axios({
                    method: 'get',
                    auth: {
                        username: sessionStorage.getItem('login'),
                        password: sessionStorage.getItem('password'),
                    },
                    url: `http://api.catering.student.smartworld.team:2280/employee/view?id=${this.$route.params.card_id}`
                })
                    .then((response) => {
                        this.data = response.data
                        this.surname = response.data.surname
                        this.name = response.data.name
                        this.fathername = response.data.fathername
                        this.telephone = response.data.telephone.replace(/(\w+)/g, '+7$1')
                        this.email = response.data.email
                        this.type = response.data.birth_date
                        this.time = response.data.date_of_employment
                        this.company_name = response.data.passport_issued_by

                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error.response)
                    })
            },
        }
}
</script>

<style scoped>
* {
    margin-left: 177px;
}

h1 {
font-size: 36px;
line-height: 45px;
color: #353541;
}
</style>