import request from "@/utils/request";

const ClassName = "/WxMeet";

/**
 * GET `${host}/WxMeet/GetMeetInfo`,
 * params: {
 *    Id:id
 * }
 * @returns
*/

export  function GetMeetInfo(data) {
  return request({
    url: `${ClassName}/GetMeetInfo`,
    method: "post",
    data
  });
}
/**
 * GET /api/WvRegistrationForm/GetUserInfo 通过code换取网页授权access_token
 * @export
 * @param {string} BotManageId
 * @param {string} WelcomingId
 * @param {string} DateTime
 * @returns
*/

export  function getWelcoming(params) {
    return request({
      url: `${ClassName}/Welcoming`,
      method: "get",
      params
    });
  }

  /**
 * POST /api/v{version}/Conversation  会话
 * @export
 * @param {string} botManageId
 * @param {string} userInput
 * @returns
*/

export  function sendMsg(data) {
    return request({
      url: `${ClassName}`,
      method: "post",
      data
    });
  }