/// <reference path="../../typing/react-global.d.ts" />

interface TextAreaProps{
    fontSize? : string
    placeholder? : string
    onChange? : React.EventHandler<React.FormEvent>
    text? : string
    style? : any
    lines? : number
}

class TextArea extends React.Component<TextAreaProps , any>{
    render(){
        let inputStyle = {
            textAlignment:"center",
            padding:"5px",
            width:"100%",
            fontSize: this.props.fontSize || "15pt",
            border:"1px solid lightgray",
            background:"rgba(0,0,0,0.02)",
            borderRadius:"5px"
        };
        
        $.extend(inputStyle , this.props.style);
        
        return <textarea rows={this.props.lines || 4} defaultValue={this.props.text} onChange={this.props.onChange || function(){}} placeholder={this.props.placeholder} style={inputStyle}/>
    }
}