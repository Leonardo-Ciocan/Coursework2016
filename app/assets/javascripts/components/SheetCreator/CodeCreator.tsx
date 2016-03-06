/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./CodeCreatorIO.tsx" />
/// <reference path="./Answer.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="../../models/Question.ts" />
/// <reference path="../shared/TextArea.tsx" />
/// <reference path="../shared/MDPreview.tsx" />
/// <reference path="../shared/SegmentedButton.tsx" />

declare var CodeMirror : any

interface CodeCreatorProps{
    color : string
    question : RQuestion
    key? : any
    index? : number
    onDelete? : (question) => void
    errors? : Array<string>
}

interface CodeCreatorState{
}

class CodeCreator extends React.Component<CodeCreatorProps , CodeCreatorState>{
    refs: {
            [string: string]: any;
            codeEditor: any;
        }
        
    codeEditor : any;
        
    constructor(props){
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
            marginTop:"5px",
            marginBottom:"5px",
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
       
        let solutions = this.props.question.solutions.map((solution) => <CodeCreatorIO key={solution.id} io={solution}/>);
       	 
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
                        <span style={{color:"gray" , marginRight:"10px",marginTop:"-10px",marginBottom:"-10px"}}> | Code</span>
                        <a onClick={()=>this.props.onDelete(this.props.question)}  style={{cursor:"pointer",color:"red" , marginLeft:"10px" , fontWeight:"bold",float:"right"}} >Delete</a>
                    </div>
        
                   <TextArea fontSize="10pt" onChange={this.titleChanged.bind(this)} placeholder={"Question title"} />
                   <input onChange={this.subtitleChanged.bind(this)} placeholder={"Subtitle"} style={inputSubStyle}/>
                   <MDPreview code={this.props.question.title || ""} />
                   <div style={{paddingTop:"10px",borderTop:"1px solid lightgray",marginRight:"-10px" , marginLeft:"-10px"}}></div>   
                   <span style={{display:"block",fontSize:"10pt", color:"gray",textAlign:"left",width:"100%",marginBottom:"10px"}}>Select a language:</span>
                   <SegmentedButton onSelected={this.languageChanged.bind(this)} itemPadding="2px" labels={["Python" , "Java" , "Haskell"]} color={this.props.color} style={{paddingBottom:"10px"}}/>
                   <table style={{style:"100%"}}>
                        <tr>
                            <th>Input</th>
                            <th>Output</th>
                        </tr>
                        {solutions}
                   </table>
                   <a onClick={this.createIO.bind(this)} style={{
                            cursor:"pointer",color:this.props.color,marginTop:"0",
                             marginLeft:"10px",marginBottom:"10px" , fontWeight:"bold" ,display:"block"
                        }} >New test</a>
                        
                   <div style={{paddingTop:"10px",borderTop:"1px solid lightgray",marginRight:"-10px" , marginLeft:"-10px"}}></div>   
                      
                   <span style={{display:"block",fontSize:"10pt", color:"gray",textAlign:"left",width:"100%",marginBottom:"10px"}}>Model answer:</span>
                      
                    <div style={{fontFamily:"Source Code Pro!important"}} ref={(editor) => this.codeEditor = editor}>
                    </div>                     
                   <div style={{borderTop:"1px solid lightgray",marginTop:"10px",marginRight:"-10px",padding:"10px",marginBottom:"-10px",
                   marginLeft:"-10px",display: this.props.errors.length > 0 ? "" : "none"}}>
                            {errors}
                   </div>
               </div>;
    }
    
    languageChanged(index,value){
        this.props.question.language = value.toLowerCase();
        console.log(this.props.question.language);
    }
    
    createIO(){
        this.props.question.solutions.push({input:"" , output:"" , id : IDFactory.getNumber()});
        this.setState({});
    }
    
    titleChanged(e){
        this.props.question.title = e.target.value;
        this.setState({});	
    }
    
    subtitleChanged(e){
        this.props.question.subtitle = e.target.value;
    }
    
    componentDidMount(){
            var myCodeMirror = CodeMirror(this.codeEditor,{

                value : this.props.question.model_answer || "",
                lineNumbers:true ,
                 theme:"base16-light"});
                
                myCodeMirror.on("change", function(cm, change) { 
                       this.props.question.model_answer = cm.getValue();
                 }.bind(this));
                 
                 myCodeMirror.setSize("100%","auto");
        }
    
}