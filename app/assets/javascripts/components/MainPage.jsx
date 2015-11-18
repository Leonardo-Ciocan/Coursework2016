class SheetItem extends React.Component {

    onClick(){
        window.location = "/sheets/" + this.props.id;
    }

    render() {
        return <div className="sheet-card panel panel-default" onClick={this.onClick.bind(this)}>
            <h1>{this.props.name}</h1>
            <h2>{this.props.description}</h2>
        </div>;
    }
}

class SheetList extends React.Component {
    render() {
        var ls =  this.props.items.map(function(sheet){
            return <SheetItem name={sheet.name} description={sheet.description} id={sheet.id}/>;
        });
        console.log(ls);
        return <div>{ls}</div>;
    }
}