

//获取url里面的参数
export const getQueryString = function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.href.substr(window.location.href.indexOf('?') + 1).match(reg);
    if (r !== null) return decodeURI(r[2]);
    return null;
};
//获取url里面的参数
export const getQSearchString = function (name, search) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = search.substr(1).match(reg);
    if (r !== null) return decodeURI(r[2]);
    return null;
};
//替换数组的对应项
export const replace = (arr, item, place) => {//arr 数组,item 数组其中一项, place 替换项
    arr.map(function (ar) {
        if (ar.id === item) {
            arr.splice(arr.indexOf(ar), 1, place)
        }
    });
    return arr;
};

export const itemdelplace = (arr, item) => {//删除数组中的某一项
    arr.map(function (ar) {
        if (ar === item) {
            arr.splice(arr.indexOf(ar), 1)
        }
    });
    return arr;
};

export const itemisexist = (arr, item) => {//判断数组中的是否存在某一项
    let fg = false;
    if(arr instanceof Array){
        arr.map(function (ar) {
            if (ar == item) {
                console.log("数据存在")
                fg = true;
            }
        });
    }
    return fg;
};

export const itemisexistbykey = (arr,key, item) => {//判断数组中的是否存在某一项
    let fg = false;
    if(arr instanceof Array){
        arr.map(function (ar) {
            if (ar[key] == item) {
                console.log("数据存在")
                fg = true;
            }
        });
    }
    return fg;
};



//判断对象里面是否存在某个数据
export const itemisexistobj = (obj, value) => {
    // console.log(obj)
    let flag = false;
    for (let item in obj) {
        console.log(obj[item])
        if (obj[item] && typeof(obj[item]) == 'string' && obj[item].indexOf(value) > -1) {
            flag = true;
            // console.log(item)
            break;
        }
    }
    // console.log(flag)
    return flag;
}

//判断数组里面是否存在某个数据
export const arrisexiststr = (arr, value) => {
    // console.log(obj)
    let flag = false;
    if(arr){
        if (arr.indexOf(value)>-1){
            flag=true;
        }
    }
    // console.log(flag)
    return flag;
}

export function getTimedata(val) {
    if (val != null) {
        var date = new Date(val);
        return date.getFullYear() + "/" + (date.getMonth() + 1) + '/' +
            date.getDate();
    }
}

export function getAllTimedata(val) {
    if (val != null) {
        var date = new Date(val);
        return date.getFullYear() + "/" + (date.getMonth() + 1) + '/' +
            date.getDate()+" "+(date.getHours().toString().length == 2 ? date.getHours() : ('0' + date.getHours()))
            +":"+(date.getMinutes().toString().length == 2 ? date.getMinutes() : ('0' + date.getMinutes()))
            +":"+(date.getSeconds().toString().length == 2 ? date.getSeconds() : ('0' + date.getSeconds()));
    }
}

export function getNowTime() {
    var date = new Date();
    return date.getFullYear() + "/" + (date.getMonth() + 1) + '/' +
        date.getDate();

}

export function getNowYear() {
    var date = new Date();
    return date.getFullYear();

}


let sz = [
    {
        name: "由市爱卫办对（各镇区）国家卫生城市及国家卫生镇环境卫生管理情况进行评分",
        value: 36
    }, {
        name: "由市市场监督管理局对（各镇区）国家卫生城市及国家卫生镇食品安全情况进行评分",
        value: 20
    }, {
        name: "由市卫生监督所对（各镇区）国家卫生城市及国家卫生镇公共卫生情况进行评分",
        value: 16
    }
    , {
        name: "组织本辖区内社区（村）和机关、企事业单位每月开展4次环境卫生大扫除（每周五下午进行1次环境卫生大扫除）",
        value: 12
    }, {
        name: "每月开展1次以清除卫生死角和“四害”孳生地为主的统一行动（每个月第二周星期二部署开展）并建立每月工作台帐",
        value: 10
    }, {
        name: "根据省爱国卫生运动委员会的统一部署，开展全市“爱国卫生月”和“爱国卫生突击周”活动（每年4月份）",
        value: 6
    }
]

export function getValue(name) {
    let value = 0;
    sz.map(function (item) {
        if (item.name == name) {
            value = item.value;
        }
    })
    return value
}

export function gettotal(mon) {
    if (mon == "4月") {
        return 100;
    } else {
        return 94;
    }
}

