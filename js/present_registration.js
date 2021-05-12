function register(ev) {
	let form = $("#present_registration_form");
	let data = form.serializeObject();
	
	let dto = {
		data : data
	}
	
	let request = {
		type : "POST",
		contentType : "application/json",
		url : "http://worknplay.somee.com/api/Present/Add",
		data : JSON.stringify(dto),
		dataType : "json",
		success : function(reg_response) {
			document.location = "../pages/presents.html";
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

$("#present_registration_form").submit(register);