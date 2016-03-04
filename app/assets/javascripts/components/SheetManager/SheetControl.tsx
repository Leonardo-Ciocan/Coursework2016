/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../shared/SegmentedButton.tsx" />
/// <reference path="../../models/Sheet.ts" />
/// <reference path="../../typing/jquery.d.ts" />


interface SheetControlProps{
    sheet : Sheet   
    lecture? : Lecture
    onDelete : (Sheet) => void
}

interface SheetControlState{
    
}

class SheetControl extends React.Component<SheetControlProps,SheetControlState>{
    render(){
         var containerStyle = {
            float:"left",
            width:"200px",
            borderRadius:"2px",
            background:"white",
            margin:"20px",
            boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.00)",
            overflow:"hidden",
            border:"1px solid lightgray"
        };

        var titleStyle = {
            background:"rgba(0,0,0,0.025)",
            fontSize:"10pt",
            color:"black",
            textAlign:"center",
            borderBottom:"1px solid lightgray",
            padding:"10px",
            textOverflow: "ellipsis",
            lines:"1",
            overflow:"hidden",
            whiteSpace: "nowrap",
            margin:0
        };
        
        return <div style={containerStyle} >
                    <h1 style={titleStyle}>{this.props.sheet.name}</h1>
                    <div style={{padding:"10px" , borderBottom:"1px solid lightgray"}}>
                        <SegmentedButton selectedIndex={this.props.sheet.live?1:0} onSelected={this.onSelected.bind(this)} labels={["Hidden" , "Live"]} color={this.props.lecture.color}/>
                    </div>
                    <LCButton onClick={this.dashboard.bind(this)} style={{display:"block",borderWidth:"0"}} color={this.props.lecture.color} text="Dashboard"/>
                    
                    <LCButton onClick={this.modelAnswers.bind(this)} style={{display:"block",borderWidth:"0"}} color={"gray"} text="Edit model answers"/>
                    
                    <LCButton onClick={this.releaseSheet.bind(this)} style={{display:"block",borderWidth:"0"}} color={"gray"} text={this.props.sheet.released ? "Withdraw answers": "Release answers"}/>
                    
                    <div style={{borderTop:"1px solid lightgray"}}>
                        <LCButton onClick={this.delete.bind(this)} style={{display:"block",borderWidth:"0"}} color={"Red"} text="Delete"/>
                    </div>
              </div>
    }
    
    releaseSheet(){
        this.props.sheet.released = !this.props.sheet.released;
        $.post(
            "/api/release/sheet",
            {id : this.props.sheet.id , released : this.props.sheet.released}
        );
        this.setState({});
    }
    
    onSelected(index){
        $.post(
            "/api/update/sheet",
            {sheet : this.props.sheet.id , live: (index == 1)}
        );
    }
    
    modelAnswers(){
        window.location.href = "/sheets/" + this.props.sheet.id;
    }
    
    dashboard(){
        window.location.href = "/dashboard/" + this.props.sheet.id;
    }
    
    delete(){
        
        if(!confirm("Are you sure you want to delete this")) return;
        
        $.post(
            "/api/delete/sheet",
            {sheet:this.props.sheet.id}
        );
        
        this.props.onDelete(this.props.sheet);
    }
}