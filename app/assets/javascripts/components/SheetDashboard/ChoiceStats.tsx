/// <reference path="../../models/Question.ts" />
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="./BarChart.tsx" />
/// <reference path="./ActivityIndicator.tsx" />

declare var md : any

class ChoiceStatsProps{
    question : Question
    color : string
}

enum StatType{
    OverallClicks = 0,
    FirstClicks   = 1
}

class ChoiceStats  extends React.Component<ChoiceStatsProps, any> {
   
   constructor(props : ChoiceStatsProps, context) {
        super(props,context);
        SheetDashboardPage.count++;
        this.state={n:SheetDashboardPage.count , overallStats:[] , firstStats:[] , percentage:0 , correct : 0 , wrong : 0 , transitions : []};
        this.getQuestionStats();


    }
    
    render(){
        
        

        
        let containerStyle = {
          border:"1px solid lightgray",     

          background:"white",
          display:"inline-block",
          margin:"0 auto",
          padding:"10px"
        };
        let titleStyle = {
            margin:"10px",
            marginTop:"15px",
            fontSize:"17pt",
            width:"50px",
            height:"50px",
            color:this.props.color,
            fontWeight:"bold",
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
        
        console.log(this.props.question.data + ">>");
        let n = this.props.question.choices.length;

        let transitionData = [];
        let headers = [""];
        let biggest = 0;
        for(var i = 0; i < n;i++){
            headers.push(this.props.question.choices[i]+"");
            var arr = [this.props.question.choices[i]];
            for (var y = 0; y < n ;y++){
                arr.push("0");
            }
            transitionData.push(arr);
        }
        console.log(transitionData);
        
        let _transitions = [];
        for(var tr in this.state.transitions){
            for(var td in this.state.transitions[tr]){
                transitionData[parseInt(tr)][parseInt(td)+1] = this.state.transitions[tr][td];
                let r = parseInt(this.state.transitions[tr][td]);
                if( r > biggest){
                    biggest = r;
                }
            }          
        }
        let color = new Chromath(this.props.color);


        let transitions = transitionData.map((transition,index0)=>{
           let collumns = transition.map((item,index) => {
               let num = parseInt(item);
               let fraction = num / biggest;
                       console.log(fraction + "%%%");
               let background = (index==0 || index == index0+1)? "white" : color.darken(fraction/1.3 || 1).toRGBString();
               return <td style={{background:background  ,color:index == 0? "black": (index == index0+1?"black":"white"), padding:"15px",weight:index==0?"bold":""}}>{index == index0+1 ? "-":item}</td>
            });
           return <tr> {collumns}  </tr>;
        });
        
        let tableHead = headers.map((item,index) => index==0? <td/>: <th style={{backgroundColor:"",textAlign:"center"}}>{item}</th>);
        let smallTitleStyle = {
            fontSize:"15px",
            color:"gray",
            margin:"10px",
            textAlign:"center",
            padding:"10px"
        };
        return <div style={containerStyle}>

                    <div style={{
                        whiteSpace:"nowrap"
                    }}>
                        <h2 style={titleStyle}>{this.state.n}</h2>
                        <ActivityIndicator percentage={f}  correct={c} wrong={w} color={this.props.color}  question={this.props.question}/>
                        <BarChart color={this.props.color} title={"First choices"} data={this.state.firstStats}/>
                        <div style={{float:"left"}}>
                            <h1 style={smallTitleStyle}>Transition</h1>
                             <table style={{ width:"450px",margin:"25px",marginTop:"0px",marginLeft:"0px",marginRight:"0px"}}>
                                <thead>
                                    {tableHead}
                                </thead>
                                <tbody>
                                    {transitions}
                                </tbody>
                            </table>
                        </div>
                       
                        <div style={{clear:"both",margin:"auto"}}></div>
                    </div>
               </div>;
    }
    
    
    getQuestionStats = () => {

        $.get(
            "/api/stats",
            {
                id : this.props.question.id
            },
            (data) => {                    

                var question = this.props.question as Question;
                let choices = this.props.question.choices;
                var arr : Array<BarChartEntry> = []
                for(var i in data[StatType.OverallClicks]){

                    arr.push({name: choices[i] , value : +data[StatType.OverallClicks][+i]})
                }
                this.setState({overallStats:arr});
                
                var arrFirst : Array<BarChartEntry> = []
                for(var i in data[StatType.FirstClicks]){
                    arrFirst.push({name: choices[i] , value : +data[StatType.FirstClicks][+i]})
                }

                this.setState({firstStats:arrFirst});
            }
        )
        
        $.get(
            "/api/statistics",
            {question_id : this.props.question.id}
        ).then(
            ({percentage,correct,wrong,transitions}) => {
                this.setState({percentage : percentage , correct : correct , wrong:wrong,transitions:transitions});
            }
        );
    }
}