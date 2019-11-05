var obj = {}
var name
Object.defineProperty(obj, "data", {
  //获取值
  get:function () {
    return name
  },
  //设置值
  set:function (val) {
    name = val
    console.log(val)
  }
})