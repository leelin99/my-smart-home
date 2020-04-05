const baseurl = 'http://localhost:3000'
const user = baseurl + "/user"
const room = baseurl + "/room"

const api = {
    LoginApi: user + "/login" ,// 登录接口
    roomlistApi: room + "/roomlist"// 房间列表接口
}
export default api;