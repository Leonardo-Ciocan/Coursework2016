var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typing/react-global" />
/// <reference path="./SheetEditor/ChoiceQuestion" />
/// <reference path="./SheetEditor/InputQuestion" />
/// <reference path="./shared/Header" />
console.log("hello");
var SheetEditPageProps = (function () {
    function SheetEditPageProps() {
    }
    return SheetEditPageProps;
})();
var SheetEditPage = (function (_super) {
    __extends(SheetEditPage, _super);
    function SheetEditPage() {
        _super.apply(this, arguments);
    }
    SheetEditPage.prototype.render = function () {
        var color = "purple";
        var questions = this.props.questions.map(function (question, i) {
            //console.log(question.type);
            question.type = question.type == null ? 0 : question.type;
            if (question.type == 0) {
                return <ChoiceQuestion color={color} question={question} answer={answers[i]}/>;
            }
            else if (question.type == 1) {
                return <InputQuestion color={color} question={question} answer={answers[i]}/>;
            }
        }.bind(this));
        return <div>
               <Header title={this.props.sheet.name} name={"leonardo"}>

               </Header>
                <div className="page-editor" style={{
            marginTop: "110px",
            width: "600px",
            marginBottom: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0px 5px 13px -1px rgba(0,0,0,0.19);"
        }}>
                    {questions}
                    <div style={{ height: "65px" }}>
                        <h1 style={{
            verticalAlign: "middle",
            textAlign: "center",
            lineHeight: "65px",
            fontSize: "25px",
            margin: "0px"
        }}>That's all folks</h1>
                    </div>
               </div>
            </div>;
    };
    return SheetEditPage;
})(React.Component);
ReactDOM.render(React.createElement(SheetEditPage, { sheet: sheet, questions: questions }), document.getElementById('root'));
