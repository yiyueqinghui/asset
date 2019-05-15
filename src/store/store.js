//vue 简单的公用数据状态管理，如果复杂的话，必须使用vuex
let Store = {
   // 录入时间
   formatDate:()=>{
      let date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth(),
          d = date.getDate(),
          h = date.getHours(),
          min = date.getMinutes();
      function formatNum (num){
        num = num >= 10?num:('0'+num);
        return num;
      }
      return y+'-'+formatNum(m)+'-'+formatNum(d)+' '+formatNum(h)+':'+formatNum(min);
   },
   // 录入人信息
   editorInfo:{
     name:'cj',
     blongOrg:'佳禾集团',
     blongDep:'技术信息部',
   }
}


export default Store
