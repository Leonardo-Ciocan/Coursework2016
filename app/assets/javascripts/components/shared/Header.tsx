/// <reference path="../../typing/react-global.d.ts" />

interface HeaderProps {
    title : string
    name : string
    color? : string
    subtitle : string
    onBack? : () => void
    foreground? : string
    hideBack? : boolean
}

class Header  extends React.Component<HeaderProps, any> {
    constructor(props:HeaderProps) {
        super(props);
    }
    
    render(){
        var titleStyle = {
            margin:"0px",
            marginLeft:"55px",
            marginTop:"5px",
            color:this.props.foreground || "white",
            verticalAlign:"middle",
            textAlign:"center",
            lineHeight:"25px",
            fontSize:"13pt",
            fontFamily:"Open Sans"
        };
        
         var subtitleStyle = {
            margin:"0px",
            marginLeft:"55px",
            color:this.props.foreground || "white",
            verticalAlign:"top",
            textAlign:"center",
            lineHeight:"15px",
            fontSize:"8pt",
            fontFamily:"Open Sans"
        };

        var nameStyle = {
            margin:"auto",
            color:this.props.foreground || "white",
            verticalAlign:"middle",
            lineHeight:"50px",
            fontSize:"16px",
            position:"absolute",
            right:"0px",
            paddingRight:"10px",
            paddingLeft:"10px",
            top:"0px",
            fontFamily:"Open Sans",
            borderLeft:"1px solid lightgray"
        };

        var iconStyle={
            width:"50px",
            height:"50px",
            position:"absolute",
            left:"0px",
            top:"0",
            lineHeight:"50px",
            color:this.props.foreground || "white",
            paddingRight:"10px",
            paddingLeft:"10px",
            verticalAlign:"middle",
            fontSize:"18pt",
            cursor:"pointer",
            visibility: this.props.hideBack != true ? "visible" : "hidden",
            borderRight:"1px solid lightgray"
        };

        return  <div className="header"
                     style={{
                                height:"50px",
                                background:this.props.color || "#fafafa",
                                borderBottom:"1px solid rgba(0, 0, 0, 0.14)",
                                paddingBottom:"5px"
                           }}

                    >
                    <h1 style={titleStyle}> {this.props.title}</h1>
                    <h1 style={subtitleStyle}> {this.props.subtitle}</h1>
                    <h1 style={nameStyle}> {this.props.name}</h1>
                    <i className="fa fa-chevron-left" style={iconStyle} onClick={this.props.onBack}></i>
                </div>
    }
}