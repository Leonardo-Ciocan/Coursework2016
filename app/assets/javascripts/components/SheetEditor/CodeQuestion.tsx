/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../shared/SegmentedButton.tsx" />

declare var md : any
declare var CodeMirror : Function

class CodeQuestionProps {
    question : any
    answer : any
    color : string
    releaseMode : boolean
    modelAnswer : any
}

 class CodeQuestion extends React.Component<CodeQuestionProps,{code?:string , correct:number}> {

        refs: {
            [string: string]: any;
            codeEditor: any;
            codeEditor2: any;
        }


        constructor(props) {
            super(props);
            this.state = {code:this.props.answer.data || "", correct:-1};
        }
        
        render() {
            
            return <div className="question-block" >
                <div
                     style={{
                        background:"  white",
                        margin:"0 auto",
                        width:"100%",
                        padding:"25px",
                        borderBottom:"1px solid rgba(0,0,0,0.15)",
                        position:"relative",
                        transition:"box-shadow 0.3s"
                    }}>


                    <span className="question-title" 
                        dangerouslySetInnerHTML={{__html: md.render(this.props.question.title)}}/>

                    <h2 className="question-subtitle"> {this.props.question.subtitle} </h2>
                    
                    <div style={{opacity: this.props.releaseMode ? 0.5 : 1 , paddingBottom:"10px"}}>
                        <div style={{fontFamily:"Source Code Pro!important"}} ref="codeEditor">
                        </div>
                        
                        <div>
                            <span
                                style={{color:this.state.correct == 0 ? "green" : (this.state.correct == -1 ? "gray" : "red")}}
                            >{this.state.correct == 0 ? "Correct code" : (this.state.correct == -1 ? "Running" : "Incorrect code")}</span>
                            <LCButton onClick={this.commit.bind(this)} text={"Commit"} color={this.props.color}/>
                        </div>
                    </div>
                    {

                       this.props.releaseMode ? <div>
                       
                                <span style={{display:"block",fontSize:"10pt", color:"gray",
                                              textAlign:"left",width:"100%",paddingBottom:"5px"}}>Model answer</span>
                                <div>
                                    <div style={{fontFamily:"Source Code Pro!important"}} ref="codeEditor2">
                                    </div>
                                </div>
                            
                            </div>
                             : ""
                    }
                     
                </div>
            </div>
        }
        
        commit(){
            this.setState({correct : -1});
            $.post("/answer/" + this.props.answer.id,
                {data: this.state.code}
            ).then(function(data){
                
                this.setState({correct : data == "true" ? 0 : 1});
                console.log(this.state.correct);
            }.bind(this)); 
        }
        
        componentDidMount(){
            var myCodeMirror = CodeMirror(this.refs.codeEditor,{
                readOnly:this.props.releaseMode,
                value : this.state.code,
                lineNumbers:true ,
                 theme:"base16-light"});
                
                myCodeMirror.on("change", function(cm, change) { 
                      if(cm != undefined)this.setState({code:cm.getValue()});
                 }.bind(this));
                 
                 myCodeMirror.setSize("100%","auto");
                 
                 if(this.props.modelAnswer){
                    var myCodeMirror2 = CodeMirror(this.refs.codeEditor2,{
                    readOnly:true,
                    value : this.props.modelAnswer.data,
                    lineNumbers:true ,
                    theme:"base16-light"});
                    
                    
                    myCodeMirror2.setSize("100%","auto");
                 }
                 
                 
        }
        
    }

