/// <reference path="./SheetManagerPage.tsx" />
/// <reference path="../../models/Lecture.ts" />
/// <reference path="../../typing/jquery.d.ts" />

declare var lecture_id : number

$.get(
    "/api/lecture/",
    {id : lecture_id},
    (data) => {
        ReactDOM.render(
            React.createElement(SheetManagerPage,{lecture:new Lecture(data.id , data.name , data.author , data.color,data.sheets)}),
            document.getElementById('root')
        );   
    }
);