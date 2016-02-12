/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Checkbox.tsx" />
/// <reference path="./Answer.ts" />
/// <reference path="../shared/TextBox.tsx" />

interface ChoiceCreatorAnswerProps{
    color : string
    answer : Answer
    onDelete? : Function
    key? : number
}

class ChoiceCreatorAnswer extends React.Component<ChoiceCreatorAnswerProps,any> {
    render(){
        let containerStyle = {
            marginRight:"10px",
            marginLeft:"10px",
            marginTop:"10px",
            marginBottom:"20px"
        };
        
        let inputStyle = {
            textAlignment:"center",
            padding:"5px",
            width:"250px",
            fontSize:"12pt",
            border:"1px solid lightgray",
            background:"rgba(0,0,0,0.05)",
            borderRadius:"5px",
            marginLeft:"10px"
        };
        
        return <div style={containerStyle}>
                   <div style={{width:"50px",display:"inline-block"}}><CheckBox onChange={this.checkChanged.bind(this)} color={this.props.color}/></div>
                   <input onChange={this.textChanged.bind(this)} placeholder={"Answer"} style={inputStyle}/>
                   <a onClick={this.onDelete.bind(this)} style={{cursor:"pointer",color:"red" , marginLeft:"10px" , fontWeight:"bold"}} >Delete</a>
               </div>;
    }
    
    onDelete(){
        this.props.onDelete(this.props.answer);    
    }
    
    textChanged(e){
        this.props.answer.text = e.target.value;
    }
    
    checkChanged(checked){
        this.props.answer.isAnswer = checked;
    }
}