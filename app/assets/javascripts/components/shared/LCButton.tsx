/// <reference path="../../typing/react-global.d.ts" />

interface LCButtonProps{
    text : string
    color: string
    onClick? : Function
    style? : any
}

class LCButton extends React.Component<LCButtonProps , {hovering:boolean}> {
   
    constructor(p){
        super(p);
        this.state = {hovering:false};
    }
    
    render(){
        
        let containerStyle = {
            border:"0px solid",
            borderColor:(this.state.hovering ? "rgba(0,0,0,0.2)" : this.props.color),
            background:this.state.hovering ? this.props.color : "transparent",
            color:this.state.hovering ? "white" : this.props.color,
            borderRadius:"5px",
            fontWeight:"bold",
            margin: "10px",
            padding: "8px",
            display: "inline-block",
            cursor:"pointer",
            textAlign:"center",
            borderBottomWidth:"0px",
            fontSize:"14px"
        };
        
        if(this.props.style != undefined) $.extend(containerStyle , this.props.style);
        
        
        return <div onMouseEnter={this.mouseEnter.bind(this)}
                    onMouseLeave={this.mouseLeave.bind(this)}
                     onClick={this.onClicked.bind(this)} style={containerStyle}>
                    {this.props.text}
               </div>
    }
    
    mouseEnter(){
        this.setState({hovering:true});
    }
    
    mouseLeave(){
        this.setState({hovering:false});        
    }
    
    onClicked(){
       this.props.onClick();
    }
}