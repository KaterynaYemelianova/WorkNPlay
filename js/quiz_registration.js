function register() {
	let questions = [];
	let qcount = parseInt(document.getElementById("questionCount").value);
	for (let i = 1; i <= qcount; i++) {
		let variants = [];
		let vcount = parseInt(document.getElementById("variantsCount" + i).value);
		for (let j = 1; j <= vcount; j++) {
			variants.push({
				text : document.getElementById("vtext" + j).value,
				is_correct : document.getElementById("vcheck" + j).checked,
				correct_reward : document.getElementById("correct_reward" + j).value,
				incorrect_fee : document.getElementById("incorrect_fee" + j).value
			});
			
		}
		questions.push({ 
			text : document.getElementById("qtext" + i).value,
			variants : variants
		});
	}
	
	let dto = {
		data : {
			name : document.getElementById("name").value,
			description : document.getElementById("description").value,
			questions : questions
		}
	}
	
	let request = {
		type : "POST",
		contentType : "application/json",
		url : "https://worknplay2.azurewebsites.net/api/Quiz/Create",
		data : JSON.stringify(dto),
		dataType : "json",
		success : function(reg_response) {
			document.location = "../pages/quizs.html";
		},
		error : function(reg_response) {
			alert(reg_response.error.message);
		}
	}
	
	SESSION.putToAjaxRequest(request);
	$.ajax(request);
}