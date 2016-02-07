/// <reference path="../../typing/react-global.d.ts" />

interface SegmentedButtonProps{
    color : string
    labels : Array<string>
}

interface SegmentedButtonState{
    selectedIndex : number
}

class SegmentedButton extends React.Component<SegmentedButtonProps,SegmentedButtonState>{
    
    constructor(props){
        super(props);
        this.state = {selectedIndex : 0};
    }
    
    render(){
        
        
        
        let buttons = this.props.labels.map((label,index) => {
            let buttonStyle = {
                border: "1px solid " + this.props.color,
                borderRightWidth: index >= 0 && index < this.props.labels.length-1 ? "0px" :"1px",
                color : index != this.state.selectedIndex ? this.props.color : "white",
                display:"inline-block",
                padding:"7px",
                paddingTop:"4px",paddingBottom:"4px",
                verticalAlign:"middle",
                borderTopRightRadius : index == this.props.labels.length-1 ? "5px": "",
                borderBottomRightRadius : index == this.props.labels.length-1 ? "5px": "",
                borderBottomLeftRadius : index == 0 ? "5px": "",
                borderTopLeftRadius : index == 0 ? "5px": "",
                cursor:"pointer",
                background : index == this.state.selectedIndex ? this.props.color : "white"
            };
            
            return <div style={buttonStyle} onClick={() => this.buttonClicked(index)}>
                        {label}     
                   </div>
        });
        
        return <div  style={{textAlign:"center"}}>
                 {buttons}
               </div>
    }
    
    buttonClicked(index){
        this.setState({selectedIndex : index});
    }
}