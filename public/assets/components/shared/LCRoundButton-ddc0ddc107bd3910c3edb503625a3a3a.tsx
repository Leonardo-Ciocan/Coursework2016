/// <reference path="../../typing/react-global.d.ts" />

interface RoundButtonProps {
    background? : string
    foreground? : string
    onClick? : () => void
}
interface RoundButtonState{}
class RoundButton extends React.Component<RoundButtonProps , RoundButtonState>{
    render(){
        let buttonStyle = {
            borderRadius:"100%",
            background : this.props.background || "green",
            color : this.props.foreground || "rgba(0,0,0,0.5)",
            width:"30px",
            height:"30px",
            border:"2px solid rgba(0,0,0,0.3)",
            display:"inline-block"
        };
        
        return <div onClick={this.props.onClick || function(){}} style={buttonStyle}>
                    <span style={{verticalAlign:"middle",textAlign:"center",lineHeight:"28px",width:"100%"}} className="fa fa-plus"></span>
        	    </div>
    }
}
