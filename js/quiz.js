var MODEL = {
	quiz : {}
};

Vue.component('question', {
	props : ['question_model'],
	template :
	`<div class="list-item-containter">
		<span class="company_name"> {{ question_model.text }} </span>
		<br/>
		<img v-if="question_model.image_url" v-bind:src="question_model.image_url" style="height: 10em; width: 10em;"></img>
		
		<div v-for="variant of question_model.variants">
			<label>{{ variant.text }}</label>
			<input type="checkbox" v-model="variant.isSelected"></input>
		</div>
	</div>`
});

new Vue({
	el : "#quiz",
	data : MODEL
});

let request = {
	type :  "POST",
	contentType : "application/json",
	url : "http://worknplay.somee.com/api/Quiz/GetAllQuizes",
	data : JSON.stringify({ data : {}}),
	dataType : "json",
	success : function(response) {
		let url = new URL(document.location);
		let id = url.searchParams.get("id");
		let quiz = response.data.find(q => q.id == id);
		
		for(let question of quiz.questions)
			for(let variant of question.variants)
				variant.isSelected = false;
			
		MODEL.quiz = quiz;
	},
	error : function(response) {
		alert(response.responseJSON.error.message);
	}
};

SESSION.putToAjaxRequest(request);
$.ajax(request);

function answerQuiz() {
	let answer = {
		id : MODEL.quiz.id,
		question_answers : []
	}
	
	for(let question of MODEL.quiz.questions) {
		let question_answer = {
			id : question.id,
			selected_variants : []
		};
		for(let variant of question.variants) {
			if(variant.isSelected) {
				question_answer.selected_variants.push({
					id : variant.id
				});
			}
		}
		answer.question_answers.push(question_answer);
	}
	
	let request = {
		type :  "POST",
		contentType : "application/json",
		url : "http://worknplay.somee.com/api/Quiz/Answer",
		data : JSON.stringify({ data : answer }),
		dataType : "json",
		success : function(response) {
			document.location = "../pages/quizs.html";
		},
		error : function(response) {
			alert(response.responseJSON.error.message);
		}
	};
	
	SESSION.putToAjaxRequest(request);
	$.ajax(request);
}