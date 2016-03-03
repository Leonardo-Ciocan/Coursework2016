/// <reference path="../../typing/react-global.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
/// <reference path="../../typing/react-global.d.ts" />
var CheckBox = (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox(p) {
        _super.call(this, p);
        this.state = { checked: false };
    }
    CheckBox.prototype.render = function () {
        var containerStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            margin: "5px"
        };
        var boxStyle = {
            border: "1px solid " + this.props.color,
            borderRadius: "10px",
            width: "20px",
            height: "20px"
        };
        var innerBoxStyle = {
            border: "3px solid white",
            background: this.state.checked ? this.props.color : "",
            borderRadius: "10px",
            width: "18px",
            height: "18px"
        };
        return React.createElement("div", {"onClick": this.onClicked.bind(this), "style": containerStyle}, React.createElement("div", {"style": boxStyle}, React.createElement("div", {"style": innerBoxStyle})));
    };
    CheckBox.prototype.onClicked = function () {
        this.setState({ checked: !this.state.checked });
        if (this.props.onChange != undefined)
            this.props.onChange(this.state.checked);
    };
    return CheckBox;
})(React.Component);
var Question = (function () {
    function Question() {
    }
    return Question;
})();
var ChoiceQuestion = (function (_super) {
    __extends(ChoiceQuestion, _super);
    function ChoiceQuestion(title, subtitle, id, choices) {
        _super.call(this);
        this.title = title;
        this.subtitle = subtitle;
        this.id = id;
        this.choices = choices;
    }
    return ChoiceQuestion;
})(Question);
/// <reference path="../../models/Question.ts" />
var RQuestion = (function (_super) {
    __extends(RQuestion, _super);
    function RQuestion() {
        _super.apply(this, arguments);
        this.answers = new Array();
    }
    return RQuestion;
})(Question);
/// <reference path="../../typing/react-global.d.ts" />
var TextBox = (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        _super.apply(this, arguments);
    }
    TextBox.prototype.render = function () {
        var inputStyle = {
            textAlignment: "center",
            padding: "5px",
            width: "100%",
            fontSize: this.props.fontSize || "15pt",
            border: "1px solid lightgray",
            background: "rgba(0,0,0,0.02)",
            borderRadius: "5px"
        };
        if (this.props.style != undefined)
            $.extend(inputStyle, this.props.style);
        return React.createElement("input", {"defaultValue": this.props.text || "", "onChange": this.props.onChange || function () { }, "placeholder": this.props.placeholder, "style": inputStyle});
    };
    return TextBox;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Checkbox.tsx" />
