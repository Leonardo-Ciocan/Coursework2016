/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="./ChoiceCreator.tsx" />
/// <reference path="./InputCreator.tsx" />
/// <reference path="./CodeCreator.tsx" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="./Answer.ts" />
/// <reference path="../../api.ts" />
/// <reference path="../shared/TextBox.tsx" />
/// <reference path="../shared/TextArea.tsx" />

interface Errors{
    
}

class SheetCreatorPageProps{
    lecture : Lecture
}
interface SheetCreatorPageState{
    items? : Array<RQuestion>
    name? : string
    description? : string
    errors? : {[key: number]: Array<string>;}
    dragging? : boolean
}
class SheetCreatorPage extends React.Component<SheetCreatorPageProps,SheetCreatorPageState> {
    
     constructor(props) {
            super(props);
            var qs = new RQuestion();
            qs.type = 3;
            qs.id = IDFactory.getNumber();
            this.state = {
                items : [qs],
                name : "",
                errors : {},
                dragging:false
            };
            
            
        }
    
    render(){
        let editorStyle = {

             marginTop:"100px", 
            marginLeft:"auto",
            marginRight:"auto",

            padding:"10px",
             width:"500px",
             position:"relative"
        };
        
        let footerContainer = {
             borderBottom :"1px solid lightgray",
             paddingLeft:"20px",
             paddingRight:"20px"
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
        
        let sideBarStyle = {
            border:"0px solid lightgray",
            position:"fixed",
            right:"10px",
            top:"70px"
        };
        
        let questionItem = {
          margin:"15px",
          padding:"20px",
          border:"1px solid lightgray",
          marginTop:"0px",
          background:"white",
          borderRadius:"5px"
        };
        
        var items = this.state.items.map((item,index) =>{
            
            if(item.type == 0){
                return  <ChoiceCreator onDelete={this.onQuestionDelete.bind(this)} index={index} errors={this.state.errors[index] || []} key={item.id} question={item} color={this.props.lecture.color}/>
            }   
            else if(item.type == 1){
                return <InputCreator  onDelete={this.onQuestionDelete.bind(this)} index={index}  errors={this.state.errors[index] || []} key={item.id} question={item} color={this.props.lecture.color}/>
            }
            else if(item.type == 3){
                return <CodeCreator  onDelete={this.onQuestionDelete.bind(this)} index={index}  errors={this.state.errors[index] || []} key={item.id} question={item} color={this.props.lecture.color}/>
            }
        });
        
        let dragAreaStyle = {
            height:this.state.dragging ? "40px" : "0px",
            borderColor:this.props.lecture.color,
            background: !this.state.dragging ?  "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)",
            transition:"all 1s",
            overflow:"hidden"
        };
        
        items = items.map((item,index) =>{
            return <div key={this.state.items[index].id}>
                     <div onDrop={(e)=> this.createItem(e,index)} style={dragAreaStyle} onDragLeave={this.dragAreaOut} onDragOver={this.dragAreaOver}>
                        <i style={{fontSize:"20pt", color:"gray",width:"100%",lineHeight:"40px",verticalAlign:"middle",textAlign:"center"}} className="fa fa-plus"></i>
                     </div>
                     {item}
                   </div>
        });
        
        return  <div>
            <Header onBack={this.onBack.bind(this)} title={"Creating new sheet"} subtitle={"For " + this.props.lecture.name} color="#fafafa" foreground={this.props.lecture.color} name={"leonardo"} />
            <div style={editorStyle}>
                <div style={sideBarStyle}>
                    <span style={{display:"block",textAlign:"center",
                padding:"10px"}}>Drag a question</span>
                    <div onDragEnd={this.dragEnd} onDragStart={(ev) =>{ev.dataTransfer.setData("text", "choice"); this.setState({dragging:true})}} draggable={true} style={questionItem}>
                        <i style={{display:"block",textAlign:"center",fontSize:"20pt",paddingBottom:"10px"}} className="fa fa-list-ul"></i>
                        <span style={{display:"block",textAlign:"center",fontSize:"13pt"}}>Multiple choice</span>
                    </div>
                    
                    <div onDragEnd={this.dragEnd} onDragStart={(ev) =>{ev.dataTransfer.setData("text", "text"); this.setState({dragging:true})}} draggable={true} style={questionItem}>
                        <i style={{display:"block",textAlign:"center",fontSize:"20pt",paddingBottom:"10px"}} className="fa fa-font"></i>
                        <span style={{display:"block",textAlign:"center",fontSize:"13pt"}}>Text input</span>
                    </div>
                    
                    <div onDragEnd={this.dragEnd} onDragStart={(ev) =>{ev.dataTransfer.setData("text", "code"); this.setState({dragging:true})}} draggable={true} style={questionItem}>
                        <i style={{display:"block",textAlign:"center",fontSize:"20pt",paddingBottom:"10px"}} className="fa fa-code"></i>
                        <span style={{display:"block",textAlign:"center",fontSize:"13pt"}}>Code</span>
                    </div>
                </div>
                
                <div>
                    <div style={{
             paddingLeft:"20px",
             paddingRight:"20px"}}>
             
                    <TextBox style={{borderColor:this.state.errors[-1] != undefined ? "red" : "lightgray"}} onChange={this.onNameChange.bind(this)} placeholder="Sheet name"/></div>
                    <div style={{padding:"20px",
             borderBottom:"1px solid lightgray"}}><TextArea placeholder="Description" onChange={this.onDescriptionChange.bind(this)} fontSize="10pt" lines={3}/></div>
                    {items}
                </div>
                <div style={footerContainer}>
                    <span>Create question : </span>
                    <LCButton text="Multiple Choice" onClick={this.addMultipleChoice.bind(this)}  color={"gray"}/>
                    <LCButton text={"Input"} onClick={this.addInputQuestion.bind(this)} color={"gray"}/>
                    <LCButton text={"Code"} onClick={this.addCodeQuestion.bind(this)} color={"gray"}/>
                </div>
                <div style={{display:"inline-block",float:"right",
             paddingLeft:"20px",
             paddingRight:"20px"}}>
                    <LCButton onClick={this.createSheet.bind(this)} text={"Create sheet"} color={this.props.lecture.color} />
                </div>
            </div>
        </div>
    }
    
    dragEnd = () =>{
        this.setState({dragging:false});
    }
    
    createItem = (ev , i) =>{
        ev.preventDefault();    
        var data = ev.dataTransfer.getData("text");
        console.log(data);
        if(data == "choice"){
            this.addMultipleChoice(i);
        }
        else if(data == "text"){
            this.addInputQuestion(i);
        }
        else if(data == "code"){
            this.addCodeQuestion(i);
        }
        this.setState({dragging:false});
    }
    
    dragAreaOver = (e) =>{
        e.preventDefault();

    }
    
    dragAreaOut= (e) =>{

    }
    
    onQuestionDelete(question){
        var index : number = this.state.items.indexOf(question);
        if(index >= 0){
            this.state.items.splice(index,1);
        }
        this.setState({items:this.state.items});
    }
    
    onDescriptionChange(e){
         this.setState({description:e.target.value});
    }
    onNameChange(e){
        this.setState({name:e.target.value});
    }
    
    onBack(){
        window.location.href = "/lectures/" + this.props.lecture.id;
    }
    
    addMultipleChoice(i = -1){
        var qs = new RQuestion();
        qs.type = 0;
        qs.id = IDFactory.getNumber();
        if(i == -1){
            this.state.items.push(qs);
        }
        else{
            this.state.items.splice(i , 0 , qs);
        }
        this.setState({items:this.state.items});
    }
    
    addInputQuestion(i = -1){
        var qs = new RQuestion();
        qs.type = 1;
        qs.id = IDFactory.getNumber();
        if(i == -1){
            this.state.items.push(qs);
        }
        else{
            this.state.items.splice(i , 0 , qs);
        }
        this.setState({items:this.state.items});
    }
    
    addCodeQuestion(i = -1){
        var qs = new RQuestion();
        qs.type = 3;
        qs.id = IDFactory.getNumber();
        if(i == -1){
            this.state.items.push(qs);
        }
        else{
            this.state.items.splice(i , 0 , qs);
        }
        this.setState({items:this.state.items});
    }
    
    
    
    createSheet(){
        
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
                console.log(item.answers.filter((answer)=>answer.isAnswer));
                newQuestion.correct_answer = ""+item.answers.indexOf(item.answers.filter((answer)=>answer.isAnswer)[0]);
                newQuestion.model_answer = newQuestion.correct_answer;
            }
            else if(item.type == 1){
                newQuestion.correct_answer = item.correct_answer;
                newQuestion.model_answer = item.model_answer;
            }
            else if(item.type == 3){
                var inputs  = item.solutions.map((io) => io.input);

                var outputs = item.solutions.map((io) => io.output);
                newQuestion.data = JSON.stringify({inputs : inputs , language : item.language});
                newQuestion.correct_answer = JSON.stringify(outputs);
                newQuestion.model_answer = item.model_answer;
            }
            console.log(newQuestion);
            return newQuestion; 
        });
        

         var sheet = {id:0,description:this.state.description,name:this.state.name};

         $.post("/api/create/sheet",
            {
               sheet:sheet,
               questions:questions,
               lecture_id : lecture_id
            }
        ).then((data)=>{
            console.log(data);
            if(data == " " || data == "" || data == undefined){
                window.location.href = "/lectures/" + this.props.lecture.id
            }
            else{
                this.setState({errors : data});
            }
            
        });

    }
    
    
}