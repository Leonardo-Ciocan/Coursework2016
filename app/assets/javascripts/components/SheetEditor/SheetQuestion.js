class SheetQuestion extends React.Component {
    render() {
        return <div>
            <h1 className="sheet-title"> {this.props.sheet.name} </h1>
            <h2 className="sheet-description"> {this.props.sheet.description} </h2>
            <div className="page-editor panel panel-default">

            </div>
        </div>;
    }
}
