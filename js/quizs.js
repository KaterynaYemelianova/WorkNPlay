var MODEL = {
	quizs : [],
	manage : false
};

Vue.component('quiz', {
	props : ['quiz_model'],
	methods : {
		start : function() {
			let quiz = this.$props.quiz_model;
			let dto = {
				data : {
					id : quiz.id		
				}
			}
			
			let request = {
				type :  "POST",
				contentType : "application/json",
				url : "https://worknplay2.azurewebsites.net/api/Quiz/Start",
				data : JSON.stringify(dto),
				dataType : "json",
				success : function(response) {
					
				},
				error : function(response) {
					alert(response.error.message);
				}
			};

			SESSION.putToAjaxRequest(request);
			$.ajax(request);
		},
		stop : function() {
			let quiz = this.$props.quiz_model;
			let dto = {
				data : {
					id : quiz.id		
				}
			}
			
			let request = {
				type :  "POST",
				contentType : "application/json",
				url : "https://worknplay2.azurewebsites.net/api/Quiz/Stop",
				data : JSON.stringify(dto),
				dataType : "json",
				success : function(response) {
				},
				error : function(response) {
					alert(response.error.message);
				}
			};

			SESSION.putToAjaxRequest(request);
			$.ajax(request);
		},
		play : function() {
			let quiz = this.$props.quiz_model;
			document.location = "../pages/quiz.html?id=" + quiz.id;
		},
		results : function() {
			let quiz = this.$props.quiz_model;
			document.location = "../pages/quiz_results.html?id=" + quiz.id;
		},
		all_results : function() {
			let quiz = this.$props.quiz_model;
			document.location = "../pages/all_quiz_results.html?id=" + quiz.id;
		}
	}, 
	computed : {
		canStart : function() {
			return this.$root.manage && !this.$props.quiz_model.is_active;
		},
		canStop : function() {
			return this.$root.manage && this.$props.quiz_model.is_active;
		}
	},
	template :
	`<div class="list-item-containter">
		<span class="company_name"> Quiz "{{ quiz_model.name }}" </span>
		<br/>
		<span> {{ quiz_model.description }} </span>
		<br/>
		<img v-if="quiz_model.image_url" v-bind:src="quiz_model.image_url" style="height: 10em; width: 10em;"></img>
		
		<button v-if="canStart"
				v-on:click="start()"
				class="login100-form-btn comp_btn" 
				style="background-color: blue; float: right;">{{ 'start' | localize }}</button>
				
		<button v-if="canStop"
				v-on:click="stop()"
				class="login100-form-btn comp_btn" 
				style="background-color: blue; float: right;">{{ 'stop' | localize }}</button>
				
		<button v-if="quiz_model.is_active"
				v-on:click="play()"
				class="login100-form-btn comp_btn" 
				style="background-color: red; float: right;">{{ 'play' | localize }}</button>
				
		<button v-if="!quiz_model.is_active"
				v-on:click="results()"
				class="login100-form-btn comp_btn" 
				style="background-color: red; float: right;">{{ 'results' | localize }}</button>
				
		<button v-if="!quiz_model.is_active"
				v-on:click="all_results()"
				class="login100-form-btn comp_btn" 
				style="background-color: red; float: right;">{{ 'all_results' | localize }}</button>
	</div>`
});

new Vue({
	el : "#quizs",
	data : MODEL
});

let request = {
	type :  "POST",
	contentType : "application/json",
	url : "https://worknplay2.azurewebsites.net/api/Quiz/GetAllQuizes",
	data : JSON.stringify({}),
	dataType : "json",
	success : function(response) {
		MODEL.quizs = response.data;
	},
	error : function(response) {
		alert(response.responseJSON.error.message);
	}
};

SESSION.putToAjaxRequest(request);
$.ajax(request);

ROLE.getRole(role => {
	MODEL.manage = role == "superadmin" || role == "owner" || role == "manager";
});