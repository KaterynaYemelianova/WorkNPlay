function register(ev) {
	let form = $("#registration_form");
	let data = form.serializeObject();
	
	let dto = { data : data };
	
	let request = {
		type : "POST",
		contentType : "application/json",
		url : "https://worknplay2.azurewebsites.net/api/Project/Add",
		data : JSON.stringify(dto),
		dataType : "json",
		success : function(reg_response) {
			let getAuthLinkRequest = {
				type : "POST",
				contentType : "application/json",
				url : "https://worknplay2.azurewebsites.net/api/ProjectManagementSystem/GetAuthLink",
				data : JSON.stringify({ data : { id : reg_response.data.id }}),
				dataType : "json",
				success : function(authLinkResponse) {
					document.location = authLinkResponse.data;
				},
				error : function(authLinkResponse) {
					alert(authLinkResponse.error.message);
				}
			}
			
			SESSION.putToAjaxRequest(getAuthLinkRequest);
			$.ajax(getAuthLinkRequest);
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