import request from '@/utils/request'
import qs from 'qs'
const ClassName = "/WvRegistrationForm";


/**
 * GET /api/WvRegistrationForm/GetUserInfo 通过code换取网页授权access_token
 * @export
 * @param {*} code
 * @returns
 */
export function GetUserInfo(code) {
  return request({
    url: `${ClassName}/GetUserInfo`,
    method: 'get',
    params:{code}
  })
}

/**
 * POST /api/WvRegistrationForm/AddOrUpdate  新增修改 参会报名表
 * @export{
  "Openid": "string",
  "WxNickname": "string",
  "WxSex": "string",
  "WxProvince": "string",
  "WxCity": "string",
  "WxCountry": "string",
  "WxPicture": "string",
  "Unionid": "string",
  "UserName": "string",
  "Age": "string",
  "Gender": "string",
  "Title": "string",
  "HospitalName": "string",
  "DepartmentName": "string",
  "IsBasicLevel": 0,
  "Province": "string",
  "City": "string",
  "Area": "string",
  "Mobile": "string",
  "SourceAppId": "string",
  "WxSceneId": "string"
}
 * @returns
 */
export function AddOrUpdate(data) {
  return request({
    url: `${ClassName}/AddOrUpdate`,
    method: 'post',
    data: qs.stringify(data)
  })
}
