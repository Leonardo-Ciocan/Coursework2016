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
var Sheet = (function () {
    function Sheet(id, description, name) {
        this.id = id;
        this.description = description;
        this.name = name;
    }
    return Sheet;
})();
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../../models/Sheet.ts" />
/// <reference path="../../typing/jquery.d.ts" />
var SheetControl = (function (_super) {
    __extends(SheetControl, _super);
    function SheetControl() {
        _super.apply(this, arguments);
    }
    SheetControl.prototype.render = function () {
        var containerStyle = {
            float: "left",
            width: "200px",
            borderRadius: "2px",
            background: "white",
            margin: "20px",
            boxShadow: "0px 5px 13px -1px rgba(0,0,0,0.00)",
            overflow: "hidden",
            border: "1px solid lightgray"
        };
        var titleStyle = {
            background: "rgba(0,0,0,0.025)",
            fontSize: "10pt",
            color: "black",
            textAlign: "center",
            borderBottom: "1px solid lightgray",
            padding: "10px",
            textOverflow: "ellipsis",
            lines: "1",
            overflow: "hidden",
            whiteSpace: "nowrap",
            margin: 0
        };
        return React.createElement("div", {"style": containerStyle}, React.createElement("h1", {"style": titleStyle}, this.props.sheet.name), React.createElement(LCButton, {"onClick": this.dashboard.bind(this), "style": { display: "block", borderWidth: "0" }, "color": this.props.lecture.color, "text": "Dashboard"}), React.createElement(LCButton, {"onClick": this.modelAnswers.bind(this), "style": { display: "block", borderWidth: "0" }, "color": "gray", "text": "Edit model answers"}), React.createElement("div", {"style": { borderTop: "1px solid lightgray" }}, React.createElement(LCButton, {"onClick": this.delete.bind(this), "style": { display: "block", borderWidth: "0" }, "color": "Red", "text": "Delete"})));
    };
    SheetControl.prototype.modelAnswers = function () {
        window.location.href = "/sheets/" + this.props.sheet.id;
    };
    SheetControl.prototype.dashboard = function () {
        window.location.href = "/dashboard/" + this.props.sheet.id;
    };
    SheetControl.prototype.delete = function () {
        $.post("/api/delete/sheet", { sheet: this.props.sheet.id });
        this.props.onDelete(this.props.sheet);
    };
    return SheetControl;
})(React.Component);
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="../shared/TextBox.tsx" />
/// <reference path="../shared/TextArea.tsx" />
/// <reference path="../../models/Sheet.ts" />
/// <reference path="./SheetControl.tsx" />
var SheetManagerPage = (function (_super) {
    __extends(SheetManagerPage, _super);
    function SheetManagerPage(props) {
        _super.call(this, props);
        this.state = { sheets: Array(),
            showMenu: (window.localStorage["showLectureMenu"] == "true")
        };
        this.getSheets();
    }
    SheetManagerPage.prototype.render = function () {
        var _this = this;
        var sheets = this.state.sheets.map(function (sheet) { return React.createElement(SheetControl, {"lecture": _this.props.lecture, "onDelete": _this.sheetDeleted.bind(_this), "sheet": sheet}); });
        return React.createElement("div", null, React.createElement(Header, {"onBack": this.back.bind(this), "name": "leonardo", "foreground": this.props.lecture.color, "title": this.props.lecture.name, "subtitle": "Manage sheets"}), React.createElement("div", {"style": {
            marginTop: "50px",
            background: "#fdfdfd",
            height: "41px",
            width: "100%", position: "relative",
            borderBottom: "1px solid lightgray"
        }}, React.createElement("div", {"style": { paddingLeft: "50px", float: "right", display: "inline-block", textAlign: "right" }}, React.createElement(LCButton, {"style": { fontSize: "12px",
            margin: "7px",
            padding: "5px" }, "onClick": this.newSheet.bind(this), "color": this.props.lecture.color, "text": "New sheet"})), React.createElement("div", {"style": { paddingLeft: "10px", float: "left", display: "inline-block", textAlign: "right" }}, React.createElement(LCButton, {"style": { fontSize: "12px",
            margin: "7px",
            padding: "5px" }, "onClick": this.showMenu.bind(this), "color": this.props.lecture.color, "text": this.state.showMenu ? "◄ Hide lecture info" : "► Show lecture info"}))), React.createElement("div", {"style": { position: "absolute", top: "91px", left: "0px", bottom: "0px", right: "0px" }}, React.createElement("div", {"style": { padding: "10px",
            visibility: this.state.showMenu ? "visible" : "collapse",
            background: "white", borderRight: "1px solid lightgray",
            position: "absolute", left: "0px",
            top: "0px", bottom: "0px", width: this.state.showMenu ? "200px" : "0px" }}, React.createElement("div", null, React.createElement("span", null, "Lecture name"), React.createElement(TextBox, {"onChange": this.changeName.bind(this), "fontSize": "10pt", "text": this.props.lecture.name, "style": { marginBottom: "10px" }}), React.createElement("span", null, "Description"), React.createElement(TextArea, {"fontSize": "8pt", "text": "This subject is about x and y bla bla"}), React.createElement(LCButton, {"onClick": this.saveInfo.bind(this), "style": { textAlign: "right", display: "block" }, "text": "Save", "color": this.props.lecture.color}), React.createElement("div", {"style": { borderTop: "1px solid lightgray", marginTop: "10px", paddingTop: "10px" }}, React.createElement("span", null, "Invite students"), React.createElement("span", {"style": { fontSize: "8pt", wordWrap: "break-word", display: "block", color: "gray" }}, "http://thiswebsite.com/some/link/2874-448")))), React.createElement("div", {"style": { position: "absolute", left: this.state.showMenu ? "200px" : "0px", bottom: "0px", right: "0px", top: "10px" }}, sheets)));
    };
    SheetManagerPage.prototype.changeName = function (e) {
        this.props.lecture.name = e.target.value;
        this.setState({});
    };
    SheetManagerPage.prototype.saveInfo = function () {
        $.post("/api/update/lecture", { lecture_id: this.props.lecture.id, name: this.props.lecture.name });
    };
    SheetManagerPage.prototype.showMenu = function () {
        window.localStorage["showLectureMenu"] = !this.state.showMenu;
        this.setState({ showMenu: !this.state.showMenu });
    };
    SheetManagerPage.prototype.newSheet = function () {
        window.location.href = "/create/sheet/" + this.props.lecture.id;
    };
    SheetManagerPage.prototype.back = function () {
        window.location.href = "/lectures/";
    };
    SheetManagerPage.prototype.sheetDeleted = function (sheet) {
        this.state.sheets.splice(this.state.sheets.indexOf(sheet), 1);
        this.setState({
            sheets: this.state.sheets
        });
    };
    SheetManagerPage.prototype.getSheets = function () {
        var _this = this;
        $.get("/api/sheets", { id: this.props.lecture.id }, function (data) {
            var arr = [];
            for (var _i = 0; _i < data.length; _i++) {
                var item = data[_i];
                arr.push(new Sheet(item.id, item.description, item.name));
            }
            _this.setState({
                sheets: arr
            });
        });
    };
    return SheetManagerPage;
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
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/SheetManager/./SheetManagerPage.tsx" />
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/SheetManager/../../models/Lecture.ts" />
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/SheetManager/../../typing/jquery.d.ts" />
$.get("/api/lecture/", { id: lecture_id }, function (data) {
    ReactDOM.render(React.createElement(SheetManagerPage, { lecture: new Lecture(data.id, data.name, data.author, data.color, data.sheets) }), document.getElementById('root'));
});
