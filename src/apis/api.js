const baseurl = 'http://www.wazy999.cn:1082'
const user = baseurl + "/user"
const room = baseurl + "/room"
const login = baseurl + "/login"

const api = {
    LoginApi: user + "/login" ,// 登录接口
    roomlistApi: room + "/roomlist",// 房间列表接口
    equipApi:room + "/equipmentlist",//设备信息表
    uploadApi:room + '/upload',//图片上传
    delRoomApi:room + '/delRoom',//删除房间
    airConditionApi:room + '/airCondition',//空调遥控器
    doorApi:room + '/door',//门锁遥控器
    soundApi:room + '/sound',//音箱遥控器
    heaterApi:room + '/heater',//热水器遥控器
    lampApi:room + '/lamp',//电灯遥控器
    songsApi:room + '/songs',//歌曲曲目
    loginApi:login + '/login',//登录
}
export default api;