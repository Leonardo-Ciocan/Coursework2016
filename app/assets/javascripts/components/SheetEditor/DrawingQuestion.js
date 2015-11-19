class DrawingQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text : this.props.answer.data,
            color: "green"
        };
    }



    render() {

        var iconStyle = {
            position:"absolute",
            left:"0%",
            top:"0%",
            marginLeft:"10px",
            padding:"10px",
            marginTop:"-17px",
            color:this.state.color,
            background:"white",
            border:"1px solid green",
            boxShadow:"0 1px 6px 0 rgba(0,0,0,.12),0 1px 6px 0 rgba(0,0,0,.12)",
            borderRadius:"100%"
        };


        var canvasStyle = {
            width:"600px",
            height:"600px",
            border:"1px solid " + this.state.color
        };

        return <div className="question-block" >
            <div ref="card" className="  panel panel-default"
                 onMouseEnter={this.mouseEnter.bind(this)}
                 onMouseLeave={this.mouseLeave.bind(this)}
                 style={{
                        background:"white",
                        margin:"0 auto",
                        width:"600px",
                        border:"1px solid rgba(0,0,0,0.15)",
                        padding:"10px",
                        position:"relative",
                        transition:"box-shadow 0.3s"
                    }}>

                <span style={iconStyle} className="glyphicon glyphicon-text-color"></span>

                <h1 className="question-title"> {this.props.question.title} </h1>
                <h2 className="question-subtitle"> {this.props.question.subtitle} </h2>
                <div>
                    <canvas style={canvasStyle}/>
                </div>
            </div>
        </div>
    }
}