import React, {Component} from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import history from "../components/common/history"
import Loadable from './Loadable';
import NoMatch from "../components/common/404"
import Home from "../components/common/home"
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {Layout, LocaleProvider} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import FenguandeNetworkRight from "../components/ganzhou/FenguandeLeader/FenguandeNetworkRight";

moment.locale('zh-cn');


export default class MyRoute extends Component {
    render() {
        return (
            <Router history={history}>
                <LocaleProvider locale={zh_CN}>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/mergehead" component={FenguandeNetworkRight} name={"我分管的工作-督查室分管领导"}></Route>

                        <Route component={NoMatch}/>
                    </Switch>
                </LocaleProvider>
            </Router>
        );
    }
}



