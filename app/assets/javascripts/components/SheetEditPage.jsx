//=require ./SheetEditor/ChoiceQuestion
//=require ./SheetEditor/DrawingQuestion
//=require ./SheetEditor/InputQuestion
//=require ./shared/Header
class SheetEditPage extends React.Component {
    render() {
        window.color= "#2C76DE";
        document.background= window.color;
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


        return <div >
               <Header title={this.props.sheet.name} name={"leonardo"}>

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

console.log("hello");
ReactDOM.render(
    React.createElement(SheetEditPage , {sheet:sheet , questions:questions}),
    document.getElementById('root')
);