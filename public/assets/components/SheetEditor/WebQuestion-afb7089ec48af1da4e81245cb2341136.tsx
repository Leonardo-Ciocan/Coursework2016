/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="../shared/SegmentedButton.tsx" />

interface WebQuestionProps{
    color : string
}

interface WebQuestionState{
    
}

class WebQuestion extends React.Component<WebQuestionProps , WebQuestionState>{
    constructor(props){
        super(props);
    }
    
    render(){
         return <div className="question-block" >
                <div
                     style={{
                        background:"  white",
                        margin:"0 auto",
                        width:"100%",
                        padding:"25px",
                        borderBottom:"1px solid rgba(0,0,0,0.15)",
                        position:"relative",
                        transition:"box-shadow 0.3s"
                    }}>
                    <SegmentedButton color={this.props.color} labels={["Goal" , "Current","HTML","CSS"]}/>
                    
                </div>
            </div>
    }
}