/// <reference path="../../typing/react-global.d.ts" />

interface LCButtonProps{
    text : string
    color: string
    onClick? : Function
    margin? : string
    padding? : string
}

class LCButton extends React.Component<LCButtonProps , any> {
   
    constructor(p){
        super(p);
    }
    render(){
        
        let containerStyle = {
            borderBottom:"4px solid rgba(0,0,0,0.2)",
            boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.03)",
            color:"white",
            background:this.props.color,
            borderRadius:"5px",
            fontWeight:"bold",
            margin:this.props.margin || "10px",
            padding:this.props.padding || "10px",
            display:"inline-block",
            cursor:"pointer"
        };
        
        
        return <div onClick={this.onClicked.bind(this)} style={containerStyle}>
                    {this.props.text}
               </div>
    }
    
    onClicked(){
       this.props.onClick();
    }
}