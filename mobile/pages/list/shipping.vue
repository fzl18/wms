<template>
	<view class="container">
		<u-navbar bgColor="#0051d4" titleStyle="color:#fff;fontSize:16px;fontWeight:bold" height="44" title="送货单" fixed>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="26" color="#fff" @click="handleBack"></u-icon>
			</view>
			<view class="u-nav-slot" slot="right">
				<!-- <u-icon name="plus" size="22" color="#fff" @click="handleCreate"></u-icon> -->
			</view>
		</u-navbar>
		<view>
			<u-sticky bgColor="#fff" class="tab" customNavHeight="78">
				<u-tabs :scrollable="false" lineWidth="50" :list="list" @change="sectionChange"></u-tabs>
			</u-sticky>
			<u-empty mode="list" v-if="!indexList.length" text="暂无数据" marginTop="100">
			</u-empty>
			<view class="list" v-if="indexList.length">
				<u-list @scrolltolower="scrolltolower" lowerThreshold="10" :pagingEnabled="true" :scrollTop='top'>
					<u-list-item class="item" v-for="(item, index) in indexList" :key="index">
						<u-cell icon="scan">
							<text slot="title">单号: <text class="title-text"> {{item.deliv_number || item.number}}</text></text>
							<u-icon v-if="!cur" size="26" slot="right-icon" name="car" @click="handleOption(item)">
							</u-icon>
							<!-- <u-switch slot="right-icon" v-model="checked"></u-switch> -->
						</u-cell>
						<u-cell :border="false" @click="linkto(item)">
							<text slot="title" class="u-cell-text">收货单位: <text
									class="title-text">{{item.company}}</text> </text>
							<text slot="value" class="u-cell-text">日期:<text
									class="title-text">{{$u.timeFormat(item.create_time, 'yy-mm-dd')}}</text> </text>
						</u-cell>
						<u-cell :border="false" @click="linkto(item)">
							<text slot="title" class="u-cell-text">货品名称: <text
									class="title-text">{{item.itemname}}</text></text>
							<text slot="value" class="u-cell-text">规格:<text class="title-text">{{item.format}}</text>
							</text>
						</u-cell>
						<!-- <u-cell :border="false">
							<text slot="title" class="u-cell-text">规格:{{item.format}}</text>							
						</u-cell> -->
					</u-list-item>
					<u-loadmore v-if=" total > queryForm.pageSize" :status="isfinish ? 'nomore':'loading'" line
						nomoreText="到达底线了" />
				</u-list>
				<u-action-sheet @select="selectClick" round="20" cancelText='取消' :closeOnClickOverlay="true"
					:closeOnClickAction="true" :actions="optionsList" :show="show" @close="close"></u-action-sheet>
				<!-- <u-loading-page :loading="loading" loading-text="loading..."></u-loading-page> -->
			</view>
		</view>
	</view>
</template>

