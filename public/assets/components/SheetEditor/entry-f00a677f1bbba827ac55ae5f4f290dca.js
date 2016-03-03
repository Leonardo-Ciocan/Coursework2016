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
        var answerStyle = {
            border: "1px solid " + this.props.color,
            borderRadius: "2px",
            display: "inline-block",
            margin: "5px",
            cursor: "pointer",
            background: this.props.selected ? this.props.color : "white",
            color: !this.props.selected ? this.props.color : "white"
        };
        return React.createElement("div", {"style": answerStyle, "onClick": this.onClick.bind(this)}, React.createElement("h3", null, this.props.text));
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
    ChoiceQuestion.prototype.render = function () {
        var answers = JSON.parse(this.props.question.data.replace(/'/g, '"')).answers.map(function (a, i) {
            return React.createElement(ChoiceQuestionFragment, {"selected": i == this.state.selected, "index": i, "color": this.state.color, "key": i, "onPick": this.onPick.bind(this), "text": a});
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
        return React.createElement("div", {"className": "question-block"}, React.createElement("div", {"style": {
            background: "  white",
            margin: "0 auto",
            width: "100%",
            padding: "25px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            position: "relative",
            transition: "box-shadow 0.3s"
        }}, React.createElement("span", {"className": "question-title", "dangerouslySetInnerHTML": { __html: md.render(this.props.question.title) }}), React.createElement("h2", {"className": "question-subtitle"}, " ", this.props.question.subtitle, " "), React.createElement("div", {"style": { display: "inline-block" }}, answers)));
    };
    return ChoiceQuestion;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />
var InputProps = (function () {
    function InputProps() {
    }
    return InputProps;
})();
var InputQuestion = (function (_super) {
    __extends(InputQuestion, _super);
    function InputQuestion(props) {
        _super.call(this, props);
        this.state = {
            text: this.props.answer.data,
            color: this.props.color
        };
        console.log(this.state.selected);
    }
    InputQuestion.prototype.onChange = function (e) {
        $.post("/answer/" + this.props.answer.id, { data: e.target.value });
    };
    InputQuestion.prototype.mouseEnter = function (e) {
        //$(this.refs.card).css("box-shadow", "0 6px 15px 0 rgba(0,0,0,.22),0 6px 15px 0 rgba(0,0,0,.12)");
    };
    InputQuestion.prototype.mouseLeave = function (e) {
        //$(this.refs.card).css("box-shadow", "0 1px 6px 0 rgba(0,0,0,.12),0 1px 6px 0 rgba(0,0,0,.12)");
    };
    InputQuestion.prototype.render = function () {
        var iconStyle = {
            position: "absolute",
            left: "0%",
            top: "0%",
            marginLeft: "10px",
            padding: "10px",
            marginTop: "-17px",
            color: "orange",
            background: "white",
            border: "1px solid " + "orange",
            boxShadow: "0 1px 6px 0 rgba(0,0,0,.12),0 1px 6px 0 rgba(0,0,0,.12)",
            borderRadius: "100%"
        };
        var inputStyle = {
            width: "100%",
            border: "1px solid " + this.props.color,
            padding: "10px"
        };
        //<span style={iconStyle} className="glyphicon glyphicon-text-color"></span>
        return React.createElement("div", {"className": "question-block"}, React.createElement("div", {"onMouseEnter": this.mouseEnter.bind(this), "onMouseLeave": this.mouseLeave.bind(this), "style": {
            background: "  white",
            margin: "0 auto",
            width: "100%",
            padding: "25px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            position: "relative",
            transition: "box-shadow 0.3s"
        }}, React.createElement("span", {"className": "question-title"}, " ", this.props.question.title, " "), React.createElement("h2", {"className": "question-subtitle"}, " ", this.props.question.subtitle, " "), React.createElement("div", null, React.createElement("input", {"onChange": this.onChange.bind(this), "style": inputStyle, "defaultValue": this.state.text}))));
    };
    return InputQuestion;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
var SegmentedButton = (function (_super) {
    __extends(SegmentedButton, _super);
    function SegmentedButton(props) {
        _super.call(this, props);
        this.state = { selectedIndex: 0 };
    }
    SegmentedButton.prototype.render = function () {
        var _this = this;
        var buttons = this.props.labels.map(function (label, index) {
            var buttonStyle = {
                border: "1px solid " + _this.props.color,
                borderRightWidth: index >= 0 && index < _this.props.labels.length - 1 ? "0px" : "1px",
                color: index != _this.state.selectedIndex ? _this.props.color : "white",
                display: "inline-block",
                padding: "7px",
                paddingTop: "4px", paddingBottom: "4px",
                verticalAlign: "middle",
                borderTopRightRadius: index == _this.props.labels.length - 1 ? "5px" : "",
                borderBottomRightRadius: index == _this.props.labels.length - 1 ? "5px" : "",
                borderBottomLeftRadius: index == 0 ? "5px" : "",
                borderTopLeftRadius: index == 0 ? "5px" : "",
                cursor: "pointer",
                background: index == _this.state.selectedIndex ? _this.props.color : "white"
            };
            return React.createElement("div", {"style": buttonStyle, "onClick": function () { return _this.buttonClicked(index); }}, label);
        });
        return React.createElement("div", {"style": { textAlign: "center" }}, buttons);
    };
    SegmentedButton.prototype.buttonClicked = function (index) {
        this.setState({ selectedIndex: index });
    };
    return SegmentedButton;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/SegmentedButton.tsx" />
var WebQuestion = (function (_super) {
    __extends(WebQuestion, _super);
    function WebQuestion(props) {
        _super.call(this, props);
    }
    WebQuestion.prototype.render = function () {
        return React.createElement("div", {"className": "question-block"}, React.createElement("div", {"style": {
            background: "  white",
            margin: "0 auto",
            width: "100%",
            padding: "25px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            position: "relative",
            transition: "box-shadow 0.3s"
        }}, React.createElement(SegmentedButton, {"color": this.props.color, "labels": ["Goal", "Current", "HTML", "CSS"]})));
    };
    return WebQuestion;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
var LCButton = (function (_super) {
    __extends(LCButton, _super);
    function LCButton(p) {
        _super.call(this, p);
        this.state = { hovering: false };
    }
    LCButton.prototype.render = function () {
        var containerStyle = {
            border: "0px solid",
            borderColor: (this.state.hovering ? "rgba(0,0,0,0.2)" : this.props.color),
            background: this.state.hovering ? this.props.color : "transparent",
            color: this.state.hovering ? "white" : this.props.color,
            borderRadius: "5px",
            fontWeight: "bold",
            margin: "10px",
            padding: "8px",
            display: "inline-block",
            cursor: "pointer",
            textAlign: "center",
            borderBottomWidth: "0px",
            fontSize: "14px"
        };
        if (this.props.style != undefined)
            $.extend(containerStyle, this.props.style);
        return React.createElement("div", {"onMouseEnter": this.mouseEnter.bind(this), "onMouseLeave": this.mouseLeave.bind(this), "onClick": this.onClicked.bind(this), "style": containerStyle}, this.props.text);
    };
    LCButton.prototype.mouseEnter = function () {
        this.setState({ hovering: true });
    };
    LCButton.prototype.mouseLeave = function () {
        this.setState({ hovering: false });
    };
    LCButton.prototype.onClicked = function () {
        this.props.onClick();
    };
    return LCButton;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../shared/SegmentedButton.tsx" />
var CodeQuestionProps = (function () {
    function CodeQuestionProps() {
    }
    return CodeQuestionProps;
})();
var CodeQuestion = (function (_super) {
    __extends(CodeQuestion, _super);
    function CodeQuestion(props) {
        _super.call(this, props);
        this.state = { code: this.props.answer.data, correct: false };
    }
    CodeQuestion.prototype.render = function () {
        return React.createElement("div", {"className": "question-block"}, React.createElement("div", {"style": {
            background: "  white",
            margin: "0 auto",
            width: "100%",
            padding: "25px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            position: "relative",
            transition: "box-shadow 0.3s"
        }}, React.createElement("span", {"className": "question-title", "dangerouslySetInnerHTML": { __html: md.render(this.props.question.title) }}), React.createElement("h2", {"className": "question-subtitle"}, " ", this.props.question.subtitle, " "), React.createElement("div", {"style": { fontFamily: "Source Code Pro!important" }, "ref": "codeEditor"}), React.createElement("div", null, React.createElement("span", {"style": { color: this.state.correct ? "green" : "darkgray" }}, this.state.correct ? "Correct code" : "Incorrect code"), React.createElement(LCButton, {"onClick": this.commit.bind(this), "text": "Commit", "color": this.props.color}))));
    };
    CodeQuestion.prototype.commit = function () {
        $.post("/answer/" + this.props.answer.id, { data: this.state.code }).then(function (data) {
            this.setState({ correct: data == "true" });
        }.bind(this));
        console.log(this.state.code);
    };
    CodeQuestion.prototype.componentDidMount = function () {
        var myCodeMirror = CodeMirror(this.refs.codeEditor, {
            value: this.state.code,
            lineNumbers: true,
            theme: "base16-light" });
        myCodeMirror.on("change", function (cm, change) {
            this.setState({ code: cm.getValue() });
        }.bind(this));
        myCodeMirror.setSize("100%", "auto");
    };
    return CodeQuestion;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../../typing/jquery.d.ts" />
var Header = (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        _super.call(this, props);
        this.state = { showMenu: false };
    }
    Header.prototype.render = function () {
        var titleStyle = {
            margin: "0px",
            marginLeft: "55px",
            marginTop: "5px",
            color: this.props.foreground || "white",
            verticalAlign: "middle",
            textAlign: "center",
            lineHeight: "25px",
            fontSize: "13pt",
            fontFamily: "Open Sans"
        };
        var subtitleStyle = {
            margin: "0px",
            marginLeft: "55px",
            color: this.props.foreground || "white",
            verticalAlign: "top",
            textAlign: "center",
            lineHeight: "15px",
            fontSize: "8pt",
            fontFamily: "Open Sans"
        };
        var nameStyle = {
            margin: "auto",
            color: this.props.foreground || "white",
            verticalAlign: "middle",
            lineHeight: "50px",
            fontSize: "16px",
            position: "absolute",
            right: "0px",
            paddingRight: "10px",
            paddingLeft: "10px",
            top: "0px",
            fontFamily: "Open Sans",
            borderLeft: "1px solid lightgray",
            cursor: "pointer"
        };
        var iconStyle = {
            width: "50px",
            height: "50px",
            position: "absolute",
            left: "0px",
            top: "0",
            lineHeight: "50px",
            color: this.props.foreground || "white",
            paddingRight: "10px",
            paddingLeft: "10px",
            verticalAlign: "middle",
            fontSize: "18pt",
            cursor: "pointer",
            visibility: this.props.hideBack != true ? "visible" : "hidden",
            borderRight: "1px solid lightgray"
        };
        var menuStyle = {
            position: "absolute",
            right: "0",
            top: "50px",
            width: "200px",
            background: "#fafafa",
            borderLeft: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
            visibility: this.state.showMenu ? "visible" : "collapse"
        };
        return React.createElement("div", {"className": "header", "style": {
            height: "50px",
            background: this.props.color || "#fafafa",
            borderBottom: "1px solid rgba(0, 0, 0, 0.14)",
            paddingBottom: "5px"
        }}, React.createElement("h1", {"style": titleStyle}, " ", this.props.title), React.createElement("h1", {"style": subtitleStyle}, " ", this.props.subtitle), React.createElement("h1", {"onClick": this.clickMenu.bind(this), "style": nameStyle}, " ", this.props.name), React.createElement("i", {"onClick": this.props.onBack, "className": "fa fa-chevron-left", "style": iconStyle}), React.createElement("div", {"style": menuStyle}, React.createElement(LCButton, {"onClick": this.logout, "style": { display: "block" }, "color": "red", "text": "Log out"})));
    };
    Header.prototype.logout = function () {
        $.ajax({
            url: "/users/sign_out",
            type: "DELETE",
            success: function () { return window.location.href = "/users/sign_in"; }
        });
        window.location.href = "/users/sign_out";
    };
    Header.prototype.clickMenu = function () {
        this.setState({ showMenu: !this.state.showMenu });
    };
    return Header;
})(React.Component);
var Lecture = (function () {
    function Lecture(id, name, author, color, sheetCount) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.color = color;
        this.sheetCount = sheetCount;
    }
    return Lecture;
})();
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./ChoiceQuestion.tsx" />
/// <reference path="./InputQuestion.tsx" />
/// <reference path="./WebQuestion.tsx" />
/// <reference path="./CodeQuestion.tsx" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="../../models/Lecture.ts" />
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
        var color = this.props.lecture.color;
        var questions = this.props.questions.map(function (question, i) {
            //console.log(question.type);
            question.type = question.type == null ? 0 : question.type;
            if (question.type == 0) {
                return React.createElement(ChoiceQuestion, {"color": color, "question": question, "answer": answers[i]});
            }
            else if (question.type == 1) {
                return React.createElement(InputQuestion, {"color": color, "question": question, "answer": answers[i]});
            }
            else if (question.type == 3) {
                return React.createElement(CodeQuestion, {"color": color, "question": question, "answer": answers[i]});
            }
            else if (question.type == 4) {
                return React.createElement(WebQuestion, {"color": color});
            }
        }.bind(this));
        return React.createElement("div", null, React.createElement(Header, {"onBack": this.onBack.bind(this), "foreground": color, "color": "#fafafa", "title": this.props.sheet.name, "name": "leonardo", "subtitle": this.props.questions.length + " questions"}), React.createElement("div", {"className": "page-editor", "style": {
            width: "600px",
            marginBottom: "50px",
            marginTop: "80px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0px 5px 13px -1px rgba(0,0,0,0.0);",
            border: "1px solid lightgray"
        }}, questions, React.createElement("div", {"style": { height: "65px" }}, React.createElement("h1", {"style": {
            verticalAlign: "middle",
            textAlign: "center",
            lineHeight: "65px",
            fontSize: "25px",
            margin: "0px"
        }}, "That's all"))));
    };
    SheetEditPage.prototype.onBack = function () {
        window.location.href = "/lectures/" + this.props.sheet.lecture_id;
    };
    return SheetEditPage;
})(React.Component);
$.get("/api/lecture/", { id: lecture_id }, function (data) {
    ReactDOM.render(React.createElement(SheetEditPage, { sheet: sheet, questions: questions, lecture: new Lecture(data.id, data.name, data.author, data.color, data.sheets) }), document.getElementById('root'));
});
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/SheetEditor/./SheetEditPage.tsx" />
;
