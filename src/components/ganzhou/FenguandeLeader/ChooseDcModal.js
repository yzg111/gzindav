import React, {Component} from "react"
import {
     Radio, Button, Icon,
    Modal
} from 'antd';
import 放大 from "../../../Images/ganzhou/arrowsalt.svg"
import 缩小 from "../../../Images/ganzhou/shrink.svg"
import "./FenGuandeLeader.css"



export default class ChooseDcModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typesf:"缩小",
        }
    }

    sxfdClick=()=>{
        const {typesf}=this.state;
        console.log("点击了放大缩小")
        if (typesf=="缩小"){
            this.setState({
                typesf:"放大"
            })
        }else {
            this.setState({
                typesf:"缩小"
            })
        }
    }

    render() {
        const {visible, onCancel, onCreate,   title,onChange,radiovalue} = this.props;
        const {typesf}=this.state;
        return (
            <Modal
                visible={visible}
                title={<div style={{display:"flex"}}>
                    <div style={{
                        width:"80%",
                        letterSpacing:"2px",
                        fontSize: "16px",
                        letterSpacing: "2px",
                        color: "#FFFFFF"}}>
                        {title}
                    </div>
                    <div  style={{color:"rgba(255,255,255,1)",textAlign:"right",width:"20%",paddingRight:"40px"}}>
                        <img src={typesf == "放大"?缩小:放大} style={{cursor:"pointer",width:"16px",height:"16px"}} onClick={()=>{this.sxfdClick()}} />
                    </div>
                </div>}
                onCancel={onCancel}
                closeIcon={<Icon type="close" style={{color: "#FFFFFF"}}/>}
                width={typesf == "放大"?"100%":"70%"}
                bodyStyle={{
                    paddingTop: "32px",
                    paddingBottom: "32px",
                    paddingLeft: "128px",
                    paddingRight: "0px",
                    height:typesf == "放大"?'calc(100vh - 100px)':""
                }}
                className={typesf == "放大"?"leadrtwomodaldeptfd":"leadrtwomodaldept"}
                footer={<Button  style={{
                    backgroundColor: "#0E4691",
                    color: "#ffffff"
                }} onClick={onCreate}>确定</Button>}
            >
                <label style={{marginRight:"24px",fontWeight:600}}>等次</label>
                <Radio.Group onChange={onChange} value={radiovalue}
                >
                <Radio value={"优秀"}>优秀</Radio>
                <Radio value={"良好"}>良好</Radio>
                <Radio value={"合格"}>合格</Radio>
                <Radio value={"不合格"}>不合格</Radio>
            </Radio.Group>
            </Modal>
        )
    }

}