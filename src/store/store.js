//vue 简单的公用数据状态管理，如果复杂的话，必须使用vuex
import Api from '../api/index'

let Store = {
   data:{
     token:localStorage.getItem('token'),
     baseApi:localStorage.getItem('baseApi'),
     statusList:[
       { text:'闲置', value:'闲置' },
       { text:'在用', value:'在用' },
       { text:'借用',value:'借用'}
     ],
     assetTypeList:[],
     departList:[],
     userList:[],
     invoiceList:[]



   },
   // 录入时间
   formatDate:()=>{
      let date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth() + 1,
          d = date.getDate(),
          h = date.getHours(),
          min = date.getMinutes();
      function formatNum (num){
        num = num >= 10?num:('0'+num);
        return num;
      }
      return y+'-'+formatNum(m)+'-'+formatNum(d)+' '+formatNum(h)+':'+formatNum(min);
   },
   //录入人信息
   editorInfo:{
     name:'cj',
     blongOrg:'佳禾集团',
     blongDep:'技术信息部',
   },
   toDx:function(n) {   //阿拉伯数字转换函数
    switch (n) {
      case "0":
        return "零";
      case "1":
        return "壹";
      case "2":
        return "贰";
      case "3":
        return "叁";
      case "4":
        return "肆";
      case "5":
        return "伍";
      case "6":
        return "陆";
      case "7":
        return "柒";
      case "8":
        return "捌";
      case "9":
        return "玖";
    }
  },
   unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
   // 转换算法主函数
   NumberToChinese:function(m){
    m *= 100;
    m += "";
    var length = m.length;

    var result = "";
    for (var i = 0; i < length; i++) {
      if (i == 2) {
        result = "元" + result;
      } else if (i == 6) {
        result = "万" + result;
      }
      if (m.charAt(length - i - 1) == 0) {
        if (i != 0 && i != 1) {
          if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
            result = "零" + result;
          }
        }
        continue;
      }
      result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
    }
    result += result.charAt(result.length - 1) == '元' ? "整" : "";

    return result;
  },
   //重置清空数据
   resetForm(data){
     for(var i in data){
       data[i] = '';
     }
     return data;
   },
    //获取资产类型下拉列表选项
   getAssetTypeList(){
     return new Promise((success,fail)=>{
       if(Store.data.assetTypeList.length>0){
         success(Store.data.assetTypeList);
       }else{
         Api.Asset.asset_type('GET', {}).then(res => {
           let _departList = res.data.tree;
           let result = Store.transData2Tree(_departList);
           Store.data.assetTypeList = result;
           success(Store.data.assetTypeList);
         })
       }
     })
   },
   transData2Tree(list){
      let retList = [];
      list.forEach((item)=>{
        let node = {};
        node.id = item.id;
        node.label = item.name;
        let children = item.children;
        if(typeof children != "undefined" && children.length>0){
          Store.getChildData(node, children);
        }
        retList.push(node);
      })
      return retList;
   },
   getChildData(node, list) {
      let retList = [];
      list.forEach((item)=>{
        let node = {};
        node.id = item.id;
        node.label = item.name;
        let children = item.children;
        if(typeof children != "undefined" && children.length>0){
          Store.getChildData(node, children);
        }
        retList.push(node);
      })
      node.children = retList;
   },
   //获取公司架构下拉列表
   getDepartmentList(){
     return new Promise((success,fail)=>{
       if(Store.data.departList.length>0){
         success(Store.data.departList);
       }else{
        return Api.Asset.department('GET',{}).then(res=>{
           let _departList = res.data.tree;
           let result = Store.transData2Tree(_departList);
           Store.data.departList = result;
           success(Store.data.departList);
         })

       }
     })
   },
   //获取员工下拉列表
   getUserList() {
     function trasfer2ViewListofUser(list){
       let retList = [];
       list.forEach((item)=>{
         let node = {};
         node.value = item.id;
         node.label = item.name;
         retList.push(node);
       })
       return retList;
     }

     return new Promise((success,fail)=>{
       if(Store.data.userList.length>0){
         success(Store.data.userList);
       }else{
         Api.Asset.user('GET', {}).then(res => {
           let _departList = res.data;
           Store.data.userList = trasfer2ViewListofUser(_departList);
           success(Store.data.userList);
         })
       }
     })



  },
   //获取发票下拉列表
   getInvoiceList() {
     function trasfer2ViewListofVoice(list){
       let retList = [];
       list.forEach((item)=>{
         let node = {};
         node.value = item.id;
         node.label = item.inv_number;
         retList.push(node);
       })
       return retList;
     }

     return new Promise((success,fail)=>{
       if(Store.data.invoiceList.length>0){
         success(Store.data.invoiceList);
       }else{
         Api.Asset.invoice('GET', {}).then(res => {
           let _departList = res.data;
           Store.data.invoiceList = trasfer2ViewListofVoice(_departList);
           success(Store.data.invoiceList);
         })
       }
     })
   },



}


export default Store
