<template>
	<view class="padding-top">
			<view class="popBox">
				<u--form labelPosition="left" labelAlign="right" labelWidth="95" :model="form" ref="form">
					<view class="">
						<u-form-item label="批号：" prop="batchnum" borderBottom ref="batchnum">
							<u--input v-model="form.batchnum" border="none"></u--input>
						</u-form-item>
						<u-form-item label="收货单位：" prop="company" borderBottom ref="company">
							<u--input v-model="form.company" border="none"></u--input>
						</u-form-item>
					</view>
					<view class="">
						<u-form-item label="货物名称：" prop="itemname" borderBottom ref="itemname">
							<u--input v-model="form.itemname" border="none"></u--input>
						</u-form-item>
						<u-form-item label="规格：" prop="format" borderBottom ref="format">
							<u--input v-model="form.format" border="none"></u--input>
						</u-form-item>
						<u-form-item label="重量：" prop="weight" borderBottom ref="weight">
							<u--input v-model="form.weight" border="none"></u--input>
						</u-form-item>
						<u-form-item label="单位(KG/T)：" prop="unit" borderBottom ref="unit">
							<u--input v-model="form.unit" border="none"></u--input>
						</u-form-item>
						<u-form-item label="单价：" prop="price" borderBottom ref="price">
							<u--input v-model="form.price" border="none"></u--input>
						</u-form-item>
						<u-form-item label="金额：" prop="amount" borderBottom ref="amount">
							<u--input v-model="form.amount" border="none"></u--input>
						</u-form-item>
						
					</view>
					<u-button class="submit" formType="" text="提交" type="primary"></u-button>
				</u--form>
			</view>
	</view>
</template>
<script>	
	var api = require('@/common/api.js')
	export default {
		data() {
			return {
				List:{}
			}
		},		
		onLoad(e) {
			if(e){
				
			}else{
				
			}	
					
		},
		methods: {
			async scan() {
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				if (status !== 1) {
				    return;
				}
				// #endif
				uni.scanCode({
					success: (res) => {
						this.result = res.result;
						api.post({
							url: 'device/Lists/devinfo',
							data: {
								sbsn: res.result							
							},
							success: data => {								
								if (data.code == 1) {
									this.loading = false;
									this.devinfo = data.data;
									uni.showToast({
										duration: 500,
										title: data.msg
									});								
								}
								if (data.code == 0) {
									this.loading = false;
									uni.showToast({
										duration: 1500,
										icon: 'none',
										title: data.msg
									});
								}
							}
						})
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '需要使用您的相机，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				});
			},
			save(){
				api.post({
					url: 'wms/Index/show',
					data: {
						  id: id,
						  device_type: api.DeviceType							
					},
					success: data => {
						console.log(data)								
						if (data.code == 1) {
							this.loading = false;
							this.List = data.data;
							//uni.showToast({
								//duration: 500,
								//title: data.msg
							//});								
						}
						if (data.code == 0) {
							this.loading = false;
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

<style>
	.scan-result {
		min-height: 50upx;
		line-height: 50upx;
	}
</style>
