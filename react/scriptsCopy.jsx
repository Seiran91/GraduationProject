
/* Using jQuery to fetch data from the server which is return string where we use JSON.parse to become a Javascript Object */
$.get("connection.php", function(data){
	
	const components = JSON.parse(data); //Parse the data with JSON.parse() to become a JavaScript object.
	const students = _.sortBy(components, "Name"); //Using Underscore to sort the array by the field "Name" (The list should be sorted before the mapping!)
	// test class
	function StudentList(props){
		const list = props.students;
		
		//Create and map the new list of the students
		var studentList = list.map((list) => 
				<li key = {list.id}>
					<span className="list-header" onClick={() => showDetails(list)}>{list.Name}</span>
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
			
			// Creating the view of student with details
			class StudentView extends React.Component{
				constructor(props){
					super(props);
					this.state = {
							id: temp.id,
							Name: temp.Name,
							Title: temp.Title,
							Email: temp.Email
						};
						
				}
				showList() {
					ReactDOM.unmountComponentAtNode(document.getElementById('content-details'));
					ReactDOM.render(<StudentList/>, document.getElementById('content'));
				}
				render(){
					var studentDetails= <div>
											<button onClick={this.showList} >Πίσω</button>
											<h3>{this.state.Name}</h3>
											<h4>Title: {this.state.Title}</h4>
											<h4>Email: {this.state.Email}</h4>
											<button onClick={() => stlithis.editDetailsForm(this)}>Επεξεργασία</button>
											<button onClick={() => stlithis.Delete(this)}>Διαγραφή</button>
										</div>;
					return(studentDetails);
				}
				
			}; 
			// Rendering the student view with details
			ReactDOM.render(<StudentView/>, document.getElementById('content'));
		}
		/*
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
					tempEdit.setState({
						Name: this.state.Name,
						Title: this.state.Title,
						Email: this.state.Email
					});
					alert("You update: " + this.state.Name);
					// I find the index of the array in the list with my models id
					var foundIndex = stlithis.state.list.findIndex(x => x.id == tempEdit.state.id);
					//console.log("tempEdit is:"+tempEdit.state.id + "\n" + "foundIndex is:"+ foundIndex);
					console.log(stlithis.state.list[foundIndex]);
					console.log(tempEdit.state);
					
					/* Here im trying to update the list of the students but i have issue with unmounted component must solve
					stlithis.setState({
						//list[foundIndex] = tempEdit.state;
					}); */
					ReactDOM.unmountComponentAtNode(document.getElementById('content-details'));
					};
			};
			// Render the details form for edit
			ReactDOM.render(<StudentDetailsView/>, document.getElementById('content-details'));
		} */
		Delete(tempDel){
				console.log(tempDel.state.Name+"'s Delete clicked!");
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
	ReactDOM.render(<StudentList list = students />, document.getElementById('content'));
	//ReactDOM.render(<tester />, document.getElementById('content-details'));
	
});