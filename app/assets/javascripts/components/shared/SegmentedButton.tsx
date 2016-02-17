/// <reference path="../../typing/react-global.d.ts" />

interface SegmentedButtonProps{
    color : string
    labels : Array<string>
    style? : any
    onSelected? : (index,value) => void
    selectedIndex? : number
    itemPadding? : string
}

interface SegmentedButtonState{
    selectedIndex : number
}

class SegmentedButton extends React.Component<SegmentedButtonProps,SegmentedButtonState>{
    
    constructor(props){
        super(props);
        this.state = {selectedIndex : this.props.selectedIndex || 0};
    }
    
    render(){
        
        
        
        let buttons = this.props.labels.map((label,index) => {
            let buttonStyle = {
                border: "1px solid " + this.props.color,
                borderRightWidth: index >= 0 && index < this.props.labels.length-1 ? "0px" :"1px",
                color : index != this.state.selectedIndex ? this.props.color : "white",
                display:"inline-block",
                padding:"7px",
                paddingTop:this.props.itemPadding || "4px",paddingBottom:this.props.itemPadding ||"4px",
                verticalAlign:"middle",
                borderTopRightRadius : index == this.props.labels.length-1 ? "5px": "",
                borderBottomRightRadius : index == this.props.labels.length-1 ? "5px": "",
                borderBottomLeftRadius : index == 0 ? "5px": "",
                borderTopLeftRadius : index == 0 ? "5px": "",
                cursor:"pointer",
                background : index == this.state.selectedIndex ? this.props.color : "white",
                width:(100 / this.props.labels.length) + "%"
            };
           
           
          
            
            return <div style={buttonStyle} onClick={() => this.buttonClicked(index)}>
                        {label}     
                   </div>
        });
        
        let style = {textAlign:"center"};
        $.extend(style , this.props.style );
        
        return <div  style={style}>
                 {buttons}
               </div>
    }
    
    buttonClicked(index){
        this.setState({selectedIndex : index});
        if(this.props.onSelected != undefined) this.props.onSelected(index,this.props.labels[index]);
    }
}