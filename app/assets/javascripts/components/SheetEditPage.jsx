//=require ./SheetEditor/ChoiceQuestion

class SheetEditPage extends React.Component {
    render() {

        var questions = this.props.questions.map(function(question){return <ChoiceQuestion question={question}/>;});
        return <div>
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