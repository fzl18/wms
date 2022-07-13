<template>
	<view class="main">
		<u-navbar bgColor="#0051d4" titleStyle="color:#fff;fontSize:16px;fontWeight:bold" height="44" :title="title"
			fixed>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="26" color="#fff" @click="handleBack"></u-icon>
			</view>
			<view class="u-nav-slot" slot="right">

			</view>
		</u-navbar>
		<!-- 开出库单 -->
		<view class="popBox" v-if=" form.parmasType == 'delivery'">
			<u--form labelPosition="left" labelAlign="right" labelWidth="95" :model="form" ref="form">
				<view class="baseinfo">
					<u-form-item label="单号：" prop="out_number" borderBottom ref="out_number">
						<u--input v-model="form.out_number" placeholder='自动生成' border="none" disabled disabledColor="#fff">
						</u--input>
					</u-form-item>
					<u-form-item label="收货单位：" prop="company" borderBottom ref="company">
						<u--input v-model="form.company" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
				</view>
				<view class="goodsList" v-for="(item, index) in form.goodsList" :key="index">
					<view class="index">货物-{{ index +1}}</view>
					<u-form-item label="货物名称：" prop="itemname" borderBottom ref="itemname">
						<u--input v-model="item.itemname" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="规格：" prop="format" borderBottom ref="format">
						<u--input v-model="item.format" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="批号：" prop="batchnum" borderBottom ref="batchnum">
						<u--input v-model="item.batchnum" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon>
					</u-form-item>
					<!-- <u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--input v-model="item.remark" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon>
					</u-form-item> -->
					<u-form-item label="重量：" prop="weight" borderBottom ref="weight">
						<u--input v-model="item.weight" @blur="(val)=>{handleBlur(val,1,item,'weight')}" border="none"
							:disabled="form.parmasType == 'view'" disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon>
					</u-form-item>
					<u-form-item label="单位(KG/T)：" prop="unit" borderBottom ref="unit">
						<u--input v-model="item.unit" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon>
					</u-form-item>
					<!-- <u-form-item label="单价：" prop="price" borderBottom ref="price">
						<u--input v-model="item.price" @blur="(val)=>{handleBlur(val,2,item,'price')}" border="none"
							:disabled="form.parmasType == 'view'" disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon>
					</u-form-item> -->
					<u-form-item label="数量：" prop="nums" borderBottom ref="nums">
						<u--input v-model="item.nums" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon>
					</u-form-item>
					<u-form-item label="托/箱：" prop="boxes" borderBottom ref="boxes">
						<!-- <u--input v-model="item.boxes" border="none" :disabled="form.parmasType == 'view'" 
							disabledColor="#fff"></u--input> -->
						<u-radio-group 
							v-model="item.boxes"
							placement="row">
							<u-radio :name="0" label="托"></u-radio>
							<u-radio :name="1" label="箱"></u-radio>
						</u-radio-group>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon>
					</u-form-item>
				</view>
				<view class="baseinfo">
					<u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--textarea v-model="form.remark" type="textarea" autoHeight border="none"
							disabledColor="#fff"></u--textarea>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon>
					</u-form-item>
				</view>
				<view class="submit" v-if=" form.parmasType != 'view' ">
					<u-button formType="" @click="submit" text="提交" type="primary"></u-button>
				</view>
			</u--form>
		</view>
		<!-- 开送货单 -->
		<view class="popBox" v-if=" form.parmasType == 'shipping'">
			<u--form labelPosition="left" labelAlign="right" labelWidth="95" :model="form" ref="form">
				<view class="baseinfo">
					<u-form-item label="单号：" prop="deliv_number" borderBottom ref="deliv_number">
						<u--input v-model="form.deliv_number" placeholder='自动生成' border="none" disabled
							disabledColor="#fff">
						</u--input>
					</u-form-item>
					<u-form-item label="收货单位：" prop="company" borderBottom ref="company">
						<u--input v-model="form.company" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="样式：" prop="style" borderBottom ref="style">
						<u-radio-group v-model="form.style" placement="row">
							<u-radio label="样式1" :name="0"></u-radio>
							<u-radio label="样式2" :name="2"></u-radio>
						</u-radio-group>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon>
					</u-form-item>
				</view>
				<view class="goodsList" v-for="(item, index) in form.goodsList" :key="index">
					<view class="index">货物-{{ index +1}}</view>
					<u-form-item label="货物名称：" prop="itemname" borderBottom ref="itemname">
						<u--input v-model="item.itemname" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="规格：" prop="format" borderBottom ref="format">
						<u--input v-model="item.format" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="批号：" prop="batchnum" borderBottom ref="batchnum">
						<u--input v-model="item.batchnum" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<!-- <u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--input v-model="item.remark" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item> -->
					<u-form-item label="重量：" prop="weight" borderBottom ref="weight">
						<u--input type="number" v-model="item.weight" border="none" disabled disabledColor="#fff">
						</u--input>
					</u-form-item>
					<u-form-item label="单位(KG/T)：" prop="unit" borderBottom ref="unit">
						<u--input v-model="item.unit" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="单价：" prop="price" borderBottom ref="price" v-show="form.style ==2">
						<u--input type="number" @blur="(val)=>{handleBlur(val,2,item,'price')}" v-model="item.price"
							border="none" disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon>
					</u-form-item>
					<u-form-item label="数量：" prop="nums" borderBottom ref="nums">
						<u--input type="number" v-model="item.nums" border="none" disabled disabledColor="#fff">
						</u--input>
					</u-form-item>
					<u-form-item label="托/箱：" prop="boxes" borderBottom ref="boxes">
						<!-- <u--input type="number" v-model="item.boxes" border="none" disabled disabledColor="#fff">
						</u--input> -->
						<text>{{item.boxes ? '箱':'托'}}</text>
					</u-form-item>
					<u-form-item label="金额：" borderBottom v-if="form.style ==2">
						{{(item.weight * item.price).toFixed(2)}}
					</u-form-item>
				</view>
				<view class="baseinfo">
					<u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--textarea v-model="form.remark" type="textarea" disabled autoHeight border="none"
							disabledColor="#fff"></u--textarea>
						<!-- <u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon> -->
					</u-form-item>
				</view>
				<view class="submit" v-if=" form.parmasType != 'view' ">
					<u-button formType="" @click="submit" text="提交" type="primary"></u-button>
				</view>
			</u--form>
		</view>
		<!-- 开出门证 -->
		<view class="popBox" v-if=" form.parmasType == 'permit'">
			<u--form labelPosition="left" labelAlign="right" labelWidth="95" :model="form" ref="form">
				<view class="baseinfo">
					<u-form-item label="单号：" prop="pp_number" borderBottom ref="pp_number">
						<u--input v-model="form.pp_number" placeholder='自动生成' border="none" disabled
							disabledColor="#fff">
						</u--input>
					</u-form-item>
					<u-form-item label="收货单位：" prop="company" borderBottom ref="company">
						<u--input v-model="form.company" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
				</view>
				<view class="goodsList" v-for="(item, index) in form.goodsList" :key="index">
					<view class="index">货物-{{ index +1}}</view>
					<u-form-item label="货物名称：" prop="itemname" borderBottom ref="itemname">
						<u--input v-model="item.itemname" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="规格：" prop="format" borderBottom ref="format">
						<u--input v-model="item.format" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="批号：" prop="batchnum" borderBottom ref="batchnum">
						<u--input v-model="item.batchnum" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<!-- <u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--input v-model="item.remark" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item> -->
					<u-form-item label="重量：" prop="weight" borderBottom ref="weight">
						<u--input v-model="item.weight" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="单位(KG/T)：" prop="unit" borderBottom ref="unit">
						<u--input v-model="item.unit" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<!-- <u-form-item label="单价：" prop="price" borderBottom ref="price">
						<u--input v-model="item.price" border="none" disabled
							disabledColor="#fff"></u--input>
					</u-form-item> -->
					<u-form-item label="数量：" prop="nums" borderBottom ref="nums">
						<u--input v-model="item.nums" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="托/箱：" prop="boxes" borderBottom ref="boxes">
						<!-- <u--input v-model="item.boxes" border="none" disabled disabledColor="#fff"></u--input>
						 -->
						 <text>{{item.boxes ? '箱':'托'}}</text>
					</u-form-item>
				</view>
				<view class="baseinfo">
					<u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--textarea v-model="form.remark" type="textarea" disabled autoHeight border="none"
							disabledColor="#fff"></u--textarea>
						<!-- <u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"></u-icon> -->
					</u-form-item>
				</view>
				<view class="submit" v-if=" form.parmasType != 'view' ">
					<u-button formType="" @click="submit" text="提交" type="primary"></u-button>
				</view>
			</u--form>
		</view>
		<!-- 开退货单 -->
		<view class="popBox" v-if=" form.parmasType == 'return'">
			<u--form labelPosition="left" labelAlign="right" labelWidth="95" :model="form" ref="form">
				<view class="baseinfo">
					<u-form-item label="单号：" prop="rtn_number" borderBottom ref="rtn_number">
						<u--input v-model="form.rtn_number" placeholder='自动生成' border="none" disabled
							disabledColor="#fff">
						</u--input>
					</u-form-item>
					<u-form-item label="收货单位：" prop="company" borderBottom ref="company">
						<u--input v-model="form.company" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
				</view>
				<view class="goodsList" v-for="(item, index) in form.goodsList" :key="index">
					<view class="index">货物-{{ index +1}}</view>
					<u-form-item label="货物名称：" prop="itemname" borderBottom ref="itemname">
						<u--input v-model="item.itemname" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="规格：" prop="format" borderBottom ref="format">
						<u--input v-model="item.format" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="批号：" prop="batchnum" borderBottom ref="batchnum">
						<u--input v-model="item.batchnum" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<!-- <u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--input v-model="item.remark" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item> -->
					<u-form-item label="重量：" prop="weight" borderBottom ref="weight">
						<u--input type="number" @blur="(val)=>{handleBlur(val,num,item,'weight')}" v-model="item.weight"
							border="none" :disabled="!item.ret" disabledColor="#fff">
						</u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="!!item.ret"></u-icon>
					</u-form-item>
					<u-form-item label="单位(KG/T)：" prop="unit" borderBottom ref="unit">
						<u--input v-model="item.unit" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="单价：" prop="price" borderBottom ref="price">
						<u--input v-model="item.price" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-form-item label="数量：" prop="nums" borderBottom ref="nums">
						<u--input v-model="item.nums" border="none" disabled disabledColor="#fff"></u--input>
					</u-form-item>
					<u-row customStyle="margin-top: 10px">
						<u-col span="12">
							<u-button type="error" text="退货" :disabled="!!item.ret" @click="tuihuo(item,index)">
							</u-button>
						</u-col>
					</u-row>
					<u-row customStyle="margin-top: 10px" v-if="!!item.ret">
						<u-col span="12">
							<u-button type="info" text="取消" @click="tuihuoCancel(item,index)"></u-button>
						</u-col>
					</u-row>
					<view class="cover" v-if="item.ret">退</view>
				</view>
				<view class="baseinfo">
					<u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--textarea v-model="form.remark" type="textarea" autoHeight border="none" disabled disabledColor="#fff">
						</u--textarea>
					</u-form-item>
				</view>
				<view class="submit" v-if=" form.parmasType != 'view' ">
					<u-button formType="" @click="submit" text="提交" type="primary"></u-button>
				</view>
			</u--form>
		</view>

		<!-- 查看/新增/编辑 -->
		<view class="popBox" v-if=" form.parmasType == 'add' || form.parmasType == 'view' || form.parmasType == 'edit'">
			<u--form labelPosition="left" labelAlign="right" labelWidth="95" :model="form" ref="form">
				<view class="baseinfo">
					<u-form-item label="单号：" prop="number" borderBottom ref="number">
						<u--input v-model="form.number" v-if="!form.viewType" placeholder='自动生成' border="none" disabled
							disabledColor="#fff">
						</u--input>
						<u--input v-model="form.out_number || form.number" v-if="form.viewType == 'delivery'"
							placeholder='自动生成' border="none" disabled disabledColor="#fff">
						</u--input>
						<u--input v-model="form.pp_number || form.number" v-if="form.viewType == 'permit'"
							placeholder='自动生成' border="none" disabled disabledColor="#fff">
						</u--input>
						<u--input v-model="form.rtn_number || form.number" v-if="form.viewType == 'return'"
							placeholder='自动生成' border="none" disabled disabledColor="#fff">
						</u--input>
						<u--input v-model="form.deliv_number || form.number" v-if="form.viewType == 'shipping'"
							placeholder='自动生成' border="none" disabled disabledColor="#fff">
						</u--input>
					</u-form-item>
					<u-form-item label="收货单位：" prop="company" borderBottom ref="company">
						<u--input v-model="form.company" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'">
						</u-icon>
					</u-form-item>
					<!-- <u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--textarea autoHeight v-model="form.remark" border="none" :disabled="form.parmasType == 'view'"
							></u--textarea>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'"></u-icon>
					</u-form-item> -->
				</view>
				<view class="goodsList" v-for="(item, index) in form.goodsList" :key="index">
					<view class="index">货物-{{ index +1}}</view>
					<u-form-item label="货物名称：" prop="itemname" borderBottom ref="itemname">
						<u--input v-model="item.itemname" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'">
						</u-icon>
					</u-form-item>
					<u-form-item label="规格：" prop="format" borderBottom ref="format">
						<u--input v-model="item.format" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'">
						</u-icon>
					</u-form-item>
					<u-form-item label="批号：" prop="batchnum" borderBottom ref="batchnum">
						<u--input v-model="item.batchnum" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'">
						</u-icon>
					</u-form-item>
					<!-- <u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--input v-model="item.remark" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
							<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'"></u-icon>
					</u-form-item> -->
					<u-form-item label="重量：" prop="weight" borderBottom ref="weight">
						<u--input type="number" @blur="(val)=>{handleBlur(val,1,item,'weight')}" v-model="item.weight"
							border="none" :disabled="form.parmasType == 'view'" disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'">
						</u-icon>
					</u-form-item>
					<u-form-item label="单位(KG/T)：" prop="unit" borderBottom ref="unit">
						<u--input v-model="item.unit" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'">
						</u-icon>
					</u-form-item>
					<u-form-item v-if="form.parmasType != 'view'" label="单价：" prop="price" borderBottom ref="price">
						<u--input type="number" @blur="(val)=>{handleBlur(val,2,item,'price')}" v-model="item.price"
							border="none" :disabled="form.parmasType == 'view'" disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'">
						</u-icon>
					</u-form-item>
					<u-form-item label="数量：" prop="nums" borderBottom ref="nums" v-if="form.parmasType == 'view'">
						<u--input type="number" v-model="item.nums" border="none" :disabled="form.parmasType == 'view'"
							disabledColor="#fff"></u--input>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'">
						</u-icon>
					</u-form-item>
					<u-form-item label="托/箱：" prop="boxes" borderBottom ref="boxes" v-if="form.parmasType == 'view'">
						<!-- <u--input type="number" v-model="item.boxes" border="none" disabled disabledColor="#fff"></u--input> -->
						<u-radio-group
							v-if="form.parmasType != 'view'"
							v-model="item.boxes"
							placement="row">
							<u-radio :name="0" label="托"></u-radio>
							<u-radio :name="1" label="箱"></u-radio>
						</u-radio-group>
						<text v-if="form.parmasType == 'view'">{{item.boxes ? '箱':'托'}} </text>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'">
						</u-icon>
					</u-form-item>
					<view class="cover" v-if="form.viewType == 'return' && item.ret">退</view>

					<view v-if=" form.parmasType != 'view' ">
						<view class="del" v-if=" form.goodsList.length > 1 ">
							<u-icon @click="delItem(item)" name="minus-circle" size="26" color="#dd4d14"></u-icon>
						</view>
						<view class="plus" v-if=" index == form.goodsList.length -1 ">
							<u-icon @click="addItem" name="plus-circle" size="26" color="#004ddd"></u-icon>
						</view>
					</view>
				</view>
				<view class="baseinfo">
					<u-form-item label="备注：" prop="remark" borderBottom ref="remark">
						<u--textarea v-model="form.remark" type="textarea" autoHeight border="none"
							:disabled="form.parmasType == 'view'" disabledColor="#fff"></u--textarea>
						<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'">
						</u-icon>
					</u-form-item>
				</view>



				<!-- 退货清单 -->
				<view v-if="form.parmasType == 'view' && form.viewType == 'return' && form.returnGoodsList.length "
					class="returnList">
					<view class="title"> <text>退货清单</text> </view>
					<view class="goodsList" v-for="(item, index) in form.returnGoodsList" :key="index">
						<view class="index" style="background-color:red">货物-{{ index +1}}</view>
						<u-form-item label="货物名称：" prop="itemname" borderBottom ref="itemname">
							<u--input v-model="item.itemname" border="none" :disabled="form.parmasType == 'view'"
								disabledColor="#fff"></u--input>
							<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"
								v-if="form.parmasType != 'view'"></u-icon>
						</u-form-item>
						<u-form-item label="规格：" prop="format" borderBottom ref="format">
							<u--input v-model="item.format" border="none" :disabled="form.parmasType == 'view'"
								disabledColor="#fff"></u--input>
							<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"
								v-if="form.parmasType != 'view'"></u-icon>
						</u-form-item>
						<u-form-item label="批号：" prop="batchnum" borderBottom ref="batchnum">
							<u--input v-model="item.batchnum" border="none" :disabled="form.parmasType == 'view'"
								disabledColor="#fff"></u--input>
							<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"
								v-if="form.parmasType != 'view'"></u-icon>
						</u-form-item>
						<!-- <u-form-item label="备注：" prop="remark" borderBottom ref="remark">
							<u--input v-model="item.remark" border="none" :disabled="form.parmasType == 'view'"
								disabledColor="#fff"></u--input>
								<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff" v-if="form.parmasType != 'view'"></u-icon>
						</u-form-item> -->
						<u-form-item label="重量：" prop="weight" borderBottom ref="weight">
							<u--input v-model="item.weight" border="none" :disabled="form.parmasType == 'view'"
								disabledColor="#fff"></u--input>
							<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"
								v-if="form.parmasType != 'view'"></u-icon>
						</u-form-item>
						<u-form-item label="单位(KG/T)：" prop="unit" borderBottom ref="unit">
							<u--input v-model="item.unit" border="none" :disabled="form.parmasType == 'view'"
								disabledColor="#fff"></u--input>
							<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"
								v-if="form.parmasType != 'view'"></u-icon>
						</u-form-item>
						<u-form-item label="单价：" prop="price" borderBottom ref="price">
							<u--input v-model="item.price" border="none" :disabled="form.parmasType == 'view'"
								disabledColor="#fff"></u--input>
							<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"
								v-if="form.parmasType != 'view'"></u-icon>
						</u-form-item>
						<u-form-item label="数量：" prop="nums" borderBottom ref="nums">
							<u--input v-model="item.nums" border="none" :disabled="form.parmasType == 'view'"
								disabledColor="#fff"></u--input>
							<u-icon solt="right" name="edit-pen" size="26" color="#0a78ff"
								v-if="form.parmasType != 'view'"></u-icon>
						</u-form-item>
						<u-form-item label="托/箱：" prop="boxes" borderBottom ref="boxes">
							<text>{{item.boxes ? '箱':'托'}}</text>							
						</u-form-item>
						<view v-if=" form.parmasType != 'view' ">
							<view class="del" v-if=" form.goodsList.length > 1 ">
								<u-icon @click="delItem(item)" name="minus-circle" size="26" color="#dd4d14"></u-icon>
							</view>
							<view class="plus" v-if=" index == form.goodsList.length -1 ">
								<u-icon @click="addItem" name="plus-circle" size="26" color="#004ddd"></u-icon>
							</view>
						</view>
					</view>
				</view>


				<view class="submit" v-if=" form.parmasType != 'view' ">
					<u-button formType="" @click="submit" text="提交" type="primary"></u-button>
				</view>
			</u--form>
		</view>
	</view>
