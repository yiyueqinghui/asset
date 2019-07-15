let dictionary = {
    status:[
      {
        value:'1',
        label:'闲置'
      },
      {
        value:'2',
        label:'在用'
      },
      {
        value:'3',
        label:'借用'
      },
      {
        value:'4',
        label:'调拨中'
      },
      {
        value:'5',
        label:'维修中'
      },
      {
        value:'6',
        label:'退库'
      },
      {
        value:'7',
        label:'报废'
      },
      {
        value:'8',
        label:'退租'
      }],
    checkStatus:[
    {
      value:'1',
      label:'存在'
    },
    {
      value:'2',
      label:'不在'
    }
  ],
    backStatus:[
    {
      value:'1',
      label:'退库中'
    },
    {
      value:'2',
      label:'已确认'
    },
  ],
    borrowStatus:[
    {
      value:'1',
      label:'借出中'
    },
    {
      value:'2',
      label:'已借出'
    },
    {
      value:'3',
      label:'归还中'
    },
    {
      value:'4',
      label:'已归还'
    }
  ],
    allotStatus:[
    {
      value:'1',
      label:'调拨中'
    },
    {
      value:'2',
      label:'已接收'
    }
  ],
    officeType:[
    {"value": 1, "label": "自有"},
    {"value": 2, "label": "租赁"}
  ],
    payType:[
    {"value": 1, "label": "预付"},
    {"value": 2, "label": "银行托收"},
    {"value": 3, "label": "公对公转账"}
  ],
    payWay:[{"value": 1, "label": "年付"},
    {"value": 2, "label": "季付"},
    {"value": 3, "label": "月付"}
  ],
    invoiceTypeList: [
    {"value": 1, "label": "普通发票"},
    {"value": 2, "label": "增值税专用发票"}
  ],
    genderList:[
    {
      "value": 1,
      "label": "男"
    },
    {
      "value": 2,
      "label": "女"
    }
  ],
    jobStatusList:[
    {
      "value": 1,
      "label": "在职"
    },
    {
      "value": 2,
      "label": "离职"
    }
  ],
    activeStatusList:[
    {
      "value": 1,
      "label": "激活"
    },
    {
      "value": 2,
      "label": "未激活"
    }
  ]
}

export default dictionary;
