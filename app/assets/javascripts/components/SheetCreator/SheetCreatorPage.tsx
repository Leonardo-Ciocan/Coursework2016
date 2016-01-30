/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="./ChoiceCreator.tsx" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../../models/Lecture.ts" />


class SheetCreatorPageProps{
    lecture : Lecture
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
            border:"2px solid rgba(255,0,0,1)",
            background:"rgba(255,0,0,0.6)",
            color:"white",
            borderRadius:"5px",
            fontWeight:"bold",
            margin:"10px",
            padding:"10px",
            display:"inline-block",
            cursor:"pointer"
        };
        
        let items = this.state.items.map((item) => <ChoiceCreator color={this.props.lecture.color}/>);
        
        return  <div>
            <Header title={"Creating new sheet"} subtitle={"For lecture X"} color={this.props.lecture.color} name={"leonardo"} />
            <div style={editorStyle}>
                <div>
                    {items}
                </div>
                <div style={footerContainer}>
                    <LCButton text="Multiple Choice" onClick={this.addMultipleChoice.bind(this)}  color={this.props.lecture.color}/>
                    <LCButton text={"Input"} color={this.props.lecture.color}/>
                </div>
            </div>
        </div>
    }
    
    addMultipleChoice(){
        this.state.items.push("");
        this.setState({items:this.state.items});
    }
}