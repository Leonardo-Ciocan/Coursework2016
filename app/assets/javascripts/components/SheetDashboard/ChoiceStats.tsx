/// <reference path="../../models/Question.ts" />
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="./BarChart.tsx" />

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
        this.getQuestionStats();
        this.state={stats:[]};
    }
    
    render(){
        let containerStyle = {
          borderTop:"1px solid lightgray",
          borderBottom:"1px solid lightgray",
          padding:"10px"  
        };
        let titleStyle = {
            margin:"10px"
        };
        return <div style={containerStyle}>
                    <h1 style={titleStyle}>Question 1</h1>
                    <div>
                        <BarChart color={this.props.color} title={"Overall clicks"} data={this.state.stats}/>
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
                for(var i in data[0]){
                    console.log(question.choices);
                    arr.push({name: question.choices[i] , value : +data[0][+i]})
                }
                console.log(arr);
                this.setState({stats:arr});
            }
        )
    }
}