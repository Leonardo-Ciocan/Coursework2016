/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Checkbox.tsx" />

class ChoiceCreatorAnswerProps{
    color : string
}

class ChoiceCreatorAnswer extends React.Component<ChoiceCreatorAnswerProps,any> {
    render(){
        let containerStyle = {
            marginRight:"10px",
            marginLeft:"10px",
            marginBottom:"20px"
        };
        
        let inputStyle = {
            textAlignment:"center",
            padding:"5px",
            width:"250px",
            fontSize:"12pt",
            border:"1px solid lightgray",
            background:"rgba(0,0,0,0.05)",
            borderRadius:"5px"
        };
        
        return <div style={containerStyle}>
                   <div style={{width:"50px",display:"inline-block"}}><CheckBox color={this.props.color}/></div>
                   <input placeholder={"Answer 1"} style={inputStyle}/>
                   <a style={{cursor:"pointer",color:"red" , marginLeft:"10px" , fontWeight:"bold"}} >Delete</a>
               </div>;
    }
}