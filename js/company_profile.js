var MODEL = {
	company : {
		owner : {
			login : ""
		}
	},
	workers : [],
	logins : []
};

let request = {
	type : "POST",
	contentType : "application/json",
	url : "http://worknplay.somee.com/api/Account/GetProfile",
	data : JSON.stringify({ "data" : {}}),
	dataType : "json",
	success : function(response) {
		let companyRequest = {
			type : "GET",
			url : "http://worknplay.somee.com/api/Company/Get?id=" + response.data.company_id,
			success : function(companyResponse) {
				MODEL.company = companyResponse.data;
			},
			error : function(companyResponse) { 
				alert(companyResponse.responseJSON.error.message);
			}
		};
		$.ajax(companyRequest);
		
		let workersRequest = {
			type : "POST",
			contentType : "application/json",
			url : "http://worknplay.somee.com/api/Company/GetWorkers",
			data : JSON.stringify({"data" : { "id" : response.data.company_id }}),
			dataType : "json",
			success : function(workersResponse) {
				MODEL.workers = workersResponse.data;
			},
			error : function(workersResponse) {
				alert(workersResponse.responseJSON.error.message);
			}
		};
		SESSION.putToAjaxRequest(workersRequest);
		$.ajax(workersRequest);
	},
	error : function(response) { 
		alert(response.responseJSON.error.message);
	}
};

SESSION.putToAjaxRequest(request);
$.ajax(request);

let loginsRequest = {
	type : "GET",
	url : "http://worknplay.somee.com/api/Account/GetAllLogins",
	success : function(loginsResponse) {
		MODEL.logins = loginsResponse.data;
	},
	error : function(loginsResponse) { 
		alert(loginsResponse.responseJSON.error.message);
	}
};
$.ajax(loginsRequest);

Vue.component('worker', {
	props : ['worker_model'],
	methods : {
		remove : function() {
			let deleted = this.$props.worker_model;
			let dto = {
				data : {
					id : deleted.id		
				}
			}
			
			let request = {
				type :  "POST",
				contentType : "application/json",
				url : "http://worknplay.somee.com/api/Worker/Fire",
				data : JSON.stringify(dto),
				dataType : "json",
				success : function(response) {
					MODEL.workers.splice(
						MODEL.workers.indexOf(deleted), 1
					);
				},
				error : function(response) {
					alert(response.responseJSON.error.message);
				}
			};

			SESSION.putToAjaxRequest(request);
			$.ajax(request);
		}
	},
	template :
	`<div class="list-item-container">
		<span class="company_name"> {{ worker_model.login }} - {{ worker_model.role.name }} </span>
		<button v-on:click="remove()"
				class="login100-form-btn comp_btn" 
				style="background-color: red; float: right;">{{ 'fire' | localize }}</button>
	</div>`
});

new Vue({ el : "#company-info", data : MODEL });

$('#company_profile_form').submit(saveCompanyProfile);

function saveCompanyProfile(e) {
	let data = $('#company_profile_form').serializeObject();
	let dto = {
		id : MODEL.company.id,
		name : data.name
	};
	
	let request = {
		type :  "POST",
		contentType : "application/json",
		url : "http://worknplay.somee.com/api/Company/Update",
		data : JSON.stringify({data : dto}),
		dataType : "json",
		success : function(response) {
			MODEL.company = response.data;
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

$('#hire_form').submit(hireWorker);

function hireWorker(e) {
	let data = $('#hire_form').serializeObject();
	
	let request = {
		type :  "POST",
		contentType : "application/json",
		url : "http://worknplay.somee.com/api/Worker/Hire",
		data : JSON.stringify({"data" : data}),
		dataType : "json",
		success : function(response) {
			MODEL.workers.push(response.data);
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