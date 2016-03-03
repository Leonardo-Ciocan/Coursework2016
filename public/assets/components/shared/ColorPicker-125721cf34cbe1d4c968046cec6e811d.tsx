/// <reference path="../../typing/react-global.d.ts" />

interface ColorProps{
    color : string
    key? : any
    index : number
    selected : boolean
    onClick : Function
}

class Color extends React.Component<ColorProps , {selected:boolean}>{
    
    constructor(props){
        super(props);
    }
    
    render(){
        let style = {
          display:"inline-block",
          width:"30px",
          height:"30px",
          background:this.props.color,
          borderBottom:"2px solid rgba(0,0,0,0.3)",
          transform:this.props.selected ? "scaleX(1.2) scaleY(1.2)" : "",
          margin:"5px",
          borderRadius:"10px"
        };
        
        return <div onClick={this.onClick.bind(this)} style={style}>
                </div>
    }
    
    onClick(){
        this.props.onClick(this.props.index);
    }
}

class ColorPickerProps{
    onPicked : Function
}

class ColorPicker extends React.Component<ColorPickerProps , any>{
    colors = [
        "red" , "green" , "dodgerblue" , "#E8D70C" , "#0DFF62" , "#FF9F0D",
        "#5A0000" , "#232E59" , "#514E67" , "#C46BD4"
    ];
    
    constructor(props){
        super(props);
        this.state = {selected : 0};
    }
    
    render(){
        
        var items = this.colors.map((color,index)=><Color index={index} onClick={this.colorClicked.bind(this)} selected={index==this.state.selected} key={index} color={color}/>);
        
        return <div style={{paddingTop:"10px"}}>
                      {items}   
               </div>
    }
    
    colorClicked(index){
        console.log(index);
        this.setState({selected : index});
        this.props.onPicked(this.colors[index]);
    }
    
}