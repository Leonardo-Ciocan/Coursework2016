/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />

class InputProps{
    answer:any
    color:string
    question :any
}
class InputQuestion extends React.Component<InputProps , any> {

        constructor(props) {
            super(props);
            this.state = {
                text: this.props.answer.data,
                color: this.props.color
            };
            console.log(this.state.selected);
        }

        onChange(e) {
            $.post("/answer/" + this.props.answer.id,
                {data: e.target.value}
            );
        }

        mouseEnter(e) {
            //$(this.refs.card).css("box-shadow", "0 6px 15px 0 rgba(0,0,0,.22),0 6px 15px 0 rgba(0,0,0,.12)");
        }


        mouseLeave(e) {
            //$(this.refs.card).css("box-shadow", "0 1px 6px 0 rgba(0,0,0,.12),0 1px 6px 0 rgba(0,0,0,.12)");
        }

        render() {

            var iconStyle = {
                position: "absolute",
                left: "0%",
                top: "0%",
                marginLeft: "10px",
                padding: "10px",
                marginTop: "-17px",
                color: "orange",
                background: "white",
                border: "1px solid " + "orange",
                boxShadow: "0 1px 6px 0 rgba(0,0,0,.12),0 1px 6px 0 rgba(0,0,0,.12)",
                borderRadius: "100%"
            };

            var inputStyle = {
                width: "100%",
                border:"1px solid "+ this.props.color,
                padding:"10px"
            };
            //<span style={iconStyle} className="glyphicon glyphicon-text-color"></span>

            return <div className="question-block">
                <div
                       onMouseEnter={this.mouseEnter.bind(this)}
                       onMouseLeave={this.mouseLeave.bind(this)}
                       style={{
                         background:"  white",
                        margin:"0 auto",
                        width:"600px",
                        padding:"35px",
                        borderBottom:"1px solid rgba(0,0,0,0.15)",
                        position:"relative",
                        transition:"box-shadow 0.3s"
                    }}>


                    <h1 className="question-title"> {this.props.question.title} </h1>

                    <h2 className="question-subtitle"> {this.props.question.subtitle} </h2>

                    <div>
                        <input

                            onChange={this.onChange.bind(this)} style={inputStyle}
                            defaultValue={this.state.text}/>
                    </div>
                </div>
            </div>
        }
    }
