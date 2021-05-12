var MODEL = {
	projects : []
};

Vue.component('myproject', {
	props : ['project_model'],
	template :
	`<div class="list-item-containter">
		<span class="company_name"> Project "{{ project_model.name }}" </span>
		<br/>
		<h1>Tasks:</h1>
		<div class="list-item-containter" v-for="task of project_model.tasks">
			<span class="company_name"> {{ task.name }} </span>
			<div class="wrap-input100 validate-input">
				<label>Estimate in hours</label>
				<input class="input100" style="padding-left:30px; border-radius:20px;" type="number" name="estimate" placeholder="Estimate" v-bind:value="task.estimate" v-model="task.estimate" readonly>
			</div>
			<div class="wrap-input100 validate-input">
				<label>Priority</label>
				<input class="input100" style="padding-left:30px; border-radius:20px;" type="number" name="priority" placeholder="Priority" v-bind:value="task.priority" v-model="task.priority" readonly>
			</div>
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
	url : "http://worknplay.somee.com/api/Project/GetMy",
	data : JSON.stringify({}),
	dataType : "json",
	success : function(response) {
		MODEL.projects = response.data;
	},
	error : function(response) {
		alert(response.error.message);
	}
};

SESSION.putToAjaxRequest(request);
$.ajax(request);