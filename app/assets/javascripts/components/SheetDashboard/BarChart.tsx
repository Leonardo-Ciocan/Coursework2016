/// <reference path="../../typing/react-global.d.ts" />

declare var Chromath : any;

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
        this.state = {data : []};
    }
    
    ctx : any
    chart : any
    legend : any
    
    render(){
        let containerStyle = {
          display:"inline-block",
          padding:"10px",
          verticalAlign:"top",
          float:"left",
          background:"white",
          height:"300px",
          paddingLeft:"25px",
          paddingRight:"25px"
        };
        
        let titleStyle = {
            fontSize:"15px",
            color:"gray",
            margin:"10px"
        };
        
        let valueStyle = {
          lineHeight:"25px",
          fontSize:"9pt",
          margin:"0",
          textAlign:"left",
          color:"white",
          verticalAlign:"middle",
          position:"absolute",
          top:"0",
          right:"0",
          bottom:"0",
          paddingLeft:"10px",
          paddingRight:"10px",
          background:"rgba(255,255,255,0.1)"
        };
        
        let headerStyle= {
          lineHeight:"25px",
          fontSize:"10pt",
          margin:"0",
          textAlign:"left",
          color:"white"  ,
          marginLeft:"10px"
        };
        
      
        
        
        this.props.data.sort((a,b) => a.value < b.value ? 1 : 0);
        let firstItems = this.props.data.map((stat : BarChartEntry)=>{
            return <span style={{display:"block"}}><b style={{color:this.props.color}}>{String("   "+stat.value).slice(-3)}</b> people chose <b style={{color:this.props.color}}>{stat.name}</b></span>
        });
        return <div style={containerStyle}>
                    <h1 style={titleStyle}>{this.props.title}</h1>
                    <canvas ref={(ref) => this.ctx = ref} width="150" height="150"/>
     

                    <div style={{paddingTop:"10px"}}>
                        {firstItems}   
                    </div>
               </div>;
    }
    
    componentDidUpdate(){
          var color = new Chromath(this.props.color);
        
        
        let step = 0.65 / this.props.data.length;
        let colors = [];
        for(var z = 0; z < this.props.data.length;z++){
            colors.push(color.darken(step * z).toRGBString());
        }
        
        for(var i of this.props.data) {
            this.total = i.value > this.total? i.value : this.total;
        }
        
        
        var rdata = this.props.data.map((item,index) => {
           return {value : item.value , color:colors[index] , label: item.name} 
        });
        
        // var firstdata = this.props.firstData.map((item) => {
        //    return item.value; 
        // });
        // var labels = this.props.data.map((item) => {
        //    return item.name; 
        // });
        
        //         var data = {labels:labels,
        //                 datasets:[{data:rdata,
        //                     label: "My First dataset",
        //                 fillColor: this.props.color,
        //                 strokeColor: "black",
        //                 pointColor: "rgba(220,220,220,1)",
        //                 highlightFill:this.props.color,
        //                 pointStrokeColor: "#fff",
        //                 pointHighlightFill: "#fff",
        //                 pointHighlightStroke: "black",} ,
                        
        //                  {data:firstdata,
        //                                  label: "My Second dataset",
        //                 fillColor: this.props.color,
        //                 strokeColor: "black",
        //                 pointColor: "rgba(220,220,220,1)",
        //                 highlightFill:this.props.color,
        //                 pointStrokeColor: "#fff",
        //                 pointHighlightFill: "#fff",
        //                 pointHighlightStroke: "black",}]    
        // };
        var myPieChart = new Chart(this.ctx.getContext("2d")).Pie(rdata,{
            multiTooltipTemplate: "<%= label %>",
            segmentStrokeColor : color.darken(0.4).toRGBString(),
            segmentStrokeWidth : 0,borderWidth:0,percentageInnerCutout : 0});
    }
}