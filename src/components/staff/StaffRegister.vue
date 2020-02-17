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
        <div class="inputs" v-for="(inputs,index) in forming" :key="index">
            <div class="form">
                <!--    Имя и фамилия        -->
                <input v-if="inputs.type === 'ciryl'" maxlength="50"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)" v-bind:name="inputs.fieldName"
                       v-bind:class="{errorcolor: inputs.borderError, succescolor: !inputs.borderError}"
                       type="text" v-model="inputs.name"
                       v-bind:id="inputs.type" autocomplete="off" required/>
                <!--    Text        -->
                <input v-if="inputs.type === 'text'" maxlength="150"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)" v-bind:name="inputs.fieldName"
                       v-bind:class="{errorcolor: inputs.borderError, succescolor: !inputs.borderError}"
                       type="text" v-model="inputs.name"
                       v-bind:id="inputs.type" autocomplete="off" required/>
                <!--    Number        -->
                <input v-if="inputs.type === 'number'"
                       v-mask="{mask: '+7(9{3}) 9{3} 9{2}-9{2}'}"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)" v-bind:name="inputs.fieldName"
                       v-bind:class="{errorcolor: inputs.borderError, succescolor: !inputs.borderError}"
                       type="text" v-model="inputs.name"
                       v-bind:id="inputs.type" autocomplete="off" required/>
                <!--    Mail        -->
                <input v-if="inputs.type === 'email'" maxlength="100"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)" v-bind:name="inputs.fieldName"
                       v-bind:class="{errorcolor: inputs.borderError, succescolor: !inputs.borderError}"
                       type="text" v-model="inputs.name"
                       v-bind:id="inputs.type" autocomplete="off" required/>
                <!--    Date        onfocus="(this.type='date')" onblur="if(!this.value)this.type='text'"   -->
                <input v-if="inputs.type === 'date'"
                       onfocus="(this.type='date')" onblur="if(!this.value)this.type='text'"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)" v-bind:name="inputs.fieldName"
                       v-bind:class="{errorcolor: inputs.borderError, succescolor: !inputs.borderError}"
                       type="text" v-model="inputs.name"
                       v-bind:id="inputs.type" autocomplete="off" required/>
                <!--    Passprotseria        -->
                <input v-if="inputs.type === 'passportseria'"
                       v-mask="{mask: '9{4}', placeholder: ' '}"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                       v-bind:class="{errorcolor: inputs.borderError, succescolor: !inputs.borderError}"
                       type="text" v-model="inputs.name"
                       v-bind:id="inputs.type" autocomplete="off" required/>
                <!--    Passportnumber        -->
                <input v-if="inputs.type === 'passportnumber'"
                       v-mask="{mask: '9{6}', placeholder: ' '}"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                       v-bind:class="{errorcolor: inputs.borderError, succescolor: !inputs.borderError}"
                       type="text" v-model="inputs.name"
                       v-bind:id="inputs.type" autocomplete="off" required/>
                <!--    Login        -->
                <input v-if="inputs.type === 'login'" maxlength="16"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                       v-bind:class="{errorcolor: inputs.borderError, succescolor: !inputs.borderError}"
                       type="text" v-model="inputs.name"
                       v-bind:id="inputs.type" autocomplete="off" required/>
                <!--    Password
                      v-bind:id="addDish[index].type"
                :for="addDish.type"
                      -->
                <input v-if="inputs.type === 'password'" maxlength="16"
                       v-on:mousedown="clearError(index)" v-on:focus="clearError(index)"
                       v-bind:class="{errorcolor: inputs.borderError, succescolor: !inputs.borderError}"
                       type="text" v-model="inputs.name"
                       v-bind:id="inputs.type" autocomplete="off" required/>
                <label v-bind:class="{errorbordercolor: inputs.borderError, succesbordercolor: !inputs.borderError}" :for="inputs.type" class="label-name">
                    <span class="content-name" >{{inputs.pole}}</span>
                    <!--    Транзишоны        -->
                    <transition name="slide-fade">
                        <span v-if="inputs.valid === true" class="content-name content-name-error">Обязательное поле</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="inputs.errorIndex === 1"
                          class="content-name content-name-error" style="top: 54px">Неправильный формат заполнения</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="inputs.errorIndex === 2"
                          class="content-name content-name-error" style="top: 54px">Пароли не совпадают</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="inputs.errorIndex === 3"
                          class="content-name content-name-error" style="top: 54px">Пароль должен состоять из 8-16 символов</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="inputs.errorIndex === 4"
                          class="content-name content-name-error" style="top: 54px">Логин должен состоять из 2-16 символов</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="inputs.errorIndex === 5"
                          class="content-name content-name-error" style="top: 54px">Этой даты еще не наступило</span>
                    </transition>
                    <transition name="slide-fade">
                    <span v-if="inputs.errorIndex === 6"
                          class="content-name content-name-error" style="top: 54px">Дата должна быть не ранее 1900г.</span>
                    </transition>
                </label>
            </div>
        </div>
    </div>
        <button v-on:click="validationInput">
            Зарегестрировать
        </button>
