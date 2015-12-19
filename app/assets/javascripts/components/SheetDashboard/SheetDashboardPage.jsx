/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
console.log("nope");
var DemoProps = (function () {
    function DemoProps() {
    }
    return DemoProps;
})();
var SheetDashboardPage = (function (_super) {
    __extends(SheetDashboardPage, _super);
    function SheetDashboardPage(props) {
        _super.call(this, props);
    }
    SheetDashboardPage.prototype.render = function () {
        return <div>
                 <Header name={"leonardo"} title={"Automata and Formal Languages - Christmas Sheet [LIVE]"}/>
            </div>;
    };
    return SheetDashboardPage;
})(React.Component);
console.log("alright");
ReactDOM.render(React.createElement(SheetDashboardPage), document.getElementById('root'));
