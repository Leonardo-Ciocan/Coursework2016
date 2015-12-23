/// <reference path="../../typing/react-global.d.ts" />

interface DialogProps{
    isOpen? : boolean
    title : string
    content : React.ReactNode
}

class Dialog extends React.Component<DialogProps , any> {
    render(){
        let containerStyle = {
          background : "rgba(255,255,255,0.55)",
          position:"fixed",
          left:"0",
          right:"0",
          top:"0",
          bottom:"0"  ,
          zIndex:999
        };
        let innerContainerStyle = {
          background:"white",
          width:"400px",
          position:"absolute",
          top:"0",
          right:"0",
          bottom:"0",
          padding:"20px",
          fontFamily:"Open Sans",
            boxShadow:"0px 0px 13px -1px rgba(0,0,0,0.19);",
            border:"1px solid lightgray",
            textAlign:"center"
        };
        
        let dialogTitle = {
            color:"black",
            margin:"0",
            fontSize:"15pt"
        };
        
        
        return <div style={containerStyle}>

                    <div style={innerContainerStyle}>
                        <h1 style = {dialogTitle}>{this.props.title}</h1>
                        {this.props.content}
                    </div>
               </div>;
    }
}