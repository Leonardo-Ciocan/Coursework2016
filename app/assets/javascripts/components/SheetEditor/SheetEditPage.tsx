/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./ChoiceQuestion.tsx" />
/// <reference path="./InputQuestion.tsx" />
/// <reference path="./WebQuestion.tsx" />
/// <reference path="./CodeQuestion.tsx" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="../../models/Lecture.ts" />

class SheetEditPageProps{
    questions : any
    sheet :any
    lecture : Lecture
    answers: any
    modelAnswers : any
    percentage : number
}

declare var lecture_id : any
declare var sheet_id : any

class SheetEditPage extends React.Component<SheetEditPageProps,any> {
    render() {
        var color = this.props.lecture.color;
        var questions = this.props.questions.map(function(question,i){
            //console.log(question.type);
            question.type = question.type == null ? 0 : question.type;
                if(question.type == 0) {
                    return <ChoiceQuestion releaseMode={this.props.sheet.released} modelAnswer={this.props.modelAnswers[i]}  color={color}  question={question} answer={this.props.answers[i]}/>;
                }
                else if (question.type == 1){
                    return <InputQuestion releaseMode={this.props.sheet.released} modelAnswer={this.props.modelAnswers[i]} color={color}   question={question} answer={this.props.answers[i]}/>;
                }
                else if (question.type == 3){
                    return <CodeQuestion releaseMode={this.props.sheet.released} modelAnswer={this.props.modelAnswers[i]}  color={color}   question={question} answer={this.props.answers[i]}/>;
                }
            }.bind(this));
            


        return <div >
               <Header onBack={this.onBack.bind(this)} foreground={color}  color="#fafafa" title={this.props.sheet.name} name={"leonardo"} subtitle={this.props.questions.length + " questions"}>
              
               </Header>
                <div
                    style={{
                          width:"600px",
                          marginBottom:"50px",
                          marginTop:"80px",
                          marginLeft:"auto",
                          marginRight:"auto",
                          boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.0);",
                          border:"1px solid lightgray"
                    }}>
                    
                    <div style={{background:"white",textAlign:"center"}}>
                        <img style={{height:"300px", display:"inline-block"}} src={ this.props.percentage > 66 ? "/assets/l3.png": "/assets/l1.png"}/>
                        <h1 style={{ color:this.props.lecture.color , fontFamily:"Helvetica",fontWeight:"200",paddingBottom:"10px" , textAlign:"center"}}>{this.props.percentage+"%"}</h1>
                    </div>
                    
                    {questions}
                    <div style={{height:"0px"}}>
                        <h1 style={{
                            visibility:"collapse",
                            verticalAlign:"middle",
                            textAlign:"center",
                            lineHeight:"65px",
                            fontSize:"25px",
                            margin:"0px"
                        }}>~</h1>
                    </div>
               </div>
               
               
            </div>
    }
    
    onBack(){
        window.location.href = "/lectures/" + this.props.lecture.id;
    }
}


$.get(
    "/api/sheet/full",
    {lecture_id : lecture_id , sheet_id : sheet_id},
    ({lecture , sheet , questions , answers , modelAnswers , percentage}) => {
        for(var i of answers){
            if(i.result == undefined) i.result = {correct:"false" , errors:""}
            else{
                i.result = JSON.parse(i.result);
            }
        }
        console.log()
        ReactDOM.render(
                    React.createElement(SheetEditPage , {percentage:percentage , sheet:sheet , questions:questions ,
                        answers : answers, modelAnswers: modelAnswers,
                         lecture:new Lecture(lecture.id , lecture.name , lecture.author , lecture.color,lecture.sheets)}),
                    document.getElementById('root')
                );  
             
    }
)