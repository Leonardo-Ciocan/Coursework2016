/// <reference path="../../typing/react-global.d.ts" />

declare var md : any
declare var hljs : any

interface MDPreviewProps{
    code : string
}

class MDPreview extends React.Component<MDPreviewProps , any> {
   
    constructor(p){
        super(p);
        this.state = { code : " "};
    }
    
    render(){
        
        let containerStyle = {
            width:"100%",
            padding:"10px",
            borderTop:"1px solid lightgray",
            marginLeft:"-10px",
            marginRight:"-10px"
        };
        

        
        return <div style={containerStyle}>
                <span style={{fontSize:"12pt", color:"gray"}}>Title preview</span>
                <div 
                    dangerouslySetInnerHTML={{__html:md.render(this.props.code)}}
                >
                        
                </div>
               </div>
    }
    
}