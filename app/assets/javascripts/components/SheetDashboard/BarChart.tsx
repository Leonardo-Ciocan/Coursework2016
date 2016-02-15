/// <reference path="../../typing/react-global.d.ts" />

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
          border:"1px solid rgba(255,255,255,0.1)",
          display:"inline-block",
          padding:"10px",
          marginRight:"10px",
          verticalAlign:"top",
          width:"300px",
          float:"left",
          boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.19);",
          background:"white"
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
        
        for(var i of this.props.data) {
            this.total = i.value > this.total? i.value : this.total;
        }
        
        this.props.data.sort((a,b) => a.value < b.value ? 1 : 0);
        

        // <h1 style={valueStyle}>{entry.value}</h1>
        let content = this.props.data.map(
            function(entry){

                return <div style={{clear: "both"}}>
                            <h5 style={{
                                        lineHeight:"25px",margin:"0",float:"left",verticalAlign:"middle",
                                        textAlign:"left",width:"100%"}}>{entry.name}</h5>
                            <div
                                style={{width:"190px",
                                        float:"left"}}
                            >
                           
                            <div
                                style={
                                    {
                                        display:"inline-block",
                                        position:"relative",
                                        borderRadius:"5px",
                                        marginBottom:"10px",
                                        height:"25px",
                                        marginLeft:"10px",
                                        width:((entry.value)/this.total*150) +"px",
                                        background:this.props.color
                                    }
                                }
                            >

                                <h1 style={valueStyle}>{entry.value}</h1>
                            </div>
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