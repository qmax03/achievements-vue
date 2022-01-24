<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="key in columns"
          @click="sortBy(key.field)"
          :key="key"
          :class="{ active: sortKey == key.field }"
        >
          {{ key?.title }}
          <span
            class="arrow"
            :class="sortOrders[key.field] > 0 ? 'asc' : 'dsc'"
          >
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in filteredRows" :key="row.id">
        <td v-for="column in columns" :key="`${row.id}-${column.field}`">
          <span v-if="column.link">
            <router-link :to="column.link(row)">{{
              column?.value(row)
            }}</router-link>
          </span>
          <span v-else>
            {{ column?.value ? column?.value(row) : row[column.field] }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
table {
  border-spacing: 0;
  border-collapse: collapse;
}
th {
}
table,
tr,
th,
td {
  border: 1px solid silver;
  padding: 5px;
}
</style>

<script lang="js">

export default {
  props: {
    data: Array,
    // columnFields: Array,
    columns: Array,
    filterKey: String,
  },
  data() {
    const sortOrders = {};
    return {
      // columnFields,
      sortKey: "",
      sortOrders,
    };
  },
  computed: {
    filteredRows() {
      const sortKey = this.sortKey;
      const order = this.sortOrders[sortKey] || 1;
      let data = this.data;
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    },
    // eslint-disable-next-line vue/no-dupe-keys
    sortOrders() {
      const columnSortOrders = {};

      this.columns.forEach(function (key) {
        columnSortOrders[key] = 1;
      });

      return columnSortOrders;
    },
  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
  },
};
</script>
