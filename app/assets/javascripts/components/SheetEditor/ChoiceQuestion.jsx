/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChoiceFragmentProps = (function () {
    function ChoiceFragmentProps() {
    }
    return ChoiceFragmentProps;
})();
var ChoiceProps = (function () {
    function ChoiceProps() {
    }
    return ChoiceProps;
})();
var ChoiceQuestionFragment = (function (_super) {
    __extends(ChoiceQuestionFragment, _super);
    function ChoiceQuestionFragment() {
        _super.apply(this, arguments);
    }
    ChoiceQuestionFragment.prototype.onClick = function () {
        this.props.onPick(this.props.index);
    };
    ChoiceQuestionFragment.prototype.render = function () {
        console.log(this.props.selected);
        var answerStyle = {
            border: "1px solid " + this.props.color,
            borderRadius: "2px",
            display: "inline-block",
            margin: "5px",
            cursor: "pointer",
            background: this.props.selected ? this.props.color : "white",
            color: !this.props.selected ? this.props.color : "white"
        };
        return (<div style={answerStyle} onClick={this.onClick.bind(this)}>
                <h3>{this.props.text}</h3>
            </div>);
    };
    return ChoiceQuestionFragment;
})(React.Component);
var ChoiceQuestion = (function (_super) {
    __extends(ChoiceQuestion, _super);
    function ChoiceQuestion(props) {
        _super.call(this, props);
        this.state = {
            selected: parseInt(this.props.answer.data),
            color: this.props.color || "red"
        };
        console.log(this.state.selected);
    }
    ChoiceQuestion.prototype.onPick = function (index) {
        console.log("/answer/" + this.props.answer.id);
        this.setState({ selected: index });
        $.post("/answer/" + this.props.answer.id, { data: index + "" });
    };
    ChoiceQuestion.prototype.mouseEnter = function (e) {
        //$(this.refs.card).css("box-shadow", "0 6px 15px 0 rgba(0,0,0,.22),0 6px 15px 0 rgba(0,0,0,.22)");
    };
    ChoiceQuestion.prototype.mouseLeave = function (e) {
        //$(this.refs.card).css("box-shadow", "0 1px 6px 0 rgba(0,0,0,.12),0 1px 6px 0 rgba(0,0,0,.12)");
    };
    ChoiceQuestion.prototype.render = function () {
        var answers = JSON.parse(this.props.question.data.replace(/'/g, '"')).answers.map(function (a, i) {
            return <ChoiceQuestionFragment selected={i == this.state.selected} index={i} color={this.state.color} key={i} onPick={this.onPick.bind(this)} text={a}/>;
        }.bind(this));
        var iconStyle = {
            position: "absolute",
            left: "-17px",
            top: "50%",
            padding: "10px",
            marginTop: "-17px",
            color: "purple",
            background: "white",
            border: "1px solid " + "gray",
            borderRadius: "100%"
        };
        return <div className="question-block">
                <div onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} style={{
            background: "  white",
            margin: "0 auto",
            width: "600px",
            padding: "35px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            position: "relative",
            transition: "box-shadow 0.3s"
        }}>


                    <h1 className="question-title"> {this.props.question.title} </h1>

                    <h2 className="question-subtitle"> {this.props.question.subtitle} </h2>

                    <div style={{ display: "inline-block" }}>{answers}</div>


                </div>
            </div>;
    };
    return ChoiceQuestion;
})(React.Component);
