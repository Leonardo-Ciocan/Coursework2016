/// <reference path="../../models/Question.ts" />
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="./BarChart.tsx" />
/// <reference path="./ActivityIndicator.tsx" />

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
        this.state={overallStats:[] , firstStats:[]};
        this.getQuestionStats();
        ChoiceStats.count++;
        this.countCurrent = ChoiceStats.count
    }
    
    render(){
        let containerStyle = {
          borderTop:"1px solid lightgray",
          padding:"10px"
          
        };
        let titleStyle = {
            margin:"10px"
        };
        return <div style={containerStyle}>
                    <h2 style={titleStyle}>Question {this.countCurrent}</h2>
                    <h3 style={titleStyle}>{this.props.question.title}</h3>
                    <div style={{
                        whiteSpace:"nowrap"
                    }}>
                        <ActivityIndicator color={this.props.color}  question={this.props.question}/>
                        <BarChart color={this.props.color} title={"First choices"} data={this.state.firstStats}/>
                        <BarChart color={this.props.color} title={"Overall clicks"} data={this.state.overallStats}/>
                        <div style={{clear:"both"}}></div>
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
                this.setState({firstStats:arrFirst});
            }
        )
    }
}