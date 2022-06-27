<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="60%"
    @close="dialogFormVisible = false"
  >
    <div id="printMe">
      <div class="company">江苏海栋化纤有限公司</div>
      <!-- 出门证 -->
      <div v-if="type == 'permit'" id="permit">
        <div class="box">
          <div class="head">
            <div class="num">编号: {{ info.pp_number }}</div>
            <div class="title">出门证</div>
            <div class="date">
              日期：{{ dayjs().format('YYYY年 MM月 DD日') }}
            </div>
          </div>
          <div class="body">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <th>序号</th>
                <th>重量</th>
                <th>单位（KG/T)</th>
                <th>件数</th>
              </tr>
              <tr v-for="(item, index) in info.goodsList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.weight }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.nums }}</td>
              </tr>
            </table>
          </div>
          <div class="foot">操作员：{{ $store.state.user.username }}</div>
        </div>
      </div>
      <!-- 出库单 -->
      <div v-if="type == 'delivery'" id="delivery">
        <div class="box">
          <div class="head">
            <div class="num">编号: {{ info.out_number }}</div>
            <div class="title">出库单</div>
            <div class="date">
              日期：{{ dayjs().format('YYYY年 MM月 DD日') }}
            </div>
          </div>
          <div>
            <div class="">收货单位（客户）：{{ info.company }}</div>
          </div>
          <div class="body">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <th>序号</th>
                <th>货物名称</th>
                <th>规格</th>
                <th>重量</th>
                <th>单位（KG/T)</th>
                <th>件数</th>
                <!-- <th>金额</th> -->
              </tr>
              <tr v-for="(item, index) in info.goodsList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.itemname }}</td>
                <td>{{ item.format }}</td>
                <td>{{ item.weight }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.nums }}</td>
                <!-- <td>{{ info.amount }}</td> -->
              </tr>
            </table>
          </div>
          <div class="foot">
            <div></div>
            <div>操作员：{{ $store.state.user.username }}</div>
          </div>
        </div>
      </div>
      <!-- 送货单 -->
      <div v-if="type == 'shipping'" id="shipping">
        <div class="box">
          <div class="head">
            <div class="num">编号: {{ info.deliv_number }}</div>
            <div class="title">送货单</div>
            <div class="date">
              日期：{{ dayjs().format('YYYY年 MM月 DD日') }}
            </div>
          </div>
          <div>
            <div class="">收货单位（客户）：{{ info.company }}</div>
          </div>
          <div class="body">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <th>序号</th>
                <th>货物名称</th>
                <th>规格</th>
                <th>备注</th>
                <th>批号</th>
                <th>重量</th>
                <th>单位（KG/T)</th>
                <th>件数</th>
                <th v-if="info.style == 2">单价</th>
                <th v-if="info.style == 2">金额</th>
              </tr>
              <tr v-for="(item, index) in info.goodsList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.itemname }}</td>
                <td>{{ item.format }}</td>
                <td>{{ item.remark }}</td>
                <td>{{ item.betchnum }}</td>
                <td>{{ item.weight }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.nums }}</td>
                <td v-if="info.style == 2">{{ item.price }}</td>
                <td v-if="info.style == 2">{{ item.amount }}</td>
              </tr>
            </table>
          </div>
          <div class="foot">
            <div class="fir">
              <div>
                收货单位
                <br />
                <br />
                及经办人
              </div>
              <div>（盖章）</div>
            </div>
            <div class="sec">
              <div>
                送货单位
                <br />
                <br />
                及经办人
              </div>
              <div>（盖章）</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 退货单 -->
      <div v-if="type == 'return'">
        <div class="box">
          <div class="head">
            <div class="num">编号:{{ info.rtn_number }}</div>
            <div class="title">{{ tit }}</div>
            <div class="date">
              日期：{{ dayjs().format('YYYY年 MM月 DD日') }}
            </div>
          </div>
          <div>
            <div class="">收货单位（客户）：{{ info.company }}</div>
          </div>
          <div class="body">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <th>序号</th>
                <th>货物名称</th>
                <th>规格</th>
                <th>备注</th>
                <th>批号</th>
                <th>重量</th>
                <th>单位（KG/T)</th>
                <th>件数</th>
                <!-- <th v-if="info.style == 2">单价</th>
                <th v-if="info.style == 2">金额</th> -->
              </tr>
              <tr v-for="(item, index) in info.goodsList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.itemname }}</td>
                <td>{{ item.format }}</td>
                <td>{{ item.remark }}</td>
                <td>{{ item.batchnum }}</td>
                <td>{{ item.weight }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.nums }}</td>
                <!-- <td v-if="info.style == 2">{{ item.price }}</td>
                <td v-if="info.style == 2">{{ item.amount }}</td> -->
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="margin: 20px 0"
            >
              <tr>
                <th width="15%">回单</th>
                <th width="25%">收货地址</th>
                <th width="10%">车型</th>
                <th width="20%">运输公司</th>
                <th width="10%">运费</th>
                <th width="10%">邮寄费</th>
              </tr>
              <tr>
                <td>
                  {{ info.receipt ? '有' : '无' }}
                </td>
                <td>
                  {{ info.address }}
                </td>
                <td>
                  {{ info.cmodel }}
                </td>
                <td>
                  {{ info.trancom }}
                </td>
                <td>
                  {{ info.fare }}
                </td>
                <td>
                  {{ info.pfee }}
                </td>
              </tr>
            </table>
            <div class="return" style="font-size: 18px; text-align: center">
              退货明细
            </div>
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="margin-top: 10px"
            >
              <tr>
                <th width="5%">序号</th>
                <th width="20%">货物名称</th>
                <th width="15%">规格</th>
                <th width="15%">备注</th>
                <th width="10%">批号</th>
                <th width="10%">件数</th>
                <th width="10%">重量</th>
                <th width="5%">单位</th>
                <!-- <th v-if="form.style == 2" width="10%">单价</th>
                <th v-if="form.style == 2" width="10%">金额</th> -->
              </tr>
              <tr v-for="(item, index) in info.returnGoodsList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  {{ item.itemname }}
                </td>
                <td>
                  {{ item.format }}
                </td>
                <td>
                  {{ item.remark }}
                </td>
                <td>
                  {{ item.batchnum }}
                </td>
                <td>
                  {{ item.nums }}
                </td>
                <td>
                  {{ item.weight }}
                </td>
                <td>
                  {{ item.unit }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <!-- 查看 -->
      <div v-if="type == 'view'">
        <div class="box">
          <div class="head">
            <div class="num">编号:{{ info.number }}</div>
            <div class="title">{{ tit }}</div>
            <div class="date">
              日期：{{ dayjs().format('YYYY年 MM月 DD日') }}
            </div>
          </div>
          <div>
            <div class="">收货单位（客户）：{{ info.company }}</div>
          </div>
          <div class="body">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <th>序号</th>
                <th>货物名称</th>
                <th>规格</th>
                <th>备注</th>
                <th>批号</th>
                <th>重量</th>
                <th>单位（KG/T)</th>
                <th>件数</th>
                <th v-if="info.style == 2">单价</th>
                <th v-if="info.style == 2">金额</th>
              </tr>
              <tr v-for="(item, index) in info.goodsList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.itemname }}</td>
                <td>{{ item.format }}</td>
                <td>{{ item.remark }}</td>
                <td>{{ item.batchnum }}</td>
                <td>{{ item.weight }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.nums }}</td>
                <td v-if="info.style == 2">{{ item.price }}</td>
                <td v-if="info.style == 2">{{ item.amount }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="big" @click="dialogFormVisible = false">关闭</el-button>
      <el-button
        v-if="type != 'view'"
        v-print="printObj"
        type="primary"
        size="big"
      >
        打印
      </el-button>
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
      tit: {
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
        if (!this.info.goodsList) {
          this.info.goodsList = [{}, {}, {}, {}, {}]
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .company {
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  .box {
    width: 100%;
    padding: 0 20px;
    margin: 0 10px;
    .head {
      display: flex;
      margin-bottom: 20px;
      justify-content: space-between;
      align-items: flex-end;

      .num {
        color: red;
      }
      .title {
        font-size: 22px;
        text-align: center;
      }
      .date {
        text-align: right;
        width: 160px;
      }
    }
    .body {
      margin: 5px 0 20px 0;
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
      display: flex;
      justify-content: space-between;
      text-align: right;
      .fir,
      .sec {
        width: 160px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 50px;
      }
    }
  }
</style>
