<template>
	<view class="container">
		<u-navbar bgColor="#0051d4" titleStyle="color:#fff;fontSize:16px;fontWeight:bold" height="44" title="退货申请单"
			fixed>
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
			<u-search v-if="!cur" v-model="search.deliv_number" borderColor="rgb(0, 81, 212)" bgColor="#fff" @search="handleSearch" placeholder="查发货单" actionText="选期" @custom="handleDate"  shape="round" margin="80upx 50upx 10upx 50upx"></u-search>
			<u-empty mode="list" v-if="!indexList.length" text="暂无数据" marginTop="20">
			</u-empty>
			<u-calendar monthNum="6" showLunar :minDate="minDate" :maxDate="maxDate" :show="calendarShow" mode="range" @confirm="calendarConfirm" @close="calendarShow =false"></u-calendar>
			<view class="list" v-if="indexList.length">
				<u-list @scrolltolower="scrolltolower" lowerThreshold="10" :pagingEnabled="true" :scrollTop='top'>
					<u-list-item class="item" v-for="(item, index) in indexList" :key="index">
						<u-cell icon="scan">
							<text slot="title">单号: <text class="title-text"> {{ cur ? item.rtn_number : item.deliv_number}}</text></text>
							<u-icon v-if="!cur" size="26" slot="right-icon" name="order" @click="handleOption(item)">
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
	let start = new Date() - 60*60*24*31*2 *1000	
	const minDate = uni.$u.timeFormat(start , 'yyyy-mm-dd')
	const d = new Date()
	const year = d.getFullYear()
	let month = d.getMonth() + 1
	month = month < 10 ? `0${month}` : month
	const date = d.getDate()
	console.log(minDate)
	export default {
		data() {
			return {
				top: 0,
				isfinish: false,
				loading: false,
				calendarShow:false,
				minDate:minDate,
				maxDate:`${year}-${month}-${date + 1}`,
				list: [{
					name: '完成送货单'
				}, {
					name: '已开退货单'
				}],
				search:{
					deliv_number:'',
					date:[]
				},
				cur: 0,
				curItem: {},
				indexList: [],
				show: false,
				popShow: false,
				optionsList: [{
						name: '编辑',
						index: 1
					},
					{
						name: '删除',
						color: '#f00',
						index: 2,
					}
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
			// this.loadListData()
			uni.$on('refresh', () => {
				this.loadListData(true)
			})
		},
		mounted() {
			// this.loadListData()
		},
		methods: {
			handleDate(){
				this.calendarShow = true
				this.search.date = []
			},
			handleSearch(val){
				console.log(val)
				this.loadListData(true)
			},
			
			sectionChange(index) {
				// this.loading = true
				this.top = 0
				this.indexList = []
				this.queryForm.pageNo = 1
				this.cur = index.index;
				if(index.index){					
					this.loadListData()
				}
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
				data.parmasType = 'return'
				this.$store.state.home.itemList = data
				uni.$u.route('/pages/list/detail');
				// this.curItem = data
				// this.show = true
			},
			selectClick(index) {
				console.log(index.index)
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
				data.viewType = 'return'
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
			calendarConfirm(date){
				let day2 = Date.parse(date.pop()) / 1000 + 60*60*24
				let day1 = Date.parse(date[0]) / 1000
				console.log( day1, day2)
				this.search.date=[day1,day2]
				this.loadListData(true)
				this.calendarShow = false
				
				
			},
			loadListData(reload) {
				// this.loading = true
				if(reload){
					this.queryForm.pageNo = 1
					this.top = 0
				}
				if(this.cur){
					api.post({
						url: 'busrwaybill/all',
						data: {
							filter: JSON.stringify({
								pp_status: 1,
								// status: 1,
								// out_status: 1,
								// deliv_status: 1,
								// rtn_status: this.cur
								rtn_uid:0,
							}),
							op: JSON.stringify({rtn_uid:'<>'}),
							offset: (this.queryForm.pageNo - 1) * this.queryForm.pageSize,
							limit: this.queryForm.pageSize,
						},
						success: (data) => {
							// console.log(data)
							if (data.code == 1) {
								// this.search.date = []
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
								
				}else{
					api.post({
						url: 'busrwaybill/all',
						data: {
							filter: JSON.stringify({
								status: 1,
							  out_status: 1,
							  deliv_status: 1,
								pp_status: 1,
								rtn_status: 0,
								company:'',
								deliv_time: this.search.date.join(','),
								deliv_number: this.search.deliv_number
							}),
							op: JSON.stringify({deliv_number: 'LIKE',deliv_time: 'BETWEEN',company: 'LIKE',}),
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
