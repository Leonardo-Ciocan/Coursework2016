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
            <h2 style={descriptionStyle}>{this.props.lecture.sheetCount +" sheets"}</h2>
        </div>
    }
}

class LecturePageProps{
    created : Array<Lecture>
    subscribed : Array<Lecture>
}

class LecturePage extends React.Component<LecturePageProps,any>{
    
    constructor(p:LecturePageProps){
        super(p);
    }
    
    render(){
        var created =  this.props.created.map(function(lecture){
            return <LectureItem lecture={lecture}/>;
        });
        
        var subscribed =  this.props.subscribed.map(function(lecture){
            return <LectureItem lecture={lecture}/>;
        });
        
        let inputStyle = {border:"none" , borderBottom:"1px solid gray"};
        var parentStyle = {position:"relative" , margin:"20px" , marginTop:"60px"};
        return <div>
                    
                    <Header hideBack={true} 
                            color="#fafafa" 
                            foreground="black" 
                            name={"leonardo"} 
                            title={"Your lectures"} 
                            subtitle={"Subscribed to " + this.props.subscribed.length + " | Created " +this.props.created.length}/>

                    <div style={parentStyle}>

                    <div style={
                        {marginTop:"30px"}
                    }>
                        <span style={{lineHeight:"30px",verticalAlign:"middle",fontSize:"15pt", margin:"10px"}}>Lectures you're subscribed to</span>
                    </div>
                    {subscribed}
                    <div style={{marginTop:"10px" , paddingTop:"10px"}}>
                        <span style={{lineHeight:"30px",verticalAlign:"middle",fontSize:"15pt", margin:"10px"}}>Your own lectures</span>
                        <RoundButton onClick={this.createLecture} background="transparent"/>
                    </div>
                    {created}
                    </div>
               </div>
    }
    
    createLecture(){
        window.location.href = "/create/lecture";
    }
    
}