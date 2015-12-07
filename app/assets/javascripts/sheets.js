//= require jquery
//= require jquery_ujs
//= require turbolinks


//= require material.min.js
//= require ripples.min.js
//= require components/Sheets/SheetsPage

ReactDOM.render(
    React.createElement(SheetList , {sheets:sheets}),
    document.getElementById('root')
);