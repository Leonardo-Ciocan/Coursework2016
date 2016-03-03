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
   static count : number = 0
   countCurrent : number = 0
   
   constructor(props : ChoiceStatsProps, context) {
        super(props,context);
        this.state={overallStats:[] , firstStats:[] , percentage:0};
        this.getQuestionStats();
        ChoiceStats.count++;
        this.countCurrent = ChoiceStats.count;
    }
    
    render(){
        let containerStyle = {
          borderTop:"1px solid lightgray",
          background:"white"
          
        };
        let titleStyle = {
            margin:"0px",
            padding:"5px",
            fontSize:"17pt",
            textAlign:"center",
            borderBottom:"1px solid lightgray"
        };
        
        let f = parseFloat(this.state.percentage);
        return <div style={containerStyle}>
                    <h2 style={titleStyle}>Question {this.countCurrent}</h2>
                    <div style={{
                        whiteSpace:"nowrap"
                    }}>
                        <ActivityIndicator percentage={f} color={this.props.color}  question={this.props.question}/>
                        <BarChart color={this.props.color} title={"First choices"} data={this.state.firstStats}/>
                        
                        <div style={{clear:"both",margin:"auto"}}></div>
                    </div>
               </div>;
    }
    
    getQuestionStats = () => {
        console.log(this.props);
        $.get(
            "/api/stats",
            {
                id : this.props.question.id
            },
            (data) => {                    
                console.log(data)
                var question : ChoiceQuestion = this.props.question as ChoiceQuestion;

                var arr : Array<BarChartEntry> = []
                for(var i in data[StatType.OverallClicks]){
                    console.log(question.choices);
                    arr.push({name: question.choices[i] , value : +data[StatType.OverallClicks][+i]})
                }
                this.setState({overallStats:arr});
                
                var arrFirst : Array<BarChartEntry> = []
                for(var i in data[StatType.FirstClicks]){
                    arrFirst.push({name: question.choices[i] , value : +data[StatType.FirstClicks][+i]})
                }
                console.log(arrFirst);
                this.setState({firstStats:arrFirst});
            }
        )
        
        $.get(
            "/api/statistics",
            {question_id : this.props.question.id}
        ).then(
            ({percentage}) => {
                this.setState({percentage : percentage});
            }
        );
    }
}