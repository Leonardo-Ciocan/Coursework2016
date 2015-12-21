/// <reference path="./SheetsPage.tsx" />
/// <reference path="../../models/Lecture.ts" />

declare var lecture_id : number

$.get(
    "/api/lecture/",
    {id : lecture_id},
    (data) => {
        ReactDOM.render(
            React.createElement(SheetList , {lecture:new Lecture(data.id , data.name , data.author , data.color)}),
            document.getElementById('root')
        );   
    }
)