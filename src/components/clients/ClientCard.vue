<template>
    <div class="main-card">
        <div class="client-card">
            <div class="component-nav">
              <button class="component-change-btn" v-on:click="component = 'ClientInfo'">Контактная информация</button>
              <button class="component-change-btn" v-on:click="component = 'ClientHistory'">История заказов</button>
            </div>
            <keep-alive>
              <component v-bind:is="component"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import ClientInfo from './ClientInfo';
import ClientHistory from './ClientHistory';
export default {
    name: 'ClientCard',
    components: {
        ClientInfo,
        ClientHistory
    },
    data() {
      return {
        component: 'ClientInfo'
      }
    },
}
</script>

<style scoped>
.main-card{
    width: 100%;
    margin-left: 147px;
}
.client-card {
    width: 60%;
    margin: 124px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.component-nav {
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: row;
}

.component-nav button {
  background: #F0F2F4;
  height: 49px;
  width: 220px;
  border: none;
  border-bottom: 3px solid #CDCDCD;
  outline: none;
  line-height: 20px;
  color: #353541;
}

.component-nav button:active {
  border-bottom: 3px solid #353541;
}
</style>