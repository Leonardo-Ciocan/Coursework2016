/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../shared/IDFactory.ts" />
/// <reference path="../../api.ts" />
/// <reference path="../shared/TextBox.tsx" />
/// <reference path="../shared/ColorPicker.tsx" />



class LectureCreatorPageProps{

}

interface LectureCreatorPageState{
    color? : string
    name? : string
}

class LectureCreatorPage extends React.Component<LectureCreatorPageProps,LectureCreatorPageState> {
    
     constructor(props) {
            super(props);
            this.state = {
                color:"#4caf50",
                name:""
            };
     }
    
    render(){
        let containerStyle = {
            border : "1px solid lightgray",
            padding:"10px",
            boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.0)",
            background:"white",
            borderRadius:"5px",
            margin:"20px",
            marginTop:"100px", 
            marginLeft:"auto",
            marginRight:"auto",
            width:"500px"
        };
        
        return  <div>
                  <Header onBack={this.onBack.bind(this)} 
                    foreground={this.state.color || "darkgray"} 
                    title={"Creating new sheet"} 
                    subtitle={""} 
                    color={"transparent"} 
                    name={"leonardo"} />
                    
                    <div style={containerStyle}>
                        <TextBox onChange={this.onNameChange.bind(this)} placeholder={"Lecture title"} fontSize="15pt"/>
                        <ColorPicker onPicked={this.onColorChange.bind(this)}/>
                        <LCButton onClick={this.createLecture.bind(this)} text={"Create " + this.state.name} color={this.state.color}/>
                    </div>
                </div>
    }
    
    onBack(){
        window.location.href = "/lectures/";
    }
    
    onColorChange(color){
        this.setState({color:color});
    }
    
    onNameChange(e){
        this.setState({name:e.target.value});
    }
    
    createLecture(){
        var params = {name : this.state.name , color:this.state.color};
        $.post("/api/create/lecture" , params).then((data)=>{
          window.location.href = "/lectures/" + data;  
        });
        
    }
    
}