<template>
  <div class="custom-table-container">
    <div class="tabs">
      <div :class="!active ? 'cur' : ''" @click="handleTabs(0)">
        送货申请单待审核
      </div>
      <div :class="active ? 'cur' : ''" @click="handleTabs(1)">
        退货单待审核
      </div>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
      :header-cell-style="{ background: '#adb7c0' }"
      stripe
      border
    >
      <el-table-column type="expand">
        <template #default="{ row }">
          <el-row class="expandInfo goods">
            <el-col :span="18" :offset="3" class="title">货物信息</el-col>
            <el-col :span="18" :offset="3" class="tbody">
              <el-descriptions class="" :column="4" size="medium" border>
                <el-descriptions-item>
                  <template slot="label">
                    <!-- <i class="el-icon-office-building"></i> -->
                    规格
                  </template>
                  {{ row.specifications }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <!-- <i class="el-icon-office-building"></i> -->
                    重量
                  </template>
                  {{ row.weight }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <!-- <i class="el-icon-office-building"></i> -->
                    单位
                  </template>
                  {{ row.unit }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <!-- <i class="el-icon-office-building"></i> -->
                    单价
                  </template>
                  {{ row.price }}
                </el-descriptions-item>
              </el-descriptions>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in columns"
        v-show="item.show"
        :key="index"
        align="center"
        :label="item.label"
        :min-width="item.minWidth"
        :width="item.width"
      >
        <template #default="{ $index, row }">
          <span v-if="item.label === '序号'">{{ $index + 1 }}</span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        :min-width="130"
      >
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            style="display: block"
            active-color="#13ce66"
            inactive-color="orange"
            active-text="通过"
            inactive-text="否"
            @change="handleChange"
          ></el-switch>
          <!-- <el-tooltip content="审核" placement="top">
            <el-button type="text" @click="handleCheck(row)">
              <remix-icon
                icon-class="auction-line"
                :style="{ fontSize: '18px', color: '#d4a45b' }"
              ></remix-icon>
            </el-button> 
          </el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      background
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { doDelete, getList } from '@/api/table'

  export default {
    name: 'CustomTable',
    components: {},
    data() {
      return {
        active: 0,
        columns: [
          {
            label: '序号',
            width: '50',
            prop: '',
          },
          {
            label: '批号',
            prop: 'lotNumber',
          },
          {
            label: '收货单位（客户）',
            prop: 'customName',
            minWidth: '160',
          },

          {
            label: '货物名称',
            width: 'auto',
            prop: 'goodsName',
          },
          // {
          //   label: '规格',
          //   width: 'auto',
          //   prop: 'specifications',
          // },
          // {
          //   label: '重量',
          //   width: 'auto',
          //   prop: 'weight',
          // },
          // {
          //   label: '单位(KG/T)',
          //   width: '120',
          //   prop: 'unit',
          // },
          // {
          //   label: '单价',
          //   width: 'auto',
          //   prop: 'price',
          // },
          {
            label: '金额',
            width: 'auto',
            prop: 'total',
          },
        ],
        list: [
          {
            lotNumber: '批号de-32343',
            customName: '牛XX的客户',
            unit: '元',
            weight: '42KG',
            goodsName: '货物名称',
            specifications: '323 x 843',
            total: 1221,
            price: 5895,
          },
          {
            lotNumber: '批号de-32343',
            customName: '牛XX的客户',
            unit: '元',
            weight: '42KG',
            goodsName: '货物名称',
            specifications: '323 x 843',
            total: 1221,
            price: 5895,
          },
          {
            lotNumber: '批号de-32343',
            customName: '牛XX的客户',
            unit: '元',
            weight: '42KG',
            goodsName: '货物名称',
            specifications: '323 x 843',
            total: 1221,
            price: 5895,
          },
          {
            lotNumber: '批号de-32343',
            customName: '牛XX的客户',
            unit: '元',
            weight: '42KG',
            goodsName: '货物名称',
            specifications: '323 x 843',
            total: 1221,
            price: 5895,
          },
        ],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: '',
        },
      }
    },
    computed: {
      finallyColumns() {
        let finallyArray = []
        this.checkList.forEach((checkItem) => {
          finallyArray.push(
            this.columns.filter((item) => item.label === checkItem)[0]
          )
        })
        return finallyArray
      },
    },
    created() {
      //防止三级以上路由时多次走created
      // if (this.$route.name === this.$options.name) this.fetchData()
    },
    methods: {
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      handleEdit(row) {
        console.log(row)
        this.$refs['edit'].showEdit(row)
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            await this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              this.$baseMessage(msg, 'success')
              await this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        const imageList = []
        data.forEach((item) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
        this.total = totalCount
        this.listLoading = false
      },
      handleCheck(row) {
        this.$confirm('是否确认审核？', {
          distinguishCancelAndClose: true,
          confirmButtonText: '通过',
          cancelButtonText: '不通过',
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '保存修改',
            })
          })
          .catch((action) => {
            this.$message({
              type: 'info',
              message:
                action === 'cancel' ? '放弃保存并离开页面' : '停留在当前页面',
            })
          })
      },
      handleTabs(active) {
        this.active = active
      },
    },
  }
</script>
<style lang="scss" scoped>
  .custom-table-container {
    ::v-deep {
      i {
        cursor: pointer;
      }
    }
    .tabs {
      display: flex;
      justify-content: center;
      > div {
        margin: 0 0 20px 0;
        background: #ddd;
        padding: 12px 50px;
        cursor: pointer;
        &.cur {
          background: rgb(0, 127, 232);
          color: #fff;
        }
        &:nth-child(1) {
          border-radius: 4px 0 0 4px;
        }
        &:nth-child(2) {
          border-radius: 0 4px 4px 0;
        }
      }
    }
    .expandInfo {
      .title {
        font-size: 15px;
        padding: 5px 10px;
        margin-top: 10px;
        background: rgb(228, 235, 239);
        font-weight: bold;
        border-radius: 10px 10px 0 0;
      }
    }
  }
</style>
