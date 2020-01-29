<template>
<div class="registr">
    <a>Регистрация сотрудника</a>
    <div class="pols">
        <div class="select">
            <a>Роль:</a>
            <form action="" name="role">
                <select name="whitch" v-on:change="whichRole()">
                    <option selected value="Менеджер">Менеджер</option>
                    <option value="Директор">Директор</option>
                    <option value="Администратор">Администратор</option>
                </select>
            </form>
        </div>
        <div class="inputs" v-for="(title,index) in forming" :key="index">
            <div class="form">
                <!--    Имя и фамилия        -->
                <input v-if="forming[index][0].type === 'ciryl'" maxlength="50"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)" v-bind:name="forming[index][0].fieldName"
                       v-bind:class="{errorcolor: forming[index][0].borderError, succescolor: !forming[index][0].borderError}"
                       type="text" v-model="title.name"
                       id="surname" autocomplete="off" required/>
                <!--    Text        -->
                <input v-if="forming[index][0].type === 'text'" maxlength="150"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)" v-bind:name="forming[index][0].fieldName"
                       v-bind:class="{errorcolor: forming[index][0].borderError, succescolor: !forming[index][0].borderError}"
                       type="text" v-model="title.name"
                       id="surname" autocomplete="off" required/>
                <!--    Number        -->
                <input v-if="forming[index][0].type === 'number'"
                       v-mask="{mask: '+7(9{3}) 9{3} 9{2}-9{2}'}"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)" v-bind:name="forming[index][0].fieldName"
                       v-bind:class="{errorcolor: forming[index][0].borderError, succescolor: !forming[index][0].borderError}"
                       type="text" v-model="title.name"
                       id="surname" autocomplete="off" required/>
                <!--    Mail        -->
                <input v-if="forming[index][0].type === 'email'" maxlength="100"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)" v-bind:name="forming[index][0].fieldName"
                       v-bind:class="{errorcolor: forming[index][0].borderError, succescolor: !forming[index][0].borderError}"
                       type="text" v-model="title.name"
                       id="surname" autocomplete="off" required/>
                <!--    Date        onfocus="(this.type='date')" onblur="if(!this.value)this.type='text'"   -->
                <input v-if="forming[index][0].type === 'date'"
                       onfocus="(this.type='date')" onblur="if(!this.value)this.type='text'"
                       min="01.01.1920"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)" v-bind:name="forming[index][0].fieldName"
                       v-bind:class="{errorcolor: forming[index][0].borderError, succescolor: !forming[index][0].borderError}"
                       type="text" v-model="title.name"
                       id="surname" autocomplete="off" required/>
                <!--    Passprotseria        -->
                <input v-if="forming[index][0].type === 'passportseria'"
                       v-mask="{mask: '9{4}', placeholder: ' '}"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                       v-bind:class="{errorcolor: forming[index][0].borderError, succescolor: !forming[index][0].borderError}"
                       type="text" v-model="title.name"
                       id="surname" autocomplete="off" required/>
                <!--    Passportnumber        -->
                <input v-if="forming[index][0].type === 'passportnumber'"
                       v-mask="{mask: '9{6}', placeholder: ' '}"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                       v-bind:class="{errorcolor: forming[index][0].borderError, succescolor: !forming[index][0].borderError}"
                       type="text" v-model="title.name"
                       id="surname" autocomplete="off" required/>
                <!--    Login        -->
                <input v-if="forming[index][0].type === 'login'" maxlength="16"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                       v-bind:class="{errorcolor: forming[index][0].borderError, succescolor: !forming[index][0].borderError}"
                       type="text" v-model="title.name"
                       id="surname" autocomplete="off" required/>
                <!--    Password        -->
                <input v-if="forming[index][0].type === 'password'" maxlength="16"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                       v-bind:class="{errorcolor: forming[index][0].borderError, succescolor: !forming[index][0].borderError}"
                       type="text" v-model="title.name"
                       id="surname" autocomplete="off" required/>
                <label v-bind:class="{errorbordercolor: forming[index][0].borderError, succesbordercolor: !forming[index][0].borderError}" for="surname" class="label-name">
                    <span class="content-name" >{{forming[index][0].pole}}</span>
                    <!--    Транзишоны        -->
                    <transition name="slide-fade">
                        <span v-if="forming[index][0].valid === true" class="content-name content-name-error">Обязательное поле</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="forming[index][0].errorIndex === 1"
                          class="content-name content-name-error" style="top: 54px">Неправильный формат заполнения</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="forming[index][0].errorIndex === 2"
                          class="content-name content-name-error" style="top: 54px">Пароли не совпадают</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="forming[index][0].errorIndex === 3"
                          class="content-name content-name-error" style="top: 54px">Пароль должен состоять из 8-16 символов</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="forming[index][0].errorIndex === 4"
                          class="content-name content-name-error" style="top: 54px">Логин должен состоять из 2-16 символов</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="forming[index][0].errorIndex === 5"
                          class="content-name content-name-error" style="top: 54px">Этой даты еще не наступило</span>
                    </transition>
                </label>
            </div>
        </div>
    </div>
        <button v-on:click="validationInput">
            Зарегестрироваться
        </button>
