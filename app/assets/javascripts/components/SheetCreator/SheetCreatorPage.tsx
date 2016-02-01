/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="./ChoiceCreator.tsx" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="./Answer.ts" />
/// <reference path="../../api.ts" />



class SheetCreatorPageProps{
    lecture : Lecture
}
class SheetCreatorPageState{
    items : Array<RQuestion>
}
class SheetCreatorPage extends React.Component<SheetCreatorPageProps,SheetCreatorPageState> {
    
     constructor(props) {
            super(props);
            var qs = new RQuestion();
            qs.id = IDFactory.getNumber();
            this.state = {
                items : [qs]
            };
        }
    
    render(){
        let editorStyle = {

             marginTop:"100px", 
            marginLeft:"auto",
            marginRight:"auto",

            padding:"10px",
             width:"500px"
        };
        
        let footerContainer = {
             borderBottom :"1px solid lightgray"
        };
        
        let addButtonStyle = {
            border:"2px solid rgba(255,0,0,1)",
            background:"rgba(255,0,0,0.6)",
            color:"white",
            borderRadius:"5px",
            fontWeight:"bold",
            margin:"10px",
            padding:"10px",
            display:"inline-block",
            cursor:"pointer"
        };
        
        let items = this.state.items.map((item) => <ChoiceCreator key={item.id} question={item} color={this.props.lecture.color}/>);
        
        return  <div>
            <Header onBack={this.onBack.bind(this)} title={"Creating new sheet"} subtitle={"For " + this.props.lecture.name} color={this.props.lecture.color} name={"leonardo"} />
            <div style={editorStyle}>

                <div>
                    {items}
                </div>
                <div style={footerContainer}>
                    <span>Create question : </span>
                    <LCButton text="Multiple Choice" onClick={this.addMultipleChoice.bind(this)}  color={"gray"}/>
                    <LCButton text={"Input"} color={"gray"}/>
                </div>
                <div style={{display:"inline-block",float:"right"}}>
                    <LCButton onClick={this.createSheet.bind(this)} text={"Create sheet"} color={this.props.lecture.color} />
                </div>
            </div>
        </div>
    }
    
    onBack(){
        window.location.href = "/lectures/" + this.props.lecture.id;
    }
    
    addMultipleChoice(){
        var qs = new RQuestion();
        qs.id = IDFactory.getNumber();
        this.state.items.push(qs);
        this.setState({items:this.state.items});
    }
    
    createSheet(){
        console.log(this.state.items);
        
        var questions = this.state.items.map((item) => {
           var newQuestion = new Question();
            newQuestion.title = item.title;
            newQuestion.subtitle = item.subtitle;
            var data = {
                answers : item.answers.map((answer)=>answer.text)
            };
            newQuestion.data = JSON.stringify(data);
            
            newQuestion.correct_answer = ""+item.answers.indexOf(item.answers.filter((answer)=>answer.isAnswer)[0]);
            return newQuestion; 
        });
        
        var sheet = new Sheet(0,"description here","title here");
        API.createSheet(this.props.lecture.id , sheet , questions);
        window.location.href = "/lectures/" + this.props.lecture.id;
    }
    
    
}