import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyRoute from "./routes/routeindex"
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
    <MyRoute />,
    document.getElementById('root'));
registerServiceWorker();
//  http://47.110.33.82:8200安徽巢湖服务器
//  中山爱卫服务器http://47.110.33.82:8100
