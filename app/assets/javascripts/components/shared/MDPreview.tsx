/// <reference path="../../typing/react-global.d.ts" />

declare var md : any
declare var hljs : any

interface MDPreviewProps{
    code : string
}

class MDPreview extends React.Component<MDPreviewProps , any> {
   
    constructor(p){
        super(p);
        this.state = { code : " " };
    }
    
    render(){
        
        let containerStyle = {
            padding:"10px",
            borderTop:"1px solid lightgray",
            marginLeft:"-10px",
            marginRight:"-10px"
        };
        

        
        return <div style={containerStyle}>
                <span style={{display:"block",fontSize:"12pt", color:"gray",textAlign:"center",width:"100%"}}>Question preview</span>
                <div dangerouslySetInnerHTML={{__html:md.render(this.props.code)}}>
                        
                </div>
               </div>
    }
    
}