</template>
<script>
	import store from '@/store/index.js'
	var api = require('@/common/api.js')
	export default {
		data() {
			return {
				title: '详情',
				form: {},
				cacheGoodsList: [],
				rules: {
					'goodsList.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				}
			}
		},
		onLoad() {
			if (this.$store.state.home.itemList.company) {
				this.form = Object.assign({}, this.$store.state.home.itemList)
			} else {
				this.form = {
					goodsList: [{
						itemname: '',
						format: '',
						weight: 0,
						price: 0,
						amount: 0,
						unit: 'KG',
						nums: 0,
						batchnum: '',
						remark: '',
						boxes:0,
					}, ],
					number: '',
					company: '',
					parmasType: 'add',
					itemname: '',
					format: '',
					weight: 0,
					price: 0,
					amount: 0,
					unit: 'KG',
					nums: 0,
					boxes: 0,
					batchnum: '',
					remark: '',
				}
				console.log(this.form)
			}

			switch (this.form.parmasType) {
				case 'view':
					this.title = '详情'
					break;
				case 'edit':
					this.title = '编辑送货申请单'
					break;
				case 'delivery':
					this.title = '开具出库单'
					break;
				case 'permit':
					this.title = '开具出门证'
					break;
				case 'shipping':
					this.title = '开具送货单'
					break;
				case 'return':
					this.title = '开具退货单'
					break;
				default:
					this.title = '详情'
					break;
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
			// save(){
			// 	api.post({
			// 		url: 'wms/Index/show',
			// 		data: {
			// 			  id: id,
			// 			  device_type: api.DeviceType							
			// 		},
			// 		success: data => {
			// 			console.log(data)								
			// 			if (data.code == 1) {
			// 				this.loading = false;
			// 				this.List = data.data;
			// 				//uni.showToast({
			// 					//duration: 500,
			// 					//title: data.msg
			// 				//});								
			// 			}
			// 			if (data.code == 0) {
			// 				this.loading = false;
			// 				uni.showToast({
			// 					duration: 1500,
			// 					icon: 'none',
			// 					title: data.msg
			// 				});
			// 			}
			// 		}
			// 	});	
			// },
			addItem() {
				console.log(this.form)
				this.form.goodsList.push({
					itemname: '',
					format: '',
					weight: 0,
					price: 0,
					amount: 0,
					unit: 'KG',
					nums: 0,
					batchnum: '',
					remark: '',
					boxes:0
				})
			},
			delItem(item) {
				var index = this.form.goodsList.indexOf(item)
				if (index !== -1) {
					this.form.goodsList.splice(index, 1)
				}
			},
			handleBack() {
				uni.$u.route({
					type: 'back',
					// url: '/pages/list/apply',					
				})
			},
			choose(name) {
				this.form.style = name
			},
			tuihuo(row, index) {
				this.cacheGoodsList[index] = (JSON.parse(JSON.stringify(row)))
				row.ret = 1
			},
			tuihuoCancel(row, index) {
				console.log(index)
				this.form.goodsList[index].weight = this.cacheGoodsList[index].weight
				this.form.goodsList[index].ret = 0
			},
			handleBlur(val, num, row, name) {
				row[name] = parseFloat(val).toFixed(num)
			},
			submit() {
				let pass = true
				// console.log(this.form)
				if (this.form.parmasType == 'add' || this.form.parmasType == 'edit') {
					// console.log(!this.form.company)
					if (!this.form.company) {
						uni.showToast({
							duration: 2000,
							icon: 'none',
							title: '收货单位必填！'
						});
						pass = false
						return
					}
					this.form.goodsList.map(item => {
						if (!item.itemname) {
							uni.showToast({
								duration: 2000,
								icon: 'none',
								title: '货物名称必填！'
							});
							pass = false
							return
						}
						if (!item.format) {
							uni.showToast({
								duration: 2000,
								icon: 'none',
								title: '规格必填！'
							});
							pass = false
							return
						}

					})
				}

				if (this.form.parmasType == 'delivery') {
					this.form.goodsList.map(item => {
						if (!item.batchnum) {
							uni.showToast({
								duration: 2000,
								icon: 'none',
								title: '批号必填！'
							});
							pass = false
							return
						}
						if (!item.nums) {
							uni.showToast({
								duration: 2000,
								icon: 'none',
								title: '数量必填！'
							});
							pass = false
							return
						}
						if (!item.unit) {
							uni.showToast({
								duration: 2000,
								icon: 'none',
								title: '单位(KG/T)必填！'
							});
							pass = false
							return
						}
						if (!item.weight) {
							uni.showToast({
								duration: 2000,
								icon: 'none',
								title: '重量必填！'
							});
							pass = false
							return
						}
					})
				}
				if (this.form.parmasType == 'shipping') {
					this.form.goodsList.map(item => {
						if (this.form.style == 2 && !item.price) {
							uni.showToast({
								duration: 2000,
								icon: 'none',
								title: '单价必填！'
							});
							pass = false
							return
						}
					})
				}
				if (this.form.parmasType == 'return') {
					this.form.goodsList.map(item => {
						if (item.ret == 1 && !item.weight) {
							uni.showToast({
								duration: 2000,
								icon: 'none',
								title: '重量必填！'
							});
							pass = false
							return
						}
					})
				}
				if (!pass) {
					return
				}
				this.form.goodsList.map((item) => {
					item.amount = (item.weight * item.price).toFixed(2)
				})
				this.form.itemname = this.form.goodsList[0].itemname
				this.form.nums = this.form.goodsList[0].nums
				this.form.amount = this.form.goodsList[0].amount
				this.form.weight = this.form.goodsList[0].weight
				this.form.unit = this.form.goodsList[0].unit
				this.form.format = this.form.goodsList[0].format

				let submitUrl = ''
				let option = {}
				switch (this.form.parmasType) {
					case 'add':
						submitUrl = 'busrwaybill/add'
						break;
					case 'edit':
						submitUrl = 'busrwaybill/edit'
						break;
					case 'delivery':
						submitUrl = 'busoutbound/edit'
						option = {
							out_status: 1
						}
						break;
					case 'permit':
						submitUrl = 'buspp/edit'
						option = {
							pp_status: 1
						}
						break;
					case 'shipping':
						submitUrl = 'busdeliv/edit'
						option = {
							deliv_status: 1
						}
						break;
					case 'return':
						submitUrl = 'busrtn/edit'
						option = {
							rtn_status: 0
						}
						break;
					default:
						submitUrl = 'busrwaybill/edit'
						break;
				}

				if (this.form.parmasType == 'return') {
					const returnList = []
					this.form.goodsList.map((item, index) => {
						if (item.ret) {
							returnList.push(JSON.parse(JSON.stringify(item)))
							item.weight = this.cacheGoodsList[index].weight
							item.ret = 1
						}
					})
					if (returnList.length) {
						this.form.returnGoodsList = returnList
					}
					// console.log(returnList)
				}
				// console.log(this.cacheGoodsList,this.form.returnGoodsList)
				if (this.form.parmasType == 'return' && !this.form.returnGoodsList.length) {
					uni.showToast({
						duration: 2500,
						icon: 'none',
						title: '请选择要退的货物并填写重量！'
					});
					return
				}

				api.post({
					url: submitUrl,
					data: {
						...this.form,
						...option,
					},
					success: data => {
						console.log(data)
						if (data.code == 1) {
							setTimeout(() => {
								uni.$emit('refresh')
							}, 100)
							uni.$u.route({
								type: 'back', //back reLaunch
							})
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

<style lang="scss">
	/* .main{margin:40upx;background-color: #fff;padding:40upx;border-radius: 20upx;} */
	.popBox {
		margin-top: 140upx;
		padding-bottom: 10upx;
	}

	.baseinfo,
	.goodsList {
		margin: 30upx;
		background-color: #fff;
		padding: 30upx;
		border-radius: 20upx;
	}

	.scan-result {
		min-height: 50upx;
		line-height: 50upx;
	}

	.goodsList {
		margin-top: 30upx;
		// padding: 30upx 0;
		text-align: center;
		position: relative;

		.index {
			background-color: #3c9cff;
			color: #fff;
			padding: 7upx;
			text-align: center;
			width: 200upx;
			display: inline-block;
			position: relative;
			top: -25upx;
			border-radius: 0 0 15upx 15upx;
		}

		.plus,
		.del {
			margin: 20upx 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.cover {
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			border: 7upx solid salmon;
			font-size: 40upx;
			color: salmon;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 20%;
			right: 20%;
			opacity: 0.3;
			transform: rotate(-30deg) scale(3);
		}
	}

	.returnList {
		.title {
			font-size: 18px;
			text-align: center;
			// color:indianred
		}
	}

	.submit {
		padding: 30upx;
	}
	.u-textarea--disabled{
		background-color:#fff;
	}
</style>
