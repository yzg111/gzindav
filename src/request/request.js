import axios from "axios";

axios.defaults.timeout = 500000; //配置axios请求的全局响应时间
// axios.defaults.baseURL="http://47.110.33.82:8100";
axios.defaults.headers.common["access-token"] = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3ODQ1ODljOC04MmEzLTRiZWItYWI2Yy1lY2FlMDA2MmU5MmYiLCJzdWIiOiIwNzBjeHlkdWVucHNwbjBoNXRmZ2l5IiwiaWF0IjoxNTgxNjgxOTk1LCJpc3MiOiJHRE1QIiwibmFtZSI6IuabvueBvyIsInRlbmFudElkIjoiZGVmYXVsdCIsInR5cGUiOiIwIiwicmVmcmVzaFRva2VuIjoiODUyMDM2OGItM2U1Yy00NDYwLTgyNmQtZjViYjI2Njc0MTYzIn0.IW0ZHtvCAW1W_m5eGf-u7qbrS5cJYbLoNDojNpICLhQ";//设置全局头里面的相关信息
axios.defaults.headers.common["Accept"] = "application/json;charset=UTF-8";//设置全局头里面的相关信息

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    //发送请求之前改变参数
    if (localStorage.CONF_ACCESS_TOKEN) {
        console.log(localStorage.CONF_ACCESS_TOKEN)
        config.headers["access-token"] = "Bearer " + localStorage.CONF_ACCESS_TOKEN;
    }
    if (config.method === 'post') {
        // config.data = qs.stringify(config.data);
        console.log("post请求传递参数")
        //在请求参数里面添加相应的默认数据
        console.log(config.data)
        if (config.data["clsName"]) {
            config.data["pageNo"] = 0;
            config.data["pageSize"] = 1000000;
        }
    }
    if (config.method === 'get') {
        // config.data = qs.stringify(config.data);
        console.log("get请求传递参数")
    }
    console.log(config)
    return config;

}, (error) => {
    return Promise.reject(error);
});

export function panTime() {
    let flag = false;
    var date = '2020-01-01 17:59:00.0';
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    var timestamp = new Date(date).getTime();
    var todaytimestamp = parseInt(new Date().getTime());
    if (todaytimestamp > timestamp) {
        flag = true;
    }
    return flag;
}

//获取顶端父级数据信息
export const getparentcp = params => {
    return axios.get('/cp/takecps', {params: params}).then();
};
//插入父级字段内容数据
export const addcpiddata = params => {
    return axios.post('/cp/incpdata', params).then();
};
//按CI的属性和值查询CI数据接口
export const getCibyAttributes = (clsName, queryData) => {
    let params = {};
    params.attributes = convertData(queryData);
    params.clsName = clsName;
    return axios.post('/cms/v1/ts/ci/byAttributes', params).then();
};
//可以根据排序查找数据
export const getCiByAttr = (clsName, queryData, sortFields) => {
    let params = {};
    params.attributes = convertData(queryData);
    params.clsName = clsName;
    params.sortFields = sortFields;
    return axios.post('/cms/v1/ts/ci/byAttributes', params).then();
}

//按CI的属性和值查询CI数据接口
export const getCibyAttributesRtData = (clsName, queryData, sortFields, pageNo, pageSize) => {
    let params = {};
    params.attributes = convertData(queryData);
    params.clsName = clsName;
    if (pageNo != null) {
        params.pageNo = pageNo;
    }
    if (pageSize != null) {
        params.pageSize = pageSize;
    }
    params.sortFields = sortFields;
    return axios.post('/cms/v1/ts/ci/byAttributes', params).then(data => {
        console.log(data)
        let results = data.data.content.results.map(
            item => {
                let id = item['id']
                let ci = item['ciClassID']
                item = item.dataFieldMap
                item['ciClassID'] = ci
                item['id'] = id
                return item;
            });
        // results.reverse();
        return Promise.resolve({total: data.data.content.total, dataSource: results})
    })

    // return axios.post('/cms/v1/ts/ci/byAttributes', params).then();
};

//按CI的属性和值查询CI数据接口
export const getCibyAttributesAndUnionRtData = (clsName, queryData,unionquery, sortFields, pageNo, pageSize) => {
    let params = {};
    params.attributes = convertData(queryData);
    params.clsName = clsName;
    if (pageNo != null) {
        params.pageNo = pageNo;
    }
    if (pageSize != null) {
        params.pageSize = pageSize;
    }
    if (unionquery!=null){
        params.unionAttrs=convertData(unionquery);
    }
    params.sortFields = sortFields;
    return axios.post('/cms/v1/ts/ci/byAttributes', params).then(data => {
        console.log(data)
        let results = data.data.content.results.map(
            item => {
                let id = item['id']
                let ci = item['ciClassID']
                item = item.dataFieldMap
                item['ciClassID'] = ci
                item['id'] = id
                return item;
            });
        // results.reverse();
        return Promise.resolve({total: data.data.content.total, dataSource: results})
    })

    // return axios.post('/cms/v1/ts/ci/byAttributes', params).then();
};

//增加CI类数据
export async function addCi(clsName, addData) {
    let res = await getClsByName(clsName);
    console.log(res)
    let params = {};
    if (res) {
        let content = res.data.content;
        let id = content["id"];
        params.dataFieldMap = addData;
        // params.id = id;
        params.source = "外部接口";
        params.ciClassID = id;
        params.clsName = clsName;
        params.parentID = content["parentClassID"]
    } else {
        return;
    }
    return axios.post('/cms/v1/ci/add?domain=egfbank', params).then();
};

