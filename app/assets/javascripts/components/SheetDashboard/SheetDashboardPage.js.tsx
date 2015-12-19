//require ../shared/Header

//class SheetDashboardPage extends React.Component{
//    render(){
//        var rows = data.map(function(i,v){
//
//        });
//        return <div>
//                 <Header name={"leonardo"} title={"Automata and Formal Languages - Christmas Sheet [LIVE]"}/>
//               </div>;
//    }
//}
//
//ReactDOM.render(
//    React.createElement(SheetDashboardPage),
//    document.getElementById('root')
//);

/// <reference path="../../typing/react.d.ts" />

class DemoProps {
}

class SheetDashboardPage extends React.Component<DemoProps, any> {
  constructor(props:DemoProps) {
    super(props);
  }
  render() {
    return <div>Hello world!</div>
  }
}

ReactDOM.render(
   React.createElement(SheetDashboardPage),
   document.getElementById('root')
);