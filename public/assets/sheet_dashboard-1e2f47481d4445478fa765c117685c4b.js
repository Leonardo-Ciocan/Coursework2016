//x
// module DashboardState{
// 	export var answers : {[question:string] : Answer;} = {}
// }
// declare var sheetID
// function handleResults(json) : void {
// 	for(var key in json){
// 		var a = json[key].map(function(ans){return new Answer(ans)});
// 		DashboardState.answers[key] = a;
// 	}
// 	console.log(DashboardState.answers);
// }
// let authenticity_token =  $('meta[name="csrf-token"]').attr('content');
// $.ajax({ url: "/api/answers?authenticity_token="+authenticity_token,
//   type: 'GET',
//   beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token',authenticity_token)},
//   data: {sheet_id:sheetID},
//   success: handleResults
// });
