import React, {Component} from 'react'
import L from 'react-loadable';
import {
    Spin
} from 'antd';

function MyLoadingComponent({ error, pastDelay }) {
    if (error) {
        return <div>刷新试试！</div>; // 加载错误时的提示模块
    } else if (pastDelay) {
        //加载动画
        // return <div style={{height:'100%',width:"100%",display:"flex",justifyContent:'center',paddingTop:"15%"}}>
        //     <Spin spinning={true} tip="Loading..." />
        // </div>;
        return null;
    } else {
        return null; // 加载时间短于pastDelay（默认200ms）则不显示Loading动画
    }
}
const time=300;

const Loadable = opts =>{
    console.log(opts)
    return  L({
        loading:MyLoadingComponent,
        ...opts,
        delay:time,
    })}

export default Loadable