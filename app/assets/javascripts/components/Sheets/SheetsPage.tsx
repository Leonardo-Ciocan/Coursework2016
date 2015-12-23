/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="../../models/Sheet.ts" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../../typing/jquery.d.ts" />

class SheetItemProps{
    sheet : Sheet
    color : string
}

class SheetItem extends React.Component<SheetItemProps,any> {

    clicked(){
        window.location.href = "/sheets/" + this.props.sheet.id
    }

    render() {

        var containerStyle = {
            float:"left",
            width:"200px",
            height:"250px",
            borderRadius:"2px",
            background:"white",
            margin:"20px",
            boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.19)",
            border:"0px solid gray",
            cursor:"pointer",
            overflow:"hidden"
        };

        var titleStyle = {
            background:"rgba(0,0,0,0.01)",
            fontSize:"12pt",
            color:this.props.color,
            textAlign:"center",
            borderBottom:"1px solid rgba(0,0,0,0.2)",
            padding:"4px",
            margin:"10px",
            textOverflow: "ellipsis",
            lines:"1",
            overflow:"hidden",
            whiteSpace: "nowrap"
        };

        var descriptionStyle = {
            fontSize:"11pt",
            color:"gray",
            textAlign:"center",
            padding:"4px",margin:"14px"
        };

        return <div style={containerStyle} onClick={this.clicked.bind(this)}>
                    <h1 style={titleStyle}>{this.props.sheet.name}</h1>
                    <h2 style={descriptionStyle}>{this.props.sheet.description}</h2>
        </div>
    }
}

class SheetListProps {
    lecture : Lecture
}
class SheetList extends React.Component<SheetListProps , any>{
    
    constructor(p:SheetListProps){
        super(p);
        this.state={sheets:[]}
        this.getSheets();
    }
    
    render(){
        var items =  this.state.sheets.map(function(sheet){
            return <SheetItem sheet={sheet} color={this.props.lecture.color}/>;
        }.bind(this));

        var parentStyle = {position:"relative",paddingTop:"60px"};
        var lectureTitle ={
          margin:"15px",
            color:"#2C76DE"

        };
        return <div style={parentStyle}>
            <Header onBack={this.onBack} color={this.props.lecture.color} name={"leonardo"} title={this.props.lecture.name} subtitle={this.state.sheets.length + " sheets"}/>
            {items}
        </div>;
    }
    onBack(){
        window.location.href = "/lectures/";
    }
    getSheets(){
        $.get(
            "/api/sheets",
            {id : this.props.lecture.id},
            (data) => {
                var arr : Array<Sheet> = []
                for(var item of data){
                    arr.push(new Sheet(item.id , item.description , item.name));
                }
                this.setState({
                    sheets : arr
                });
            }
        );
    }
}

