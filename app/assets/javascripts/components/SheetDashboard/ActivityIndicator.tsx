/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />

declare var Chart

class ActivityIndicatorProps{
    question : Question
    color : string
    percentage : any
}

class ActivityIndicator  extends React.Component<ActivityIndicatorProps, any> {
    colors = {true:"green" , false:"gray"};
    constructor(p:ActivityIndicatorProps){
        super(p);
    }
    
    ctx : any
    
    render(){
        let containerStyle={
          display:"inline-block",
          padding:"10px",
          verticalAlign:"top",
          float:"left",
          background:"white",
          border:"1px solid lightgray",
          borderTop:"none",
        borderRight:"none",
          height:"300px"
        };
        
         let titleStyle = {
            fontSize:"15px",
            color:"gray",
            margin:"10px"
        };
        console.log(this.props.percentage);
        return <div style={containerStyle}>
                    <h1 style={titleStyle}>Student Progress</h1>
                    <canvas style={{display:"block"}} ref={(ref) => this.ctx = ref} width="150" height="150"/>
                    <span style={{marginTop:"10px",display:"block",width:"100%" , textAlign:"center",color:this.props.color}}>
                            {Math.round(this.props.percentage)}% correct</span>
                </div>
    }
    
    componentDidUpdate(){
        
        var data = [
            {value: (100-this.props.percentage)  , color:"white"},            
            {value: this.props.percentage , color:this.props.color}
        ];
        console.log(this.ctx.getContext("2d"));
        var myPieChart = new Chart(this.ctx.getContext("2d")).Pie(data,{segmentStrokeWidth : 1,segmentStrokeColor : "#000",percentageInnerCutout : 0});
    }
    
}