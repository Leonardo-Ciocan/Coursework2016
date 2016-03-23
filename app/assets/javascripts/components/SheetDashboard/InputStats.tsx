/// <reference path="../../models/Question.ts" />
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="./BarChart.tsx" />
/// <reference path="./ActivityIndicator.tsx" />

declare var md : any


interface JQuery{
    jQCloud(items:any,opts:any) : JQuery
}
declare var jQCloud : JQueryStatic


class InputStatsProps{
    question : Question
    color : string
}

class InputStats  extends React.Component<InputStatsProps, any> {
   
   cloudContainer : any
   ctx : any
   chart : any
   
   
   constructor(props : InputStatsProps, context) {
        super(props,context);
        SheetDashboardPage.count++;
        this.state={n:SheetDashboardPage.count  , percentage:0 , correct : 0 , wrong : 0 , counters : [] ,distances:{}};
        this.getQuestionStats();
    }
    
    render(){
        
        

        
        let containerStyle = {
          marginTop:"25px",
          marginBottom:"25px",
          border:"1px solid lightgray",     
          background:"white",
          display:"inline-block"
          
        };
       let titleStyle = {
            margin:"10px",


            fontSize:"17pt",
            width:"50px",
            height:"50px",
            color:this.props.color,

            lineHeight:"50px",
            verticalAlign:"middle",
            textAlign:"center",
            borderRadius:"100%",
            border:"1px solid "+this.props.color,
            display:"inline-block",
            float:"left"
        };
        
        
        let f = parseFloat(this.state.percentage);     
        let c : number = parseFloat(this.state.correct);        
        let w : number = parseFloat(this.state.wrong);
        
        let smallTitleStyle = {
            fontSize:"15px",
            color:"gray",
            margin:"10px",
            marginLeft:"0px",
            padding:"10px",
            paddingBottom:"10px",
            marginTop:"0px"
        };

        return <div style={containerStyle}>

                    <div style={{
                        whiteSpace:"nowrap",
                        verticalAlign:"middle"
                    }}>
                                            <h2 style={titleStyle}>{this.state.n}</h2>
                        <ActivityIndicator percentage={f}  correct={c} wrong={w} color={this.props.color}  question={this.props.question}/>

                        <div ref={(ref)=>this.cloudContainer = ref} style={{marginBottom:"20px",
                                display:"inline-block",width:"300px",
                                border:"1px solid lightgray",
                                borderRadius:"100%",
                                height:"300px"}}>
                        </div>
                        
                        <div style ={{paddingLeft:"15px",display:"inline-block",padding:"20px"}}>
                            <h1 style={smallTitleStyle}>Levenhstein distances to correct answer</h1>
                            <canvas ref={(ref) => this.ctx = ref} width="400" height="300"/>
                        </div>
                        <div style={{clear:"both",margin:"auto"}}></div>
                    </div>
               </div>;
    }
    
    componentDidUpdate(){
         
    }
    
    getQuestionStats = () => {
        
        $.get(
            "/api/stats",
            {
                id : this.props.question.id
            },
            (data) => {                    

            }
        )
        
        $.get(
            "/api/statistics",
            {question_id : this.props.question.id}
        ).then(
            ({percentage,correct,wrong,counters,distances}) => {
                this.setState({percentage : percentage , correct : correct , wrong:wrong,counters:counters,distances:distances});
                
                
                var color = new Chromath(this.props.color);
        
        
               
        
        
                    var _counters = [];
                    for(var i in this.state.counters){
                        _counters.push({text:i , weight:this.state.counters[i]});
                    }
                    
                     let step = 0.65 / _counters.length;
                    let colors = [];
                    for(var z = 0; z < _counters.length;z++){
                        colors.push(color.darken(step * z).toRGBString());
                    }

                    $(this.cloudContainer).jQCloud(_counters,
                        {classPattern: null,
                            colors: colors,
                            fontSize: {
                                from: 0.2,
                                to: 0.04
                            }
                        });
                        
                        this.drawChart();
                                        
                                        
                                        
                            }
                        );
        }
    
    drawChart = () =>{
        
        var labels = [];
        
        var rdata = [];
        for(var i in this.state.distances){
            labels.push(i +" chars");
            rdata.push(this.state.distances[i])
        }
        
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
        
        var data = {
            labels : labels,
            datasets: [
                {
                    fillColor : this.props.color,
                    data : rdata
                }
            ]  
        };
       
       console.log(data);
        
        var myPieChart = new Chart(this.ctx.getContext("2d")).Bar(data,{});
    }
}