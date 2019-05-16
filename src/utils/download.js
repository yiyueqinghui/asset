import store from '../store/store'
// import path from '@/common/path'

function download(url, name){
    console.log(store.data);

    var xmlRequest = new XMLHttpRequest();
    var base_url = store.data.base_api;   //process.env.BASE_API
    var page_url = base_url + url;
    xmlRequest.open("get", page_url, true);
    xmlRequest.setRequestHeader('token', store.data.token);
    xmlRequest.responseType = 'blob';

    let fileName = name || '导出数据';
    xmlRequest.onreadystatechange = function () {
        if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
            // var name = xmlRequest.getResponseHeader("Content-disposition");
            // console.log(xmlRequest.getAllResponseHeaders());
            // var filename = name.substring(20,name.length);
            var blob = new Blob([xmlRequest.response], {type: 'application/octet-stream'});//text/xls
            var csvUrl = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = csvUrl;
            link.download = fileName + '.xlsx';
            link.click();
        }
    };
    xmlRequest.send();

    // xmlRequest.open("GET", page_url, true);
    // xmlRequest.responseType = "blob";//这里是关键，它指明返回的数据的类型是二进制
    // xmlRequest.onreadystatechange = function(e) {
    //     if (this.readyState == 4 && this.status == 200) {
    //         var name = xmlRequest.getResponseHeader("Content-disposition");
    //         var filename = name.substring(20,name.length);
    //         var response = this.response;
    //         console.log(response);
    //         var csvUrl = window.URL.createObjectURL(blob);
    //         var link = document.createElement('a');
    //         link.href = csvUrl;
    //         link.download = filename;
    //         link.click();
    //     }
    // }
    // xmlRequest.send(null);
}

export default download;
