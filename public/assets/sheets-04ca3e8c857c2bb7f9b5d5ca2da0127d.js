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
var Sheet = (function () {
    function Sheet(id, description, name) {
        this.id = id;
        this.description = description;
        this.name = name;
    }
    return Sheet;
})();
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
/// <reference path="../shared/Header.tsx" />
/// <reference path="../../models/Sheet.ts" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../shared/LCButton.tsx" />
var SheetItemProps = (function () {
    function SheetItemProps() {
    }
    return SheetItemProps;
})();
var SheetItem = (function (_super) {
    __extends(SheetItem, _super);
    function SheetItem() {
        _super.apply(this, arguments);
    }
    SheetItem.prototype.clicked = function () {
        window.location.href = "/sheets/" + this.props.sheet.id;
    };
    SheetItem.prototype.render = function () {
        var containerStyle = {
            float: "left",
            width: "200px",
            height: "250px",
            borderRadius: "2px",
            background: "white",
            margin: "20px",
            boxShadow: "0px 5px 13px -1px rgba(0,0,0,0.00)",
            cursor: "pointer",
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
        var descriptionStyle = {
            fontSize: "11pt",
            color: "gray",
            textAlign: "center",
            padding: "4px", margin: "14px"
        };
        return React.createElement("div", {"style": containerStyle, "onClick": this.clicked.bind(this)}, React.createElement("h1", {"style": titleStyle}, this.props.sheet.name), React.createElement("h2", {"style": descriptionStyle}, this.props.sheet.description));
    };
    return SheetItem;
})(React.Component);
var SheetListProps = (function () {
    function SheetListProps() {
    }
    return SheetListProps;
})();
var SheetList = (function (_super) {
    __extends(SheetList, _super);
    function SheetList(p) {
        _super.call(this, p);
        this.state = { sheets: [] };
        this.getSheets();
    }
    SheetList.prototype.render = function () {
        var items = this.state.sheets.map(function (sheet) {
            return React.createElement(SheetItem, {"sheet": sheet, "color": this.props.lecture.color});
        }.bind(this));
        var parentStyle = { position: "relative", paddingTop: "60px" };
        var lectureTitle = {
            margin: "15px",
            color: "#2C76DE"
        };
        return React.createElement("div", {"style": parentStyle}, React.createElement(Header, {"color": "#fafafa", "onBack": this.onBack, "foreground": this.props.lecture.color, "name": "leonardo", "title": this.props.lecture.name, "subtitle": this.state.sheets.length + " sheets"}), React.createElement("div", {"style": { marginLeft: "50px", marginTop: "5px" }}, items));
    };
    SheetList.prototype.onBack = function () {
        window.location.href = "/lectures/";
    };
    SheetList.prototype.getSheets = function () {
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
    return SheetList;
})(React.Component);
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/Sheets/./SheetsPage.tsx" />
/// <reference path="/Users/leo/RubymineProjects/TestUsers/app/assets/javascripts/components/Sheets/../../models/Lecture.ts" />
$.get("/api/lecture/", { id: lecture_id }, function (data) {
    ReactDOM.render(React.createElement(SheetList, { lecture: new Lecture(data.id, data.name, data.author, data.color, data.sheets) }), document.getElementById('root'));
});
