/// <reference path="./lectures.tsx" />



$.get("/api/lectures",
            (data) => {
                
                var arr : Array<Lecture> = []
                for(var i of data.created){
                    arr.push(new Lecture(i.id , i.name , i.author , i.color));
                }
                
                
                
                var s_arr : Array<Lecture> = []
                for(var i of data.subscribed){
                    s_arr.push(new Lecture(i.id , i.name , i.author , i.color));
                }
                
                ReactDOM.render(
                    React.createElement(LecturePage , {created:arr , subscribed:s_arr}),
                    document.getElementById('root')
                );
            }
        )