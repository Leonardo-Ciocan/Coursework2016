class Lecture extends React.Component {

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
            cursor:"pointer",
            overflow:"hidden"
        };

        var titleStyle = {
            background:"rgba(0,0,0,0.09)",
            fontSize:"15pt",
            color:"green",
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
            <h1 style={titleStyle}>{this.props.lecture.name}</h1>
            <h2 style={descriptionStyle}>{this.props.lecture.teacher}</h2>
        </div>
    }
}

class LecturePage extends React.Component{
    render(){
        var items =  this.props.lectures.map(function(sheet){
            return <Lecture lecture={lecture}/>;
        });

        var parentStyle = {position:"relative"};
        return <div style={parentStyle}>{items}</div>;
    }
}