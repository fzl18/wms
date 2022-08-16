<template>
	<view class="main_box">
		<u-navbar bgColor="#0051d4" titleStyle="color:#fff;fontSize:16px;fontWeight:bold" height="44" title="首页" fixed>
			<view class="u-nav-slot" slot="right">
				<u-icon name="account" size="26" color="#fff" @click="handleUser"></u-icon>
			</view>
			<view class="u-nav-slot" slot="left">
				<!-- <u-icon name="account" size="26" color="#fff" @click="handleUser"></u-icon> -->
			</view>
		</u-navbar>
		<view class="body">
			<swiper :indicator-dots="true" class="swiper" indicatorActiveColor="#2773ff" autoplay="true" @change="(i)=> current = i.target.current ">
				<swiper-item>
					<view class="title">
						<view>出库</view>
					</view>
					<u-grid @click="click" col="3">
						<u-grid-item class="item" v-for="(menuListItem,menuListIndex) in menuList" :key="menuListIndex">
							<u-icon
								:customStyle="{padding:30+'upx',background:'#2773ff',borderRadius:'50%',color:'#fff'}"
								:name="menuListItem.name" :size="40"></u-icon>
							<text class="grid-text">{{menuListItem.title}}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item v-if="wlList.length">
					<view class="title">
						<view>物流</view>
					</view>
					<u-grid @click="click" col="3">
						<u-grid-item class="item" v-for="(menuListItem,menuListIndex) in wlList" :key="menuListIndex">
							<u-icon
								:customStyle="{padding:30+'upx',background:'#2773ff',borderRadius:'50%',color:'#fff'}"
								:name="menuListItem.name" :size="40"></u-icon>
							<text class="grid-text">{{menuListItem.title}}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item v-if="baseList.length">
					<view class="title">
						<view>基本资料</view>
					</view>
					<u-grid @click="click" col="3">
						<u-grid-item class="item" v-for="(menuListItem,menuListIndex) in baseList" :key="menuListIndex">
							<u-icon
								:customStyle="{padding:30+'upx',background:'#2773ff',borderRadius:'50%',color:'#fff'}"
								:name="menuListItem.name" :size="40"></u-icon>
							<text class="grid-text">{{menuListItem.title}}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>

			</swiper>
		</view>


		<u-popup :show="popShow" round="20" :closeable="true" @close="close" mode="right">
			<view class="popBox">
				<u-icon name="account" size="50" color="#fff" @click="logout" class="account"></u-icon>
				<text class="name">{{name}}</text>
				<view class="pwbox" v-if="boxShow">
					<u--input placeholder="原密码" password border="bottom" clearable v-model="oldpwd"></u--input>
					<u--input placeholder="新密码" border="bottom" clearable v-model="pwd"></u--input>
					<u--input placeholder="再次输入密码" border="bottom" clearable v-model="confirm_pwd"></u--input>
					<text class="logout" @click="changePassword()">提交</text>
				</view>
				<text class="logout" @click="boxShow = true">修改密码</text>
				<text class="logout" @click="logout">退出</text>

			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	var api = require('@/common/api.js');
	export default {
		data() {
			return {
				current: 0,
				oldpwd: '',
				pwd: '',
				confirm_pwd: '',
				boxShow: false,
				popShow: false,
				name: '',
				initList: [{
						name: 'list-dot',
						title: '送货申请单',
						url: '../list/apply',
						key: 'rway',
						type:'menuList'
					},
					{
						name: 'lock',
						title: '审核',
						url: '../list/review',
						key: 'cway',
						type:'menuList'
					},
					{
						name: 'share-square',
						title: '出库单',
						url: '../list/delivery',
						key: 'out',
						type:'menuList'
					},
					{
						name: 'car',
						title: '送货单',
						url: '../list/shipping',
						key: 'del',
						type:'menuList'
					},
					{
						name: 'coupon',
						title: '出门证',
						url: '../list/permit',
						key: 'go',
						type:'menuList'
					},
					{
						name: 'order',
						title: '退货申请单',
						url: '../list/returnOrder',
						key: 'rtn',
						type:'menuList'
					},
					{
						name: 'grid',
						title: '查询统计',
						url: '../list/count',
						key: 'stats',
						type:'menuList'
					},
					{
						name: 'man-add',
						title: '客户信息',
						url: '../baseInfo/customer',
						key: 'stats',
						type:'baseList'
					},
					{
						name: 'car',
						title: '运输公司',
						url: '../baseInfo/transit',
						key: 'stats',
						type:'baseList'
					},
					{
						name: 'chat',
						title: '物流信息',
						url: '../logistics/info',
						key: 'stats',
						type:'wlList'
					},
					// {
					// 	name: 'lock',
					// 	title: '物流审核',
					// 	url: '../logistics/review',
					// 	key: 'stats',
					// 	type:'wlList'
					// },
				],
				menuList: [],
				wlList:[],
				baseList:[],
			}
		},
		components: {

		},
		onReady() {

		},
		onLoad() {
			const menu = this.$store.state.home.userInfo.menu

			const roles = []
			if (menu) {
				const list = []
				menu.map((item) => {
					if (item.name == 'bus') {
						item.childlist.map((val) => {
							if (val.ismenu) {
								this.initList.map(data => {
									if (data.key == val.remark) {
										this[data.type].push(data)
										// data.enable = true
									}
								})
							}
						})
					}
				})
				// this.menuList = list
			}
			this.name = this.$store.state.home.userInfo.name
		},
		mounted() {},
		methods: {
			click(name) {
				console.log(name, this.current);
				// this.$refs.uToast.success(`点击了第${name}个`)
				let url = ''
				switch (this.current){
					case 0:
					url = this.menuList[name].url
						break;
					case 1:
					url = this.wlList[name].url
						break;
					case 2:
					url = this.baseList[name].url
						break;
					default:
						break;
				}
				uni.navigateTo({
					url: url //'../outstorage/outstorage'
				})
			},
			handleUser() {
				console.log(this.$store.state.home.userInfo)
				this.popShow = true
			},
			close() {
				this.popShow = false
				this.boxShow = false
				this.oldpwd = ''
				this.pwd = ''
				this.confirm_pwd = ''
			},
			changePassword() {
				console.log(this.$store.state.home.userInfo)
				let pass = true
				if (this.oldpwd && this.pwd && this.confirm_pwd) {
					if (this.pwd !== this.confirm_pwd) {
						uni.showToast({
							duration: 1500,
							icon: 'none',
							title: '新密码与确认密码不一致'
						});
						pass = false
					}
				} else {
					uni.showToast({
						duration: 1500,
						icon: 'none',
						title: '密码不能为空'
					});
					pass = false
				}
				if (!pass) {
					return
				}
				api.post({
					url: 'user/pwd',
					data: {
						oldpwd: this.oldpwd,
						password: this.pwd,
						confirm_pwd: this.confirm_pwd
					},
					success: data => {
						console.log(data)
						if (data.code == 1) {
							uni.showToast({
								duration: 1500,
								icon: 'success',
								title: data.msg
							});
							this.close()
						}
						if (data.code == 0) {
							uni.showToast({
								duration: 1500,
								icon: 'none',
								title: data.msg
							});
						}
					}
				});
			},
			logout() {
				this.popShow = false
				api.post({
					url: 'mindex/logout',
					data: '',
					success: data => {
						console.log(data)
						if (data.code == 1) {
							uni.showToast({
								duration: 1500,
								icon: 'success',
								title: data.msg
							});
							uni.$u.route({
								type: 'reLaunch', //back reLaunch
								url: '/pages/login/login'
							})
						}
						if (data.code == 0) {
							uni.showToast({
								duration: 1500,
								icon: 'none',
								title: data.msg
							});
						}
					}
				});

			}
		}
	}
