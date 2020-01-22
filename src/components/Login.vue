<template>
    <div class="container-fluid auth-full">
        <div class="row">
            <div class="col-with-img">
                <img src="../assets/image-from-rawpixel-id-385087-original1.png">
                <div class="horos-img">
                    <img class="horos-img" src="../assets/Khorosho_i_vkusno_logo1.png">
                </div>
            </div>
            <div class="col-with-auth">
                <a>Авторизация</a>
                <div class="form">
                    <input v-bind:class="{errorcolor: loginerror, errorcolor : noneuser}"
                           type="text" v-on:click="clearLoginError()" v-model="auth.login"
                           id="login" autocomplete="off" required maxlength="16" />
                    <label id="firstlabel" v-bind:class="{errorbordercolor: loginerror , errorbordercolor : noneuser}" for="login" class="label-name">
                        <span class="content-name" >Логин</span>
                        <transition name="slide-fade">
                        <span v-if="loginerror == true" class="content-name content-name-error">Обязательное поле</span>
                        </transition>
                    </label>
                </div>
                <div class="form" style="margin-top: 64px">
                    <input  v-bind:class="{errorcolor: passworderror, errorcolor : noneuser}"
                            type="password" maxlength="16"
                            v-on:click="clearPasswordError()" v-model="auth.password"
                            id="password" autocomplete="off" required />
                    <label id="secondlabel" v-bind:class="{errorbordercolor: passworderror, errorbordercolor : noneuser}" for="password" class="label-name">
                        <span class="content-name">Пароль</span>
                        <transition name="slide-fade">
                        <span v-if="passworderror == true" class="content-name content-name-error">Обязательное поле</span>
                        </transition>
                        <transition name="slide-fade">
                        <span v-if="noneuser == true" class="content-name content-auth-error">Неверный логин или пароль</span>
                        </transition>
                        <transition name="slide-fade">
                        <span v-if="noneserver == true" class="content-name content-auth-error">Ошибка сервера</span>
                        </transition>
                    </label>
                </div>
                <button v-on:click="login()">Войти</button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return{
                auth: {
                    login: '',
                    password: ''
                },
                loginerror: false,
                passworderror: false,
                noneuser: false,
                noneserver: false,

            }
        },
        methods: {
            login: function () {
                this.noneuser = false
                this.noneserver = false
                if ((this.auth.login === null || this.auth.login === '') && (this.auth.password === null || this.auth.password === '')){
                    this.loginerror = true
                    this.passworderror = true
                    document.getElementById('firstlabel').style.borderBottomColor = '#FF7373'
                    document.getElementById('secondlabel').style.borderBottomColor = '#FF7373'
                }
                else if (this.auth.login === null || this.auth.login === ''){
                    this.loginerror = true
                    document.getElementById('firstlabel').style.borderBottomColor = '#FF7373'
                }
                else if (this.auth.password === null || this.auth.password === ''){
                    this.passworderror = true
                    document.getElementById('secondlabel').style.borderBottomColor = '#FF7373'
                }
                else{
                    axios({
                        method: 'post',
                        auth: {
                            username: this.auth.login,
                            password: this.auth.password,
                        },
                        url: 'http://api.catering.student.smartworld.team:2280/employee/'
                    })
                        .then((response) => {
                            // eslint-disable-next-line no-console
                            console.log(response.data.items)
                            this.$router.push('/menu')
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.log(error.response)
                            if (error.response.status === 401){
                                document.getElementById('firstlabel').style.borderBottomColor = '#FF7373'
                                document.getElementById('secondlabel').style.borderBottomColor = '#FF7373'
                                document.getElementById('login').style.color = '#FF7373'
                                document.getElementById('password').style.color = '#FF7373'
                                this.noneuser = true
                            }
                            else if(error.response.status === 500){
                                if(error.response.data.message != 'У Вас нет прав для доступа к данной странице'){
                                    document.getElementById('firstlabel').style.borderBottomColor = '#FF7373'
                                    document.getElementById('secondlabel').style.borderBottomColor = '#FF7373'
                                    document.getElementById('login').style.color = '#FF7373'
                                    document.getElementById('password').style.color = '#FF7373'
                                    this.noneserver = true
                                }
                                else if(error.response.data.message === 'У Вас нет прав для доступа к данной странице'){
                                    this.$router.push('/menu')
                                    alert('Успешная авторизация')
                                }
                            }
                        })
                }
                // eslint-disable-next-line no-console
                console.log(this.loginerror)
            },
            clearLoginError: function () {
                document.getElementById('firstlabel').style.borderBottomColor = '#F0F2F4'
                document.getElementById('login').style.color = '#F0F2F4'
                this.loginerror = false
                this.noneuser = false
                this.noneserver = false
            },
            clearPasswordError: function () {
                document.getElementById('secondlabel').style.borderBottomColor = '#F0F2F4'
                document.getElementById('password').style.color = '#F0F2F4'
                this.passworderror = false
                this.noneuser = false
                this.noneserver = false
            },
        }
    }
</script>
<style scoped>
.form{
    width: 420px;
    position: relative;
    height: 50px;
}
.form input{
    width: 100%;
    height: 100%;
    border: none;
    padding-top: 20px;
    background-color: #353541;
    color: #F0F2F4;
    padding-bottom: 7px;
    outline: none;
}
.form input[placeholder]{
    font-size: 16px;
    line-height: 20px;
}
.form label{
    position: absolute;
    bottom: 0px;
    left: 0%;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-bottom: 1px solid #F0F2F4;
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
.errorcolor{
    color: #FF7373;
}
.errorbordercolor{
    border-bottom: 1px solid #FF7373;
}
.content-name-error{
    color: #FF7373;
    right: 0%;
    left: auto;
}
.content-auth-error{
    top: 50px;
    color: #FF7373;
}
    body{
        overflow: hidden;
        font-family: 'Source Sans Pro', sans-serif;
    }
    .auth-full{
        overflow: hidden;
        background: #353541;
    }
    .col-with-img{
        position: relative;
        overflow: hidden;
        max-height: 100vh;
    }
    .col-with-img img{
        height: 100vh;
        width: auto;
        overflow: hidden;
    }
    .horos-img img{
        position: absolute;
        z-index: 1;
        width: auto;
        top: 40px;
        height: 40vh;
        margin-left: auto;
        margin-right: auto;
        left: 0px;
        right: 0px;
    }
    .col-with-auth{
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        font-family: 'Source Sans Pro', sans-serif;
        color: #F0F2F4;
    }
    .col-with-auth a{
        font-size: 36px;
        line-height: 45px;
        margin-bottom: 64px;
    }
    .col-with-auth button{
        background: #F0F2F4;
        width: 86px;
        height: 38px;
        color: #353541;
        font-size: 22px;
        line-height: 28px;
        outline: none;
        border: none;
        margin-top: 50px;
        transition: 0.3s;
    }
    .col-with-auth button:hover{
        background-color: #18181E;
        color: #F0F2F4;
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
@media (max-width: 992px){
    .col-with-img{
        display: none;
    }
    .col-with-auth{
        height: 100vh;
    }
}
</style>