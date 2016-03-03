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
var Color = (function (_super) {
    __extends(Color, _super);
    function Color(props) {
        _super.call(this, props);
    }
    Color.prototype.render = function () {
        var style = {
            display: "inline-block",
            width: "30px",
            height: "30px",
            background: this.props.color,
            borderBottom: "2px solid rgba(0,0,0,0.3)",
            transform: this.props.selected ? "scaleX(1.2) scaleY(1.2)" : "",
            margin: "5px",
            borderRadius: "10px"
        };
        return React.createElement("div", {"onClick": this.onClick.bind(this), "style": style});
    };
    Color.prototype.onClick = function () {
        this.props.onClick(this.props.index);
    };
    return Color;
})(React.Component);
var ColorPickerProps = (function () {
    function ColorPickerProps() {
    }
    return ColorPickerProps;
})();
var ColorPicker = (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker(props) {
        _super.call(this, props);
        this.colors = [
            "red", "green", "dodgerblue", "#E8D70C", "#0DFF62", "#FF9F0D",
            "#5A0000", "#232E59", "#514E67", "#C46BD4"
        ];
        this.state = { selected: 0 };
    }
    ColorPicker.prototype.render = function () {
        var _this = this;
        var items = this.colors.map(function (color, index) { return React.createElement(Color, {"index": index, "onClick": _this.colorClicked.bind(_this), "selected": index == _this.state.selected, "key": index, "color": color}); });
        return React.createElement("div", {"style": { paddingTop: "10px" }}, items);
    };
    ColorPicker.prototype.colorClicked = function (index) {
        console.log(index);
        this.setState({ selected: index });
        this.props.onPicked(this.colors[index]);
    };
    return ColorPicker;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="../../api.ts" />
/// <reference path="../shared/TextBox.tsx" />
/// <reference path="../shared/ColorPicker.tsx" />
var LectureCreatorPageProps = (function () {
    function LectureCreatorPageProps() {
    }
    return LectureCreatorPageProps;
})();
var LectureCreatorPage = (function (_super) {
    __extends(LectureCreatorPage, _super);
    function LectureCreatorPage(props) {
        _super.call(this, props);
        this.state = {
            color: "#4caf50",
            name: ""
        };
    }
    LectureCreatorPage.prototype.render = function () {
        var containerStyle = {
            border: "1px solid " + this.state.color,
            padding: "10px",
            boxShadow: "0px 5px 13px -1px rgba(0,0,0,0.0)",
            background: "white",
            borderRadius: "5px",
            margin: "20px",
            marginTop: "100px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "500px"
        };
        return React.createElement("div", null, React.createElement(Header, {"onBack": this.onBack.bind(this), "foreground": this.state.color || "darkgray", "title": "Creating new sheet", "subtitle": "", "color": "transparent", "name": "leonardo"}), React.createElement("div", {"style": containerStyle}, React.createElement(TextBox, {"onChange": this.onNameChange.bind(this), "placeholder": "Lecture title", "fontSize": "15pt"}), React.createElement(ColorPicker, {"onPicked": this.onColorChange.bind(this)}), React.createElement(LCButton, {"onClick": this.createLecture.bind(this), "text": "Create " + this.state.name, "color": this.state.color})));
    };
    LectureCreatorPage.prototype.onBack = function () {
        window.location.href = "/lectures/";
    };
    LectureCreatorPage.prototype.onColorChange = function (color) {
        this.setState({ color: color });
    };
    LectureCreatorPage.prototype.onNameChange = function (e) {
        this.setState({ name: e.target.value });
    };
    LectureCreatorPage.prototype.createLecture = function () {
        var params = { name: this.state.name, color: this.state.color };
        $.post("/api/create/lecture", params).then(function (data) {
            window.location.href = "/lectures/" + data;
        });
    };
    return LectureCreatorPage;
})(React.Component);
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/LectureCreator/../../typing/react-global.d.ts" />
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/LectureCreator/./LectureCreatorPage.tsx" />
ReactDOM.render(React.createElement(LectureCreatorPage), document.getElementById('root'));
