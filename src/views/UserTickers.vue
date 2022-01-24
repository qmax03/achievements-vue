<template>
<!--  <button onclick="this.methods.goBack()">Back</button>-->
  <div className="post">
    <div v-if="this.loading" className="loading">Loading...</div>

    <div v-if="this.error" className="error">
      {{ this.errorMessage }}
    </div>

    <div v-if="this.post.length > 0" className="content">
      <DataGrid :data="post" :columns="gridColumns" :filter-key="searchQuery" />
    </div>
  </div>
</template>

<script lang="js">

/* eslint-disable */
import DataGrid from "@/components/DataGrid.vue";

export default {
  components: {
    DataGrid
  },
  data() {
    return {
      loading: true,
      error: false,
      errorMessage: "",
      gridData: [],
      gridColumns: [
          {field: 'ticker',title:"Ticker"},
          {field: 'name',title:"Name"},
          {field: 'last_price',title:"Last price"},
          {field: 'ath',title:"All time high"},
          {field: 'atl',title:"All time low"}
      ],
      searchQuery: ''
    }
  },
  async created() {
    this?.fetchData()
  },
  methods: {
    async fetchData() {
      const users = await fetch(`http://localhost:3000/user/${ this.$route.params.id }/tickers`).then((result) => {
            if (result.status === 200) {
              return result?.json()
            } else {
              throw result
            }
          }
      ).catch(error => {
        console.log(error)
        this.loading = false
        this.post = []
        this.error = true
        this.errorMessage = `${error.status}: ${error.statusText}`
      });
      this.loading = false
      this.post = users
      return users
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
};
</script>
