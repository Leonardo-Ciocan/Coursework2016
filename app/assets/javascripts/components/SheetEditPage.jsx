
var React = require("react");
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var material = {
    Paper : require('material-ui/lib/paper'),
    TextField : require('material-ui/lib/text-field'),
    AppBar : require('material-ui/lib/app-bar'),
    MenuItem : require('material-ui/lib/menus/icon-menu'),
    IconMenu : require('material-ui/lib/menus/menu-item'),
    MoreVertIcon : require('material-ui/lib/svg-icons/navigation/more-vert'),
    NavigationClose : require('material-ui/lib/svg-icons/navigation/close'),
    IconButton : require('material-ui/lib/icon-button')
};

var InputQuestion = require("./SheetEditor/InputQuestion.jsx")(material,React);
var DrawingQuestion = require("./SheetEditor/DrawingQuestion.jsx")(material,React);
var ChoiceQuestion = require("./SheetEditor/ChoiceQuestion.jsx")(material,React);


class SheetEditPage extends React.Component {
    render() {
        window.color= "#2C76DE";
        var questions = this.props.questions.map(function(question,i){
            //console.log(question.type);
            question.type = question.type == null ? 0 : question.type;
                if(question.type == 0) {
                    return <ChoiceQuestion key={question.id} sheet={this.props.sheet} question={question} answer={answers[i]}/>;
                }
            else if (question.type == 1){
                    return <InputQuestion key={question.id} sheet={this.props.sheet} question={question} answer={answers[i]}/>;
                }
                else if (question.type == 2){
                    return <DrawingQuestion key={question.id} sheet={this.props.sheet} question={question} answer={answers[i]}/>;
                }
            }.bind(this));


        return <div style={{background:"white"}}>

            <material.AppBar
                title={<span>{this.props.sheet.title}</span>}
                iconElementLeft={<material.IconButton><material.NavigationClose /></material.IconButton>}
                 />


                <div className="page-editor" >
                    {questions}
               </div>
            </div>
    }
}

console.log("hello");
ReactDOM.render(
    React.createElement(SheetEditPage , {sheet:sheet , questions:questions}),
    document.getElementById('root')
);