/// <reference path="./Answer.ts" />
/// <reference path="../shared/TextBox.tsx" />
var ChoiceCreatorAnswer = (function (_super) {
    __extends(ChoiceCreatorAnswer, _super);
    function ChoiceCreatorAnswer() {
        _super.apply(this, arguments);
    }
    ChoiceCreatorAnswer.prototype.render = function () {
        var containerStyle = {
            marginRight: "10px",
            marginLeft: "10px",
            marginTop: "10px",
            marginBottom: "20px"
        };
        var inputStyle = {
            textAlignment: "center",
            padding: "5px",
            width: "250px",
            fontSize: "12pt",
            border: "1px solid lightgray",
            borderRadius: "5px",
            marginLeft: "10px"
        };
        return React.createElement("div", {"style": containerStyle}, React.createElement("div", {"style": { width: "50px", display: "inline-block" }}, React.createElement(CheckBox, {"onChange": this.checkChanged.bind(this), "color": this.props.color})), React.createElement(TextBox, {"onChange": this.textChanged.bind(this), "placeholder": "Answer", "style": inputStyle}), React.createElement("a", {"onClick": this.onDelete.bind(this), "style": { cursor: "pointer", color: "red", marginLeft: "10px", fontWeight: "bold" }}, "Delete"));
    };
    ChoiceCreatorAnswer.prototype.onDelete = function () {
        this.props.onDelete(this.props.answer);
    };
    ChoiceCreatorAnswer.prototype.textChanged = function (e) {
        this.props.answer.text = e.target.value;
    };
    ChoiceCreatorAnswer.prototype.checkChanged = function (checked) {
        this.props.answer.isAnswer = checked;
    };
    return ChoiceCreatorAnswer;
})(React.Component);
var IDFactory = (function () {
    function IDFactory() {
    }
    IDFactory.getNumber = function () {
        this.counter++;
        return this.counter;
    };
    IDFactory.counter = 0;
    return IDFactory;
})();
/// <reference path="../../typing/react-global.d.ts" />
var TextArea = (function (_super) {
    __extends(TextArea, _super);
    function TextArea() {
        _super.apply(this, arguments);
    }
    TextArea.prototype.render = function () {
        var inputStyle = {
            textAlignment: "center",
            padding: "5px",
            width: "100%",
            fontSize: this.props.fontSize || "15pt",
            border: "1px solid lightgray",
            background: "rgba(0,0,0,0.02)",
            borderRadius: "5px"
        };
        return React.createElement("textarea", {"defaultValue": this.props.text, "rows": 4, "onChange": this.props.onChange || function () { }, "placeholder": this.props.placeholder, "style": inputStyle});
    };
    return TextArea;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
var MDPreview = (function (_super) {
    __extends(MDPreview, _super);
    function MDPreview(p) {
        _super.call(this, p);
        this.state = { code: " " };
    }
    MDPreview.prototype.render = function () {
        var containerStyle = {
            padding: "10px",
            borderTop: "1px solid lightgray",
            marginLeft: "-10px",
            marginRight: "-10px"
        };
        return React.createElement("div", {"style": containerStyle}, React.createElement("span", {"style": { display: "block", fontSize: "12pt", color: "gray", textAlign: "center", width: "100%" }}, "Question preview"), React.createElement("div", {"dangerouslySetInnerHTML": { __html: md.render(this.props.code) }}));
    };
    return MDPreview;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./ChoiceCreatorAnswer.tsx" />
/// <reference path="./Answer.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="../../models/Question.ts" />
/// <reference path="../shared/TextArea.tsx" />
/// <reference path="../shared/MDPreview.tsx" />
var ChoiceCreator = (function (_super) {
    __extends(ChoiceCreator, _super);
    function ChoiceCreator(props) {
        _super.call(this, props);
        this.state = {
            answers: this.props.question.answers
        };
    }
    ChoiceCreator.prototype.render = function () {
        var _this = this;
        var containerStyle = {
            border: "1px solid lightgray",
            padding: "10px",
            boxShadow: "0px 5px 13px -1px rgba(0,0,0,0.00)",
            background: "white",
            borderRadius: "5px",
            margin: "20px",
            position: "relative"
        };
        var inputStyle = {
            textAlignment: "center",
            padding: "5px",
            width: "100%",
            fontSize: "15pt",
            border: "1px solid lightgray",
            background: "rgba(0,0,0,0.05)",
            borderRadius: "5px"
        };
        var inputSubStyle = {
            textAlignment: "center",
            border: "none",
            padding: "5px",
            marginBottom: "5px",
            width: "100%",
            fontSize: "12pt",
            color: "gray"
        };
        var answerContainer = {
            marginLeft: "-10px",
            marginRight: "-10px",
            marginBottom: "-10px",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            borderTop: "1px solid rgba(0,0,0,0.15)",
            padding: "10px",
            position: "relative"
        };
        var addButtonStyle = {
            border: "2px dashed gray",
            color: "gray",
            borderRadius: "5px",
            fontWeight: "bold",
            margin: "10px",
            padding: "10px",
            display: "inline-block",
            cursor: "pointer",
        };
        var numberStyle = {
            color: "black",
            borderRadius: "100%",
            position: "absolute",
            top: "10px",
            left: "-35px",
            border: "1px solid gray",
            width: "25px",
            height: "25px",
            lineHeight: "23px",
            verticalAlign: "middle",
            textAlign: "center",
            fontWeight: "bold"
        };
        var deleteStyle = {
            color: "black",
            borderRadius: "100%",
            position: "absolute",
            top: "10px",
            right: "-35px",
            border: "1px solid gray",
            width: "25px",
            height: "25px",
            lineHeight: "23px",
            verticalAlign: "middle",
            textAlign: "center",
            fontWeight: "bold"
        };
        var answers = this.state.answers.map(function (answer) {
            return React.createElement(ChoiceCreatorAnswer, {"key": answer.id, "onDelete": _this.onDeleteAnswer.bind(_this), "answer": answer, "color": _this.props.color});
        });
        return React.createElement("div", {"style": containerStyle}, React.createElement("div", {"style": {
            background: "rgba(0,0,0,0.03)",
            padding: "10px",
            marginTop: "-10px",
            marginLeft: "-10px",
            marginRight: "-10px",
            marginBottom: "10px",
            borderBottom: "1px solid lightgray"
        }}, React.createElement("span", null, "Question 1"), React.createElement("span", {"style": { color: "gray", marginRight: "10px", marginTop: "-10px", marginBottom: "-10px" }}, " | Multiple Choice"), React.createElement("a", {"style": { cursor: "pointer", color: "red", marginLeft: "10px", fontWeight: "bold", float: "right" }}, "Delete")), React.createElement(TextArea, {"fontSize": "10pt", "onChange": this.titleChanged.bind(this), "placeholder": "Question title"}), React.createElement("input", {"onChange": this.subtitleChanged.bind(this), "placeholder": "Subtitle", "style": inputSubStyle}), React.createElement(MDPreview, {"code": this.props.question.title || ""}), React.createElement("div", {"style": answerContainer}, React.createElement("div", {"style": {
            background: "rgba(0,0,0,0.025)",
            borderRight: "1px solid lightgray",
            position: "absolute",
            left: 0, top: 0, bottom: 0, width: "65px",
            zIndex: 0,
            pointerEvents: "none"
        }}), React.createElement("div", null, React.createElement("span", {"style": { visibility: this.state.answers.length == 0 ? "collapse" : "visible", width: "100px", marginRight: "10px" }}, "Correct ")), answers, React.createElement("a", {"onClick": this.createAnswer.bind(this), "style": {
            cursor: "pointer", color: this.props.color, marginTop: "0", marginLeft: "70px", fontWeight: "bold"
        }}, "New answer")));
    };
    ChoiceCreator.prototype.titleChanged = function (e) {
        this.props.question.title = e.target.value;
        this.setState({});
    };
    ChoiceCreator.prototype.subtitleChanged = function (e) {
        this.props.question.subtitle = e.target.value;
    };
    ChoiceCreator.prototype.onDeleteAnswer = function (answer) {
        var index = this.state.answers.indexOf(answer);
        if (index >= 0) {
            this.state.answers.splice(index, 1);
        }
        this.setState({ answers: this.state.answers });
    };
    ChoiceCreator.prototype.createAnswer = function () {
        this.state.answers.push({ text: "", isAnswer: false, id: IDFactory.getNumber() });
        this.setState({ answers: this.state.answers });
    };
    return ChoiceCreator;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./ChoiceCreatorAnswer.tsx" />
/// <reference path="./Answer.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="../../models/Question.ts" />
/// <reference path="../shared/TextBox.tsx" />
var InputCreatorState = (function () {
    function InputCreatorState() {
    }
    return InputCreatorState;
})();
var InputCreator = (function (_super) {
    __extends(InputCreator, _super);
    function InputCreator(props) {
        _super.call(this, props);
    }
    InputCreator.prototype.render = function () {
        var containerStyle = {
            border: "1px solid lightgray",
            padding: "10px",
            boxShadow: "0px 5px 13px -1px rgba(0,0,0,0.00)",
            background: "white",
            borderRadius: "5px",
            margin: "20px",
            position: "relative"
        };
        var inputStyle = {
            textAlignment: "center",
            padding: "5px",
            width: "100%",
            fontSize: "13pt",
            border: "1px solid lightgray",
            borderRadius: "5px"
        };
        var answerStyle = {
            textAlignment: "center",
            padding: "5px",
            width: "100%",
            fontSize: "13pt",
            border: "1px solid lightgray",
            background: "rgba(0,0,0,0.05)",
            borderRadius: "5px"
        };
        var inputSubStyle = {
            textAlignment: "center",
            border: "none",
            padding: "5px",
            marginBottom: "5px",
            width: "100%",
            fontSize: "12pt",
            color: "gray"
        };
        var answerContainer = {
            marginLeft: "-10px",
            marginRight: "-10px",
            marginBottom: "-10px",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            borderTop: "1px solid rgba(0,0,0,0.15)",
            padding: "10px",
            position: "relative"
        };
        var addButtonStyle = {
            border: "2px dashed gray",
            color: "gray",
            borderRadius: "5px",
            fontWeight: "bold",
            margin: "10px",
            padding: "10px",
            display: "inline-block",
            cursor: "pointer",
        };
        var numberStyle = {
            color: "black",
            borderRadius: "100%",
            position: "absolute",
            top: "10px",
            left: "-35px",
            border: "1px solid gray",
            width: "25px",
            height: "25px",
            lineHeight: "23px",
            verticalAlign: "middle",
            textAlign: "center",
            fontWeight: "bold"
        };
        var deleteStyle = {
            color: "gray",
            borderRadius: "100%",
            position: "absolute",
            top: "10px",
            right: "-35px",
            width: "25px",
            height: "25px",
            lineHeight: "23px",
            verticalAlign: "middle",
            textAlign: "center",
            fontWeight: "bold"
        };
        return React.createElement("div", {"style": containerStyle}, React.createElement("div", {"style": {
            background: "rgba(0,0,0,0.03)",
            padding: "10px",
            marginTop: "-10px",
            marginLeft: "-10px",
            marginRight: "-10px",
            marginBottom: "10px",
            borderBottom: "1px solid lightgray"
        }}, React.createElement("span", null, "Question 1"), React.createElement("span", {"style": { color: "gray", marginRight: "10px", marginTop: "-10px", marginBottom: "-10px" }}, " | Text"), React.createElement("a", {"style": { cursor: "pointer", color: "red", marginLeft: "10px", fontWeight: "bold", float: "right" }}, "Delete")), React.createElement(TextBox, {"onChange": this.titleChanged.bind(this), "placeholder": "Question title", "style": inputStyle}), React.createElement("input", {"onChange": this.subtitleChanged.bind(this), "placeholder": "Subtitle", "style": inputSubStyle}), React.createElement("div", {"style": { paddingTop: "10px", borderTop: "1px solid lightgray", marginRight: "-10px", marginLeft: "-10px" }}), React.createElement(TextBox, {"onChange": this.answerChanged.bind(this), "placeholder": "Regex of valid answer", "style": inputStyle}));
    };
    InputCreator.prototype.titleChanged = function (e) {
        this.props.question.title = e.target.value;
    };
    InputCreator.prototype.subtitleChanged = function (e) {
        this.props.question.subtitle = e.target.value;
    };
    InputCreator.prototype.answerChanged = function (e) {
        this.props.question.correct_answer = e.target.value;
    };
    return InputCreator;
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
var Sheet = (function () {
    function Sheet(id, description, name) {
        this.id = id;
        this.description = description;
        this.name = name;
    }
    return Sheet;
})();
/// <reference path="./models/Question.ts" />
/// <reference path="./models/Sheet.ts" />
/// <reference path="./typing/jquery.d.ts" />
var API = (function () {
    function API() {
    }
    API.createSheet = function (lecture_id, sheet, questions) {
    };
    return API;
})();
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="./ChoiceCreator.tsx" />
/// <reference path="./InputCreator.tsx" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="./Answer.ts" />
/// <reference path="../../api.ts" />
/// <reference path="../shared/TextBox.tsx" />
var SheetCreatorPageProps = (function () {
    function SheetCreatorPageProps() {
    }
    return SheetCreatorPageProps;
})();
var SheetCreatorPage = (function (_super) {
    __extends(SheetCreatorPage, _super);
    function SheetCreatorPage(props) {
        _super.call(this, props);
        var qs = new RQuestion();
        qs.type = 1;
        qs.id = IDFactory.getNumber();
        this.state = {
            items: [qs],
            name: ""
        };
    }
    SheetCreatorPage.prototype.render = function () {
        var _this = this;
        var editorStyle = {
            marginTop: "100px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "10px",
            width: "500px"
        };
        var footerContainer = {
            borderBottom: "1px solid lightgray",
            paddingLeft: "20px",
            paddingRight: "20px"
        };
        var addButtonStyle = {
            border: "2px solid rgba(255,0,0,1)",
            background: "rgba(255,0,0,0.6)",
            color: "white",
            borderRadius: "5px",
            fontWeight: "bold",
            margin: "10px",
            padding: "10px",
            display: "inline-block",
            cursor: "pointer"
        };
        var items = this.state.items.map(function (item) {
            if (item.type == 0) {
                return React.createElement(ChoiceCreator, {"key": item.id, "question": item, "color": _this.props.lecture.color});
            }
            else if (item.type == 1) {
                return React.createElement(InputCreator, {"key": item.id, "question": item, "color": _this.props.lecture.color});
            }
        });
        return React.createElement("div", null, React.createElement(Header, {"onBack": this.onBack.bind(this), "title": "Creating new sheet", "subtitle": "For " + this.props.lecture.name, "color": "#fafafa", "foreground": this.props.lecture.color, "name": "leonardo"}), React.createElement("div", {"style": editorStyle}, React.createElement("div", null, React.createElement("div", {"style": {
            paddingLeft: "20px",
            paddingRight: "20px" }}, React.createElement(TextBox, {"onChange": this.onNameChange.bind(this), "placeholder": "Sheet name"})), items), React.createElement("div", {"style": footerContainer}, React.createElement("span", null, "Create question : "), React.createElement(LCButton, {"text": "Multiple Choice", "onClick": this.addMultipleChoice.bind(this), "color": "gray"}), React.createElement(LCButton, {"text": "Input", "onClick": this.addInputQuestion.bind(this), "color": "gray"})), React.createElement("div", {"style": { display: "inline-block", float: "right",
            paddingLeft: "20px",
            paddingRight: "20px" }}, React.createElement(LCButton, {"onClick": this.createSheet.bind(this), "text": "Create sheet", "color": this.props.lecture.color}))));
    };
    SheetCreatorPage.prototype.onNameChange = function (e) {
        this.setState({ name: e.target.value });
    };
    SheetCreatorPage.prototype.onBack = function () {
        window.location.href = "/lectures/" + this.props.lecture.id;
    };
    SheetCreatorPage.prototype.addMultipleChoice = function () {
        var qs = new RQuestion();
        qs.type = 0;
        qs.id = IDFactory.getNumber();
        this.state.items.push(qs);
        this.setState({ items: this.state.items });
    };
    SheetCreatorPage.prototype.addInputQuestion = function () {
        var qs = new RQuestion();
        qs.type = 1;
        qs.id = IDFactory.getNumber();
        this.state.items.push(qs);
        this.setState({ items: this.state.items });
    };
    SheetCreatorPage.prototype.createSheet = function () {
        var _this = this;
        console.log(this.state.items);
        var questions = this.state.items.map(function (item) {
            var newQuestion = new Question();
            newQuestion.title = item.title;
            newQuestion.subtitle = item.subtitle;
            newQuestion.type = item.type;
            if (item.type == 0) {
                var data = {
                    answers: item.answers.map(function (answer) { return answer.text; })
                };
                newQuestion.data = JSON.stringify(data);
                newQuestion.correct_answer = "" + item.answers.indexOf(item.answers.filter(function (answer) { return answer.isAnswer; })[0]);
            }
            else if (item.type == 1) {
                newQuestion.correct_answer = item.correct_answer;
            }
            return newQuestion;
        });
        var sheet = new Sheet(0, "description here", this.state.name);
        $.post("/api/create/sheet", {
            sheet: sheet,
            questions: questions,
            lecture_id: lecture_id
        }).then(function () { return window.location.href = "/lectures/" + _this.props.lecture.id; });
    };
    return SheetCreatorPage;
})(React.Component);
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/SheetCreator/../../typing/react-global.d.ts" />
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/SheetCreator/./SheetCreatorPage.tsx" />
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/SheetCreator/../../models/Lecture.ts" />
$.get("/api/lecture/", { id: lecture_id }, function (data) {
    ReactDOM.render(React.createElement(SheetCreatorPage, { lecture: new Lecture(data.id, data.name, data.author, data.color, data.sheets) }), document.getElementById('root'));
});

console.log("hi");
