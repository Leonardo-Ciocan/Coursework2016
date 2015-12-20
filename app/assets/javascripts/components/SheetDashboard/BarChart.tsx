/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/chart.d.ts" />



interface BarChartEntry{
    name : String
    value  : number
}

class BarChartProps{
    data : Array<BarChartEntry>
    title : string
    color : string
}

class BarChart  extends React.Component<BarChartProps, any> {
    
    total : number = 0;
    
    constructor(p:BarChartProps){
        super(p);
    }
    
    render(){
        let containerStyle = {
          border:"1px solid lightgray",
          display:"inline-block",
          padding:"10px",
          marginRight:"10px",
          verticalAlign:"top"
        };
        
        let titleStyle = {
            fontSize:"15px",
            color:"gray",
            margin:"10px"
        };
        
        let valueStyle = {
          lineHeight:"20px",
          fontSize:"10pt",
          margin:"0",
          textAlign:"left",
          color:this.props.color,
          verticalAlign:"middle",
          marginLeft:"-20px"
        };
        
        for(var i of this.props.data) {
            this.total = i.value > this.total? i.value : this.total;
        }
        
        this.props.data.sort((a,b) => a.value < b.value ? 1 : 0);
        

        
        let content = this.props.data.map(
            function(entry){

                return <div>
                            <h5>{entry.name}</h5>
                            <div
                                style={
                                    {
                                        marginLeft:"15px",
                                        height:"20px",
                                        width:((entry.value)/this.total*280) +"px",
                                        background:this.props.color
                                    }
                                }
                            >
                                <h1 style={valueStyle}>{entry.value}</h1>
                            </div>
                       </div>      
            }.bind(this)
        );
        
        return <div style={containerStyle}>
                    <h1 style={titleStyle}>{this.props.title}</h1>
                    {content}
               </div>;
    }
}