class ChoiceQuestionFragment extends React.Component{

    onClick(){
        this.props.onPick(this.props.index);
    }

    render(){
        var answerStyle={
            border:"1px solid green",
            borderRadius:"2px",
            display:"inline-block",
            margin:"5px",
            cursor:"pointer",
            background: this.props.selected ? "green":"white",
            color: !this.props.selected ? "green":"white"
        };

        return (<div style={answerStyle} onClick={this.onClick.bind(this)}>
            <h3>{this.props.text}</h3>
        </div>);
    }
}

class ChoiceQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           selected : -1,
            color:"green"
        };
    }

    onPick(index){
        console.log(index);
        this.setState({selected:index})
    }

    render() {


        var answers = JSON.parse(this.props.question.data.replace(/'/g ,'"')).answers.map(function(a,i){
                    return <ChoiceQuestionFragment
                        selected={i==this.state.selected}
                        index={i}
                        onPick={this.onPick.bind(this)}
                        text={a}/>
                }.bind(this));

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
                        position:"relative",
                        border:"1px solid " + this.state.color
                    }}>

                        <span style={iconStyle} className="glyphicon glyphicon-list"></span>

                    <h1 className="question-title"> {this.props.question.title} </h1>
                    <h2 className="question-subtitle"> {this.props.question.subtitle} </h2>
                    <div style={{display:"inline-block"}}>{answers}</div>
                        </div>
                </div>
    }
}