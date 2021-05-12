var MODEL = {
	presents : []
};

Vue.component('present', {
	props : ['present_model'],
	methods : {
		buy : function() {
			let toBuy = this.$props.present_model;
			let dto = {
				data : {
					id : toBuy.id		
				}
			}
			
			let request = {
				type :  "POST",
				contentType : "application/json",
				url : "https://worknplay2.azurewebsites.net/api/Present/Buy",
				data : JSON.stringify(dto),
				dataType : "json",
				success : function(response) {

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
		
		<span class="company_name"> {{ present_model.name }}; Price: {{ present_model.points_cost }} </span>
		<img v-bind:src="present_model.image_url" style="height: 5em; width: 5em; margin: -20px -20px -20px 20px"></img>
		<button v-on:click="buy()"
				class="login100-form-btn comp_btn" 
				style="background-color: blue; float: right;">{{ 'buy' | localize }}</button>
		
	</div>`
});

new Vue({
	el : "#presents",
	data : MODEL
});

let request = {
	type :  "POST",
	contentType : "application/json",
	url : "https://worknplay2.azurewebsites.net/api/Present/GetAll",
	data : JSON.stringify({ data : {} }),
	dataType : "json",
	success : function(response) {
		MODEL.presents = response.data;
	},
	error : function(response) {
		alert(response.responseJSON.error.message);
	}
};

SESSION.putToAjaxRequest(request);
$.ajax(request);