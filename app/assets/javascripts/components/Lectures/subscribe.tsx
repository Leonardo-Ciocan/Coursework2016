/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="../shared/LCButton.tsx" />

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
            width:"450px",
            textAlign:"center",
            background:"white",
            margin:"auto",
            marginTop:"100px",
            padding:"20px",
            border:"1px solid lightgray",
            borderRadius:"5px"
        };
        
        let btnStyle = {
            fontSize:"20pt",
            display:"block"
        };
        
        return <div>
                <Header onBack={this.back} title={""} subtitle={""} foreground={this.props.lecture.color} color={"#fafafa"} name={"leonardo.ciocan"}/>
                <div style={containerStyle}>
                    <h1>{this.props.lecture.name}</h1>
                    <h3>Made by {this.props.lecture.author}</h3>
                    <LCButton color={this.props.lecture.color} style={btnStyle} onClick={this.subscribeClicked} text="Subscribe"/>
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