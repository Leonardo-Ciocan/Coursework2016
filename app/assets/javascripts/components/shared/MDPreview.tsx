/// <reference path="../../typing/react-global.d.ts" />

declare var marked : Function
declare var hljs : any

interface MDPreviewProps{
    code : string
}

class MDPreview extends React.Component<MDPreviewProps , any> {
   
    constructor(p){
        super(p);
    }
    
    render(){
        
        let containerStyle = {
            width:"100%",
            padding:"10px",
            borderTop:"1px solid lightgray"
        };
        
        
        return <div style={containerStyle}
            dangerouslySetInnerHTML={{__html: marked(this.props.code,{
                                        highlight: function (code) {
                                                        return hljs.highlightAuto(code).value;
                                                    }})
                                    }}
        >
                    
               </div>
    }
    
}