<script>
	var api = require('@/common/api.js')
	export default {

		data() {
			return {
				top: 0,
				isfinish: false,
				loading: false,
				list: [{
					name: '待开送货单'
				}, {
					name: '已开送货单'
				}],
				cur: 0,
				curItem: {},
				indexList: [],
				show: false,
				popShow: false,
				optionsList: [{
						name: '开具',
						index: 1
					},
					// {
					// 	name: '删除',
					// 	color: '#f00',
					// 	index:2,
					// }
				],
				form: {
					name: ''
				},

				options1: [{
					text: '删除'
				}],

				total: 0,
				queryForm: {
					pageNo: 1,
					pageSize: 6,
				},

			}
		},
		onLoad(e) {
			// var user = uni.getStorageSync('user');
			this.loadListData()
			uni.$on('refresh', () => {
				this.loadListData(true)
			})
		},
		mounted() {
			// this.loadListData()
		},
		methods: {
			sectionChange(index) {
				// this.loading = true
				this.top = 0
				this.indexList = []
				this.queryForm.pageNo = 1
				this.cur = index.index;
				this.loadListData()
			},
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				if (!this.isfinish) {
					this.queryForm.pageNo++
					this.loadListData()
				}
			},
			handleMenu() {
				uni.navigateTo({
					url: '../index/index'
				})
			},
			handleBack() {
				uni.navigateBack()
			},
			handleUser() {
				uni.navigateTo({
					url: '../user/index'
				})
			},
			handleCreate() {
				const data = {
					company: '',
					goodsList: [],
					itemname: ''
				}
				this.$store.state.home.itemList = data
				uni.$u.route('/pages/list/detail');
			},
			handleOption(data) {
				data.parmasType = 'shipping'
				this.$store.state.home.itemList = data
				uni.$u.route('/pages/list/detail');
				// this.curItem = data
				// this.show = true
			},
			selectClick(index) {
				// console.log(index.index)
				this.show = false
				if (index.index == 1) {
					console.log(this.curItem)
					this.curItem.parmasType = 'edit'
					this.$store.state.home.itemList = this.curItem
					uni.$u.route('/pages/list/detail');
				}
				if (index.index == 2) {
					api.post({
						url: 'busrwaybill/del',
						data: {
							id: this.curItem.id
						},
						success: (data) => {
							// console.log(data)
							if (data.code == 1) {
								this.loading = false
								this.loadListData(true)
								uni.showToast({
									title: data.msg,
									icon: "success",
									duration: 100
								})
							}
							if (data.code == 0) {
								uni.showToast({
									title: data.msg,
									icon: "none",
									duration: 1000
								})
							}
						}
					})
				}
			},
			close() {
				this.popShow = false;
				this.show = false;
			},

			linkto(data) {
				data.pageTitle = '申请单'
				data.parmasType = 'view'
				data.viewType = 'shipping'
				this.$store.state.home.itemList = data
				uni.$u.route('/pages/list/detail');
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			// save() {
			// 	this.$refs.form.validate((res) => {
			// 		if (res) {
			// 			uni.showToast({
			// 				title: '验证通过'
			// 			})
			// 		}
			// 	})

			// },
			loadListData(reload) {
				// this.loading = true
				if(reload){
					this.queryForm.pageNo = 1
					this.top = 0
				}
				api.post({
					url: 'busrwaybill/all',
					data: {
						filter: JSON.stringify({
							status: 1,
							out_status: 1,
							deliv_status: this.cur
						}),
						offset: (this.queryForm.pageNo - 1) * this.queryForm.pageSize,
						limit: this.queryForm.pageSize,
					},
					success: (data) => {
						// console.log(data)
						if (data.code == 1) {
							this.loading = false
							if (reload) {
								this.indexList = data.data.rows
							} else {
								data.data.rows.map(item => {
									this.indexList.push(item)
								})
							}

							this.total = data.data.total
							if (this.total <= (this.queryForm.pageNo - 1) * this.queryForm.pageSize) {
								this.isfinish = true
							} else {
								if (this.total <= this.queryForm.pageSize) {
									this.isfinish = true
								} else {
									this.isfinish = false
								}
							}
						}
						if (data.code == 0) {
							uni.showToast({
								title: data.msg,
								icon: "none",
								duration: 1000
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-nav-slot {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container {
		margin-top: 144upx;

		.tab {
			// border-radius: 20upx;
			box-shadow: 5upx 5upx 10upx rgba(0, 0, 0, .1);
		}

		.list {
			margin: 20upx 40upx 20upx 40upx;

			.u-cell-text {
				color: #8b8b8b;
				max-height: 40upx;
				overflow: hidden;
				word-break: break-all;
				/* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;
				/* 超出部分省略号 */
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical;
				/** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 1;
				/** 显示的行数 **/
			}

			.title-text {
				font-weight: bold;
				font-size: 16px;
				margin-left: 10upx;
				color: #2d2d2d;

			}

			.item {
				background-color: #fff;
				margin: 20upx 10upx;
				border-radius: 30upx;
				box-shadow: 0upx 2upx 20upx rgba(0, 0, 0, .13);
				height: 250upx;
				// border-left: 6upx solid #0e8fff;
				border-bottom: 6upx solid #0e8fff;
			}
		}
	}

	.popBox {
		height: 90vh;
		padding: 70upx 80upx;
	}

	.submit {
		margin-top: 50upx;
	}
</style>
