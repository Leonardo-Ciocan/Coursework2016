/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx"/>
/// <reference path="./ChoiceStats.tsx" />
/// <reference path="./InputStats.tsx" />
/// <reference path="./CodeStats.tsx" />
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
  componentWillReceiveProps(){
      this.setState({});
  }
  render() {
    var stats = this.props.questions.map((item) => {
        if(item.type == 0){
            return <ChoiceStats color={this.props.lecture.color} question={item}/>
        } 
        else if(item.type == 1){
            return <InputStats color={this.props.lecture.color} question={item}/>
        }
        else if(item.type == 3){
            return <CodeStats color={this.props.lecture.color} question={item}/>
        }
    });
    return <div  style={{textAlign:"center"}}>
                 <Header onBack={this.back} name={"leonardo"} title={"Dashboard"} subtitle={"Lecture title"} foreground={this.props.lecture.color} />
                 <div style={{marginTop:"100px"}}/>
                 {stats}
            </div>
  }

  back = () =>{
    window.location.href = "/lectures/" + this.props.lecture.id;    
  }
}



// function loadPageVar (sVar) {
//   return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
// }

// console.log("from:" + loadPageVar("from"));

    function update(){
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
    }
    update();
    setInterval(()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));
        update();   
    } , 5000);
    
