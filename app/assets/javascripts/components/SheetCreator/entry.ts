/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./SheetCreatorPage.tsx" />
/// <reference path="../../models/Lecture.ts" />

console.log("hello world"); 

ReactDOM.render(
    React.createElement(SheetCreatorPage , {lecture: new Lecture(0,"","","dodgerblue")}),
    document.getElementById('root')
);