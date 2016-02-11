/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../shared/Dialog.tsx" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../shared/LCRoundButton.tsx" />


class LectureProps {
    lecture : Lecture
}

class LectureItem extends React.Component<LectureProps,any> {

    clicked(){
        window.location.href = "/lectures/" + this.props.lecture.id
    }

    render() {
        var containerStyle = {
            display:"inline-block",
            width:"230px",
            height:"100px",
            borderRadius:"5px",
            background:this.props.lecture.color,
            margin:"10px",
            cursor:"pointer",
            overflow:"hidden",
            position:"relative"
        };

        var titleStyle = {
            fontSize:"13pt",
            color:"white",
            textAlign:"left",
            padding:"4px",
            margin:"10px"
        };

        var descriptionStyle = {
            fontSize:"10pt",
            color:"white",
            position:"absolute",
            left:"0" , right: "0" , bottom:"0",
            textAlign:"center",
            padding:"8px",
            background:"rgba(255,255,255,0.2)",
            margin:"0"
        };

        return <div style={containerStyle} onClick={this.clicked.bind(this)}>
            <h1 style={titleStyle}>{this.props.lecture.name}</h1>
            <h2 style={descriptionStyle}>{this.props.lecture.author}</h2>
        </div>
    }
}

class LecturePageProps{
    lectures : Array<Lecture>
}

class LecturePage extends React.Component<LecturePageProps,any>{
    
    constructor(p:LecturePageProps){
        super(p);
        this.state = {lectures:[]}
        this.getLectures();
    }
    
    render(){
        var items =  this.state.lectures.map(function(lecture){
            return <LectureItem lecture={lecture}/>;
        });
        let inputStyle = {border:"none" , borderBottom:"1px solid gray"};
        var parentStyle = {position:"relative" , margin:"20px" , marginTop:"60px"};
        return <div>
                    
                    <Header hideBack={true} color="transparent" foreground="black" name={"leonardo"} title={"Your lectures"} subtitle={this.state.lectures.length + " lectures"}/>

                    <div style={parentStyle}>

                    <div style={
                        {marginTop:"30px"}
                    }>
                        <span style={{lineHeight:"30px",verticalAlign:"middle",fontSize:"15pt", margin:"10px"}}>Lectures you're subscribed to</span>
                    </div>
                    {items}
                    <div style={{marginTop:"10px" , paddingTop:"10px"}}>
                        <span style={{lineHeight:"30px",verticalAlign:"middle",fontSize:"15pt", margin:"10px"}}>Your own lectures</span>
                        <RoundButton onClick={this.createLecture} background="transparent"/>
                    </div>
                    </div>
               </div>
    }
    
    createLecture(){
        window.location.href = "/create/lecture";
    }
    
    getLectures() : void {
        $.get("/api/lectures",
            (data) => {
                console.log(data);
                var arr : Array<Lecture> = []
                for(var i of data){
                    arr.push(new Lecture(i.id , i.name , i.author , i.color));
                }
                this.setState({lectures:arr});
            }
        )
    }
}