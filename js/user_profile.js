var MODEL = {
	user : {},
	events : []
};

Vue.component('present', {
	props : ['pres'],
	template :
	`<div class="list-item-container">
		<span class="company_name"> {{ pres.name }} </span>
		<img v-bind:src="pres.image_url" style="height: 4em; width: 4em; margin: -20px -20px -20px 20px"></img>
	</div>`
});

Vue.component('enter_leave_event', {
	props : ['event_model'],
	template :
	`<div class="list-item-container">
		<span class="company_name"> {{ event_model.is_enter ? 'Enter' : 'Leave' }} </span>
		<span> at {{ new Date(Date.parse(event_model.date_time)).toString() }} </span>
		<br/>
		<span> (point #{{ event_model.enter_leave_point_id }}) </span>
	</div>`
});

new Vue({ el : "#user-info", data : MODEL });

let request = {
	type :  "POST",
	contentType : "application/json",
	url : "https://worknplay2.azurewebsites.net/api/Account/GetProfile",
	data : JSON.stringify({"data" : {}}),
	dataType : "json",
	success : function(response) {
		MODEL.user = response.data;
	},
	error : function(response) {
		alert(response.responseJSON.error.message);
	}
};

SESSION.putToAjaxRequest(request);
$.ajax(request);

let eventRequest = {
	type :  "POST",
	contentType : "application/json",
	url : "https://worknplay2.azurewebsites.net/api/EnterLeaveEvent/GetMy",
	data : JSON.stringify({"data" : {}}),
	dataType : "json",
	success : function(response) {
		for(let enter_event of response.data.enter_events) {
			enter_event.is_enter = true;
		}
		MODEL.events = response.data.enter_events.concat(response.data.leave_events).sort(
			(e1, e2) => Date.parse(e2.date_time) - Date.parse(e1.date_time)
		);
	},
	error : function(response) {
		alert(response.responseJSON.error.message);
	}
};

SESSION.putToAjaxRequest(eventRequest);
$.ajax(eventRequest);

$('#user_profile_form').submit(saveUserProfile);

function saveUserProfile(e) {
	let data = $('#user_profile_form').serializeObject();
	
	let request = {
		type :  "POST",
		contentType : "application/json",
		url : "https://worknplay2.azurewebsites.net/api/Account/UpdateProfile",
		data : JSON.stringify({"data" : data}),
		dataType : "json",
		success : function(response) {
			MODEL.user = response.data;
		},
		error : function(response) {
			alert(response.responseJSON.error.message);
		}
	};
	
	SESSION.putToAjaxRequest(request);
	$.ajax(request);
	
	e.originalEvent.preventDefault();
	e.originalEvent.stopPropagation();
}