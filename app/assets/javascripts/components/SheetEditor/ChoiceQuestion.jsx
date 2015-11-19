class ChoiceQuestionFragment extends React.Component{

    onClick(){
        this.props.onPick(this.props.index);
    }

    render(){
        console.log(this.props.selected);
        var answerStyle={
            border:"1px solid green",
            borderRadius:"2px",
            display:"inline-block",
            margin:"5px",
            cursor:"pointer",
            boxShadow:"0 1px 6px 0 rgba(0,0,0,.12),0 1px 6px 0 rgba(0,0,0,.12)",
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
           selected : parseInt(this.props.answer.data),
            color:"green"
        };
        console.log(this.state.selected);
    }

    onPick(index){
        console.log("/answer/" + this.props.answer.id);
        this.setState({selected:index});
        $.post("/answer/" + this.props.answer.id,
            { data : index + ""}
        );
    }

    mouseEnter(e){
        $(this.refs.card).css("box-shadow","0 6px 15px 0 rgba(0,0,0,.22),0 6px 15px 0 rgba(0,0,0,.22)");
    }


    mouseLeave(e){
        $(this.refs.card).css("box-shadow","0 1px 6px 0 rgba(0,0,0,.12),0 1px 6px 0 rgba(0,0,0,.12)");
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

        return <div className="question-block" >
                    <div ref="card" className="panel panel-default"
                         onMouseEnter={this.mouseEnter.bind(this)}
                         onMouseLeave={this.mouseLeave.bind(this)}
                         style={{
                        background:"white",
                        margin:"0 auto",
                        width:"600px",
                        padding:"10px",
                        border:"1px solid rgba(0,0,0,0.15)",
                        position:"relative",
                        transition:"box-shadow 0.3s"
                    }}>

                        <span style={iconStyle} className="glyphicon glyphicon-list"></span>

                    <h1 className="question-title"> {this.props.question.title} </h1>
                    <h2 className="question-subtitle"> {this.props.question.subtitle} </h2>
                    <div style={{display:"inline-block"}}>{answers}</div>
                        </div>
                </div>
    }
}