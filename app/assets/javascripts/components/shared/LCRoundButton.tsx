/// <reference path="../../typing/react-global.d.ts" />

interface RoundButtonProps {
    background? : string
    foreground? : string
    color : string
    onClick? : () => void
}

interface RoundButtonState{
    hovering : boolean
}

class RoundButton extends React.Component<RoundButtonProps , RoundButtonState>{
    
    constructor(props){
        super(props);
        this.state = { hovering : false }
    }
    
    onmouseenter = ()=>{
        this.setState({hovering:true});
    }
    
    onmouseleave = ()=>{
        this.setState({hovering:false});        
    }
    
    render(){
        let buttonStyle = {
            borderRadius:"100%",
            background :this.state.hovering ? this.props.color : (this.props.background || "green"),
            color : this.props.foreground || "rgba(0,0,0,0.5)",
            width:"30px",
            height:"30px",
            border:"2px solid lightgray",
            display:"inline-block"
        };
        
        return <div onMouseEnter={this.onmouseenter} onMouseLeave={this.onmouseleave} onClick={this.props.onClick || function(){}} style={buttonStyle}>
                    <span style={{verticalAlign:"middle",textAlign:"center",lineHeight:"28px",width:"100%"}} className="fa fa-plus"></span>
        	    </div>
    }
}
