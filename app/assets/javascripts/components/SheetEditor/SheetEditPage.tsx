/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./ChoiceQuestion.tsx" />
/// <reference path="./InputQuestion.tsx" />
/// <reference path="../shared/Header.tsx" />
console.log("hello");
class SheetEditPageProps{
    questions : any
    sheet :any
}

declare var answers : any
declare var sheet :any
declare var questions:any

class SheetEditPage extends React.Component<SheetEditPageProps,any> {
    render() {
        var color = "purple";
        var questions = this.props.questions.map(function(question,i){
            //console.log(question.type);
            question.type = question.type == null ? 0 : question.type;
                if(question.type == 0) {
                    return <ChoiceQuestion color={color}  question={question} answer={answers[i]}/>;
                }
            else if (question.type == 1){
                    return <InputQuestion color={color}   question={question} answer={answers[i]}/>;
                }
            }.bind(this));


        return <div >
               <Header color={color} title={this.props.sheet.name} name={"leonardo"}>

               </Header>
                <div className="page-editor"
                    style={{
                          marginTop:"110px",
                          width:"600px",
                          marginBottom:"50px",
                          marginLeft:"auto",
                          marginRight:"auto",
                          boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.19);"
                    }}>
                    {questions}
                    <div style={{height:"65px"}}>
                        <h1 style={{
                            verticalAlign:"middle",
                            textAlign:"center",
                            lineHeight:"65px",
                            fontSize:"25px",
                            margin:"0px"
                        }}>That's all folks</h1>
                    </div>
               </div>
            </div>
    }
}


ReactDOM.render(
    React.createElement(SheetEditPage , {sheet:sheet , questions:questions}),
    document.getElementById('root')
);