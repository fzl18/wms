<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <!-- <img :src="avatar" alt="" class="user-avatar" /> -->
      <remix-icon
        icon-class="account-circle-fill"
        style="font-size: 30px"
      ></remix-icon>
      <div class="user-name">
        {{ username }}
        <remix-icon icon-class="arrow-down-s-line"></remix-icon>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="logout">
        <remix-icon icon-class="logout-circle-r-line"></remix-icon>
        {{ translateTitle('退出登录') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'
  import { mapGetters } from 'vuex'
  import { recordRoute } from '@/config'

  export default {
    name: 'Avatar',
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        username: 'user/username',
      }),
    },
    methods: {
      translateTitle,
      handleCommand(command) {
        switch (command) {
          case 'logout':
            this.logout()
            break
          case 'personalCenter':
            this.personalCenter()
            break
        }
      },
      personalCenter() {
        this.$router.push('/personalCenter/personalCenter')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        // if (recordRoute) {
        //   const fullPath = this.$route.fullPath
        //   await this.$router.push(`/login?redirect=${fullPath}`)
        // } else {
        // await this.$router.push('/')
        // }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .user-avatar {
      width: 40px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      display: flex;
      align-content: center;
      align-items: center;
      height: 40px;
      margin-left: 6px;
      line-height: 40px;
      cursor: pointer;

      [class*='ri-'] {
        margin-left: 0 !important;
      }
    }
  }
</style>
