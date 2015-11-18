class ChoiceQuestion extends React.Component {
    render() {
        var answers = JSON.parse(this.props.question.data.replace(/'/g ,'"')).answers.map(function(a,i){
                    return (
                    <div style={{display:"inline-block"}}>
                        <h5 className="number-choice">{i+1}</h5>
                        <h3>{a}</h3>
                    </div>);
                });

        var iconStyle = {
            position:"absolute",
            left:"-30px",
            top:"50%",
            marginTop:"-7px"
        };
        return <div className="question-block" >
                    <div className="  panel panel-default" style={{
                        background:"white",
                        margin:"0 auto",
                        width:"600px",
                        padding:"10px",
                        position:"relative"
                    }}>

                        <span style={iconStyle} className="glyphicon glyphicon-list"></span>

                    <h1 className="question-title"> {this.props.question.title} </h1>
                    <h2 className="question-subtitle"> {this.props.question.subtitle} </h2>
                    <div style={{display:"inline-block"}}>{answers}</div>
                        </div>
                </div>
    }
}