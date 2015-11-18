class Sheet extends React.Component {

    clicked(){
        window.location = "/sheets/" + this.props.sheet.id
    }

    render() {

        var containerStyle = {
            float:"left",
            width:"150px",
            height:"200px",
            borderRadius:"5px",
            background:"white",
            margin:"10px",
            boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.19)",
            cursor:"pointer"
        };

        var titleStyle = {
          fontSize:"15pt",
            color:"gray",
            textAlign:"center",
            borderBottom:"1px solid gray",
            padding:"4px",margin:"0px"
        };

        return <div style={containerStyle} onClick={this.clicked.bind(this)}>
                    <h1 style={titleStyle}>{this.props.sheet.name}</h1>
        </div>
    }
}

class SheetList extends React.Component{
    render(){
        var items =  this.props.sheets.map(function(sheet){
            return <Sheet sheet={sheet}/>;
        });

        var parentStyle = {position:"relative"};
        return <div style={parentStyle}>{items}</div>;
    }
}