//获取当前登录人员信息
export async function getLoginInfo() {
    if (localStorage.CONF_ACCESS_TOKEN) {
        let token = "Bearer " + localStorage.CONF_ACCESS_TOKEN;
        axios.defaults.headers.common["access-token"] = "Bearer " + token;//设置全局头里面的相关信息
    }
    return axios.get('/cms/v1/sys/account/getLoginAccout').then();
}

//通过CI类的名称查询CI类相关属性
export const getClsByName = (clsName) => {
    return axios.get('/cms/v1/ts/ciclass/getByName/' + clsName + '?domain=egfbank').then();
};

//更新CI类信息
export async function updateCi(clsName, queryData, updateData) {
    let params = {};
    let response = await getCibyAttributes(clsName, queryData);
    if (response) {
        let content = response.data.content;
        let results = content["results"];
        if (results.length > 0) {
            params.dataFieldMap = updateData;
            params.id = results[0]["id"];
            params.ciClassID = results[0]["ciClassID"];
        }
    } else {
        return;
    }
    return axios.post('/cms/v1/ci/update?domain=egfbank', params).then();
};

//更新CI类信息
export async function updateCiById(id, ciclassid, updateData) {
    let params = {};
    params.dataFieldMap = updateData;
    params.id = id;
    params.ciClassID = ciclassid;
    return axios.post('/cms/v1/ci/update?domain=egfbank', params).then();
};

//更新CI类信息
export async function updateCiByIdList(dataList, updateData) {
    let pms=[]
    dataList.map(item=>{
        let params = {};
        params["dataFieldMap"] = updateData;
        params["id"] = item.id;
        params["ciClassID"] = item.ciClassID;
        pms.push(params)
    })
    console.log("组装好的数据",pms.toString())
    return axios.post('/cms/v1/ci/updates?type=true', pms).then();
};

export function packFilesDownLoad(){
    let params = {};
    return axios.post('/cms/v1/files/downloadPack',params).then();
}


//组织添加CI数据的参数
export async function addparam(clsName, addData) {
    let res = await getClsByName(clsName);
    console.log(res)
    if (!res) {
        return res;
    } else {
        let content = res.data.content;
        let id = content["id"];
        let body = {};
        body.dataFieldMap = addData;
        body.id = id;
        body.source = "外部接口";
        return body;
    }
}

//更新CI数据的参数
export async function updateCiparam(clsName, queryData, updateData) {
    let response = await getCibyAttributes(clsName, queryData);
    if (!response) {
        return response;
    }
    let content = response.data.content;
    let results = content["results"];
    if (results.length > 0) {
        let body = {};
        body.dataFieldMap = updateData;
        body.id = results[0]["id"];
        body.ciClassID = results[0]["ciClassID"];
        return body;
    } else {
        return response;
    }
}

export const delCi = (ids) => {
    return axios.post('/cms/v1/ci/del', ids).then();
}
export const getCiByID = id => {
    return axios.get("/cms/v1/ts/ci/getByID/" + id + "?domain=egfbank").then();
}

export const getCiByIDData = id => {
    return axios.get("/cms/v1/ts/ci/getByID/" + id + "?domain=egfbank").then(data => {
        let item = data.data.content;
        let results = item.dataFieldMap;
        let id = item['id']
        let ci = item['ciClassID']
        results = item.dataFieldMap
        results['ciClassID'] = ci
        results['id'] = id
        // results.reverse();
        return Promise.resolve({dataSource: results})
    });
}

export const getCiByIDs = ids => {
    return axios.post("/cms/v1/ts/ci/getByIDs/", ids).then();
}
export const getAccountByID = id => {
    return axios.get("cms/v1/sys/account/get/" + id).then();
}
export const execScript = (ScirptCode, args) => {
    return axios.post("/cms/v1/module/business_script/" + ScirptCode + "/run", args).then();
}
export const execScriptdownloadFile = (ScirptCode, args) => {
    return axios.post("/cms/v1/module/business_script/" + ScirptCode + "/run", args,{responseType:'blob'}).then();
}
export const execScriptAndDownload = (ScirptCode, args) => {
    return axios.post("/cms/v1/module/business_script/" + ScirptCode + "/runWithDownload", args).then();
}
export const convertData = (queryData) => {
    let list = [];
    for (let name in queryData) {
        let map = {};
        if (name.indexOf("operator") == -1) {
            console.log(name)
            map.name = name;
            map.value = queryData[name];
            //为支持模糊查询而编写
            //operator  状态值，标示这个是的比较方式 -1:不等于，0:等于，
            // 1:大于，2:大于等于，3:小于，4:小于等于，5:以,|;分割，做包含处理，
            // "6:以,分割做不包含处理，7:做正则匹配，默认正则匹配
            if (queryData[name + "operator"]) {
                map.operator = queryData[name + "operator"];
            }
            list.push(map);
        }
    }
    console.log(list)
    return list;
}
//direction大于等于0是降序，小于0是升序
export const sortFields = (attribute, direction) => {
    let sorts = [];
    let sort = {};
    sort.attribute = attribute;
    sort.direction = direction;
    sorts.push(sort);
    return sorts;
}