</div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return{
                forming: [
                    [{
                        valid: false,
                        pole: 'Фамилия',
                        name: null,
                        fieldName: 'surname',
                        type: 'ciryl',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Имя',
                        name: null,
                        fieldName: 'name',
                        type: 'ciryl',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Отчество',
                        name: null,
                        fieldName: 'fathername',
                        type: 'ciryl',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Телефон',
                        name: null,
                        fieldName: 'phone',
                        type: 'number',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'E-mail',
                        name: null,
                        fieldName: 'email',
                        type: 'email',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Дата рождения',
                        name: null,
                        fieldName: 'birthday',
                        type: 'date',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Дата приема на работу',
                        name: null,
                        fieldName: 'startworkdate',
                        type: 'date',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Серия паспорта',
                        name: null,
                        fieldName: 'passportseria',
                        type: 'passportseria',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Номер паспорта',
                        name: null,
                        fieldName: 'passportnumber',
                        type: 'passportnumber',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Когда выдан',
                        name: null,
                        fieldName: 'passprotdate',
                        type: 'date',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Кем выдан',
                        name: null,
                        fieldName: 'passportwho',
                        type: 'text',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Логин',
                        name: null,
                        fieldName: 'login',
                        type: 'login',
                        errorIndex: null,
                        borderError: false
                    }],
                    [{
                        valid: false,
                        pole: 'Пароль',
                        name: null,
                        fieldName: 'password',
                        type: 'password',
                        errorIndex: null,
                        borderError: false
                    }],
                ],
                roles: ['Администратор','Менеджер','Директор'],
                counter: 0,
                sotr: 'Менеджер',
                inputMaskDigits2: {
                    alias: 'decimal',
                    integerDigits: 8,
                    digits: 2,
                    rightAlign: false,
                    allowMinus: false
                },
                user: {
                    surname: null,
                    name: null,
                    fathername: null,
                    telephone: null,
                    email: null,
                    birth_date: null,
                    date_of_employment: null,
                    passport_series: null,
                    passport_number: null,
                    date_of_issue_of_passport: null,
                    passport_issued_by: null,
                    login: null,
                    pass: null,
                    role: null
                }
            }
        },
        computed:{
            isSurnameValid () {
                // ([А-ЯЁ][а-яё]+[\-\s]?){3,}
                let emailCodeRegex = new RegExp(/^([А-ЯЁ]{1}[а-яё]{1,25}(-{0,1}[А-ЯЁ]{1}[а-яё]{1,25})?)$/)
                let isSurnameValid = emailCodeRegex.test(this.forming[0].name)
                return isSurnameValid
            },
            isNameValid () {
                let emailCodeRegex = new RegExp(/^([А-ЯЁ]{1}[а-яё]{1,25}(-{0,1}[А-ЯЁ]{1}[а-яё]{1,25})?)$/)
                let isNameValid = emailCodeRegex.test(this.forming[1].name)
                return isNameValid
            },
            isFathernameValid () {
                let emailCodeRegex = new RegExp(/^([А-ЯЁ]{1}[а-яё]{1,49})$/)
                let isFathernameValid = emailCodeRegex.test(this.forming[2].name)
                return isFathernameValid
            },
            isPhoneValid () {
                let emailCodeRegex = new RegExp(/(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g)
                let isPhoneValid = emailCodeRegex.test(this.forming[3].name)
                return isPhoneValid
            },
            isEmailValid () {
                // eslint-disable-next-line no-useless-escape
                let emailCodeRegex = new RegExp(/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,40}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,40}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,20}\.){1,2}[-A-Za-z]{2,4})$/)
                let isEmailValid = emailCodeRegex.test(this.forming[4].name)
                return isEmailValid
            },
            isPassportSeriaValid () {
                let emailCodeRegex = new RegExp(/^([0-9]{4})$/)
                let isPassportSeriaValid = emailCodeRegex.test(this.forming[7].name)
                return isPassportSeriaValid
            },
            isPassportNumValid () {
                let emailCodeRegex = new RegExp(/^([0-9]{6})$/)
                let isPassportNumValid = emailCodeRegex.test(this.forming[8].name)
                return isPassportNumValid
            },
            isPassportWhoValid () {
                // eslint-disable-next-line no-useless-escape
                let emailCodeRegex = new RegExp(/^([А-Яа-я]№?.?,?-? ?)+[а-я]{1}$/)
                let isPassportWhoValid = emailCodeRegex.test(this.forming[10].name)
                return isPassportWhoValid
            },
            isLoginValid () {
                let emailCodeRegex = new RegExp(/^[A-Za-z0-9_-]{2,16}$/)
                let isLoginValid = emailCodeRegex.test(this.forming[11].name)
                return isLoginValid
            },
            isPasswordValid () {
                let emailCodeRegex = new RegExp(/^[A-Za-z0-9_-]{8,16}$/)
                let isPasswordValid = emailCodeRegex.test(this.forming[12].name)
                return isPasswordValid
            },
        },
        methods:{
            validationInput (){
                this.user = {
                    surname: null,
                    name: null,
                    fathername: null,
                    telephone: null,
                    email: null,
                    birth_date: null,
                    date_of_employment: null,
                    passport_series: null,
                    passport_number: null,
                    date_of_issue_of_passport: null,
                    passport_issued_by: null,
                    login: null,
                    pass: null,
                }
                this.counter = 0
                for(let i = 0; i< this.forming.length; i++){
                    if(this.forming[i].name == null || this.forming[i].name == '' || this.forming[i].name == undefined) {
                        if (this.forming[i][0].fieldName === 'fathername'){
                            this.counter++
                        }
                        else{
                            this.forming[i][0].valid = true
                            this.forming[i][0].borderError = true
                        }
                    }
                    else {
                        if (this.forming[i][0].fieldName === 'surname'){
                            if (this.isSurnameValid === false){
                                this.forming[i][0].errorIndex = 1
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.surname = this.forming[i].name
                            }
                        }
                        if (this.forming[i][0].fieldName === 'name'){
                            if (this.isNameValid === false){
                                this.forming[i][0].errorIndex = 1
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.name = this.forming[i].name
                            }
                        }
                        if (this.forming[i][0].fieldName === 'fathername'){
                            if (this.isFathernameValid === false){
                                this.forming[i][0].errorIndex = 1
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.fathername = this.forming[i].name
                            }
                        }
                        if (this.forming[i][0].fieldName === 'phone'){
                            if (this.isPhoneValid === false){
                                this.forming[i][0].errorIndex = 1
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                if(this.forming[i].name != null){
                                    // eslint-disable-next-line no-useless-escape
                                    this.user.telephone = this.forming[i].name
                                        .replace(/ /g, "" )
                                        .replace(/\)/g, "")
                                        .replace(/\(/g, "")
                                        .replace(/\+/g, "")
                                        .replace(/-/g, "" )
                                        .replace(/7{1}/, "" )
                                }
                            }
                        }
                        if (this.forming[i][0].fieldName === 'email'){
                            if (this.isEmailValid === false){
                                this.forming[i][0].errorIndex = 1
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.email = this.forming[i].name
                            }
                        }
                        if (this.forming[i][0].fieldName === 'passportseria'){
                            if (this.isPassportSeriaValid === false){
                                this.forming[i][0].errorIndex = 1
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.passport_series = this.forming[i].name
                            }
                        }
                        if (this.forming[i][0].fieldName === 'passportnumber'){
                            if (this.isPassportNumValid === false){
                                this.forming[i][0].errorIndex = 1
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.passport_number = this.forming[i].name
                            }
                        }
                        if (this.forming[i][0].fieldName === 'passportwho'){
                            if (this.isPassportWhoValid === false){
                                this.forming[i][0].errorIndex = 1
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.passport_issued_by = this.forming[i].name
                            }
                        }
                        if (this.forming[i][0].fieldName === 'login'){
                            if(this.forming[11].name.length < 2){
                                this.forming[i][0].errorIndex = 4
                                this.forming[i][0].borderError = true
                            }
                            else if(this.forming[11].name.length > 16){
                                this.forming[i][0].errorIndex = 4
                                this.forming[i][0].borderError = true
                            }
                            else if (this.isLoginValid === false){
                                this.forming[i][0].errorIndex = 1
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.login = this.forming[i].name
                            }
                        }
                        if (this.forming[i][0].fieldName === 'password'){
                            if(this.forming[12].name.length < 8){
                                this.forming[i][0].errorIndex = 3
                                this.forming[i][0].borderError = true
                            }
                            else if(this.forming[12].name.length > 16){
                                this.forming[i][0].errorIndex = 3
                                this.forming[i][0].borderError = true
                            }
                            else if (this.isPasswordValid === false){
                                this.forming[i][0].errorIndex = 1
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.pass = this.forming[i].name
                            }
                        }
                        if (this.forming[i][0].type === 'date'){
                            let today = new Date()
                            let ourDate = this.forming[i].name
                            let ourDateparse = new Date(ourDate.replace(/(\d+).(\d+).(\d+)/, '$2/$3/$1'))
                            if (ourDateparse.setHours(0,0,0,0) > today.setHours(0,0,0,0)){
                                this.forming[i][0].errorIndex = 5
                                this.forming[i][0].borderError = true
                            }
                            else{
                                this.counter++
                                if(this.forming[9].name != null){
                                    this.user.date_of_issue_of_passport = this.forming[9].name.replace( /-/g, "." )
                                        .replace(/(\w+).(\w+).(\w+)/i, '$3.$2.$1')
                                }
                                if(this.forming[5].name != null){
                                    this.user.birth_date = this.forming[5].name.replace( /-/g, "." )
                                        .replace(/(\w+).(\w+).(\w+)/i, '$3.$2.$1')
                                }
                                if(this.forming[6].name != null){
                                    this.user.date_of_employment = this.forming[6].name.replace( /-/g, "." )
                                        .replace(/(\w+).(\w+).(\w+)/i, '$3.$2.$1')
                                }
                            }
                        }
                    }
                }
                this.regComplited()
                this.user.role = this.sotr
            },
            regComplited (){
                if (this.counter === 13){
                    axios({
                        method: 'post',
                        auth: {
                            username: sessionStorage.getItem('login'),
                            password: sessionStorage.getItem('password'),
                        },
                        data: {
                            surname: this.user.surname,
                            name: this.user.name,
                            fathername: this.user.fathername,
                            telephone: this.user.telephone,
                            email: this.user.email,
                            birth_date: this.user.birth_date,
                            date_of_employment: this.user.date_of_employment,
                            passport_series: this.user.passport_series,
                            passport_number: this.user.passport_number,
                            date_of_issue_of_passport: this.user.date_of_issue_of_passport,
                            passport_issued_by: this.user.passport_issued_by,
                            login: this.user.login,
                            pass: this.user.pass,
                            role: this.sotr,
                        },
                        url: 'http://api.catering.student.smartworld.team:2280/employee/create/'
                    })
                        .then((response) => {
                            // eslint-disable-next-line no-console
                            console.log(response)
                            this.$router.push({name:'stafflist'});
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.log(error.response.status)
                        })
                    this.counter = 0
                }
            },
            clearError (index){
                this.forming[index][0].borderError = false
                this.forming[index][0].valid = false
                this.forming[index][0].errorIndex = 'none'
            },
            // починить!
            whichRole(){
                let bsh = document.role.whitch
                let bshed = bsh.options[bsh.selectedIndex].text
                if (bshed === 'Администратор'){
                    this.sotr = 'Администратор'
                }
                else if (bshed === 'Директор'){
                    this.sotr = 'Директор'
                }
                else if (bshed === 'Менеджер'){
                    this.sotr = 'Менеджер'
                }
            }
        },
    }
</script>

<style scoped>
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
    .pols{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .registr{
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        display: flex;
        flex-direction: column;
        padding-left: 300px;
        padding-right: 150px;
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
    .inputs{
        margin-top: 64px;
        display: flex;
        justify-content: space-between;
    }
    .select{
        margin-right: 40px;
        width: 22vw;
        display: flex;
        justify-content: start;
        align-items: flex-end;
        padding-bottom: 10px;
    }
    .select a{
        padding-right: 20px;
        font-family: Source Sans Pro;
        font-size: 16px;
        line-height: 20px;
        color: #353541;
    }
    .select select{
        width: auto;
        outline: none;
    }
    .form{
        position: relative;
        height: 50px;
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
    @media (max-width: 1800px){
        .select{
            width: 20vw;
        }
        .form label{
            width: 20vw;
        }
        .form input{
            width: 20vw;
        }
    }
    @media (max-width: 1450px){
        .select{
            width: 25vw;
        }
        .form label{
            width: 25vw;
        }
        .form input{
            width: 25vw;
        }
    }
    @media (max-width: 1100px){
        .select{
            margin-top: 60px;
            width: 50vw;
        }
        .form label{
            width: 50vw;
        }
        .form input{
            width: 50vw;
        }
    }
</style>