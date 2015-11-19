//=require ./SheetEditor/ChoiceQuestion
//=require ./SheetEditor/InputQuestion

class SheetEditPage extends React.Component {
    render() {

        var questions = this.props.questions.map(function(question,i){
            //console.log(question.type);
            question.type = question.type == null ? 0 : question.type;
                if(question.type == 0) {
                    return <ChoiceQuestion sheet={this.props.sheet} question={question} answer={answers[i]}/>;
                }
            else if (question.type == 1){
                    return <InputQuestion sheet={this.props.sheet} question={question} answer={answers[i]}/>;
                }
                else if (question.type == 2){
                    return <DrawingQuestion sheet={this.props.sheet} question={question} answer={answers[i]}/>;
                }
            }.bind(this));


        return <div style={{background:"white"}}>
               <div className="header">
                   <h1 className="sheet-title"> {this.props.sheet.name} </h1>
                <h2 className="sheet-description"> {this.props.sheet.description} </h2>
                   </div>
                <div className="page-editor" >
                    {questions}
               </div>
            </div>
    }
}