<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="60%"
    @close="dialogFormVisible = false"
  >
    <div id="printMe">
      <!-- 出门证 -->
      <div v-if="type == 'permit'" id="permit">
        <div class="box">
          <div class="head">
            <div class="title">出门证</div>
            <div class="date">
              日期：{{ dayjs().format('YYYY年 MM月 DD日') }}
            </div>
          </div>
          <div class="body">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <th>重量</th>
                <th>单位（KG/T)</th>
                <th>件数</th>
              </tr>
              <tr>
                <td>{{ info.weight }}</td>
                <td>{{ info.unit }}</td>
                <td>{{ info.nums }}</td>
              </tr>
            </table>
          </div>
          <div class="foot">操作员：{{ info.auditor }}</div>
        </div>
      </div>
      <!-- 出库单 -->
      <div v-if="type == 'delivery'" id="delivery">
        <div class="box">
          <div class="head">
            <div class="title">送货单</div>
            <div class="date">
              日期：{{ dayjs().format('YYYY年 MM月 DD日') }}
            </div>
          </div>
          <div class="body">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <th>批号</th>
                <th>收货单位（客户）</th>
                <th>货物名称</th>
                <th>规格</th>
                <th>重量</th>
                <th>单位（KG/T)</th>
                <th>件数</th>
                <!-- <th>金额</th> -->
              </tr>
              <tr>
                <td>{{ info.batchnum }}</td>
                <td>{{ info.company }}</td>
                <td>{{ info.itemname }}</td>
                <td>{{ info.format }}</td>
                <td>{{ info.weight }}</td>
                <td>{{ info.unit }}</td>
                <td>{{ info.nums }}</td>
                <!-- <td>{{ info.amount }}</td> -->
              </tr>
            </table>
          </div>
          <div class="foot">操作员：{{ info.auditor }}</div>
        </div>
      </div>
      <!-- 送货单 -->
      <div v-if="type == 'shipping'" id="shipping">
        <div class="box">
          <div class="head">
            <div class="title">送货单</div>
            <div class="date">
              日期：{{ dayjs().format('YYYY年 MM月 DD日') }}
            </div>
          </div>
          <div class="body">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <th>批号</th>
                <th>收货单位（客户）</th>
                <th>货物名称</th>
                <th>规格</th>
                <th>重量</th>
                <th>单位（KG/T)</th>
                <th>单价</th>
                <th>金额</th>
              </tr>
              <tr>
                <td>{{ info.batchnum }}</td>
                <td>{{ info.company }}</td>
                <td>{{ info.itemname }}</td>
                <td>{{ info.format }}</td>
                <td>{{ info.weight }}</td>
                <td>{{ info.unit }}</td>
                <td>{{ info.price }}</td>
                <td>{{ info.amount }}</td>
              </tr>
            </table>
          </div>
          <div class="foot">操作员：{{ info.auditor }}</div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="big" @click="dialogFormVisible = false">关闭</el-button>
      <el-button v-print="printObj" type="primary" size="big">打印</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    name: 'PrintTemp',
    props: {
      type: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        dialogFormVisible: false,
        info: {},
        printObj: {
          id: this.type, // 这里是要打印元素的ID
          popTitle: '	', // 打印的标题
          extraCss: '', // 打印可引入外部的一个 css 文件
          extraHead: '', // 打印头部文字
          preview: true, // 预览
        },
      }
    },
    methods: {
      dayjs,
      printDiv() {},
      show(row) {
        this.dialogFormVisible = true
        this.info = row
      },
    },
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    padding: 0 20px;
    margin: 0 10px;
    .head {
      display: flex;
      margin-bottom: 20px;
      // justify-content: center;
      align-items: flex-end;
      .title {
        font-size: 26px;
        width: 75%;
        text-align: center;
        padding-left: 160px;
      }
      .date {
        text-align: right;
        width: 160px;
      }
    }
    .body {
      margin-bottom: 20px;
      table {
        border: 3px solid rgb(116, 116, 116);
        width: 100%;
        th,
        td {
          text-align: center;
          padding: 5px;
          border-right: 1px solid rgb(116, 116, 116);
          border-bottom: 1px solid rgb(116, 116, 116);
          &:last-child {
            border-right: none;
          }
        }
      }
    }
    .foot {
      text-align: right;
    }
  }
</style>
