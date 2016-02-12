/// <reference path="../../typing/react-global.d.ts" />

interface LCButtonProps{
    text : string
    color: string
    onClick? : Function
    margin? : string
    padding? : string
    displayBlock? : boolean
}

class LCButton extends React.Component<LCButtonProps , {hovering:boolean}> {
   
    constructor(p){
        super(p);
        this.state = {hovering:false};
    }
    
    render(){
        
        let containerStyle = {
            border:"1px solid",
            borderColor:(this.state.hovering ? "rgba(0,0,0,0.2)" : this.props.color),
            background:this.state.hovering ? this.props.color : "transparent",
            color:this.state.hovering ? "white" : this.props.color,
            borderRadius:"5px",
            fontWeight:"bold",
            margin:this.props.margin || "10px",
            padding:this.props.padding || "8px",
            display: this.props.displayBlock == true ? "block" : "inline-block",
            cursor:"pointer",
            textAlign:"center",
            borderBottomWidth:"4px"
        };
        
        
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