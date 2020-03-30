import React, {Component} from "react"
import {
    Layout, LocaleProvider, Card, Row, Col, Radio,
    Input, Pagination, Button, notification, Tabs, Select, Icon, Table, Tree,Popover
} from 'antd';
import "./FenGuandeLeader.css"
import thjbr from "../../../Images/ganzhou/thjbr.svg"
import word from "../../../Images/ganzhou/word.png"
import {itemisexist, itemisexistobj, TanYuanJian, word2number} from "../../../comfunction/ComFun";

const {TabPane} = Tabs;
const {Option} = Select;
const {Search} = Input;
const {TreeNode, DirectoryTree} = Tree;

const data=[];
export default class FenguandeNetworkRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upordown: false,
            visible: false,
            visibledone: false,
            monvalue:"",
            blpcselectvalue:"",
            gsdselectvalue:"",
            blstateselectvalue:"",
            seachrAllvalue:"",
            yearvalue:""
        }
    }

    componentWillMount = () => {

    }

    updownClick=()=>{
        const {upordown}=this.state
        if(upordown){
            this.setState({
                upordown:false
            })
        }else {
            this.setState({
                upordown:true
            })
        }
    }

    cpClick = () => {
        //呈批记录按钮点击事件
        this.setState({visible:true})
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
            pageSizeOptions: ["1", "10","15","20","30","40"],
            hideOnSinglePage:false
        }
    }

    onCancel=()=>{
        this.setState({visible:false})
    }
    ondoneCancel=()=>{
        this.setState({visibledone:false})
    }

    getYearOption = () => {

    }

    YearChange = (value) => {
        console.log(value)
        this.setState({
            yearvalue: value
        })
    }

    getMonthOption = () => {
        // const {AllSXData,type,TreeFirst,typeinfo}=this.props;
        // let data=AllSXData;
        // data=data.filter(i=>i.typeinfo==typeinfo);
        // if(type!=""&&TreeFirst.filter(i=>i.事项类别名称==type)==0){
        //     data=data.filter(i=>i.事项类别名称==type);
        // }
        let ary = [];
        // data.map(item => {
        //     if (item.月份) {
        //         if (!itemisexist(ary, item.月份)) {
        //             ary.push(item.月份)
        //         }
        //     }
        // })
        // //将月份排序
        // ary = ary.sort(function (a, b) {
        //     let a1 = parseInt(a.substring(0, a.length - 1));
        //     let b1 = parseInt(b.substring(0, b.length - 1));
        //     if (a1 < b1) {
        //         return -1;
        //     }
        //     if (a1 > b1) {
        //         return 1;
        //     }
        //     // a[key]-b[key]
        //     return 0;
        // })
        console.log(ary)
        return ary.map(i => {
            return <Option value={i}>{i}</Option>
        })
    }

    MonthChange = (value) => {
        console.log(value)
        this.setState({
            monvalue: value
        })
    }
    getPcOption = () => {
        let ary = [];
        return ary.map(i => {
            return <Option value={i}>{i}</Option>
        })
    }

    pcChange = (value) => {
        console.log(value)
        this.setState({
            blpcselectvalue: value
        })
    }


    render() {
        const {upordown,visible,visibledone,monvalue,blpcselectvalue,gsdselectvalue,
            blstateselectvalue,seachrAllvalue,yearvalue} = this.state;

        const columns = [
            {
                title: '批次名称',
                dataIndex: '事项标题',
                render: text => <Popover content={text}>{text.length>25?text.substring(0,25)+"...":text}</Popover>,
            },
            {
                title: '办理阶段',
                dataIndex: '办理阶段',
                align: "center",
                width: "200px",
            },
            {
                title: '办理状态',
                dataIndex: '办理状态',
                width: "200px",
                align: "center",
                render: (text,record) => <a onClick={()=>{
                    this.blstateClick(record)
                }}>{text}</a>,
            },
            {
                title: '经办人',
                dataIndex: '事项经办人',
                width:"200px",
                align: "center"
            },
        ];

        return(
            <div>
                <Row style={{
                    background: "#F1F2F3",
                    borderRadius: "2px",
                    margin:"10px 10px 10px 10px"
                }}>
                    <div style={{
                        marginTop: "0px"
                    }}>
                        <Col span={24} style={{
                            marginBottom: "10px",
                            display:upordown?"block":"none",
                            marginTop:"10px"
                        }}>
                            <Row>
                                <Col span={8}>
                                    <Col span={8} style={{
                                        textAlign:"right"
                                    }}><div style={{
                                        height:"32px",
                                        lineHeight:"32px",
                                        marginRight:"16px"
                                    }}>全字段搜索</div></Col>
                                    <Col span={16}><Search
                                        placeholder="关键字"
                                        onSearch={(value) =>{this.SearchAll(value)} }
                                        style={{width: "90%"}}
                                    />
                                    </Col>
                                </Col>
                                <Col span={8}>
                                    <Col span={8} style={{
                                        textAlign:"right"
                                    }}><div style={{
                                        height:"32px",
                                        lineHeight:"32px",
                                        marginRight:"16px"
                                    }}>年份</div></Col>
                                    <Col span={16}>
                                        <Select placeholder={"全部"} style={{width: "90%"}} onChange={this.YearChange}>
                                            <Option value="">全部</Option>
                                            {this.getYearOption()}
                                        </Select>
                                    </Col>
                                </Col>
                                <Col span={8}>
                                    <Col span={8} style={{
                                        textAlign:"right"
                                    }}><div style={{
                                        height:"32px",
                                        lineHeight:"32px",
                                        marginRight:"16px"
                                    }}>月份</div></Col>
                                    <Col span={16}>
                                        <Select placeholder={"全部"} style={{width: "90%"}} onChange={this.MonthChange}>
                                            <Option value="">全部</Option>
                                            {this.getMonthOption()}
                                        </Select>
                                    </Col>
                                </Col>
                                <Col span={8}style={{
                                    marginTop:"10px"
                                }}>
                                    <Col span={8} style={{
                                        textAlign:"right"
                                    }}><div style={{
                                        height:"32px",
                                        lineHeight:"32px",
                                        marginRight:"16px"
                                    }}>办理批次</div></Col>
                                    <Col span={16}>
                                        <Select placeholder={"全部"} style={{width: "90%"}}  onChange={this.pcChange}>
                                            <Option value="">全部</Option>
                                            {this.getPcOption()}
                                        </Select>
                                    </Col>
                                </Col>
                                <Col span={8} style={{
                                    marginTop:"10px"}}>
                                    <Col span={8} style={{
                                        textAlign:"right"
                                    }}><div style={{
                                        height:"32px",
                                        lineHeight:"32px",
                                        marginRight:"16px"
                                    }}>办理阶段</div></Col>
                                    <Col span={16}>
                                        <Select placeholder={"全部"} style={{width: "90%"}} onChange={this.GsdChange}>
                                            <Option value="">全部</Option>
                                            {/*{this.getGsdOption()}*/}
                                        </Select>
                                    </Col>
                                </Col>
                                <Col span={8} style={{
                                    marginTop:"10px"}}>
                                    <Col span={8} style={{
                                        textAlign:"right"
                                    }}><div style={{
                                        height:"32px",
                                        lineHeight:"32px",
                                        marginRight:"16px"
                                    }}>办理状态</div></Col>
                                    <Col span={16}>
                                        <Select placeholder={"全部"} style={{width: "90%"}} onChange={this.blstateChange}>
                                            <Option value="">全部</Option>
                                            {/*{this.getblstateOption()}*/}
                                        </Select>
                                    </Col>
                                </Col>

                            </Row>
                        </Col>

                        <Col span={24} style={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}>
                            <div style={{
                                width:"36px",
                                height:"10px",
                                borderRadius: "2px 2px 0 0",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                                cursor:"pointer"
                            }} onClick={()=>{
                                this.updownClick()
                            }} class={"FenguanLeaderhuakuai"}>{upordown?<Icon type="caret-up" style={{
                                color:"#FFFFFF"
                            }}/>:<Icon type="caret-down" style={{
                                color:"#FFFFFF"
                            }}/>}</div>
                        </Col>
                    </div>
                </Row>

                <Row style={{
                    margin:"10px"
                }}>
                    <Col span={24}>

                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered={true}
                            className="yzgfenguanleadertableth"
                            // rowClassName={(record, index) => {
                            //     let className = 'light-row';
                            //     if (index % 2 === 1) className = 'dark-row';
                            //     return className;
                            // }}
                            scroll={{y:upordown?420:520}}
                            loading={false}
                            pagination={
                                this.getTablePagination(data,upordown)
                            }
                        />
                    </Col>
                </Row>

                {/*<LeaderTwoFileCp  visible={visible} onCancel={this.onCancel}*/}
                {/*title="文件呈批表"/>*/}
                {/*<LeaderTwoFileDone visible={visibledone} onCancel={this.ondoneCancel}*/}
                {/*title="文件处理表"/>*/}
            </div>
        )
    }

}