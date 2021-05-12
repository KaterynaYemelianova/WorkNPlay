var MODEL = {
	projects : []
};

Vue.component('project', {
	props : ['project_model'],
	methods : {
		remove : function() {
			let deleted = this.$props.project_model;
			let dto = {
				data : {
					id : deleted.id		
				}
			}
			
			let request = {
				type :  "POST",
				contentType : "application/json",
				url : "http://worknplay.somee.com/api/Project/Remove",
				data : JSON.stringify(dto),
				dataType : "json",
				success : function(response) {
					MODEL.projects.splice(
						MODEL.projects.indexOf(deleted), 1
					);
				},
				error : function(response) {
					alert(response.error.message);
				}
			};

			SESSION.putToAjaxRequest(request);
			$.ajax(request);
		},
		bind : function() {
			let binded = this.$props.project_model;
			let dto = {
				data : {
					id : binded.id		
				}
			}
			
			let request = {
				type :  "POST",
				contentType : "application/json",
				url : "http://worknplay.somee.com/api/Project/Bind",
				data : JSON.stringify(dto),
				dataType : "json",
				success : function(response) {
					
				},
				error : function(response) {
					let getAuthLinkRequest = {
						type : "POST",
						contentType : "application/json",
						url : "http://worknplay.somee.com/api/ProjectManagementSystem/GetAuthLink",
						data : JSON.stringify({ data : { id : binded.id	 }}),
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
				}
			};

			SESSION.putToAjaxRequest(request);
			$.ajax(request);
		}, 
		save : function(task) {
			let dto = {
				data : task
			}
			
			let request = {
				type :  "POST",
				contentType : "application/json",
				url : "http://worknplay.somee.com/api/Task/Update",
				data : JSON.stringify(dto),
				dataType : "json",
				success : function(response) {
					
				},
				error : function(response) {
					
				}
			};

			SESSION.putToAjaxRequest(request);
			$.ajax(request);
		}
	},
	template :
	`<div class="list-item-containter">
		<span class="company_name"> Project "{{ project_model.name }}" </span>
		
		<button v-on:click="remove()"
				class="login100-form-btn comp_btn" 
				style="background-color: red; float: right;">{{ 'delete' | localize }}</button>
		<button v-on:click="bind()"
				class="login100-form-btn comp_btn" 
				style="background-color: blue; float: right;">{{ 'bind' | localize }}</button>
		<br/>
		<h1>Tasks:</h1>
		<div class="list-item-containter" v-for="task of project_model.tasks">
			<span class="company_name"> {{ task.name }} </span>
			<div class="wrap-input100 validate-input">
				<label>Estimate in hours</label>
				<input class="input100" style="padding-left:30px; border-radius:20px;" type="number" name="estimate" placeholder="Estimate" v-model="task.estimate">
			</div>
			<div class="wrap-input100 validate-input">
				<label>Priority</label>
				<input class="input100" style="padding-left:30px; border-radius:20px;" type="number" name="priority" placeholder="Priority" v-model="task.priority">
			</div>
			<div class="wrap-input100 validate-input">
				<label>Use {ESTIMATE}, {PRIORITY} and {LEFT_HOURS} in the formula</label>
				<input class="input100" style="padding-left:30px; border-radius:20px;" type="text" name="alt_reward_formula" placeholder="Alt Reward Formula" v-model="task.alt_reward_formula">
			</div>
			<div class="wrap-input100 validate-input" v-if="task.assignee">
				<label>Assignee</label>
				<input class="input100" style="padding-left:30px; border-radius:20px;" v-bind:value="task.assignee.login" readonly>
			</div>
			<button v-on:click="save(task)"
				class="login100-form-btn comp_btn" 
				style="background-color: blue; float: right;">{{ 'save' | localize }}</button>
			<br/>
			<br/>
			<br/>
		</div>
	</div>`
});

new Vue({
	el : "#projects",
	data : MODEL
});

let request = {
	type :  "POST",
	contentType : "application/json",
	url : "http://worknplay.somee.com/api/Project/GetAll",
	data : JSON.stringify({ data : {}}),
	dataType : "json",
	success : function(response) {
		MODEL.projects = response.data;
	},
	error : function(response) {
		alert(response.responseJSON.error.message);
	}
};

SESSION.putToAjaxRequest(request);
$.ajax(request);