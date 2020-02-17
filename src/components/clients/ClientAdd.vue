<template>
    <div class="registr">
        <a>Добавление клиента</a>
        <div class="pols">
            <div class="form" v-for="(inputs,index) in Client" :key="index">
            <input v-if="inputs.type === 'text'" maxlength="30"
                   v-bind:id="inputs.type" v-model="inputs.clientInput"
                   v-bind:class="{errorcolor: inputs.valid}"
                   v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                   required/>
            <input v-if="inputs.type === 'phone'" maxlength="30"
                   v-bind:id="inputs.type" v-model="inputs.clientInput"
                   v-bind:class="{errorcolor: inputs.valid}"
                   v-mask="{mask: '+7(9{3}) 9{3} 9{2}-9{2}'}"
                   v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                   required/>
            <input v-if="inputs.type === 'email'" maxlength="30"
                   v-bind:id="inputs.type" v-model="inputs.clientInput"
                   v-bind:class="{errorcolor: inputs.valid}"
                   v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                   required/>
            <input v-if="inputs.type === 'date'" maxlength="30"
                   v-bind:id="inputs.type" v-model="inputs.clientInput"
                   v-bind:class="{errorcolor: inputs.valid}"
                   onfocus="(this.type='date')" onblur="if(!this.value)this.type='text'"
                   v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                   required/>
            <label v-bind:class="{errorbordercolor: inputs.valid, succesbordercolor: !inputs.valid}" :for="inputs.type" class="label-name">
                <span class="content-name" >{{inputs.name}}</span>
                <!--    Транзишоны        -->
                <transition name="slide-fade">
                    <span v-if="inputs.valid == 1" class="content-name content-name-error">Обязательное поле</span>
                </transition>
                <transition name="slide-fade">
                    <span v-if="inputs.valid == 2" class="content-name content-name-error" style="top: 54px">Неправильный формат заполнения</span>
                </transition>
                <transition name="slide-fade">
                    <span v-if="inputs.valid == 3" class="content-name content-name-error" style="top: 54px">Этой даты еще не наступило</span>
                </transition>
                <transition name="slide-fade">
                    <span v-if="inputs.valid == 4" class="content-name content-name-error" style="top: 54px">Дата должна быть не ранее 1900г.</span>
                </transition>
            </label>
            </div>
        </div>
        <button v-on:click="validationInput">Добавить</button>
    </div>
</template>

<script>
    // import axios from 'axios';
export default {
    data() {
        return{
            counter: 0,
            Client: [{
                name: 'Фамилия',
                clientInput: null,
                type: 'text',
                valid: null,
            },{
                name: 'Имя',
                clientInput: null,
                type: 'text',
                valid: null,
            },{
                name: 'Отчество',
                clientInput: null,
                type: 'text',
                valid: null,
            },{
                name: 'Телефон',
                clientInput: null,
                type: 'phone',
                valid: null,
            },{
                name: 'E-mail',
                clientInput: null,
                type: 'email',
                valid: null,
            },{
                name: 'Дата рождения',
                clientInput: null,
                type: 'date',
                valid: null,
            },]
        }
    },
    methods:{
        validationInput(){
            this.counter = 0;
            for (let i = 0; i < this.Client.length; i++) {
                if(this.Client[i].clientInput == null || this.Client[i].clientInput == '' || this.Client[i].clientInput == undefined) {
                    if (this.Client[i].name === 'Отчество'){
                        this.counter++
                    }
                    else{
                        this.Client[i].valid = 1
                    }
                }
                else if(this.Client[i].name === 'Фамилия'){
                    let emailCodeRegex = new RegExp(/^([А-ЯЁ]{1}[а-яё]{1,25}(-{0,1}[А-ЯЁ]{1}[а-яё]{1,25})?)$/)
                    let isSurnameValid = emailCodeRegex.test(this.Client[i].clientInput)
                    if (isSurnameValid === false){
                        this.Client[i].valid = 2
                    }
                    else{
                        this.counter++
                    }
                }
                else if(this.Client[i].name === 'Имя'){
                    let emailCodeRegex = new RegExp(/^([А-ЯЁ]{1}[а-яё]{1,25}(-{0,1}[А-ЯЁ]{1}[а-яё]{1,25})?)$/)
                    let isSurnameValid = emailCodeRegex.test(this.Client[i].clientInput)
                    if (isSurnameValid === false){
                        this.Client[i].valid = 2
                    }
                    else{
                        this.counter++
                    }
                }
                else if(this.Client[i].name === 'Отчество'){
                    let emailCodeRegex = new RegExp(/^([А-ЯЁ]{1}[а-яё]{1,25}(-{0,1}[А-ЯЁ]{1}[а-яё]{1,25})?)$/)
                    let isSurnameValid = emailCodeRegex.test(this.Client[i].clientInput)
                    if (isSurnameValid === false){
                        this.Client[i].valid = 2
                    }
                    else{
                        this.counter++
                    }
                }
                else if(this.Client[i].name === 'Телефон'){
                    let emailCodeRegex = new RegExp(/(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g)
                    let isSurnameValid = emailCodeRegex.test(this.Client[i].clientInput)
                    if (isSurnameValid === false){
                        this.Client[i].valid = 2
                    }
                    else{
                        this.counter++
                    }
                }
                else if(this.Client[i].name === 'E-mail'){
                    // eslint-disable-next-line no-useless-escape
                    let emailCodeRegex = new RegExp(/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,40}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,40}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,20}\.){1,2}[-A-Za-z]{2,4})$/)
                    let isSurnameValid = emailCodeRegex.test(this.Client[i].clientInput)
                    if (isSurnameValid === false){
                        this.Client[i].valid = 2
                    }
                    else{
                        this.counter++
                    }
                }
                else if(this.Client[i].name === 'Дата рождения'){
                    let today = new Date()
                    let lastDate = new Date(1900,1,1)
                    let ourDate = this.Client[i].clientInput
                    let ourDateparse = new Date(ourDate.replace(/(\d+).(\d+).(\d+)/, '$2/$3/$1'))
                    if (ourDateparse.setHours(0,0,0,0) > today.setHours(0,0,0,0)){
                        this.Client[i].valid = 3
                    }
                    else if((ourDateparse.setHours(0,0,0,0) < lastDate.setHours(0,0,0,0))){
                        this.Client[i].valid = 4
                    }
                    else {
                        this.counter++
                    }
                }
            }
            this.addClient()
        },
        addClient(){
            // eslint-disable-next-line no-console
            console.log(this.Client)
        },
        clearError(id){
            this.Client[id].valid = false
        }
    }
}
</script>

