/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Checkbox.tsx" />
/// <reference path="./Answer.ts" />
/// <reference path="../shared/TextBox.tsx" />
/// <reference path="../shared/TextArea.tsx" />

interface CodeCreatorIOProps{
    io : CodeIO
    key? : any
}

class CodeCreatorIO extends React.Component<CodeCreatorIOProps,any> {
    render(){
        let containerStyle = {
            marginRight:"10px",
            marginLeft:"10px",
            marginTop:"10px",
            marginBottom:"20px"
        };
        
        let inputStyle = {
            textAlignment:"center",
            padding:"5px",
            width:"250px",
            fontSize:"12pt",
            border:"1px solid lightgray",
            borderRadius:"5px",
            marginLeft:"10px"
        };
        
        return <tr>
        	       <td><TextArea onChange={this.inputChanged.bind(this)} fontSize="11pt" placeholder="Input" lines={1}/></td>
        	       <td><TextArea onChange={this.outputChanged.bind(this)} fontSize="11pt" placeholder="Output" lines={1}/></td>
               </tr>;
    }
    
    inputChanged(e){
        this.props.io.input = e.target.value;
    }
    
    outputChanged(e){
        this.props.io.output = e.target.value;
    }
    
}