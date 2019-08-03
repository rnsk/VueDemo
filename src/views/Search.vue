<template>
  <div class="search">
    <SearchForm :url=url @loadStart="onLoadStart" @loadResults="onLoadResults" />
    <SearchResult :items="items" :loading="loading" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchForm from '@/components/SearchForm.vue'
import SearchResult from '@/components/SearchResult.vue'

export default {
  name: 'search',
  components: {
    SearchForm,
    SearchResult
  },
  data() {
      return {
          items: [],
          loading: false,
          url: 'https://jsonplaceholder.typicode.com/comments',// DummyURL
      }
  },
  methods: {
      onLoadStart() {
          this.loading = true;
      },
      onLoadResults({ results }) {
          this.items = results;
          this.loading = false;
      }
  }
}
</script>
