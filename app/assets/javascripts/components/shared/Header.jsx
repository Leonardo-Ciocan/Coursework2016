/// <reference path="../../typing/react-global.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HeaderProps = (function () {
    function HeaderProps() {
    }
    return HeaderProps;
})();
var Header = (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        _super.call(this, props);
    }
    Header.prototype.render = function () {
        var titleStyle = {
            margin: "auto",
            verticalAlign: "middle",
            textAlign: "center",
            lineHeight: "65px",
            fontSize: "25px"
        };
        var nameStyle = {
            margin: "auto",
            verticalAlign: "middle",
            lineHeight: "65px",
            fontSize: "20px",
            position: "absolute",
            right: "10px",
            top: "0px"
        };
        var iconStyle = {
            width: "65px",
            height: "65px",
            position: "absolute",
            left: "10px",
            top: "0"
        };
        return <div className="header" style={{
            height: "65px",
            background: "white",
            boxShadow: "0px 5px 13px -1px rgba(0,0,0,0.05);",
            borderBottom: "1px solid lightgray"
        }}>
                    <h1 style={titleStyle}> {this.props.title}</h1>
                    <h1 style={nameStyle}> {this.props.name}</h1>
                    <img style={iconStyle} src="/assets/icon_hat.png"/>
                </div>;
    };
    return Header;
})(React.Component);
