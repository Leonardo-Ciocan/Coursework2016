/// <reference path="../../typing/react-global.d.ts" />

interface TextBoxProps{
    fontSize? : string
    placeholder? : string
    onChange? : React.EventHandler<React.FormEvent>
}

class TextBox extends React.Component<TextBoxProps , any>{
    render(){
        let inputStyle = {
            textAlignment:"center",
            padding:"5px",
            width:"100%",
            fontSize: this.props.fontSize || "15pt",
            border:"1px solid lightgray",
            background:"rgba(0,0,0,0.05)",
            borderRadius:"5px"
        };
        
        return <input onChange={this.props.onChange || function(){}} placeholder={this.props.placeholder} style={inputStyle}/>
    }
}