import React, {Component} from "react"
import {
    Layout, LocaleProvider, Card, Row, Col, Radio,
    Input, Pagination, Button, notification, Tabs, Select, Icon, Table, Tree, Popover
} from 'antd';
import "./FenGuandeLeader.css"
import setting from "../../../Images/ganzhou/setting.png"
import settingblack from "../../../Images/ganzhou/settingblack.png"
import {getNowYear, itemisexist} from "../../../comfunction/ComFun";
import {getCibyAttributes} from "../../../request/request";
import ChooseDcModal from "./ChooseDcModal";


const {TabPane} = Tabs;
const {Option} = Select;
const {Search} = Input;
const {TreeNode, DirectoryTree} = Tree;

const data = [];
export default class FenguandeNetworkRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upordown: false,
            visible: false,
            visibledone: false,
            yearvalue: getNowYear() + "年",
            groupsvalue: "",
            deptsvalue: "",
            statesvalue: "",
            tabledata: [{"分组": 1, "部门": "2", "状态": "发布"}, {"分组": 1, "部门": "2", "状态": "未发布"}],
            dcisdisable: true,
            fbisdisable: true
        }
    }

    componentWillMount = () => {
        //默认加载当前年份的数据
        console.log("当前年份", getNowYear() + "年")
        getCibyAttributes("成绩表", {"年份": getNowYear() + "年"}).then(data => {
            console.log("获取到的数据", data)
            let content = data.data.content;
            let dt = [];
            if (content) {
                let results = content.results;
                if (results) {
                    results.map(item => {
                        dt.push(item.dataFieldMap);
                    })
                    // this.setState({
                    //     tabledata:dt
                    // })
                }
            }
        })
        //加载表头，加载表头之后再把loading放开

    }

    updownClick = () => {
        const {upordown} = this.state
        if (upordown) {
            this.setState({
                upordown: false
            })
        } else {
            this.setState({
                upordown: true
            })
        }
    }

    cpClick = () => {
        //呈批记录按钮点击事件
        this.setState({visible: true})
    }
    getpage = (page, pageSize) => {
        console.log("page", page)

    }
    onShowSizeChange = (current, pageSize) => {
    }

    getTablePagination = (data, updown) => {
        return {
            pageSize: 15,
            total: data.length,
            onChange: this.getpage,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            showQuickJumper: true,
            pageSizeOptions: ["1", "10", "15", "20", "30", "40"],
            hideOnSinglePage: false
        }
    }

    onCancel=()=>{
        this.setState({
            visible:false
        })
    }

    getYearOption = () => {
        const {tabledata} = this.state;
        let ary = [];
        tabledata.map(item => {
            if (item.年份) {
                if (!itemisexist(ary, item.年份)) {
                    ary.push(item.年份)
                }
            }
        })
        //将年份排序
        ary = ary.sort(function (a, b) {
            let a1 = parseInt(a.substring(0, a.length - 1));
            let b1 = parseInt(b.substring(0, b.length - 1));
            if (a1 < b1) {
                return -1;
            }
            if (a1 > b1) {
                return 1;
            }
            // a[key]-b[key]
            return 0;
        })
        console.log(ary)
        return ary.map(i => {
            return <Option value={i}>{i}</Option>
        })
    }

    YearChange = (value) => {
        console.log(value)
        this.setState({
            yearvalue: value
        })
    }

    getGroupsOption = () => {
        const {tabledata} = this.state;
        let ary = [];
        tabledata.map(item => {
            if (item.分组) {
                if (!itemisexist(ary, item.分组)) {
                    ary.push(item.分组)
                }
            }
        })
        console.log(ary)
        return ary.map(i => {
            return <Option value={i}>{i}</Option>
        })
    }
    GroupsChange = (value) => {
        console.log(value)
        this.setState({
            groupsvalue: value
        })

    }

    getDeptsOption = () => {
        const {tabledata} = this.state;
        let ary = [];
        tabledata.map(item => {
            if (item.部门) {
                if (!itemisexist(ary, item.部门)) {
                    ary.push(item.部门)
                }
            }
        })
        console.log(ary)
        return ary.map(i => {
            return <Option value={i}>{i}</Option>
        })
    }
    DeptsChange = (value) => {
        console.log(value)
        this.setState({
            deptsvalue: value
        })

    }

    getStatesOption = () => {
        const {tabledata} = this.state;
        let ary = [];
        tabledata.map(item => {
            if (item.等次) {
                if (!itemisexist(ary, item.等次)) {
                    ary.push(item.等次)
                }
            }
        })
        console.log(ary)
        return ary.map(i => {
            return <Option value={i}>{i}</Option>
        })
    }
    StatesChange = (value) => {
        console.log(value)
        this.setState({
            statesvalue: value
        })
    }

    selectDC=()=>{
        this.setState({
            visible:true
        })
    }


    render() {
        const {
            upordown, visible, visibledone, monvalue, blpcselectvalue, gsdselectvalue,
            blstateselectvalue, seachrAllvalue, yearvalue, tabledata,dcisdisable
        } = this.state;

        const columns = [
            {
                title: '分组',
                dataIndex: '分组',
                width: 200,
                align: "center",
                render: text => <Popover
                    content={text}>{text.length > 25 ? text.substring(0, 25) + "..." : text}</Popover>,
            },
            {
                title: '部门',
                dataIndex: '部门',
                align: "center",
                width: 200,
                children:""
            },
            {
                title: '总分',
                dataIndex: '总分',
                width: "200px",
                align: "center",
                render: (text, record) => <a onClick={() => {
                    this.blstateClick(record)
                }}>{text}</a>,
            },
            {
                title: '排名',
                dataIndex: '排名',
                width: "200px",
                align: "center"
            }, {
                title: '等次',
                dataIndex: '等次',
                width: "200px",
                align: "center"
            }, {
                title: '状态',
                dataIndex: '状态',
                align: "center"
            },
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                //选中的只要是有发布状态的就保存等次就禁用

                if(selectedRows.length>0){
                    let tmp = selectedRows.filter(item => item.状态 == "发布")
                    console.log("过滤之后的数据",tmp)
                    if (tmp.length > 0) {
                        this.setState({
                            dcisdisable:true
                        })
                    } else {
                        this.setState({
                            dcisdisable:false
                        })
                    }
                }else {
                    this.setState({
                        dcisdisable:true
                    })
                }

            }
            ,
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        return (
            <div>
                <Row style={{
                    background: "#F1F2F3",
                    borderRadius: "2px",
                    margin: "10px 10px 10px 10px"
                }}>
                    <div style={{
                        marginTop: "0px"
                    }}>
                        <Col span={24} style={{
                            display: upordown ? "block" : "none",
                            marginTop: "10px"
                        }}>
                            <Row>

                                <Col span={8}>
                                    <Col span={8} style={{
                                        textAlign: "right"
                                    }}>
                                        <div style={{
                                            height: "32px",
                                            lineHeight: "32px",
                                            marginRight: "16px"
                                        }}>年份
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <Select placeholder={"全部"} style={{width: "90%"}} onChange={this.YearChange}>
                                            <Option value="">全部</Option>
                                            {this.getYearOption()}
                                        </Select>
                                    </Col>
                                </Col>
                                <Col span={8}>
                                    <Col span={8} style={{
                                        textAlign: "right"
                                    }}>
                                        <div style={{
                                            height: "32px",
                                            lineHeight: "32px",
                                            marginRight: "16px"
                                        }}>分组
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <Select placeholder={"全部"} style={{width: "90%"}} onChange={this.GroupsChange}>
                                            <Option value="">全部</Option>
                                            {this.getGroupsOption()}
                                        </Select>
                                    </Col>
                                </Col>
                                <Col span={8}>
                                    <Col span={8} style={{
                                        textAlign: "right"
                                    }}>
                                        <div style={{
                                            height: "32px",
                                            lineHeight: "32px",
                                            marginRight: "16px"
                                        }}>部门
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <Select placeholder={"全部"} style={{width: "90%"}} onChange={this.DeptsChange}>
                                            <Option value="">全部</Option>
                                            {this.getDeptsOption()}
                                        </Select>
                                    </Col>
                                </Col>
                                <Col span={8} style={{
                                    marginTop: "10px"
                                }}>
                                    <Col span={8} style={{
                                        textAlign: "right"
                                    }}>
                                        <div style={{
                                            height: "32px",
                                            lineHeight: "32px",
                                            marginRight: "16px"
                                        }}>等次
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <Select placeholder={"全部"} style={{width: "90%"}} onChange={this.StatesChange}>
                                            <Option value="">全部</Option>
                                            {this.getStatesOption()}
                                        </Select>
                                    </Col>
                                </Col>

                            </Row>
                            <Row>
                                <Col span={24} style={{marginTop: "8px"}}>
                                    <Button size={"small"} style={{
                                        marginLeft: "16px"
                                    }} icon={"download"}>导出</Button>
                                    <Button size={"small"} style={{
                                        marginLeft: "8px",
                                        backgroundColor: "#0E4691",
                                        color: "#ffffff"
                                    }}>
                                        <img src={setting} style={{
                                            height: "14px", width: "14px", marginLeft: "-1px",
                                            marginTop: "-3px", marginRight: "4px"
                                        }}/>
                                        计算得分</Button>
                                    <Button size={"small"} style={{
                                        marginLeft: "8px",
                                        backgroundColor: dcisdisable?"":"#0E4691",
                                        color: dcisdisable?"":"#ffffff"
                                    }} disabled={dcisdisable} onClick={()=>{
                                        this.selectDC()
                                    }}><img src={setting} style={{
                                        height: "14px", width: "14px", marginLeft: "-1px",
                                        marginTop: "-3px", marginRight: "4px", backgroundColor: dcisdisable?"rgb(191, 191, 191)":""
                                    }}/>保存等次</Button>
                                    <Button size={"small"} style={{
                                        marginLeft: "8px",
                                        backgroundColor: "#0E4691",
                                        color: "#ffffff"
                                    }}><img src={setting} style={{
                                        height: "14px", width: "14px", marginLeft: "-1px",
                                        marginTop: "-3px", marginRight: "4px"
                                    }}/>成绩发布</Button>
                                    {/*<Button size={"small"} style={{*/}
                                        {/*marginLeft: "8px"*/}
                                    {/*}} disabled={true}><img src={setting} style={{*/}
                                        {/*height: "14px", width: "14px", marginLeft: "-1px",*/}
                                        {/*marginTop: "-3px", marginRight: "4px", backgroundColor: "rgb(191, 191, 191)"*/}
                                    {/*}}/>发布</Button>*/}
                                </Col>
                            </Row>
                        </Col>


                        <Col span={24} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div style={{
                                width: "36px",
                                height: "10px",
                                borderRadius: "2px 2px 0 0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                            }} onClick={() => {
                                this.updownClick()
                            }} class={"FenguanLeaderhuakuai"}>{upordown ? <Icon type="caret-up" style={{
                                color: "#FFFFFF"
                            }}/> : <Icon type="caret-down" style={{
                                color: "#FFFFFF"
                            }}/>}</div>
                        </Col>
                    </div>
                </Row>

                <Row style={{
                    margin: "10px"
                }}>
                    <Col span={24}>

                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={tabledata}
                            bordered={true}
                            className="yzgfenguanleadertableth"
                            // rowClassName={(record, index) => {
                            //     let className = 'light-row';
                            //     if (index % 2 === 1) className = 'dark-row';
                            //     return className;
                            // }}
                            scroll={{y: upordown ? 420 : 520}}
                            loading={false}
                            pagination={
                                this.getTablePagination(tabledata, upordown)
                            }
                        />
                    </Col>
                </Row>
                <ChooseDcModal visible={visible} onCancel={this.onCancel}/>

                {/*<LeaderTwoFileCp  visible={visible} onCancel={this.onCancel}*/}
                {/*title="文件呈批表"/>*/}
                {/*<LeaderTwoFileDone visible={visibledone} onCancel={this.ondoneCancel}*/}
                {/*title="文件处理表"/>*/}
            </div>
        )
    }

}