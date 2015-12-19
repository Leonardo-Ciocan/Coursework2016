/// <reference path="../../typing/react.d.ts" />
/// <reference path="../../typing/react-dom.d.ts" />
/// <reference path="./SheetDashboardPage.tsx"/>
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../models/Answer.ts" />

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