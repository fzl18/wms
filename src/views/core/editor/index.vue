<template>
  <keep-alive :include="cachedRoutes">
    <router-view :key="$route.path" />
  </keep-alive>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Editor',
    computed: {
      ...mapGetters({
        visitedRoutes: 'tabsBar/visitedRoutes',
      }),
      cachedRoutes() {
        return this.visitedRoutes
          .filter((item) => !item.meta.noKeepAlive)
          .flatMap((item) => item.matched)
      },
    },
  }
</script>
