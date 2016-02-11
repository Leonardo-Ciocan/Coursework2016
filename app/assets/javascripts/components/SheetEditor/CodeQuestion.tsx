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
}

 class CodeQuestion extends React.Component<CodeQuestionProps,{code:string , correct:boolean}> {

        refs: {
            [string: string]: any;
            codeEditor: any;
        }


        constructor(props) {
            super(props);
            this.state = {code:this.props.answer.data , correct:false};
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
                    
                    <div style={{fontFamily:"Source Code Pro!important"}} ref="codeEditor">
                    </div>
                    
                    <div>
                        <span
                            style={{color:this.state.correct ? "green" : "darkgray"}}
                        >{this.state.correct ? "Correct code" : "Incorrect code"}</span>
                        <LCButton onClick={this.commit.bind(this)} text={"Commit"} color={this.props.color}/>
                    </div>
                </div>
            </div>
        }
        
        commit(){
            $.post("/answer/" + this.props.answer.id,
                {data: this.state.code}
            ).then(function(data){
                this.setState({correct : data == "true"});
            }.bind(this));
            console.log(this.state.code);   
        }
        
        componentDidMount(){
            var myCodeMirror = CodeMirror(this.refs.codeEditor,{

                value : this.state.code,
                lineNumbers:true ,
                 theme:"base16-light"});
                
                myCodeMirror.on("change", function(cm, change) { 
                             this.setState({code:cm.getValue()});
                 }.bind(this));
                 
                 myCodeMirror.setSize("100%","auto");
        }
    }

