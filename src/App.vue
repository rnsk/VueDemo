<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar';

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style lang="sass">
// @import "~bulma/sass/utilities/_all";
// @import "~bulma";
@import '~bulmaswatch/lux/bulmaswatch.min';
</style>
