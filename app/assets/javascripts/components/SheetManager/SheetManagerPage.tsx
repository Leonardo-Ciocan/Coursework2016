/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/Header.tsx" />
/// <reference path="../shared/TextBox.tsx" />
/// <reference path="../shared/TextArea.tsx" />
/// <reference path="../../models/Sheet.ts" />
/// <reference path="./SheetControl.tsx" />
/// <reference path="../shared/ColorPicker.tsx" />

interface SheetManagerPageProps{
    lecture : Lecture
}
interface SheetManagerPageState{
    sheets? : Array<Sheet>
    showMenu? : boolean
}
class SheetManagerPage extends React.Component<SheetManagerPageProps , SheetManagerPageState>{
    constructor(props){
        super(props);
        this.state = {sheets : Array<Sheet>() , 
            showMenu: (window.localStorage["showLectureMenu"] == "true")
        }
        this.getSheets();
    }
    render(){
        
        let sheets = this.state.sheets.map(
            (sheet) => <SheetControl lecture={this.props.lecture} onDelete={this.sheetDeleted.bind(this)} sheet={sheet}/>
        );
        
        
        return <div>
        	   <Header onBack={this.back.bind(this)} 
                       name="leonardo" 
                       foreground={this.props.lecture.color} 
                       title={this.props.lecture.name} 
                       subtitle="Manage sheets"/>
                <div style={{
                    marginTop:"50px",
                    background:"#fdfdfd",
                    height:"41px",
                    width:"100%",position:"relative",
                    borderBottom:"1px solid lightgray"
               }}>
               	   <div style={{paddingLeft:"50px",float:"right",display:"inline-block",textAlign:"right"}}>
                      <LCButton style={{fontSize:"12px",

                                        
                                        margin:"7px",
                                        padding:"5px"}} 
                        onClick={this.newSheet.bind(this)}
                        color={this.props.lecture.color} text="New sheet"/>
                   </div>
                   
                   <div style={{paddingLeft:"10px",float:"left",display:"inline-block",textAlign:"right"}}>
                      <LCButton style={{fontSize:"12px",

                                        
                                        margin:"7px",
                                        padding:"5px"}} 
                        onClick={this.showMenu.bind(this)}
                        color={this.props.lecture.color} text={this.state.showMenu ? "◄ Hide lecture info" : "► Show lecture info"}/>
                   </div>
               </div>
                <div style={{position:"absolute" , top:"91px",left:"0px",bottom:"0px",right:"0px"}}>
                    <div style={{padding:"10px",
                                    visibility:this.state.showMenu ? "visible":"collapse",
                                 background:"white",borderRight:"1px solid lightgray" ,
                                 position:"absolute" , left:"0px" ,
                                 top:"0px", bottom:"0px",width:this.state.showMenu ? "200px" :"0px"}}>
                    	    
                            <div>
                                <span>Lecture name</span>
                                <TextBox onChange={this.changeName.bind(this)} fontSize="10pt" text={this.props.lecture.name} style={{marginBottom:"10px"}}/>
                                
                                <span>Description</span>
                                <TextArea fontSize="8pt" text={"This subject is about x and y bla bla"} />
                                
                                <ColorPicker onPicked={this.onColorPicked.bind(this)}/>
                                
                                <LCButton onClick={this.saveInfo.bind(this)} style={{textAlign:"right", display:"block"}} text="Save" color={this.props.lecture.color}/>
                                
                                
                                <div style={{borderTop:"1px solid lightgray",marginTop:"10px",paddingTop:"10px"}}>
                                    <span>Invite students</span>
                                    <span style={{fontSize:"8pt",wordWrap:"break-word",display:"block",color:"gray"}}>http://thiswebsite.com/some/link/2874-448</span>
                                </div>
                            </div>
                    </div>
                    <div style={{position:"absolute" , left:this.state.showMenu ? "200px" :"0px" , bottom:"0px" , right:"0px",top:"10px"}}>
                    
                        {sheets}
                    
                    </div>
                </div>
        </div>
    }
    
    onColorPicked(color){
        this.props.lecture.color = color;
        this.setState({});        
    }
    
    changeName(e){
        this.props.lecture.name = e.target.value;
        this.setState({});
    }
    
    
    saveInfo(){
        $.post(
            "/api/update/lecture",
            {lecture_id: this.props.lecture.id , name:this.props.lecture.name , color:this.props.lecture.color}
        );
    }
    
    showMenu(){
        window.localStorage["showLectureMenu"] = !this.state.showMenu;
        this.setState({showMenu:!this.state.showMenu});
    }
    
    newSheet(){
        window.location.href = "/create/sheet/" + this.props.lecture.id;
    }
    
    back(){
        window.location.href = "/lectures/";
    }
    
    sheetDeleted(sheet){
        this.state.sheets.splice(this.state.sheets.indexOf(sheet) ,1);
        this.setState({
            sheets : this.state.sheets
        });
    }
    
    getSheets(){
        $.get(
            "/api/sheets",
            {id : this.props.lecture.id},
            (data) => {
                var arr : Array<Sheet> = []
                for(var item of data){
                    arr.push({id:item.id ,description: item.description , name:item.name , live:item.live});
                }
                this.setState({
                    sheets : arr
                });
            }
        );
    }
}