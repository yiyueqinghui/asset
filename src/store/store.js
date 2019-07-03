//vue 简单的公用数据状态管理，如果复杂的话，必须使用vuex
let Store = {
   data:{
     token:localStorage.getItem('token'),
     baseApi:localStorage.getItem('baseApi'),
     statusList:[
       { text:'闲置', value:'闲置' },
       { text:'在用', value:'在用' },
       { text:'借用',value:'借用'}
     ],
     dictionary:{
       InternetCharge: "网费/月",
       Name: "姓名",
       administrator: "管理人",
       amount: "实付金额",
       amountPerSquareMeter: "职场每㎡金额",
       annualInspection: "年检时间记录",
       annualInspectionDate: "年检日期",
       assetNo: "资产编码",
       availableRegCompanyNo: "可注册公司数量",
       blongOrg: "所属部门",
       branchArea: "职场租赁面积",
       branchCategory: "职场类型",
       branchMemo: "职场备注",
       brand: "品牌",
       brandhAddress: "职场地址",
       cardNo: "卡号",
       category: "资产类型",
       chTrademarkName: "中文名称",
       company: "公司名称",
       conferenceRoomNo: "职场会议室数量",
       config: "配置",
       contractAmount: "合同总金额",
       contractEndDate: "合同终止日期",
       contractStartDate: "合同起始日期",
       currentlyOwnedOrg: "现使用机构",
       contractAttrachment:"合同附件上传",
       depositAmount: "保证金金额",
       electricityCharge: "电费(每度金额)",
       enTrademarkName: "英文名称",
       icpMemo: "ICP备注",
       icpAttachment:"ICP附件上传",
       idCardNo: "身份证号",
       idPhotoCopy:"身份证复印件",
       initialRegDate: "初次申请时间",
       insuranceApplicant: "投保人",
       insured: "被保人",
       insuredAttachment:"被保人附件",
       vehicleLicenseAttachment:"行驶本附件",
       maintenanceAttachment:"车辆保养附件",
       invoice: "发票号码",
       invoiceAmount: "发票金额",
       invoiceCategory: "发票类型",
       invoiceDate: "开票日期",
       invoiceNo: "发票号码",
       invoiceMemo:"发票备注",
       invoicePic:"发票附件",
       keySerials: "钥匙编号",
       km: "公里数",
       lastMaintenance: "最新保养日期",
       nextMaintenance:"预计下次保养期",
       managementLicenseNo: "经营许可证编号",
       memo: "备注",
       model: "规格型号",
       name: "资产名称",
       noOfKeys: "钥匙数量",
       noPlate: "车辆牌照",
       number: "数量",
       org: "所属机构",
       payWay: "支付类型",
       paymentMethod: "支付方式",
       phoneNo: "手机号码",
       propertyFree: "物业费金额/月",
       purchaseDate: "购入/租用时间",
       regDate: "注册日期",
       registeredCompanyNo: "已注册公司名称",
       rentAmount: "租金金额",
       seats: "职场工位数",
       serialNo:"SN号",
       source: "资产来源",
       storedPosition: "存放地点",
       trademarkCategory: "商标分类",
       trademarkMemo:"商标备注",
       trademarkAttachment:"商标附件",
       url: "网址",
       useOrg: "使用部门",
       usePerson: "使用人",
       user: "使用人",
       userPhone: "使用人联系电话",
       vehicleCompany: "",
       vehicleMemo: "备注",
       waterCharge: "水费/立方米",
       websiteName: "网站名称",
       valiDate:"有效期"
     }
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
   }



}


export default Store