export function TanYuanJian(code, params,label,func) {
    // 'code': 'gYvQSzm66sDjPV0If84V_046605088',//这个是页面原件的唯一标识
    //下面这个是页面原件需要接受的参数
    // 0a3a9e5f-0b04-4b64-b114-2491b4a15288   年份
    // 26166ed1-255c-461c-bac1-68bea33afa2f 月份
    // 8139ba47-1836-4bf0-bc15-f6549cc33236  办理批次
    //{name:value,name:value}
    // 'params': {
    //     '26166ed1-255c-461c-bac1-68bea33afa2f': '2月'
    //         , "0a3a9e5f-0b04-4b64-b114-2491b4a15288": "2019年"
    //         , "8139ba47-1836-4bf0-bc15-f6549cc33236": "第一批"
    // }
    if (window.parent && window.parent.$gdmp$ && window.parent.$gdmp$.handlePageElement) {
        console.log('window.$gdmp$.handleElement', window.parent.$gdmp$.handlePageElement);

        window.parent.$gdmp$.handlePageElement({//page
            'code': code,
            'params': params,
            "label": label,
            "onCancel": func
        });
    }
    // if (window.parent && window.parent.$gdmp$ && window.parent.$gdmp$.handlePageElement) {
    //     console.log('window.$gdmp$.handleElement', window.parent.$gdmp$.handlePageElement);
    //     // 0a3a9e5f-0b04-4b64-b114-2491b4a15288   年份
    //     // 26166ed1-255c-461c-bac1-68bea33afa2f 月份
    //     // 8139ba47-1836-4bf0-bc15-f6549cc33236  办理批次
    //     window.parent.$gdmp$.handlePageElement({//page
    //         'code': 'gYvQSzm66sDjPV0If84V_046605088',
    //         'params': {
    //             '26166ed1-255c-461c-bac1-68bea33afa2f': '2月'
    //             , "0a3a9e5f-0b04-4b64-b114-2491b4a15288": "2019年"
    //             , "8139ba47-1836-4bf0-bc15-f6549cc33236": "第一批"
    //         }
    //     });
    // }
}

//跳个性化页面
// 'url':Hurl+url
// 'url':'/custom-page/pudong/details.html?name=1&age=5d440-d4d540c-5c204eb-4f41e'
export function TanPage(url, label, func) {
    if (window.parent && window.parent.$gdmp$ && window.parent.$gdmp$.handleExtendPageElement) {
        console.log(window.parent.$gdmp$.handleExtendPageElement)
        window.parent.$gdmp$.handleExtendPageElement({
            'url': url,
            "label": label,
            "onCancel": func
        });
    }
}

//跳菜单
export function Tomenu(id) {
    if (window.parent && window.parent.func) {
        return window.parent.func.switchPageMenu(id)
    }
}

//字符串转base64
export function encode(str) {
    // 对字符串进行编码
    // var encode = encodeURI(str);
    // 对编码的字符串转化base64
    var base64 = window.btoa(encode);
    return base64;
}

// base64转字符串
export function decode(base64) {
    // 对base64转编码
    var decode = atob(base64);
    // 编码转字符串
    var str = decodeURI(decode);
    return str;
}


export const downloadDoc = function(content, filename) {
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 自动触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};

export function word2number(w){
    var e = "零一二三四五六七八九";
    var ew = ["十","百","千"];
    var ej = ["万","亿"];
    var rss = "^(["+e+ew.join("")+"]+"+ej[1]+")?(["+e+ew.join("")+"]+"+ej[0]+")?(["+e+ew.join("")+"]+)?$";
    //     ^([零一二三四五六七八九十百千]+亿)?([零一二三四五六七八九十百千]+万)?([零一二三四五六七八九十百千]+)?$
    var arr = new RegExp(rss).exec(w);
    function foh(str){
        str = new String(str);
        var a=0;
        if(str.indexOf(ew[0])==0)a=10;
        str=str.replace(new RegExp(e.charAt(0),"g"),"");
        if(new RegExp("(["+e+"])$").test(str))
            a+=e.indexOf(RegExp.$1);
        if(new RegExp("(["+e+"])"+ew[0]).test(str))
            a+=e.indexOf(RegExp.$1)*10;
        if(new RegExp("(["+e+"])"+ew[1]).test(str))
            a+=e.indexOf(RegExp.$1)*100;
        if(new RegExp("(["+e+"])"+ew[2]).test(str))
            a+=e.indexOf(RegExp.$1)*1000;
        return a;
    }
    return foh(arr[1])*100000000+foh(arr[2])*10000+foh(arr[3]);
}


export function GetParentPageData() {
    if(window.parent.$gdmp$){
        return window.parent.$gdmp$.getWindowPageParamsFunc();
    }
    return {};
}

export function deepCopy(obj) {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                result[key] = deepCopy(obj[key]);   // 递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

//从小到大排序
export const arrMapKeySort=(arr,key)=>{
    arr.sort(function(a,b){
        if(a[key]<b[key]){
            return -1;
        }
        if(a[key]>b[key]){
            return 1;
        }
        // a[key]-b[key]
        return 0;
    })
    return arr;
}




