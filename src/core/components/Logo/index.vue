<template>
  <div :class="'logo-container-' + layout">
    <router-link to="/">
      <span class="logo">
        <!-- <remix-icon v-if="logo" :icon-class="logo" is-svg /> -->
        <!-- 首页 -->
        <remix-icon
          icon-class="layout-masonry-fill"
          :style="{ fontSize: '30px' }"
        ></remix-icon>
      </span>
      <span
        :class="{ 'hidden-xs-only': layout === 'horizontal' }"
        class="title"
      >
        {{ title }}
      </span>
    </router-link>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Logo',
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        layout: 'settings/layout',
        title: 'settings/title',
      }),
    },
  }
</script>
<style lang="scss" scoped>
  @mixin container {
    position: relative;
    height: $base-top-bar-height;
    overflow: hidden;
    line-height: $base-top-bar-height;
    background: transparent;
  }

  @mixin logo {
    display: inline-block;
    width: 32px;
    height: 32px;
    color: $base-title-color;
    vertical-align: middle;
  }

  @mixin title {
    display: inline-block;
    overflow: hidden;
    font-size: 18px;
    line-height: 55px;
    color: $base-title-color;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .logo-container-horizontal,
  .logo-container-common {
    @include container;

    .logo {
      svg {
        @include logo;
      }
    }

    .title {
      @include title;
    }
  }

  .logo-container-vertical,
  .logo-container-gallery,
  .logo-container-comprehensive {
    @include container;

    height: $base-logo-height;
    line-height: $base-logo-height;
    text-align: center;

    .logo {
      font-size: 16px;
      color: #fff;
      // font-weight: bold;
      svg {
        @include logo;
      }
    }

    .title {
      @include title;
      max-width: calc(#{$base-left-menu-width} - 60px);
    }
  }

  .logo-container-gallery {
    background: $base-gallery-second-menu-background !important;

    .logo {
      position: fixed;
      top: 0;
      display: block;
      width: $base-left-menu-width-min;
      height: $base-logo-height;
      margin: 0;
      background: $base-gallery-first-menu-background;
    }

    .title {
      padding-right: 15px;
      padding-left: 15px;
      margin-left: $base-left-menu-width-min;
      color: $base-color-black !important;

      @include title;

      background: $base-gallery-second-menu-background !important;
    }
  }
</style>
