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
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        _super.apply(this, arguments);
    }
    Dialog.prototype.render = function () {
        var containerStyle = {
            background: "rgba(255,255,255,0.55)",
            position: "fixed",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            zIndex: 999
        };
        var innerContainerStyle = {
            background: "white",
            width: "400px",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            padding: "20px",
            fontFamily: "Open Sans",
            boxShadow: "0px 0px 13px -1px rgba(0,0,0,0.19);",
            border: "1px solid lightgray",
            textAlign: "center"
        };
        var dialogTitle = {
            color: "black",
            margin: "0",
            fontSize: "15pt"
        };
        return React.createElement("div", {"style": containerStyle}, React.createElement("div", {"style": innerContainerStyle}, React.createElement("h1", {"style": dialogTitle}, this.props.title), this.props.content));
    };
    return Dialog;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
var RoundButton = (function (_super) {
    __extends(RoundButton, _super);
    function RoundButton() {
        _super.apply(this, arguments);
    }
    RoundButton.prototype.render = function () {
        var buttonStyle = {
            borderRadius: "100%",
            background: this.props.background || "green",
            color: this.props.foreground || "rgba(0,0,0,0.5)",
            width: "30px",
            height: "30px",
            border: "2px solid rgba(0,0,0,0.3)",
            display: "inline-block"
        };
        return React.createElement("div", {"onClick": this.props.onClick || function () { }, "style": buttonStyle}, React.createElement("span", {"style": { verticalAlign: "middle", textAlign: "center", lineHeight: "28px", width: "100%" }, "className": "fa fa-plus"}));
    };
    return RoundButton;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../shared/Dialog.tsx" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../shared/LCRoundButton.tsx" />
var LectureProps = (function () {
    function LectureProps() {
    }
    return LectureProps;
})();
var LectureItem = (function (_super) {
    __extends(LectureItem, _super);
    function LectureItem() {
        _super.apply(this, arguments);
    }
    LectureItem.prototype.clicked = function () {
        window.location.href = "/lectures/" + this.props.lecture.id;
    };
    LectureItem.prototype.render = function () {
        var containerStyle = {
            display: "inline-block",
            width: "230px",
            height: "100px",
            borderRadius: "5px",
            background: this.props.lecture.color,
            margin: "10px",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative"
        };
        var titleStyle = {
            fontSize: "13pt",
            color: "white",
            textAlign: "left",
            padding: "4px",
            margin: "10px"
        };
        var descriptionStyle = {
            fontSize: "10pt",
            color: "white",
            position: "absolute",
            left: "0", right: "0", bottom: "0",
            textAlign: "center",
            padding: "8px",
            background: "rgba(255,255,255,0.2)",
            margin: "0"
        };
        return React.createElement("div", {"style": containerStyle, "onClick": this.clicked.bind(this)}, React.createElement("h1", {"style": titleStyle}, this.props.lecture.name), React.createElement("h2", {"style": descriptionStyle}, this.props.lecture.sheetCount + " sheets"));
    };
    return LectureItem;
})(React.Component);
var LecturePageProps = (function () {
    function LecturePageProps() {
    }
    return LecturePageProps;
})();
var LecturePage = (function (_super) {
    __extends(LecturePage, _super);
    function LecturePage(p) {
        _super.call(this, p);
    }
    LecturePage.prototype.render = function () {
        var created = this.props.created.map(function (lecture) {
            return React.createElement(LectureItem, {"lecture": lecture});
        });
        var subscribed = this.props.subscribed.map(function (lecture) {
            return React.createElement(LectureItem, {"lecture": lecture});
        });
        var inputStyle = { border: "none", borderBottom: "1px solid gray" };
        var parentStyle = { position: "relative", margin: "20px", marginTop: "60px" };
        return React.createElement("div", null, React.createElement(Header, {"hideBack": true, "color": "#fafafa", "foreground": "black", "name": "leonardo", "title": "Your lectures", "subtitle": "Subscribed to " + this.props.subscribed.length + " | Created " + this.props.created.length}), React.createElement("div", {"style": parentStyle}, React.createElement("div", {"style": { marginTop: "30px" }}, React.createElement("span", {"style": { lineHeight: "30px", verticalAlign: "middle", fontSize: "15pt", margin: "10px" }}, "Lectures you're subscribed to")), subscribed, React.createElement("div", {"style": { marginTop: "10px", paddingTop: "10px" }}, React.createElement("span", {"style": { lineHeight: "30px", verticalAlign: "middle", fontSize: "15pt", margin: "10px" }}, "Your own lectures"), React.createElement(RoundButton, {"onClick": this.createLecture, "background": "transparent"})), created));
    };
    LecturePage.prototype.createLecture = function () {
        window.location.href = "/create/lecture";
    };
    return LecturePage;
})(React.Component);
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/Lectures/./lectures.tsx" />
$.get("/api/lectures", function (data) {
    var arr = [];
    for (var _i = 0, _a = data.created; _i < _a.length; _i++) {
        var i = _a[_i];
        arr.push(new Lecture(i.id, i.name, i.author, i.color, i.sheets));
    }
    var s_arr = [];
    for (var _b = 0, _c = data.subscribed; _b < _c.length; _b++) {
        var i = _c[_b];
        s_arr.push(new Lecture(i.id, i.name, i.author, i.color, i.sheets));
    }
    ReactDOM.render(React.createElement(LecturePage, { created: arr, subscribed: s_arr }), document.getElementById('root'));
});
