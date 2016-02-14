/// <reference path="./subscribe.tsx" />

        $.get(
            "/api/lecture",
            {id:lecture_id},
            (i) => {
                 ReactDOM.render(
                    React.createElement(SubscribePage , {lecture : new Lecture(i.id , i.name , i.author , i.color,i.sheets)}),
                    document.getElementById('root')
                );
            }
        )