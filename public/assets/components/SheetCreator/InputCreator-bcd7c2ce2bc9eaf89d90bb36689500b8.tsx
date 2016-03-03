/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./ChoiceCreatorAnswer.tsx" />
/// <reference path="./Answer.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="../../models/Question.ts" />
/// <reference path="../shared/TextBox.tsx" />


interface InputCreatorProps{
    color : string
    question : RQuestion
    key? : any
}

class InputCreatorState{
    
}

class InputCreator extends React.Component<InputCreatorProps,InputCreatorState> {
    
    
    constructor(props) {
            super(props);
    }
    
    render(){
        let containerStyle = {
            border : "1px solid lightgray",
            padding:"10px",
            boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.00)",
            background:"white",
            borderRadius:"5px",
            margin:"20px",
            position:"relative"
        };
        
        let inputStyle = {
            textAlignment:"center",
            padding:"5px",
            width:"100%",
            fontSize:"13pt",
            border:"1px solid lightgray",
            borderRadius:"5px"
        };
        
        let answerStyle = {
            textAlignment:"center",
            padding:"5px",
            width:"100%",
            fontSize:"13pt",
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
        
        let numberStyle = {
            color:"black",
            borderRadius:"100%",
            position:"absolute",
            top:"10px",
            left:"-35px",
            border:"1px solid gray",
            width:"25px",
            height:"25px",
            lineHeight:"23px",
            verticalAlign:"middle",
            textAlign:"center",
            fontWeight:"bold"
        };
        
        let deleteStyle = {
            color:"gray",
            borderRadius:"100%",
            position:"absolute",
            top:"10px",
            right:"-35px",
            width:"25px",
            height:"25px",
            lineHeight:"23px",
            verticalAlign:"middle",
            textAlign:"center",
            fontWeight:"bold"
        };
       
        return <div style={containerStyle}>
                     <div style={{
                        background:"rgba(0,0,0,0.03)",
                        padding:"10px",
                        marginTop:"-10px",
                        marginLeft:"-10px",
                        marginRight:"-10px",
                        marginBottom:"10px",
                        borderBottom:"1px solid lightgray"
                    }}>
                       
                    	   <span>Question 1</span> 
                            <span style={{color:"gray" , marginRight:"10px",marginTop:"-10px",marginBottom:"-10px"}}> | Text</span>
                        <a style={{cursor:"pointer",color:"red" , marginLeft:"10px" , fontWeight:"bold",float:"right"}} >Delete</a>
                    </div>
        


                   <TextBox onChange={this.titleChanged.bind(this)} placeholder={"Question title"} style={inputStyle}/>
                   <input onChange={this.subtitleChanged.bind(this)} placeholder={"Subtitle"} style={inputSubStyle}/>
                   <div style={{paddingTop:"10px",borderTop:"1px solid lightgray",marginRight:"-10px" , marginLeft:"-10px"}}></div>    
                   <TextBox onChange={this.answerChanged.bind(this)}  placeholder={"Regex of valid answer"} style={inputStyle}/>
               </div>;
    }
    
    titleChanged(e){
        this.props.question.title = e.target.value;
    }
    
    subtitleChanged(e){
        this.props.question.subtitle = e.target.value;
    }
    
    answerChanged(e){
        this.props.question.correct_answer = e.target.value;
    }
}