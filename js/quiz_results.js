var MODEL = {
	quiz_results : {}
};

Vue.component('question', {
	props : ['question_result_model'],
	template :
	`<div class="list-item-containter">
		<span class="company_name"> {{ question_result_model.text }} </span>
		<br/>
		<img v-if="question_result_model.image_url" v-bind:src="question_result_model.image_url" style="height: 10em; width: 10em;"></img>
		
		<div v-for="variant of question_result_model.question_variants_selected" v-bind:class="[variant.is_correct ? 'correctClass' : 'incorrectClass']">
			<label>{{ variant.text }}</label>
			<input type="checkbox" v-model="variant.was_selected" disabled></input>
			<span> Gain = {{ variant.points_got }} </span>
		</div>
	</div>`
});

new Vue({
	el : "#quiz_results",
	data : MODEL
});

let url = new URL(document.location);
let quiz_id = url.searchParams.get("id");

let request = {
	type :  "POST",
	contentType : "application/json",
	url : "https://worknplay2.azurewebsites.net/api/Quiz/GetResults",
	data : JSON.stringify({ data : { id : quiz_id }}),
	dataType : "json",
	success : function(response) {
		MODEL.quiz_results = response.data;
	},
	error : function(response) {
		alert(response.responseJSON.error.message);
	}
};

SESSION.putToAjaxRequest(request);
$.ajax(request);