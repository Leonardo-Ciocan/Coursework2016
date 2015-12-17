//= require ../shared/Header

class Sheet extends React.Component {

    clicked(){
        window.location = "/sheets/" + this.props.sheet.id
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
            overflow:"hidden",
            padding:"10px"
        };

        var titleStyle = {
            background:"rgba(0,0,0,0.01)",
            fontSize:"14pt",
            color:"#2C76DE",
            textAlign:"center",
            borderBottom:"1px solid gray",
            padding:"4px",
            margin:"0px",
            textOverflow: "ellipsis",
            lines:"1",
            overflow:"hidden",
            whiteSpace: "nowrap"
        };

        var descriptionStyle = {
            fontSize:"11pt",
            color:"gray",
            textAlign:"center",
            padding:"4px",margin:"4px"
        };

        return <div style={containerStyle} onClick={this.clicked.bind(this)}>
                    <h1 style={titleStyle}>{this.props.sheet.name}</h1>
                    <h2 style={descriptionStyle}>{this.props.sheet.description}</h2>
        </div>
    }
}

class SheetList extends React.Component{
    render(){
        var items =  this.props.sheets.map(function(sheet){
            return <Sheet sheet={sheet}/>;
        });

        var parentStyle = {position:"relative",paddingTop:"80px"};
        var lectureTitle ={
          margin:"15px",
            color:"#2C76DE"

        };
        return <div style={parentStyle}>
            <Header name={"leonardo"} title={"Automata and Formal Languages"}/>
            {items}
        </div>;
    }
}

