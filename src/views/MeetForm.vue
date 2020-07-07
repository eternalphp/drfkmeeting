<template>
	<div class="page_MeetForm">
		<section v-if="!errorPage">
			<div class="form_title">
				参会报名表
			</div>
			<van-form @submit="onSubmit">
				<van-field v-model="form.username" name="姓名" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请输入真实姓名' }]" />
				<!--<van-field
      v-model="form.age"
      type="digit"
      name="年龄"
      label="年龄"
      placeholder="年龄"
      :rules="[{ required: true, message: '请输入年龄' }]"
    />-->
				<!--<van-field name="radio" label="性别" :rules="[{ required: true, message: '请选择性别' }]">
      <template #input>
        <van-radio-group v-model="form.gender" direction="horizontal" icon-size="14px">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>-->
				<!--<van-field
     readonly
      clickable
      @click="showJobTitleDialog"
      v-model="form.jobtitle"
      name="职称"
      label="职称"
      placeholder="职称"
      :rules="[{ required: true, message: '请填写职称' }]"
  />-->
		<van-field readonly clickable @click="showHosDialog" v-model="form.hospital" name="工作单位" label="工作单位" placeholder="工作单位" :rules="[{ required: true, message: '请输入医院名称' }]" />
		<van-field readonly clickable @click="showDeptDialog" v-model="form.department" name="科室" label="科室" placeholder="科室" :rules="[{ required: true, message: '请输入科室名称' }]" />
				<!--<van-field name="是否来自基层" label="是否来自基层" :rules="[{ required: true, message: '请选择是否来自基层' }]">
      <template #input>
        <van-radio-group v-model="form.isBasic" direction="horizontal" icon-size="14px">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>-->
				<!--<van-field
      readonly
      clickable
      v-model="place"
      @click="showAreaDialog"
      name="城市"
      label="城市"
      placeholder="城市"
      :rules="[{ required: true, message: '请输入单位所在地' }]"
      />-->

				<van-field v-model="form.phone" type="tel" name="手机号" label="手机号" placeholder="手机号" :rules="[
      { required: true, message: '请输入手机号' },
      {pattern:/^(?:(?:\+|00)86)?1\d{10}$/,message: '请输入正确的手机号' }
      ]" />

				<van-field v-model="smscode" center clearable label="短信验证码" placeholder="请输入短信验证码">
					<template #button>
						<van-button v-if="!cutDownTime" size="small" type="primary" @click="sendSMSCode">发送验证码</van-button>
						<van-button v-if="cutDownTime" size="small" type="primary">{{cutDownTime}}s后再试</van-button>
					</template>
				</van-field>

				<div name="checkbox" class="protocalBox">
					<van-checkbox v-model="checkbox" shape="square" icon-size="15px">
						<span class="protocal">接受多福医生平台<span class="text" @click.stop="openProtocal">用户协议</span>及<span class="text" @click.stop="openPrivate">隐私条款</span> </span>
					</van-checkbox>
				</div>
				<div style="margin: 16px;">
					<van-button :disabled="!checkbox" round block type="info" native-type="submit">
						提交
					</van-button>
				</div>
			</van-form>
			<van-overlay :show="showOverlay" @click="showOverlay = false">
				<van-button class="reg-btn" type="primary" :url="regUrl" block>报名参会授权</van-button>
			</van-overlay>

			<van-popup v-model="showArea" position="bottom" duration="0.3">
				<van-area :area-list="areaList" @confirm="areaConfirm" @cancel="showArea = false" />
			</van-popup>

			<van-popup v-model="showJobTitle" position="bottom">
				<van-picker show-toolbar :columns="jobtitleList" @confirm="jobtitleConfirm" @cancel="showJobTitle = false" />
			</van-popup>

			<van-popup v-model="showHospitalSelect" position="right" :style="{ width: '70%' }">
				<search-hos v-if="showHospitalSelect" @selectHosSuc="handleHosSelect"></search-hos>
			</van-popup>

			<van-popup v-model="showDeptSelect" position="right" :style="{ width: '70%' }">
				<search-dept v-if="showDeptSelect" @selectDepSuc="handleDeptSelect"></search-dept>
			</van-popup>

			<van-dialog v-model="showProtocal" title="用户协议">
				<protocal></protocal>
			</van-dialog>

			<van-dialog v-model="showPrivacyPolicy" title="隐私条款">
				<private-page></private-page>
			</van-dialog>
		</section>
		<section class="errorPageBox" v-if="errorPage">
			<van-empty image="error" description="表单已过期,请关闭或刷新页面" />
		</section>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		GetUserInfo,
		AddOrUpdate,
		sendMessage
	} from '@/api/user'
	import area from '@/utils/area';
	import {
		Form,
		Field,
		Button,
		RadioGroup,
		Radio,
		Checkbox,
		CheckboxGroup,
		Overlay,
		Notify,
		Area,
		Popup,
		Picker,
		Dialog,
		Empty,
		Toast
	} from 'vant';
	import protocal from '@/components/reg/protocal'
	import privatePage from '@/components/reg/private'
	import searchHosPage from '@/components/reg/regStep2-1'
	import searchDeptPage from '@/components/reg/regStep2-2'
	import _ from 'lodash';


	Vue.use(Radio);
	Vue.use(RadioGroup);
	Vue.use(Form);
	Vue.use(Field);
	Vue.use(Button);
	Vue.use(Checkbox);
	Vue.use(CheckboxGroup);
	Vue.use(Overlay);
	Vue.use(Notify);
	Vue.use(Area);
	Vue.use(Popup);
	Vue.use(Picker);
	Vue.use(Dialog);
	Vue.use(Empty);
	Vue.use(Toast);

	var wxcode = '1233';

	export default {
		name: "MeetForm",
		components: {
			protocal: protocal,
			privatePage: privatePage,
			searchHos: searchHosPage,
			searchDept: searchDeptPage
			// vanForm:Form
		},
		data() {
			return {
				appId: "wxafb29575d76f4814",
				WxSceneId: "1130",
				areaList: area,
				//pattern:: /^(?:(?:\+|00)86)?1\d{10}$/,
				form: {
					username: '',
					age: '',
					gender: '',
					jobtitle: '',
					hospital: '',
					department: '',
					isBasic: "",
					Province: "",
					City: "",
					Area: "",
					phone: '',
				},
				checkbox: false,
				showOverlay: false,
				showArea: false,
				showJobTitle: false,
				showProtocal: false,
				showPrivacyPolicy: false,
				showHospitalSelect: false,
				showDeptSelect: false,
				HcpUserInfo: {},
				smscode: '',
				cutDownTime: 0,
				smsUrl: 'http://localhost:8312/api/SMS/sendMessage',
				WxUserInfo: {
					Openid: "",
					Unionid: "",
					WxCity: "",
					WxCountry: "",
					WxNickname: "",
					WxPicture: "",
					WxProvince: "",
					WxSex: "",
				},
				regUrl: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxafb29575d76f4814&redirect_uri=${process.env.VUE_APP_WX_REDIRECT_API}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`,
				jobtitleList: ['副高及以上', '中级', '初级', '乡村医生'],
				errorPage: false,
			}
		},
		computed: {
			place() {
				if (this.form.Province && this.form.City && this.form.Area) {
					return `${this.form.Province} ${this.form.City} ${this.form.Area}`
				} else {
					return ''
				}
			}

		},
		directives: {
			trigger: {
				inserted(el) {
					console.log(wxcode);
					if (wxcode) {
						console.log('以获取wxcode');
					} else {
						el.click()
						console.log(el);
					}
				}
			}
		},
		created() {
			console.log(this.$route);
			let code = this.$route.query.code;
			wxcode = code;

			console.log(code);
			debugger;
			if (code) {
				GetUserInfo(code).then((resp) => {
					console.log(resp);
					this.showOverlay = false;
					if (resp.success == false) {
						this.errorPage = true;
						Notify({
							type: 'danger',
							message: `错误信息:${resp.msg}`
						});
					} else {
						if (resp.result.IsRegister == true) {
							Toast.loading({
								message: '已注册,即将跳转...',
								forbidClick: true,
								loadingType: 'spinner',
								duration: 1000
							});
							setTimeout(() => {
								this.toQrcodePage();
							}, 1000)
							return;
						}
						this.HcpUserInfo = resp.result.HcpUserInfo;
						this.WxUserInfo = resp.result.WxUserInfo;
						this.form.username = this.HcpUserInfo.UserName;
						this.form.hospital = this.HcpUserInfo.HospitalName;
						this.form.department = this.HcpUserInfo.DepartmentName;
						this.form.phone = this.HcpUserInfo.Mobile;
					}
				});
			}
		},
		methods: {
			handleHosSelect(hospital) {
				console.log('搜索选中的', hospital);
				this.form.hospital = hospital;
				this.showHospitalSelect = false;
			},
			handleDeptSelect(dept) {
				console.log('搜索选中的', dept);
				this.form.department = dept;
				this.showDeptSelect = false;
			},
			toQrcodePage() {
				//window.location.replace(`${process.env.VUE_APP_BASE_HOST}static/qrcode.html`);
				window.location.replace(`https://ecachelive.ecache.com.cn/liveroom/agsygqre`);
				// this.$router.push({
				//    name:'Qr'
				//  });
			},
			onSubmit: _.throttle(function(values) {
				console.log('submit', values);
				console.log('form', this.form);
				//this.AddOrUpdate();
			}, 2000),
			AddOrUpdate() {
				let params = {
					"UserName": this.form.username,
					"RegistrationAge": this.form.age,
					"RegistrationGender": this.form.gender,
					"Title": this.form.jobtitle,
					"HospitalName": this.form.hospital,
					"DepartmentName": this.form.department,
					"RegistrationIsBasicLevel": this.form.isBasic,
					"Province": this.form.Province,
					"City": this.form.City,
					"Area": this.form.Area,
					"Mobile": this.form.phone,
					"SourceAppId": this.appId,
					"WxSceneId": this.WxSceneId,
					...this.WxUserInfo
				}
				AddOrUpdate(params).then(resp => {
					if (resp.success == true) {
						Notify({
							type: 'success',
							message: `提交成功`
						});
						setTimeout(() => {
							this.toQrcodePage();
						}, 1000)
					} else {
						Notify({
							type: 'danger',
							message: `提交失败`
						});
						setTimeout(() => {
							this.errorPage = true;
						}, 500)
					}
				});
			},
			showJobTitleDialog() {
				this.showJobTitle = true;
			},
			showAreaDialog() {
				this.showArea = true;
			},
			showHosDialog() {
				this.showHospitalSelect = true;
			},
			showDeptDialog() {
				this.showDeptSelect = true;
			},
			areaConfirm(result) {
				console.log(result);
				this.showArea = false;
				this.form.Province = result[0].name;
				this.form.City = result[1].name;
				this.form.Area = result[2].name;
			},
			jobtitleConfirm(value) {
				this.form.jobtitle = value;
				this.showJobTitle = false;
			},
			areaCancel() {
				this.showArea = false;
			},
			openProtocal() {
				this.showProtocal = true;
			},
			openPrivate() {
				this.showPrivacyPolicy = true;
			},
			sendSMSCode() {
				if (this.form.phone != '') {
					sendMessage(this.form.phone).then(res => {
						if (res.error_code == 0) {
							Notify({
								type: 'success',
								message: `验证码已发送，请在5分钟内完成验证`
							});
						} else {
							Notify({
								type: 'danger',
								message: `验证码发送失败，请稍候重试`
							});
						}
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page_MeetForm {
		height: 100vh;
	}

	.errorPageBox {
		box-sizing: border-box;
		height: 100vh;
	}

	.van-empty {
		width: 100%;
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
	}

	.form_title {
		margin: 20px;
	}

	.protocal {
		margin-left: 2px;
	}

	.protocalBox {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
		padding: 10px 16px;
		font-size: 12px;
		// ::v-deep .van-field__control--custom{
		// }
	}

	.reg-btn {
		width: 80%;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0)
	}

	// ::v-deep  .van-picker{
	//   position: fixed;
	//   width:100%;
	//   bottom:0;
	//   left:0;
	// }
	.protocal .text {
		color: #1989fa;
		margin-left: 6px;
		margin-right: 6px;
		text-decoration: underline;
		;
	}

	::v-deep .van-dialog__content {
		padding: 0px 10px;
		overflow: auto;
		max-height: 60vh;
		-webkit-overflow-scrolling: touch;
	}
</style>
