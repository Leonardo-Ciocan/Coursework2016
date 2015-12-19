/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx"/>
/// <reference path="./ChoiceStats.tsx" />
/// <reference path="../../models/Question.ts" />

class DemoProps {
}

declare var sheet_id

class SheetDashboardPage extends React.Component<DemoProps, any> {
  
  constructor(props:DemoProps) {
    super(props);
    this.state = {questions:[]};
    $.get("/api/questions", {id:sheet_id},
        (data)=>{
            var arr : Array<Question> = []        
            for(var i of data){
                
                console.log(i);
                if(i.type == 0){
                    arr.push(new ChoiceQuestion(i.title , i.subtitle , i.id , JSON.parse(i.data.replace(/'/g, '"')).answers))
                }
            }    
            this.setState({questions:arr})
        })
  }
  
  render() {
    var stats = this.state.questions.map((item) => <ChoiceStats question={item}/>);
    return <div>
                 <Header color="purple" name={"leonardo"} title={"Dashboard"}/>
                 <div style={{marginTop:"100px"}}/>
                 {stats}
            </div>
  }
}

console.log("alright");

ReactDOM.render(
   React.createElement(SheetDashboardPage),
   document.getElementById('root')
);