<template>
  <div class="hello">
    <select v-model="select">
      <option v-for="(sortEach, index) in sortStaff" :key="index" :value="sortEach">{{sortEach}}</option>
    </select> <br>
    <input type="text" v-model="search" @input="onChange">
    <input type="submit">
    <ul> 
      <li v-for="staff in filterStaff" :key="staff.id">{{staff.name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "FilterStaff",
  data() {
    return {
      search: "",
      select: "",
      sortStaff: ["name", "company", "phone" ], //как добавить value если генерировать options вот так
    };
  },
  computed: { 
    ...mapGetters(['allStaff']),
    filterStaff: function() {
      let filtered = this.allStaff;
      if (this.search) {
        filtered = this.allStaff.filter(
          staff => staff.name.toLowerCase().indexOf(this.search) > -1
        );
      }
      if (this.select) {
        filtered = this.allStaff.filter(
          staff => staff.sortStaff.toLowerCase() === this.select.toLowerCase()
        );
      }
      return filtered;
    },
  },
methods: { 
   ...mapActions(['fetchStaff']),
  },
  created() {
      this.fetchStaff();
  }
} 
</script>

<style scoped>

</style>