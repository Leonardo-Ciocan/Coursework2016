/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/LCButton.tsx" />
/// <reference path="../../typing/jquery.d.ts" />

interface HeaderProps {
    title : string
    name : string
    color? : string
    subtitle : string
    onBack? : () => void
    foreground? : string
    hideBack? : boolean
}

class Header  extends React.Component<HeaderProps, {showMenu : boolean}> {
    constructor(props:HeaderProps) {
        super(props);
        this.state = {showMenu : false};
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
            borderLeft:"1px solid lightgray",
            cursor:"pointer"
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
	       
        let menuStyle = {
            position:"absolute",
            right:"0",
            top:"50px",
            width:"200px",
            background:"#fafafa",
            borderLeft:"1px solid lightgray",
            borderBottom:"1px solid lightgray",
            visibility : this.state.showMenu ? "visible" :"collapse"
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
                    <h1 onClick={this.clickMenu.bind(this)} style={nameStyle}> {this.props.name}</h1>
                    <i onClick={this.props.onBack} className="fa fa-chevron-left" style={iconStyle} ></i>
                    <div  style={menuStyle}>
                    	   <LCButton onClick={this.logout} style={{display:"block"}} color="red" text="Log out"/>
                    </div>
                </div>
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