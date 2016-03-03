/// <reference path="../../typing/react-global.d.ts" />

interface LCToggleProps{
    color : string
    text : string
}

interface LCToggleState{
    isOn : boolean
}

class LCToggle extends React.Component<LCToggleProps , LCToggleState>{
    constructor(props){
        super(props);
        this.state = {isOn : false};
    }
    
    render(){
        let containerStyle = {
            
        };
        
        return <div style={containerStyle}>
        	        
            </div>
    }
}