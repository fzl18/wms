<template>
  <div id="printMe">
    <!-- 出门证 -->
    <div v-if="true"></div>
    <!-- 出库单 -->
    <div v-if="true"></div>
    <!-- 送货单 -->
    <div v-if="true"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        printObj: {
          id: 'printMe', // 这里是要打印元素的ID
          popTitle: '	', // 打印的标题
          extraCss: '', // 打印可引入外部的一个 css 文件
          extraHead: '', // 打印头部文字
        },
      }
    },
  }
</script>
