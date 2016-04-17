/// <reference path="../../models/Question.ts" />
/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="./BarChart.tsx" />
/// <reference path="./ActivityIndicator.tsx" />
/// <reference path="SheetDashboardPage.tsx" />

declare var md : any

class CodeStatsProps{
    question : Question
    color : string
}

class CodeStats  extends React.Component<CodeStatsProps, any> {
   
   constructor(props : CodeStatsProps, context) {
        super(props,context);
        SheetDashboardPage.count++;
        this.state={n:SheetDashboardPage.count, percentage:0 , correct : 0 , wrong : 0};
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
                        <ActivityIndicator percentage={f}  
                            correct={c} 
                            wrong={w} 
                            color={this.props.color}  
                            question={this.props.question}/>                        
                       
                        <div style={{clear:"both",margin:"auto"}}></div>
                    </div>
               </div>;
    }
    
    
    getQuestionStats = () => {
        $.get(
            "/api/statistics",
            {question_id : this.props.question.id}
        ).then(
            ({percentage,correct,wrong}) => {
                this.setState({percentage : percentage , correct : correct , wrong:wrong});
            }
        );
    }
}