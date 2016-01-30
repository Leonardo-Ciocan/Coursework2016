/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./ChoiceCreatorAnswer.tsx" />

interface Answer { 
    text : string
    isAnswer : boolean
}

class ChoiceCreatorProps{
    color : string
}

class ChoiceCreator extends React.Component<ChoiceCreatorProps,any> {
    
    constructor(props) {
            super(props);
            this.state = {
                answers : ["",""]
            };
    }
    
    render(){
        let containerStyle = {
            borderBottom : "1px solid lightgray",
            padding:"10px",
                         boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.19)",
                         background:"white",
                         borderRadius:"5px",
                         margin:"10px"
        };
        
        let inputStyle = {
            textAlignment:"center",
            padding:"5px",
            width:"100%",
            fontSize:"15pt",
            border:"1px solid lightgray",
            background:"rgba(0,0,0,0.05)",
            borderRadius:"5px"
        };
        
        let inputSubStyle = {
            textAlignment:"center",
            border:"none",
            padding:"5px",
            marginBottom:"5px",
            width:"100%",
            fontSize:"12pt",
            color:"gray"
        };
        
        let answerContainer = {
            marginLeft: "-10px",
            marginRight: "-10px",
            marginBottom: "-10px",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            borderTop:"1px solid rgba(0,0,0,0.15)",
            padding:"10px",
            position:"relative"
        };
        
        let addButtonStyle = {
            border:"2px dashed gray",
            color:"gray",
            borderRadius:"5px",
            fontWeight:"bold",
            margin:"10px",
            padding:"10px",
            display:"inline-block",
            cursor:"pointer",
        };
        
        let answers = this.state.answers.map((answer) => <ChoiceCreatorAnswer color={this.props.color}/>);
        
        return <div style={containerStyle}>
                   <input placeholder={"Question title"} style={inputStyle}/>
                   <input placeholder={"Subtitle"} style={inputSubStyle}/>
                   <div style={answerContainer}>
                        <div style={{
                            background:"rgba(0,0,0,0.025)",
                            borderRight:"1px solid lightgray",
                            position:"absolute",
                            left:0,top:0,bottom:0,width:"65px",
                            zIndex:0,
                            pointerEvents:"none"
                        }}>
                        </div>
                        <div>
                            <span style={{width:"100px",marginRight:"10px"}}>Correct </span>
                        </div>
                        {answers}
                        <a onClick={this.createAnswer.bind(this)} style={{
                            cursor:"pointer",color:this.props.color,marginTop:"0", marginLeft:"60px" , fontWeight:"bold"
                        }} >New answer</a>
                   </div>
               </div>;
    }
    
    createAnswer(){
        
    }
}