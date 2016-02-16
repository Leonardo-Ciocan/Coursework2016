/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./ChoiceCreatorAnswer.tsx" />
/// <reference path="./Answer.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="../../models/Question.ts" />
/// <reference path="../shared/TextBox.tsx" />
/// <reference path="../shared/MDPreview.tsx" />
/// <reference path="../shared/SegmentedButton.tsx" />


interface InputCreatorProps{
    color : string
    question : RQuestion
    key? : any
    index? : number
    onDelete? : (question) => void
    errors? : Array<string>
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
            fontSize:"10pt",
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
       
        let errors = this.props.errors.map((error) => {

                return <span style={{display:"block",textAlign:"center", color:"Red"}}>{error}</span>;
        });
       
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
                       
                    	   <span>Question {this.props.index+1}</span> 
                            <span style={{color:"gray" , marginRight:"10px",marginTop:"-10px",marginBottom:"-10px"}}> | Text</span>
                        <a onClick={()=>this.props.onDelete(this.props.question)}  style={{cursor:"pointer",color:"red" , marginLeft:"10px" , fontWeight:"bold",float:"right"}} >Delete</a>
                    </div>
        
                  <TextArea fontSize="10pt" onChange={this.titleChanged.bind(this)} placeholder={"Question title"} />
                   <input onChange={this.subtitleChanged.bind(this)} placeholder={"Subtitle"} style={inputSubStyle}/>
                   <MDPreview code={this.props.question.title || ""} />
                   <div style={{paddingTop:"10px",borderTop:"1px solid lightgray",marginRight:"-10px" , marginLeft:"-10px"}}></div>   
                   <span style={{display:"block",fontSize:"10pt", color:"gray",textAlign:"left",width:"100%",paddingBottom:"5px"}}>Regex of valid answer</span> 
                   <TextBox onChange={this.answerChanged.bind(this)}   style={inputStyle}/>
                   <div style={{marginTop:"10px",borderTop:"0px solid lightgray"}}> 
                        <span style={{display:"block",fontSize:"10pt", color:"gray",textAlign:"left",width:"100%",paddingBottom:"5px"}}>Model answer</span>
                        <TextBox onChange={this.modelChanged.bind(this)}  style={inputStyle}/>
                   </div>
                   <div style={{borderTop:"1px solid lightgray",marginTop:"10px",marginRight:"-10px",padding:"10px",marginBottom:"-10px",
                   marginLeft:"-10px",display: this.props.errors.length > 0 ? "" : "none"}}>
                            {errors}
                   </div>
               </div>;
    }
    
    titleChanged(e){
        this.props.question.title = e.target.value;
        this.setState({});	
    }
    
    subtitleChanged(e){
        this.props.question.subtitle = e.target.value;
    }
    
    answerChanged(e){
        this.props.question.correct_answer = e.target.value;
    }
    
    modelChanged(e){
        this.props.question.model_answer = e.target.value;
    }
}