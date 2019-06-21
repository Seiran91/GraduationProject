
// Using jQuery to fetch data from the server which is return string where we use JSON.parse to become a Javascript Object
$.get("create-read.php", function(data){
	
	var components = JSON.parse(data); //Parse the data with JSON.parse() to become a JavaScript object.
	var sortedStudents = _.sortBy(components, "Name"); //Using Underscore to sort the array by the field "Name" (The list should be sorted before the mapping!)
	var detailsFormVisibility = true; // Set boolean variable for edit form visibility
	// test class
	class StudentList extends React.Component{
		constructor(props){
			super(props);
			this.state = {
						list: props.students
						};
		}
		
		render(){
			//Create and map the new list of the students
			var studentList = this.state.list.map((list) => 
					<li key = {list.id}>
						<span className="list-header" onClick={() => this.showDetails(list)}>{list.Name}</span>
					</li>
			); 
			return(
				<div>
					<ul>{studentList}</ul>
				</div>
			);
		}
		
		// showDetails function creating the student view with details in given format below in the code in studentDetails variable
		showDetails(temp){
			var stlithis = this;
			detailsFormVisibility = true; // Initialize the edit form visibility
			
			// Creating the view of student with details
			class StudentView extends React.Component{
				constructor(props){
					super(props);
					this.state = {
							id: props.student.id,
							Name: props.student.Name,
							Title: props.student.Title,
							Email: props.student.Email
						};
						
				}
				showList() {
					ReactDOM.render(buttonelement, document.getElementById('add-button-title'));
					ReactDOM.unmountComponentAtNode(document.getElementById('content-details'));
					// Here after update or not im rendering the students list again with students prop
					ReactDOM.render(<StudentList students ={sortedStudents} />, document.getElementById('content'));
				}
				render(){
					var studentDetails= <div>
											<button onClick={this.showList} >Πίσω</button>
											<h3>{this.state.Name}</h3>
											<h4>Title: {this.state.Title}</h4>
											<h4>Email: {this.state.Email}</h4>
											<button className="button" onClick={() => stlithis.editDetailsForm(this)}>Επεξεργασία</button>
											<button className="button" onClick={() => stlithis.Delete(this)}>Διαγραφή</button>
										</div>;
					return(studentDetails);
				}
				
			}; 
			// Rendering the student view with details
			ReactDOM.render(<StudentView student ={temp} />, document.getElementById('content'));
			ReactDOM.unmountComponentAtNode(document.getElementById('add-button-title'));
		}
		
		// editDetailsForm function create the form with student details for edit
		editDetailsForm(tempEdit) {
			var stlithis = this;
			//Creating the view of the details for edit
			class StudentDetailsView extends React.Component{
				constructor(props){
					super(props);
					this.state = {
								id: tempEdit.state.id,
								Name: tempEdit.state.Name,
								Title: tempEdit.state.Title,
								Email: tempEdit.state.Email
						};
						// This binding is necessary because class methods are not bound by default.
						this.handleChangeName = this.handleChangeName.bind(this);
						this.handleChangeTitle = this.handleChangeTitle.bind(this);
						this.handleChangeEmail = this.handleChangeEmail.bind(this);
						this.Update = this.Update.bind(this);
				}
				
				render(){
					var editTemp =
							<form onSubmit={this.Update}>
								<table>
									<tbody>
									<tr>
										<td>Name: </td>
										<td>
											<input type="text" value={this.state.Name} onChange={this.handleChangeName}/>
										</td>
									</tr>
									<tr>
										<td>Title: </td>
										<td>
											<input type="text" value={this.state.Title} onChange={this.handleChangeTitle}/>
										</td>
									</tr>
									<tr>
										<td>Email: </td>
										<td>
											<input type="email" value={this.state.Email} onChange={this.handleChangeEmail}/>
										</td>
									</tr>
									<tr>
										<td colSpan="2" className="editForm">
											<input type= "submit" value= "Ενημέρωση" />
										</td>
									</tr>
									</tbody>
								</table>
							</form>;
					return(editTemp);
				}
				handleChangeName(event) {
					this.setState({
								Name: event.target.value
					});
				}
				handleChangeTitle(event) {
					this.setState({
						Title: event.target.value
					});
				}
				handleChangeEmail(event) {
					this.setState({
						Email: event.target.value
					});
				}
				Update(event){
					event.preventDefault();
					var previousState = tempEdit.state;
					var helper = this;
					// Here i'm sending the data for update in DB, if the request be success then the callback will run and will update also the list of the View at Front
					$.post('update.php', helper.state, function(data){
						if(data === tempEdit.state.id){
							console.log("The students id for update is: " + tempEdit.state.id);
							console.log("The result is: " + data);
							tempEdit.setState({
								Name: helper.state.Name,
								Title: helper.state.Title,
								Email: helper.state.Email
							});
							
							// I'm searching the index of the sortedStudents array list with my models id
							var foundIndex = sortedStudents.findIndex(x => x.id == tempEdit.state.id);
							updateList(helper.state, foundIndex);
							
							 //Here im updating the list of the students
							function updateList(updatedComponents, index){
								sortedStudents[index] = updatedComponents;
								alert("You update model from: \n" + previousState.Name + "\n"
															+ previousState.Title + "\n"
															+ previousState.Email + "\n"
															+"to:"+ "\n"
															+ updatedComponents.Name + "\n"
															+ updatedComponents.Title + "\n"
															+ updatedComponents.Email
								);
								console.log("The list component it's updated!");
							}; 
							ReactDOM.unmountComponentAtNode(document.getElementById('content-details'));
							detailsFormVisibility = true;
						} else {
							alert(data);
						}
					});
				}
			};
			if(detailsFormVisibility){
			// Render the details form for edit
				ReactDOM.render(<StudentDetailsView/>, document.getElementById('content-details'));
				detailsFormVisibility = !detailsFormVisibility;
			}else{
				ReactDOM.unmountComponentAtNode(document.getElementById('content-details'));
				detailsFormVisibility = !detailsFormVisibility;
			}
		}
		Delete(tempDel){
			var firstconfirmation = confirm("You are about to delete this item.");
			if(firstconfirmation){
				var secondconfirmation = confirm("The data cannot be restored after removing. For continue press OK");
			}
			// The function bellow it's similar function of jQuery $.post() but with different syntax
			if(firstconfirmation == true && secondconfirmation == true){
				$.ajax({
					type: 'POST',
					url: 'delete.php',
					data: tempDel.state,
					success: function(result){
						console.log("The model: \n" +
							tempDel.state.Name + "\n" +
							tempDel.state.Title + "\n" +
							tempDel.state.Email + "\n" +
							"DELETED!");
						console.log("The requested id: " + tempDel.state.id + " The result from DB: " + result);
						var foundIndex = sortedStudents.findIndex(x => x.id == tempDel.state.id);
						sortedStudents.splice(foundIndex, 1);
						ReactDOM.render(buttonelement, document.getElementById('add-button-title'));
						ReactDOM.unmountComponentAtNode(document.getElementById('content'));
						ReactDOM.render(<StudentList students ={sortedStudents} />, document.getElementById('content'));
					}
				});
			}else{
				alert("The delete process canceled");
			}
		}
	};

	// Set function for add new student in the list(DB)
	function newStudentForm(){
		var tempvar = 	
						<div>
							<button className="back-button" onClick={BacktoList}>Πίσω</button>
							<h3>Όλα τα πεδία συμπληρώνονται υποχρεωτικά</h3>
							<form onSubmit={addStudent}>
								<table>
									<tbody>
									<tr>
										<td>Name: </td>
										<td>
											<input type="text" className="model-Name" placeholder="Name" required />
										</td>
									</tr>
									<tr>
										<td>Title: </td>
										<td>
											<input type="text" className="model-Title" placeholder="Title" required/>
										</td>
									</tr>
									<tr>
										<td>Email: </td>
										<td>
											<input type="email" className="model-Email" placeholder="Email" required/>
										</td>
									</tr>
									<tr>
										<td colSpan="2" className="editForm">
											<input type= "submit" value= "Ενημέρωση" />
										</td>
									</tr>
									</tbody>
								</table>
							</form>
						</div>;
		ReactDOM.render(tempvar, document.getElementById('add-button-title'));
		ReactDOM.unmountComponentAtNode(document.getElementById('content'));
	}
	// Here im adding the new person into the DB with SEND method and updating the studentsList with the new updated list
	function addStudent(event){
		event.preventDefault();
		var tempstvar = { Name: event.target[0].value, Title: event.target[1].value, Email: event.target[2].value };
		sendfn(tempstvar);
		alert("The new Student just inserted to the DB");
		$('.model-Name').val('');
		$('.model-Title').val('');
		$('.model-Email').val('');
	}
	// Post request to the server for INSERT the new student in DB
	function sendfn(student){
		$.post('create-read.php', student, function(data){
			console.log("Response is: "+ JSON.stringify(data));
			Object.assign(student, {id: data}); // Object.assign() copies the values (of all enumerable own properties) from one or more source objects to a target object. Here i am adding the "id" variable in the object!
			console.log("The new student obj: "+ JSON.stringify(student));
			sortedStudents.splice(0, 0, student);
			sortedStudents = _.sortBy(sortedStudents, "Name");
		});
	}
	// Create button element to display adding form
	var buttonelement = <div>
							<button className="button" onClick={newStudentForm}>Εγγραφή</button>
							<h1>React Web App</h1>
						</div>;
	function BacktoList(){
		ReactDOM.render(buttonelement, document.getElementById('add-button-title'));
		ReactDOM.render(<StudentList students ={sortedStudents} />, document.getElementById('content'));
	}
	// Render the add button and the list of the students
	ReactDOM.render(buttonelement, document.getElementById('add-button-title'));
	ReactDOM.render(<StudentList students ={sortedStudents} />, document.getElementById('content'));
});