<style scoped>
    @-moz-document url-prefix() {
        input{
            box-shadow: none;
        }
        input:focus {
            box-shadow: 0 0 10px rgba(0,0,0,.5)
        }
        }
    @-webkit-keyframes autofill {
        to {
            color: #353541;
            background: transparent;
        }
    }
    input:-webkit-autofill {
        -webkit-animation-name: autofill;
        -webkit-animation-fill-mode: both;
    }
    .registr{
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100%;
        max-width: 100vw;
        max-height: 100%;
        margin-left: 20%;
        padding-top: 5%;
    }
    .registr button{
        margin-left: 20px;
        width: 220px;
        height: 37px;
        background-color: #353541;
        margin-top: 50px;
        font-size: 22px;
        line-height: 28px;
        color: #C4C4C4;
        border: none;
        font-family: Source Sans Pro;
        transition: 0.3s;
        outline: none;
        margin-bottom: 64px;
    }
    .registr button:hover{
        background-color: #18181E;
        color: #F0F2F4;
    }
    .registr a{
        margin-left: 20px;
        font-family: Source Sans Pro;
        font-size: 36px;
        line-height: 45px;
        color: #353541;
    }
    .pols{
        display: flex;
        flex-wrap: wrap;
    }
    .form{
        display: flex;
        flex-direction: row;
        position: relative;
        height: 50px;
        margin-top: 64px;
    }
    .form input{
        margin-left: 20px;
        margin-right: 20px;
        width: 22vw;
        height: 100%;
        border: none;
        padding-top: 20px;
        padding-bottom: 10px;
        outline: none;
        background:  #E1E1E1;
    }
    .form input[placeholder]{
        font-size: 16px;
        line-height: 20px;
    }
    .form label{
        margin-left: 20px;
        margin-right: 20px;
        position: absolute;
        bottom: 0px;
        left: 0%;
        width: 22vw;
        height: 100%;
        color: #353541;
        pointer-events: none;
        font-size: 16px;
        line-height: 20px;
    }
    .content-name{
        position: absolute;
        bottom: 5px;
        left: 0px;
        transition: all 0.3s ease;
    }
    .form input:focus + .label-name .content-name, .form input:valid + .label-name .content-name{
        transform: translateY(-150%);
    }
    .form input:hover + .label-name .content-name, .form input:valid + .label-name .content-name{
        transform: translateY(-150%);
    }
    .succescolor{
        color: #353541;
    }
    .errorcolor{
        color: #FF7373;
    }
    .succesbordercolor{
        border-bottom: 1px solid #353541;
    }
    .errorbordercolor{
        border-bottom: 1px solid #FF7373;
    }
    .content-name-error{
        color: #FF7373;
        right: 0%;
        left: auto;
        top: 24px;
    }
    .content-auth-error{
        top: 50px;
        color: #FF7373;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active до версии 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
    @media (max-width: 1200px) {
        .form input{
            margin-left: 20px;
            margin-right: 20px;
            width: 33vw;
            height: 100%;
            padding-top: 20px;
            padding-bottom: 10px;
        }
        .form label{
            margin-left: 20px;
            margin-right: 20px;
            left: 0%;
            width: 33vw;
            height: 100%;
            color: #353541;
            pointer-events: none;
            font-size: 16px;
            line-height: 20px;
        }
    }
    @media (max-width: 860px) {
        .registr{
            margin-left: 35vw;
        }
        .form input{
            margin-left: 20px;
            width: 50vw;
            height: 100%;
            padding-top: 20px;
            padding-bottom: 10px;
        }
        .form label{
            margin-left: 20px;
            left: 0%;
            width: 50vw;
            height: 100%;
            color: #353541;
            pointer-events: none;
            font-size: 16px;
            line-height: 20px;
        }
    }
</style>