import request from '@/utils/request'
import qs from 'qs'
const ClassName = "/WxCommon";

/**
 * GET /api/WxCommon/GetHospital 
 * @export
 * @param {*} code
 * @returns
 */
export function GetHospital(data) {
  return request({
    url: `${ClassName}/GetHospital`,
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * POST /api/WxCommon/GetDept  
 * @export{
}
 * @returns
 */
export function GetDept(data) {
  return request({
    url: `${ClassName}/GetDept`,
    method: 'post',
    data: qs.stringify(data)
  })
}
