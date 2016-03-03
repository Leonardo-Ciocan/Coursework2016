/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../../typing/jquery.d.ts" />



class ActivityIndicatorProps{
    question : Question
    color : string
}

class ActivityIndicator  extends React.Component<ActivityIndicatorProps, any> {
    colors = {true:"green" , false:"gray"};
    constructor(p:ActivityIndicatorProps){
        super(p);
        this.state = {data:[]};
        this.getCompletions();
    }
    
    render(){
        let containerStyle={
          display:"inline-block",
          padding:"10px",
          marginRight:"10px",
          verticalAlign:"top",
          width:"300px",
          float:"left",
          background:"white",
          boxShadow:"0px 5px 13px -1px rgba(0,0,0,0.19);"
        };
        
        let dotStyle = {
            width:"15px",
            height:"15px",
            border:"1px solid white",
            borderRadius:"100%",
            display:"inline-block"
        };
         let titleStyle = {
            fontSize:"15px",
            color:"gray",
            margin:"10px"
        };
        let dots = this.state.data.map((record) => {
            return <div style={{
                width:"15px",
                height:"15px",
                margin:"10px",
                borderRadius:"100%",
                display:"inline-block",
                border:"1px solid white",
                borderColor: record ? this.props.color : "gray",
                background : record ? this.props.color : ""
            }}/>;
        });
        console.log(dots);
        return <div style={containerStyle}>
                    <h1 style={titleStyle}>Student Progress</h1>
                    {dots}
                </div>
    }
    
    getCompletions(){
        $.get(
            "/api/completions",
            {id: this.props.question.id},
            (data) => {
                this.setState({data:data});

            }
        );
    }
    
}