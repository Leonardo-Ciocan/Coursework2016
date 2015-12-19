/// <reference path="../../typing/react-global.d.ts" />

interface BarChartEntry{
    name : String
    value  : number
}

class BarChartProps{
    data : Array<BarChartEntry>
    title : string
}

class BarChart  extends React.Component<BarChartProps, any> {
    render(){
        let containerStyle = {
          border:"1px solid lightgray",
          width:"400px",
          display:"inline-block"
        };
        let titleStyle = {
            fontSize:"15px",
            color:"gray",
            margin:"10px"
        };
        return <div style={containerStyle}>
                    <h1 style={titleStyle}>{this.props.title}</h1>
               </div>;
    }
}