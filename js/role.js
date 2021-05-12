var ROLE = {
	getRole: function(callback){
		let request = {
			type : "POST",
			contentType : "application/json",
			url : "https://worknplay2.azurewebsites.net/api/Account/GetProfile",
			data : JSON.stringify({}),
			dataType : "json",
			success : function(response) {
				if(!response.data.company_id)
					callback("none");
				else {
					let companyRequest = {
						type : "GET",
						url : "https://worknplay2.azurewebsites.net/api/Company/Get?id=" + response.data.company_id,
						success : function(companyResponse) {
							if(companyResponse.data.owner.id == response.data.id) {
								callback("owner");
							} else {
								callback(response.role.name);
							}
						},
						error : function(companyResponse) {
							callback("none");
						}
					};
					
					$.ajax(companyRequest);
				}
			},
			error : function(response) {
				callback("none");
			}
		};
		
		SESSION.putToAjaxRequest(request);
		
		$.ajax(request);
	}
}