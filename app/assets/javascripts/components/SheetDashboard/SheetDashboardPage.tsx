/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx"/>
/// <reference path="./ChoiceStats.tsx" />
/// <reference path="./InputStats.tsx" />
/// <reference path="../../models/Question.ts" />
/// <reference path="../../models/Lecture.ts" />

class SheetDashboardPageProps {
    questions : Array<Question>
    lecture : Lecture
}

declare var sheet_id
declare var lecture_id

class SheetDashboardPage extends React.Component<SheetDashboardPageProps, any> {
    static count : number = 0
    
  constructor(props:SheetDashboardPageProps) {
    super(props);
}
  
  render() {
    var stats = this.props.questions.map((item) => {
        if(item.type == 0){
            return <ChoiceStats color={this.props.lecture.color} question={item}/>
        } 
        else if(item.type == 1){
            return <InputStats color={this.props.lecture.color} question={item}/>
        }
           
    });
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
                    console.log(data);
                    var arr : Array<Question> = []        
                    for(var x of data){
                        let i = x as Question;

                            var q =new Question();

                            q.type = i.type;
                            q.title = i.title;
                            q.id = i.id;
                            q.subtitle = i.subtitle;
                            q.data = i.data;
                            arr.push(q);

                    }    
                    ReactDOM.render(
                        React.createElement(SheetDashboardPage,{questions:arr,lecture:new Lecture(lecture_data.id , lecture_data.name , lecture_data.author , lecture_data.color , lecture_data.sheet)}),
                        document.getElementById('root')
                    );
                })
        }
    );
    
    
