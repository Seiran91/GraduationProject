
/* Using jQuery to fetch data from the server which is return string where we use JSON.parse to become a Javascript Object */
$.get("connection.php", function(data){
	
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
					tempEdit.setState({
						Name: this.state.Name,
						Title: this.state.Title,
						Email: this.state.Email
					});
					// I'm searching the index of the sortedStudents array list with my models id
					var foundIndex = sortedStudents.findIndex(x => x.id == tempEdit.state.id);
					updateList(this.state, foundIndex);
					
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
				};
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
				alert("The model: \n" +
					tempDel.state.Name + "\n" +
					tempDel.state.Title + "\n" +
					tempDel.state.Email + "\n" +
					"DELETED!"
				);
				console.log("The model: \n" +
					tempDel.state.Name + "\n" +
					tempDel.state.Title + "\n" +
					tempDel.state.Email + "\n" +
					"DELETED!");
				var foundIndex = sortedStudents.findIndex(x => x.id == tempDel.state.id);
				sortedStudents.splice(foundIndex, 1);
				ReactDOM.unmountComponentAtNode(document.getElementById('content'));
				ReactDOM.render(<StudentList students ={sortedStudents} />, document.getElementById('content'));
			}
	};
	/*
	// Prepare the list of students for rendering
	class StudentList extends React.Component{
		constructor(props){
			super(props);
			console.log("asd");
		}
		render(){
			return(
				<div>
					<ul>{studentList}</ul>
				</div>
			);
		}
	};
	*/
	// Render the list of students
	ReactDOM.render(<StudentList students ={sortedStudents} />, document.getElementById('content'));
	//ReactDOM.render(<tester />, document.getElementById('content-details'));
	
});