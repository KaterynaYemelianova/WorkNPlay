function register(ev) {
	let form = $("#registration_form");
	let data = form.serializeObject();
	
	let dto = {
		data : {
			name : data.name
		}
	}
	
	let request = {
		type : "POST",
		contentType : "application/json",
		url : "http://worknplay.somee.com/api/Company/Register",
		data : JSON.stringify(dto),
		dataType : "json",
		success : function(reg_response) {
			document.location = "../pages/company_profile.html";
		},
		error : function(reg_response) {
			alert(reg_response.error.message);
		}
	}
	
	SESSION.putToAjaxRequest(request);
	$.ajax(request);
	
	ev.preventDefault();
	ev.stopPropagation();
}

$("#registration_form").submit(register);