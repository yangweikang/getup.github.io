#格式规范

```bash
   请保持数据返回结构，结构中的值请保持驼峰，结构为统一结构，如有特殊原因修改请告知,基本机构如下：
```
```json
    {
        "isSuccess": true,//请求状态
        "message": "请求成功",//请求消息
        "code":200,//请求状态码
        "data": {//返回数据
            
        }
    }
```
##code
```bash
   1. code:200成功；404请求失败；500服务器错误； 401登入过期或失败； 403资源不可用，权限校验失败；
   2. 403时isSuccess为false
```

##isSuccess
```bash
    1.只有在查询错误时isSuccess为false，注意：如查询条目为0条isSuccess为true
    2.isSuccess为false，原则上message必须有值；
```

##message
```bash
    message不存在是请保持为nudefind，不得赋值为空；
```

##data
```bash
    所有后端返回数据一律push到data中，请保持结构风格，除数据库字段为统一大写其他请保证驼峰，
```

##一般数据交互
```bash
    统一保持键值对形式，键请使用有意义的名称，禁止使用如item1,item2等；具体如下
```
```json
    {
        "data": {
            "isSuccess": true,
            "message": "请求成功",
            "code":200,
            "data": {
                "menu": 1,
                "menuName": "人事部"
            }
        }
    }
```

## 分页
```bash
    统一使用 pageNo 当前页，pageSize 分页条数，total总页数，list为表数据；所见即所得即前端请求也强制为该规则,具体如下：
```
```json
    {
        "isSuccess": true,
        "message": "请求成功",
        "code":200,
        "data": {
            "pageNo": 1,
            "pageSize": 20,
            "total": 100,
            "list": [{
                "parentName": "张三",
                "createTime": 1504581919880,
                "updateTime": 1504581919880,
                "process": 12,
                "approvalNo": 41587745,
                "currentUser": 54515445,
                "currentUserName": "李四",
                "status": 1
            }]
        }
    }
```


##树型菜单
```bash
   统一id为树唯一值（主键），label为节点名称，children为子节点；具体如下：
```
```json
    {
        "tree": {
            "isSuccess": true,
            "message": "请求成功",
            "code":"200",
            "data": [{
                "id": 1,
                "label": "一级 1",
                "children": [{
                    "id": 4,
                    "label": "二级 1-1",
                    "children": [{
                        "id": 9,
                        "label": "三级 1-1-1"
                    }, {
                        "id": 10,
                        "label": "三级 1-1-2"
                    }]
                }]
            }, {
                "id": 2,
                "label": "一级 2",
                "children": [{
                    "id": 5,
                    "label": "二级 2-1"
                }, {
                    "id": 6,
                    "label": "二级 2-2"
                }]
            }, {
                "id": 3,
                "label": "一级 3",
                "children": [{
                    "id": 7,
                    "label": "二级 3-1"
                }, {
                    "id": 8,
                    "label": "二级 3-2"
                }]
            }]
        }
    }
```