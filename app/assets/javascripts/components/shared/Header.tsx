/// <reference path="../../typing/react-global.d.ts" />

class HeaderProps {
    title : string
    name : string
    color : string
    subtitle : string
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
            textAlign:"left",
            lineHeight:"25px",
            fontSize:"13pt",
            fontFamily:"Open Sans"
        };
        
         var subtitleStyle = {
            margin:"0px",
            marginLeft:"55px",
            color:"rgba(255,255,255,0.8)",
            verticalAlign:"top",
            textAlign:"left",
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
            right:"10px",
            top:"0px",
            fontFamily:"Open Sans"
        };

        var iconStyle={
            width:"50px",
            height:"50px",
            position:"absolute",
            left:"10px",
            top:"0",
            padding:"10px"
        };

        return  <div className="header"
                     style={{
                                height:"50px",
                                background:this.props.color,
                                boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.05);",
                                borderBottom:"1px solid lightgray"
                           }}

                    >
                    <h1 style={titleStyle}> {this.props.title}</h1>
                    <h1 style={subtitleStyle}> {this.props.subtitle}</h1>
                    <h1 style={nameStyle}> {this.props.name}</h1>
                    <img style={iconStyle} src="/assets/icon_hat.png"/>
                </div>
    }
}