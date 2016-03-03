/// <reference path="../../typing/react-global.d.ts" />

interface CheckBoxProps{
    checked? : Boolean
    color : string 
    onChange? : Function
}

class CheckBox extends React.Component<CheckBoxProps , any> {
   
    constructor(p){
        super(p);
        this.state = {checked:false};
    }
    render(){
        
        let containerStyle = {
            display:"inline-block",
            verticalAlign:"middle",
            margin:"5px"
        };
        
         let boxStyle = {
            border : "1px solid " + this.props.color,
            borderRadius : "10px",
            width:"20px",
            height:"20px"
         };
         
         let innerBoxStyle = {
            border:"3px solid white",
            background:this.state.checked ? this.props.color:"",
            borderRadius : "10px",
            width:"18px",
            height:"18px"
         };
        
        return <div onClick={this.onClicked.bind(this)} style={containerStyle}>
                    <div style={boxStyle}>
                        <div style={innerBoxStyle}>
                        
                        </div>
                    </div>
               </div>
    }
    
    onClicked(){
        this.setState({checked:!this.state.checked});
        if(this.props.onChange!= undefined) this.props.onChange(this.state.checked);
    }
}