import axios from "axios"



export const gettree= () => axios({
    url: "/ims/materialManageDockController.do?getFirAndSecTree",
})

export const getmenu=(data)=>axios({
    url:"/ims/materialManageDockController.do?getThrNodeById&id="+data,
})
export const getmain=(num,id,page,rows,value)=>axios({
    url:"/ims/designSelectController.do?getBasisFormationByType&condition="+num+"&id="+id+"&page="+page+"&rows="+rows+"&query="+value,
})

// 获取筛选框数据
export const getfilterdata=(data,num,name)=>axios({
    url:"/ims/designSelectController.do?getPerformanceSearchBoxbyId&id="+data+"&num="+num+"&name="+name,
})
// 刷新筛选框
export const getupdatefilterbox=(data,id,name)=>axios({
    url:"/ims/designSelectController.do?getPerformanceSearchBoxbyId&type=update&query="+data+"&id="+id+"&name="+name,
})
// 获取详细信息

export const getdetail=(id)=>axios({
    url:"/ims/designSelectController.do?getBasisFormationById&id="+id,
})
export const getdetail2=(id)=>axios({
    url:"/ims/designSelectController.do?getPerformanceById&id="+id,
})
// 对比数据的接口
export const getvsdata=(ids)=>axios({
    url:"/ims/designSelectController.do?getCompareDataById&ids="+ids,
})
export const getvsdatacanshu=(ids)=>axios({
    url:"/ims/designSelectController.do?getComparePerferenceById&ids="+ids,
})
// 全局搜索

export const allsearch=(value,currentPage,pagesize,cur)=>axios({
    url:"/ims/materialManageDockController.do?search&keyword="+value+"&start="+currentPage+"&length="+pagesize+"&condition="+cur,
})
