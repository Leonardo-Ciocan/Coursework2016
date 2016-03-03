/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />

declare var Chart
declare var C

class ActivityIndicatorProps{
    question : Question
    color : string
    percentage : any
    correct : number
    wrong : number
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
          height:"300px",
          paddingLeft:"25px",
          paddingRight:"25px"
        };
        
         let titleStyle = {
            fontSize:"15px",
            color:"gray",
            margin:"10px"
        };
        
        return <div style={containerStyle}>
                    <h1 style={titleStyle}>Student Progress</h1>
                    <canvas style={{display:"block"}} ref={(ref) => this.ctx = ref} width="150" height="150"/>
                    <b><span style={{marginTop:"10px",display:"block",width:"100%" , textAlign:"center",color:this.props.color}}>
                            {Math.round(this.props.correct / (this.props.correct + this.props.wrong) * 100)}% correct</span></b>
                </div>
    }
    
    componentDidUpdate(){
         var color = new Chromath(this.props.color).darken(0.3);
        
        var data = [
            {value: this.props.wrong  , color:"white"},            
            {value: this.props.correct , color:this.props.color}
        ];

        var myPieChart = new Chart(this.ctx.getContext("2d")).Pie(data,{segmentStrokeWidth : 1,segmentStrokeColor : color.toRGBString(),percentageInnerCutout : 0});
    }
    
}