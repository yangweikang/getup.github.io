## pdf 直接下载、预览

### 背景
```bash
    浏览器始终在点击PDF文件都会成为预览模式导致无法直接下载! Blob？太过繁琐，兼容性也存在问题，于是乎简单实现如下：
```

### 下载
```html
 <a download style="display:none" id="download">下载</a>
```

```js
//FilePath：pdfpdf文件路径
document.getElementById("download").href = FilePath;
document.getElementById("download").click();
```

### 预览
```js
//FilePath：pdf文件路径
 window.open(FilePath);
```

### 附上Blob下载方式
```js
//发起请求
export function download(url, params) {
    return axios({method: 'get',url,data: params, responseType: 'blob'});
}
export function downFile ({fileName='eg.xls',data}) {
    if (!data) {
        return
    } 
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download',fileName)
    document.body.appendChild(link)
    link.click()
}
```