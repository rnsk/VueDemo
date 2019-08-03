<template>
  <div id="app">
    <Navbar />
    <div class="columns">
      <div class="column is-one-quarter has-background-light">
        <section class="section">
          <Sidebar />
        </section>
      </div>
      <div class="column">
        <section class="section">
          <router-view/>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style lang="sass">
// @import "~bulma/sass/utilities/_all";
// @import "~bulma";
@import '~bulmaswatch/lux/bulmaswatch.min';
</style>
