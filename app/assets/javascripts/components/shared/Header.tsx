/// <reference path="../../typing/react-global.d.ts" />

interface HeaderProps {
    title : string
    name : string
    color : string
    subtitle : string
    onBack? : () => void
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
            color:"white",
            verticalAlign:"middle",
            textAlign:"center",
            lineHeight:"25px",
            fontSize:"13pt",
            fontFamily:"Open Sans"
        };
        
         var subtitleStyle = {
            margin:"0px",
            marginLeft:"55px",
            color:"rgba(255,255,255,0.8)",
            verticalAlign:"top",
            textAlign:"center",
            lineHeight:"15px",
            fontSize:"8pt",
            fontFamily:"Open Sans"
        };

        var nameStyle = {
            margin:"auto",
            color:"white",
            verticalAlign:"middle",
            lineHeight:"50px",
            fontSize:"16px",
            position:"absolute",
            right:"0px",
            paddingRight:"10px",
            paddingLeft:"10px",
            top:"0px",
            fontFamily:"Open Sans",
            background:"rgba(255,255,255,0.2)"
        };

        var iconStyle={
            width:"50px",
            height:"50px",
            position:"absolute",
            left:"0px",
            top:"0",
            lineHeight:"50px",
            color:"white",
            paddingRight:"10px",
            paddingLeft:"10px",
            verticalAlign:"middle",
            fontSize:"18pt",
            cursor:"pointer",
            background:"rgba(255,255,255,0.2)"
        };

        return  <div className="header"
                     style={{
                                height:"50px",
                                background:this.props.color,
                                boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.05);",
                                borderBottom:"5px solid rgba(0, 0, 0, 0.07)"
                           }}

                    >
                    <h1 style={titleStyle}> {this.props.title}</h1>
                    <h1 style={subtitleStyle}> {this.props.subtitle}</h1>
                    <h1 style={nameStyle}> {this.props.name}</h1>
                    <i className="fa fa-arrow-left" style={iconStyle} onClick={this.props.onBack}></i>
                </div>
    }
}