</script>

<style lang="scss" scoped>
	.main_box {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 120upx;

		// padding:50upx 0;
		.title {
			font-size: 36upx;
			margin: 0 0 50upx 50upx;
			padding: 0 0 10upx 10upx;
			border-bottom: 3px solid #0374ff;
			display: inline-block;
			font-weight: bold;
		}

		.body {
			margin-top: 100upx;
			background-color: #fff;
			padding-top: 50upx;
			border-radius: 40upx;
			margin: 80upx 50upx 30upx 50upx;
			width: 100%;

			.swiper {
				height: calc(80vh - 200upx);
			}
		}
	}

	.item {
		margin-bottom: 50uxp;

	}

	.grid-text {
		font-size: 30upx;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		margin-bottom: 50upx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	.popBox {
		width: 400upx;
		display: flex;
		height: 90vh;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.account {
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 120upx;
			width: 120upx;
			margin: 10upx;
			background-color: #0374ff;
			border-radius: 50%;
		}

		.name {
			margin: 20upx
		}

		.logout {
			border: 1px solid #1184ff;
			background-color: #0374ff;
			color: #ffffff;
			padding: 5upx 30upx;
			border-radius: 50upx;
			margin: 20upx;
		}

		.pwbox {
			margin: 20upx 10upx 50upx 10upx;
			padding: 20upx;
			text-align: center;

			.logout {
				display: inline-block;
				background-color: #75d891;
				border-color: #53c764;
			}
		}
	}
</style>
