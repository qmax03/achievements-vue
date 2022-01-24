<template>
  <div className="post">
    <div v-if="this.loading" className="loading">Loading...</div>

    <div v-if="this.error" className="error">
      {{ this.errorMessage }}
    </div>

    <div v-if="this.post.length > 0" className="content">
      content
      <h2>{{ this.post.length }} {{ $route.params.id }}</h2>
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
      post: [],
      gridData: [],
      gridColumns: ['id', 'first_name'],
      searchQuery: []
    }
  },
  async created() {
    this?.fetchData()
  },
  methods: {
    async fetchData() {
      const users = await fetch(`http://localhost:3000/user/${this.$route.params.id}`).then((result) => {
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
  },
};
</script>
