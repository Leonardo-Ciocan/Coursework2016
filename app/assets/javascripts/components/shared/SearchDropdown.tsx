/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../shared/TextBox.tsx" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../models/Sheet.ts" />


interface SearchDropdownProps {
    shouldShow : boolean
    sheets : Array<any>    
    lectures : Array<any>
    color : string
    query : string
}

interface SearchDropdownState{
}

class SearchDropdown  extends React.Component<SearchDropdownProps, any> {    
    constructor(props) {
        super(props);

    }
    
    render(){
       
       let containerStyle = {
         background:"white",
         border:this.props.shouldShow ? "1px solid lightgray" : "",  
         width:"400px",
         margin:"0 auto",
         marginTop:"-10px",
         height:this.props.shouldShow ? "auto" : "0px",
         padding:this.props.shouldShow ?"10px":"0px",
         overflow:"hidden",
         transition:"height 0.3s"
       };
       
       let headingStyle = {
           margin:"0px",
           fontSize:"12pt",
           background:"rgba(0,0,0,0.00)",
           padding:"10px",
           
           color:"gray",
           marginBottom:"0px"
       };
       
       let itemStyle = {
           margin:"0px",
           fontSize:"12pt",
           background:"rgba(0,0,0,0.00)",

           marginBottom:"0px",
           color:"gray",
           marginTop:"0px",
           padding:"3px"
       };
       
       let lectureStyle = {
           margin:"0px",
           fontSize:"12pt",
           background:"rgba(0,0,0,0.00)",

           marginBottom:"0px",
           color:"white",
           marginTop:"0px",
           padding:"3px"
       };
       
       let itemSubtitleStyle = {
           margin:"0px",
           fontSize:"10pt",
           background:"rgba(0,0,0,0.00)",
           padding:"3px",
           marginBottom:"0px",
           color:"gray",
           marginTop:"0px"
       };
        
        let sheets = this.props.sheets.map((sheet,index)=>{
            return <div onClick={() => this.toSheet(sheet.id) } style={{cursor:"pointer",marginBottom:"10px",padding:"5px" , border:"1px solid lightgray"}}>
                    <h2 style={itemStyle}>{sheet.name}</h2>
                    <h2 style={itemSubtitleStyle}>Part of <b style={{color:this.props.color}}>{sheet.lecture.title}</b></h2>
                    </div>;
        });
        
        let lectures = this.props.lectures.map((lecture,index)=>{
            return <div onClick={() => this.toLecture(lecture.id) } style={{
                 color:"white!important", cursor :"pointer"
                ,marginBottom:"10px",padding:"10px" , border:"1px solid " + lecture.color
            }}>
                        <h2 style={{
                            margin:"0px",
                            fontSize:"12pt",
                            background:"rgba(0,0,0,0.00)",

                            marginBottom:"0px",
                            color:lecture.color,
                            marginTop:"0px",
                            padding:"3px"
                        }}>{lecture.name}</h2>
                   </div>;
        });
        
        return  <div style={containerStyle}>
                    <h1 style={headingStyle}>Sheets ({this.props.sheets.length})</h1>
                    {sheets}
                    <h1 style={headingStyle}>Lectures ({this.props.lectures.length})</h1>
                    {lectures}
                    <LCButton onClick={this.toCreateLecture} style={{display:"block"}} text={"Create lecture named " + this.props.query} color={this.props.color}/>
                </div>
    }
    
    toCreateLecture = () => {
        var params = {name : this.props.query , color:"purple"};
        $.post("/api/create/lecture" , params).then((data)=>{
          window.location.href = "/lectures/" + data;  
        });
    }
    
    toSheet(id){
        window.location.href = "/sheets/" + id;
    }
    
    toLecture(id){
        window.location.href = "/lectures/" + id;
    }
    
    logout(){
        $.ajax({
            url :"/users/sign_out",
            type:"DELETE",
            success:()=>window.location.href = "/users/sign_in"
        });
        window.location.href = "/users/sign_out";
    }
    
    clickMenu(){
        this.setState({showMenu : !this.state.showMenu});
    }
}