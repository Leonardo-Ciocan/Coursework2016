class Sheet extends React.Component {

    clicked(){
        window.location = "/sheets/" + this.props.sheet.id
    }

    render() {

        var containerStyle = {
            float:"left",
            width:"150px",
            height:"200px",
            borderRadius:"2px",
            background:"white",
            margin:"20px",
            boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.09)",
            border:"1px solid gray",
            cursor:"pointer",
            overflow:"hidden"
        };

        var titleStyle = {
            background:"rgba(0,0,0,0.01)",
            fontSize:"11pt",
            color:"#2C76DE",
            textAlign:"center",
            borderBottom:"1px solid gray",
            padding:"4px",margin:"0px"
        };

        var descriptionStyle = {
            fontSize:"12pt",
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

        var parentStyle = {position:"relative"};
        var lectureTitle ={
          margin:"15px",
            color:"#2C76DE"

        };
        return <div style={parentStyle}>
            <h1 style={lectureTitle}> AFL - Automata and Formal Languages </h1>
            {items}
        </div>;
    }
}