</div>
</template>

<script>
    import axios from 'axios';
    import baseURL from '../../../config'
    export default {
        data(){
            return{
                forming: [
                    {
                        valid: false,
                        pole: 'Фамилия',
                        name: null,
                        fieldName: 'surname',
                        type: 'ciryl',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Имя',
                        name: null,
                        fieldName: 'name',
                        type: 'ciryl',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Отчество',
                        name: null,
                        fieldName: 'fathername',
                        type: 'ciryl',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Телефон',
                        name: null,
                        fieldName: 'phone',
                        type: 'number',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'E-mail',
                        name: null,
                        fieldName: 'email',
                        type: 'email',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Дата рождения',
                        name: null,
                        fieldName: 'birthday',
                        type: 'date',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Дата приема на работу',
                        name: null,
                        fieldName: 'startworkdate',
                        type: 'date',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Серия паспорта',
                        name: null,
                        fieldName: 'passportseria',
                        type: 'passportseria',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Номер паспорта',
                        name: null,
                        fieldName: 'passportnumber',
                        type: 'passportnumber',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Когда выдан',
                        name: null,
                        fieldName: 'passprotdate',
                        type: 'date',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Кем выдан',
                        name: null,
                        fieldName: 'passportwho',
                        type: 'text',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Логин',
                        name: null,
                        fieldName: 'login',
                        type: 'login',
                        errorIndex: null,
                        borderError: false
                    },
                    {
                        valid: false,
                        pole: 'Пароль',
                        name: null,
                        fieldName: 'password',
                        type: 'password',
                        errorIndex: null,
                        borderError: false
                    },
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
                        if (this.forming[i].fieldName === 'fathername'){
                            this.counter++
                        }
                        else{
                            this.forming[i].valid = true
                            this.forming[i].borderError = true
                        }
                    }
                    else {
                        if (this.forming[i].fieldName === 'surname'){
                            let emailCodeRegex = new RegExp(/^([А-ЯЁ]{1}[а-яё]{1,25}(-{0,1}[А-ЯЁ]{1}[а-яё]{1,25})?)$/)
                            let isSurnameValid = emailCodeRegex.test(this.forming[i].name)
                            if (isSurnameValid === false){
                                this.forming[i].errorIndex = 1
                                this.forming[i].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.surname = this.forming[i].name
                            }
                        }
                        if (this.forming[i].fieldName === 'name'){
                            let emailCodeRegex = new RegExp(/^([А-ЯЁ]{1}[а-яё]{1,25}(-{0,1}[А-ЯЁ]{1}[а-яё]{1,25})?)$/)
                            let isNameValid = emailCodeRegex.test(this.forming[i].name)
                            if (isNameValid === false){
                                this.forming[i].errorIndex = 1
                                this.forming[i].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.name = this.forming[i].name
                            }
                        }
                        if (this.forming[i].fieldName === 'fathername'){
                            let emailCodeRegex = new RegExp(/^([А-ЯЁ]{1}[а-яё]{1,49})$/)
                            let isFathernameValid = emailCodeRegex.test(this.forming[i].name)
                            if (isFathernameValid === false){
                                this.forming[i].errorIndex = 1
                                this.forming[i].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.fathername = this.forming[i].name
                            }
                        }
                        if (this.forming[i].fieldName === 'phone'){
                            let emailCodeRegex = new RegExp(/(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g)
                            let isPhoneValid = emailCodeRegex.test(this.forming[i].name)
                            if (isPhoneValid === false){
                                this.forming[i].errorIndex = 1
                                this.forming[i].borderError = true
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
                        if (this.forming[i].fieldName === 'email'){
                            // eslint-disable-next-line no-useless-escape
                            let emailCodeRegex = new RegExp(/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,40}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,40}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,20}\.){1,2}[-A-Za-z]{2,4})$/)
                            let isEmailValid = emailCodeRegex.test(this.forming[i].name)
                            if (isEmailValid === false){
                                this.forming[i].errorIndex = 1
                                this.forming[i].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.email = this.forming[i].name
                            }
                        }
                        if (this.forming[i].fieldName === 'passportseria'){
                            let emailCodeRegex = new RegExp(/^([0-9]{4})$/)
                            let isPassportSeriaValid = emailCodeRegex.test(this.forming[i].name)
                            if (isPassportSeriaValid === false){
                                this.forming[i].errorIndex = 1
                                this.forming[i].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.passport_series = this.forming[i].name
                            }
                        }
                        if (this.forming[i].fieldName === 'passportnumber'){
                            let emailCodeRegex = new RegExp(/^([0-9]{6})$/)
                            let isPassportNumValid = emailCodeRegex.test(this.forming[i].name)
                            if (isPassportNumValid === false){
                                this.forming[i].errorIndex = 1
                                this.forming[i].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.passport_number = this.forming[i].name
                            }
                        }
                        if (this.forming[i].fieldName === 'passportwho'){
                            // eslint-disable-next-line no-useless-escape
                            let emailCodeRegex = new RegExp(/^([А-Я]{1})+([а-я]№?.?,?-? ?)+[а-я]{1}$/)
                            let isPassportWhoValid = emailCodeRegex.test(this.forming[i].name)
                            if (isPassportWhoValid === false){
                                this.forming[i].errorIndex = 1
                                this.forming[i].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.passport_issued_by = this.forming[i].name
                            }
                        }
                        if (this.forming[i].fieldName === 'login'){
                            let emailCodeRegex = new RegExp(/^[A-Za-z0-9_-]{2,16}$/)
                            let isLoginValid = emailCodeRegex.test(this.forming[i].name)
                            if(this.forming[11].name.length < 2){
                                this.forming[i].errorIndex = 4
                                this.forming[i].borderError = true
                            }
                            else if(this.forming[11].name.length > 16){
                                this.forming[i].errorIndex = 4
                                this.forming[i].borderError = true
                            }
                            else if (isLoginValid === false){
                                this.forming[i].errorIndex = 1
                                this.forming[i].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.login = this.forming[i].name
                            }
                        }
                        if (this.forming[i].fieldName === 'password'){
                            let emailCodeRegex = new RegExp(/^[A-Za-z0-9_-]{8,16}$/)
                            let isPasswordValid = emailCodeRegex.test(this.forming[i].name)
                            if(this.forming[12].name.length < 8){
                                this.forming[i].errorIndex = 3
                                this.forming[i].borderError = true
                            }
                            else if(this.forming[12].name.length > 16){
                                this.forming[i].errorIndex = 3
                                this.forming[i].borderError = true
                            }
                            else if (isPasswordValid === false){
                                this.forming[i].errorIndex = 1
                                this.forming[i].borderError = true
                            }
                            else{
                                this.counter++
                                this.user.pass = this.forming[i].name
                            }
                        }
                        if (this.forming[i].type === 'date'){
                            let today = new Date()
                            let lastDate = new Date(1900,1,1)
                            let ourDate = this.forming[i].name
                            let ourDateparse = new Date(ourDate.replace(/(\d+).(\d+).(\d+)/, '$2/$3/$1'))
                            if (ourDateparse.setHours(0,0,0,0) > today.setHours(0,0,0,0)){
                                this.forming[i].errorIndex = 5
                                this.forming[i].borderError = true
                            }
                            else if((ourDateparse.setHours(0,0,0,0) < lastDate.setHours(0,0,0,0))){
                                this.forming[i].errorIndex = 6
                                this.forming[i].borderError = true
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
                        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } ,
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
                        url: baseURL +'/employee/create/'
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
                this.forming[index].borderError = false
                this.forming[index].valid = false
                this.forming[index].errorIndex = 'none'
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
        height: 100%;
        max-width: 100vw;
        max-height: 100%;
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
    @media (max-width: 1550px){
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
    @media (max-width: 1250px){
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
        .registr{
            padding-left: 30%;
            padding-right: 5%;
        }
    }
</style>