/// <reference path="../../typing/react-global.d.ts" />
/// <reference path="./SheetCreatorPage.tsx" />
/// <reference path="../../models/Lecture.ts" />

declare var lecture_id : number

$.get(
    "/api/lecture/",
    {id : lecture_id},
    (data) => {
        ReactDOM.render(
            React.createElement(SheetCreatorPage , {lecture: new Lecture(data.id , data.name , data.author , data.color)}),
            document.getElementById('root')
        );
    }
)
