import axios from "axios";

//import { MessageBox, Message } from "element-ui";
// create an axios instance
console.log(process.env.VUE_APP_BASE_API);
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  //timeout: 20000, // request timeout
  timeout: 999999999, // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // var token = window.localStorage.getItem("access_token");
    // if(token){
    //     console.log('token:',token);
    //     config.headers['Authorization'] = 'Bearer '+token;
    // //if (store.getters.access_token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    // //}
    // }else{
    //     // let token = router.currentRoute.query.token;
    //     // console.log(router.currentRoute.query.token);
    //     // let query = window.location.hash.split('?')[1];
    //     // let access_token = query.split('=')[1];
    //     // console.log('token:',access_token);
    //     // config.headers['Authorization'] = 'Bearer ' + access_token;
    //     // window.localStorage.setItem("access_token", access_token);
    //     //store.commit("SET_TOKEN",token);
        
    // }
    //config.mode = 'cors';
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      //"Authorization": 'Bearer JJRmevGwyJQ0LOyIgRy4d9FmG5pEnbxl1ecdhDHqvhOIzFIXoWoCAou_4VGxbbRij26l4zhdrjHowF2ppmqg3GABtSozHCnH2tztNfT_YOAuDtFG7HhxjhjDk871J3CkdyxVD5XittGsjqQMjzDdO2R8EhsHgiO1785ATIl3zGX-nJhrKlGCwcGsGslRT0YsIMCE8qlJ34fYQENH0X86n1sA3lvJYYZjDDc1EGqRZZ1OHYc40pzTOJ8lKxw8HrrfNGUzSjmVbqJW4bnBjZwOhsoUp17oBmYCN7g2MpHCsYmmXrXv10af0WM5agCgJPRy5PriGDIc38mDy2XPjh52G7YEXxCiL1JwZWvj-dqMc7RFrHGSMJkbMSCHl2aIt3XfUs7WU3BcmDsJPa8cIqqWRE09zGGxq8HtCqZ9sTMo4Lo'
    };
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.warn(response);
    const res = response.data;
    if(response.config.method == "put" && res.message == "Success" || response.config.method == "delete" && res.message == "Success"){
        // Message({
        //     message: "操作成功",
        //     type: "success",
        //     duration: 2 * 1000
        // });
    }
    return res;
  },
  error => {
    let errorData = error.response;
    console.log(error.response); // for debug
    if(errorData && errorData.status >= 500){
        // Message({
        //     message: "服务器错误，请联系管理员",
        //     type: "error",
        //     duration: 5 * 1000
        //     });
        }else if (errorData && errorData.status >= 400 && errorData.status <=500 ){
        // Message({
        //     message:errorData.data.message,
        //     type: "error",
        //     duration: 5 * 1000
        //     });
        }else{
            // Message({
            //     message:"连接超时",
            //     type: "error",
            //     duration: 5 * 1000
            //     });
        }
    return Promise.reject(error);
  }
);

export default service;
