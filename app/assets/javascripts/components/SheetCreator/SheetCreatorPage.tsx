/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="./ChoiceCreator.tsx" />


class SheetCreatorPageProps{
  
}

class SheetCreatorPage extends React.Component<SheetCreatorPageProps,any> {
    
     constructor(props) {
            super(props);
            this.state = {
                items : [""]
            };
        }
    
    render(){
        let editorStyle = {

             marginTop:"100px", 
            marginLeft:"auto",
            marginRight:"auto",

            padding:"10px",
             width:"500px"
        };
        
        let footerContainer = {

        };
        
        let addButtonStyle = {
            border:"2px dashed red",
            color:"red",
            borderRadius:"5px",
            fontWeight:"bold",
            margin:"10px",
            padding:"10px",
            display:"inline-block",
            cursor:"pointer",
        };
        
        let items = this.state.items.map((item) => <ChoiceCreator/>);
        
        return  <div>
            <Header title={"Creating new sheet"} subtitle={"For lecture X"} color={"red"} name={"leonardo"} />
            <div style={editorStyle}>
                <div>
                    {items}
                </div>
                <div style={footerContainer}>
                    <div style={addButtonStyle} onClick={this.addMultipleChoice.bind(this)}>Multiple Choice</div>
                    <div style={addButtonStyle}>Input</div>
                </div>
            </div>
        </div>
    }
    
    addMultipleChoice(){
        this.state.items.push("");
        this.setState({items:this.state.items});
    }
}