/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../shared/Header.tsx" />

declare var lecture_id : number

interface SubscribePageProps{
    lecture : Lecture
}

class SubscribePage extends React.Component<SubscribePageProps , any>{
    
    constructor(p:SubscribePageProps){
        super(p);
    }
    
    render(){
        
        let containerStyle = {
            height : "200px",
            marginTop:"100px",
            width:"100%",
            color:this.props.lecture.color,
            textAlign:"center"
        };
        
        let btnStyle = {
            marginLeft:"auto" , marginRight :"auto", marginTop:"50px",
            width:"300px",
            border: "1px solid "+this.props.lecture.color,
            color : this.props.lecture.color,
            fontSize:"20pt",
            cursor:"pointer"
        };
        
        return <div>
                <Header onBack={this.back} title={""} subtitle={""} foreground={this.props.lecture.color} color={"transparent"} name={"leonardo.ciocan"}/>
                <div style={containerStyle}>
                    <h1>{this.props.lecture.name}</h1>
                    <h3>Made by {this.props.lecture.author}</h3>
                    <div style={btnStyle} onClick={this.subscribeClicked}>Subscribe</div>
                </div>
                </div>
    }
    
    back(){
        window.location.href = "/lectures/";
    }
    
    subscribeClicked(){
        $.post(
            "/api/subscribe/",
            {lecture_id : lecture_id}
        ).then(() => window.location.href = "/lectures/" + lecture_id);
    }
    
}