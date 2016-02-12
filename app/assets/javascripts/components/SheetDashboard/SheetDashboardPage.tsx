/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx"/>
/// <reference path="./ChoiceStats.tsx" />
/// <reference path="../../models/Question.ts" />
/// <reference path="../../models/Lecture.ts" />

class SheetDashboardPageProps {
    questions : Array<Question>
    lecture : Lecture
}

declare var sheet_id
declare var lecture_id

class SheetDashboardPage extends React.Component<SheetDashboardPageProps, any> {
  constructor(props:SheetDashboardPageProps) {
    super(props);
}
  
  render() {
    var stats = this.props.questions.map((item) => <ChoiceStats color={this.props.lecture.color} question={item}/>);
    return <div>
                 <Header name={"leonardo"} title={"Dashboard"} subtitle={"Lecture title"} foreground={this.props.lecture.color} />
                 <div style={{marginTop:"100px"}}/>
                 {stats}
            </div>
  }
}

    $.get(
        "/api/lecture/",
        {id : lecture_id},
        (lecture_data) => {
              $.get("/api/questions", {id:sheet_id},
                (data)=>{
                    var arr : Array<Question> = []        
                    for(var i of data){
                        if(i.type == 0){
                            arr.push(new ChoiceQuestion(i.title , i.subtitle , i.id , JSON.parse(i.data.replace(/'/g, '"')).answers))
                        }
                    }    
                    ReactDOM.render(
                        React.createElement(SheetDashboardPage,{questions:arr,lecture:new Lecture(lecture_data.id , lecture_data.name , lecture_data.author , lecture_data.color)}),
                        document.getElementById('root')
                    );
                })
        }
    );
    
    
