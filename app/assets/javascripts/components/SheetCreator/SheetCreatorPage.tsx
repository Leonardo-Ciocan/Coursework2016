/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="./ChoiceCreator.tsx" />
/// <reference path="./InputCreator.tsx" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="./Answer.ts" />
/// <reference path="../../api.ts" />
/// <reference path="../shared/TextBox.tsx" />



class SheetCreatorPageProps{
    lecture : Lecture
}
interface SheetCreatorPageState{
    items? : Array<RQuestion>
    name? : string
}
class SheetCreatorPage extends React.Component<SheetCreatorPageProps,SheetCreatorPageState> {
    
     constructor(props) {
            super(props);
            var qs = new RQuestion();
            qs.type = 0;
            qs.id = IDFactory.getNumber();
            this.state = {
                items : [qs],
                name : ""
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
        
        let items = this.state.items.map((item) =>{ 
            
            if(item.type == 0){
                return  <ChoiceCreator key={item.id} question={item} color={this.props.lecture.color}/>
            }   
            else if(item.type == 1){
                return <InputCreator  key={item.id} question={item} color={this.props.lecture.color}/>
            }
        
        });
        
        return  <div>
            <Header onBack={this.onBack.bind(this)} title={"Creating new sheet"} subtitle={"For " + this.props.lecture.name} color={this.props.lecture.color} name={"leonardo"} />
            <div style={editorStyle}>
                
                <div>
                    <TextBox onChange={this.onNameChange.bind(this)} placeholder="Sheet name"/>
                    {items}
                </div>
                <div style={footerContainer}>
                    <span>Create question : </span>
                    <LCButton text="Multiple Choice" onClick={this.addMultipleChoice.bind(this)}  color={"gray"}/>
                    <LCButton text={"Input"} onClick={this.addInputQuestion.bind(this)} color={"gray"}/>
                </div>
                <div style={{display:"inline-block",float:"right"}}>
                    <LCButton onClick={this.createSheet.bind(this)} text={"Create sheet"} color={this.props.lecture.color} />
                </div>
            </div>
        </div>
    }
    
    onNameChange(e){
        this.setState({name:e.target.value})
    }
    
    onBack(){
        window.location.href = "/lectures/" + this.props.lecture.id;
    }
    
    addMultipleChoice(){
        var qs = new RQuestion();
        qs.type = 0;
        qs.id = IDFactory.getNumber();
        this.state.items.push(qs);
        this.setState({items:this.state.items});
    }
    
    addInputQuestion(){
        var qs = new RQuestion();
        qs.type = 1;
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
            newQuestion.type = item.type;
            if(item.type == 0){
                var data = {
                    answers : item.answers.map((answer)=>answer.text)
                };
                newQuestion.data = JSON.stringify(data);
                
                newQuestion.correct_answer = ""+item.answers.indexOf(item.answers.filter((answer)=>answer.isAnswer)[0]);
            }
            else if(item.type == 1){
                newQuestion.correct_answer = item.correct_answer;
            }
            return newQuestion; 
        });
        
        var sheet = new Sheet(0,"description here",this.state.name);
         $.post("/api/create/sheet",
            {
               sheet:sheet,
               questions:questions,
               lecture_id : lecture_id
            }
        ).then(()=>window.location.href = "/lectures/" + this.props.lecture.id);
    }
    
    
}