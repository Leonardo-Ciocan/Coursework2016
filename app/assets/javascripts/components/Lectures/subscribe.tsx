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
        this.state = {lecture:{}}
        this.getLecture();
    }
    
    render(){
        
        let containerStyle = {
            height : "200px",
            marginTop:"100px",
            width:"100%",
            color:this.state.lecture.color,
            textAlign:"center"
        };
        
        let btnStyle = {
            marginLeft:"auto" , marginRight :"auto", marginTop:"50px",
            width:"300px",
            border: "1px solid "+this.state.lecture.color,
            color : this.state.lecture.color,
            fontSize:"20pt",
            cursor:"pointer"
        };
        
        return <div>
                <Header title={""} subtitle={""} color={this.state.lecture.color} name={"leonardo.ciocan@outlook.com"}/>
                <div style={containerStyle}>
                    <h1>{this.state.lecture.name}</h1>
                    <h3>Made by {this.state.lecture.author}</h3>
                    <div style={btnStyle} onClick={this.subscribeClicked}>Subscribe</div>
                </div>
                </div>
    }
    
    getLecture(){
        $.get(
            "/api/lecture",
            {id:lecture_id},
            (i) => {
                
                this.setState({lecture : new Lecture(i.id , i.name , i.author , i.color)});
            }
        )
    }
    
    subscribeClicked(){
        window.location.href = "/lectures/" + lecture_id;
    }
    
}