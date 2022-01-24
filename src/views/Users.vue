<template>
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
      post: [],
      gridData: [],
      gridColumns: [
        {field: 'first_name', title: "First name"},
        {field: 'last_name', title: "Last name"},
        {field: 'email', title: "Email"},
        {field: 'gender', title: "Gender"},
        {field: 'ip_address', title: "IP address"},
        { field: 'link',title:"Tickers", link:(row)=>`/users/${row.id}/tickers`, value: (row) => {
            return "Detail"
          }}
      ],
      searchQuery: ''
    }
  },
  async created() {
    this?.fetchData()
  },
  methods: {
    async fetchData() {
      const users = await fetch("http://localhost:3000/user").then((result) => {
            if (result.status === 200) {
              return result?.json()
            } else {
              throw result
            }
          }
      ).catch(error => {
        this.loading = false
        this.post = []
        this.error = true
        this.errorMessage = `${error.status}: ${error.statusText}`
      });
      this.loading = false
      this.post = users
      return users
    },
  },
};
</script>
