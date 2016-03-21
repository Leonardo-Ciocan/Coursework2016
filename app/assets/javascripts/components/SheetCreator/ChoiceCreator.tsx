/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./ChoiceCreatorAnswer.tsx" />
/// <reference path="./Answer.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="../../models/Question.ts" />
/// <reference path="../shared/TextArea.tsx" />
/// <reference path="../shared/MDPreview.tsx" />


interface ChoiceCreatorProps{
    color : string
    question : RQuestion
    key? : any
    errors? : Array<string>
    index? : number
    onDelete? : (question) => void
}

interface ChoiceCreatorState{
    answers? : Array<Answer>
    shouldShow? : boolean
} 

class ChoiceCreator extends React.Component<ChoiceCreatorProps,ChoiceCreatorState> {
    
    
    constructor(props) {
            super(props);
            this.state = {
                answers : this.props.question.answers,
                shouldShow : false
            };
    }
    
    render(){
        let containerStyle = {
            border : "1px solid lightgray",
            padding:"10px",
            boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.00)",
            background:"white",
            borderRadius:"5px",
            margin:"20px",
            position:"relative",
            overflow:"hidden",
            transition:"transform 0.5s",
            transform : this.state.shouldShow ? "scale(1)":"scale(0)"
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
            color:"black",
            borderRadius:"100%",
            position:"absolute",
            top:"10px",
            right:"-35px",
            border:"1px solid gray",
            width:"25px",
            height:"25px",
            lineHeight:"23px",
            verticalAlign:"middle",
            textAlign:"center",
            fontWeight:"bold"
        };
        
        let answers = this.state.answers.map((answer) => 
                <ChoiceCreatorAnswer key={answer.id} onDelete={this.onDeleteAnswer.bind(this)} answer={answer} color={this.props.color}/>);
        
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
                           <span style={{color:"gray" , marginRight:"10px",marginTop:"-10px",marginBottom:"-10px"}}> | Multiple Choice</span>
                        <a onClick={()=>this.props.onDelete(this.props.question)} style={{cursor:"pointer",color:"red" , marginLeft:"10px" , fontWeight:"bold",float:"right"}} >Delete</a>
                    </div>
                   <TextArea fontSize="10pt" onChange={this.titleChanged.bind(this)} placeholder={"Question title"} />
                   <input onChange={this.subtitleChanged.bind(this)} placeholder={"Subtitle"} style={inputSubStyle}/>
                   <MDPreview code={this.props.question.title || ""} />
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
                            <span style={{visibility:this.state.answers.length==0?"collapse":"visible", width:"100px",marginRight:"10px"}}>Correct </span>
                        </div>
                        {answers}
                        <a onClick={this.createAnswer.bind(this)} style={{
                            cursor:"pointer",color:this.props.color,marginTop:"0", marginLeft:"70px" , fontWeight:"bold"
                        }} >New answer</a>
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
    
    onDeleteAnswer(answer:Answer){
        var index : number = this.state.answers.indexOf(answer);
        if(index >= 0){
            this.state.answers.splice(index,1);
        }
        this.setState({answers:this.state.answers});
    }
    
    createAnswer(){
        this.state.answers.push({text:"",isAnswer:false,id:IDFactory.getNumber()});
        this.setState({answers:this.state.answers});
    }
    
    componentDidMount(){
        setTimeout(()=> this.setState({shouldShow:true}) , 50)
    }
}