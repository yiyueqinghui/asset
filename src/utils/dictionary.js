let AppShared = {}
AppShared.ActiveStatus = {
  'ACTIVE' : 1,
  'INACTIVE' : 2
};
AppShared.UserJobStatus = {
  'ON' : 1,
  'DIMISSION' : 2
};
AppShared.DepartmentGroupType = {
  'COMPANY' : 1,
  'DEPARTMENT' : 2
};
AppShared.AssetItemStatus = {
  'IDLE' : 1,
  'USING' : 2,
  'LOAN_OUT' : 3,
  'ALLOT' : 4,
  'MAINTAIN' : 5,
  'CANCEL' : 6,
  'SCRAP' : 7,
  'LEASE_OFF' : 8
};
AppShared.AssetItemFromType = {
  'OWN' : 1,
  'LEASE' : 2
};
AppShared.InvoiceType = {
  'PLAIN' : 1,
  'VAT' : 2
};
AppShared.WorkPlaceType = {
  'OWN' : 1,
  'LEASE' : 2
};
AppShared.WorkPlacePayMode = {
  'PREPAY' : 1,
  'BANK_DEBIT' : 2,
  'COMPANY_TO_COMPANY' : 3
};
AppShared.WorkPlacePayInterval = {
  'YEAR' : 1,
  'SEASON' : 2,
  'MONTH' : 3
};
AppShared.AssetCheckResult = {
  'PRESENT' : 1,
  'ABSENT' : 2
};
AppShared.AssetBorrowStatus = {
  'BORROWING' : 1,
  'BORROWED' : 2,
  'RETURNING' : 3,
  'RETURNED' : 4
};
AppShared.AssetAllotStatus = {
  'ALLOTING' : 1,
  'CONFIRM_IN' : 2
};
AppShared.AssetCancelStatus = {
  'CANCELING' : 1,
  'CANCELED' : 2
};
AppShared.UserGender = {
  'MALE' : 1,
  'FEMALE' : 2,
  'OTHER' : 3
};
AppShared.UserUpdatePassword = {
  'NO' : 1,
  'YES' : 2
};
AppShared.AipOcrType = {
  'IDCARD' : 1,
  'VAT' : 2
};
AppShared.DictName = {
  'DEPARTMENT_GROUP_TYPE' : 1,
  'ASSET_ITEM_STATUS' : 2,
  'ASSET_ITEM_FROM_TYPE' : 3,
  'INVOICE_TYPE' : 4,
  'WORK_PLACE_TYPE' : 5,
  'WORK_PLACE_PAY_MODE' : 6,
  'WORK_PLACE_PAY_INTERVAL' : 7,
  'ASSET_CHECK_RESULT' : 8,
  'ASSET_BORROW_STATUS' : 9,
  'ASSET_ALLOT_STATUS' : 10,
  'ASSET_CANCEL_STATUS' : 11,
  'USER_GENDER' : 12,
  'AIP_OCR_TYPE' : 13
};
AppShared.RESPONSE_CODE = {
  11 : '资产非闲置状态',
  6 : '未登录',
  5 : '未授权',
  18 : '需要修改密码',
  15 : '删除错误',
  10 : '操作无权限',
  2 : '发重错误',
  8 : '发生异常',
  4 : '文件类型错误',
  14 : '参数错误',
  19 : '禁止登录',
  17 : '登录错误',
  3 : '无文件',
  9 : '资源未找到',
  1 : '操作成功',
  16 : '关联错误',
  13 : '状态错误',
  12 : '用户无所属部门或公司',
  7 : '验证失败'
};
AppShared.ACTIVE_STATUS = {
  1 : '激活',
  2 : '禁用'
};
AppShared.USER_JOB_STATUS = {
  2 : '离职',
  1 : '在职'
};
AppShared.DEPARTMENT_GROUP_TYPE = {
  1 : '公司',
  2 : '机构'
};
AppShared.ASSET_ITEM_STATUS = {
  4 : '调拨中',
  6 : '退库',
  1 : '闲置',
  8 : '退租',
  3 : '借用',
  5 : '维修中',
  7 : '报废',
  2 : '在用'
};

AppShared.status = [
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
  }
];

AppShared.ASSET_ITEM_FROM_TYPE = {
  2 : '租赁',
  1 : '自有'
};
AppShared.INVOICE_TYPE = {
  1 : '普通发票',
  2 : '增值税专用发票'
};
AppShared.WORK_PLACE_TYPE = {
  2 : '租赁',
  1 : '自有'
};
AppShared.WORK_PLACE_PAY_MODE = {
  2 : '银行托收',
  3 : '公对公转账',
  1 : '预付'
};
AppShared.WORK_PLACE_PAY_INTERVAL = {
  3 : '月付',
  2 : '季付',
  1 : '年付'
};
AppShared.ASSET_CHECK_RESULT = {
  2 : '不在',
  1 : '存在'
};
AppShared.ASSET_BORROW_STATUS = {
  2 : '已借出',
  1 : '借出中',
  4 : '已归还',
  3 : '归还中'
};
AppShared.ASSET_ALLOT_STATUS = {
  1 : '调拨中',
  2 : '已接收'
};
AppShared.ASSET_CANCEL_STATUS = {
  2 : '已确认',
  1 : '退库中'
};
AppShared.USER_GENDER = {
  2 : '女',
  1 : '男',
  3 : '其它'
};
AppShared.AIP_OCR_TYPE = {
  1 : '身份证',
  2 : '增值税发票'
};
AppShared.DICT_NAME = {
  13 : 'OCR识别类型',
  10 : '调拨状态',
  9 : '借出归还',
  11 : '退库状态',
  8 : '资产盘点',
  3 : '来源',
  2 : '资产状态',
  1 : '部门类型',
  4 : '发票类型',
  12 : '性别',
  7 : '支付类型',
  6 : '支付模式',
  5 : '职场类型'
};

export default AppShared;
