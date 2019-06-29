// Using jQuery to fetch data from the server which is return string where we use JSON.parse to become a Javascript Object
const data = $.ajax({type: "GET", url: "create-read.php", async: false}).responseText;

var components = JSON.parse(data);
var sortedStudents = _.sortBy(components, "Name"); //Using Underscore to sort the array by the field "Name" (The list should be sorted before the mapping!)
var detailsFormVisibility = true; // Set boolean variable for edit form visibility

// Create button element to display adding form
	var registerButton = <div>
						<button className="button" onClick={newStudentForm}>Εγγραφή</button>
						<h1>React Web App</h1>
						</div>;
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
					<span className="list-header" onClick={() => ReactDOM.render(<StudentDetailedView student ={list} />, document.getElementById('content')) }>{list.Name}</span>
				</li>
		); 
		return(
			<div>
				<ul>{studentList}</ul>
			</div>
		);
	}
}

// Creating the view of student with details
class StudentDetailedView extends React.Component{
	constructor(props){
		super(props);
		this.state = {
				id: props.student.id,
				Name: props.student.Name,
				Title: props.student.Title,
				Email: props.student.Email
			};
	}
	
	componentDidMount() {
		ReactDOM.unmountComponentAtNode(document.getElementById('add-button-title'));
		ReactDOM.unmountComponentAtNode(document.getElementById('list'));
		//console.log("componentDidMount() run");
	}
	
	componentWillUnmount(){
		ReactDOM.unmountComponentAtNode(document.getElementById('content-details'));
		ReactDOM.render(registerButton, document.getElementById('add-button-title'));
		//console.log("componentWillUnmount() run");
		// Here after update or not im rendering the students list again with students prop
		ReactDOM.render(<StudentList students ={sortedStudents} />, document.getElementById('list'));
	}
	
	render(){
		var studentDetails= <div>
								<button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('content')) } >Πίσω</button>
								<h3>Name: {this.state.Name}</h3>
								<h4>Title: {this.state.Title}</h4>
								<h4>Email: {this.state.Email}</h4>
								<button className="button" onClick={() => ReactDOM.render(<StudentEditView details = {this} />, document.getElementById('content-details')) }>Επεξεργασία</button>
								<button className="button" onClick={() => Delete(this.state.id)}>Διαγραφή</button>
							</div>;
		return(studentDetails);
	}
	
}; 

//Creating the view of the details form for edit
class StudentEditView extends React.Component{
		constructor(props){
			super(props);
			this.state = {
						id: props.details.state.id,
						Name: props.details.state.Name,
						Title: props.details.state.Title,
						Email: props.details.state.Email
				};
				// This binding is necessary because class methods are not bound by default.
				this.handleChangeName = this.handleChangeName.bind(this);
				this.handleChangeTitle = this.handleChangeTitle.bind(this);
				this.handleChangeEmail = this.handleChangeEmail.bind(this);
				this.Update = this.Update.bind(this);
		}
		
		handleChangeName(event) {
			this.setState({
						Name: CapitalizeName(event.target.value)
			});
		}
		handleChangeTitle(event) {
			this.setState({
				Title: CapitalizeFirstLetter(event.target.value)
			});
		}
		handleChangeEmail(event) {
			this.setState({
				Email: event.target.value
			});
		}
		Update(event){
			event.preventDefault();
			var statesBeforeChange = this.props.details.state;
			var previousState = this.props.details;
			var formData = this;
			
			// Here i'm sending the data for update in DB, if the request be success then the callback will run and will update also the list of the View at Front
			$.post('update.php', formData.state, function(data){
				if(data === previousState.state.id){
					console.log("The students id for update is: " + statesBeforeChange.id);
					console.log("The result is: " + data);
					previousState.setState({
						Name: formData.state.Name,
						Title: formData.state.Title,
						Email: formData.state.Email
					});
					
					// I'm searching the index of the sortedStudents array list with my models id
					var foundIndex = sortedStudents.findIndex(x => x.id == previousState.state.id);
					updateList(formData.state, foundIndex);
					
					 //Here im updating the list of the students
					function updateList(updatedComponents, index){
						sortedStudents[index] = updatedComponents;
						sortedStudents = _.sortBy(sortedStudents, "Name");
						alert("You update model from: \n" + statesBeforeChange.Name + "\n"
													+ statesBeforeChange.Title + "\n"
													+ statesBeforeChange.Email + "\n"
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
		
		Cancel(){
			ReactDOM.unmountComponentAtNode(document.getElementById('content-details'));
		}
		
		render(){
				var editTemp =
						<form onSubmit={this.Update}>
							<table>
								<tbody>
								<tr>
									<th>Name: </th>
									<td>
										<input type="text" value={this.state.Name} onChange={this.handleChangeName}/>
									</td>
								</tr>
								<tr>
									<th>Title: </th>
									<td>
										<input type="text" value={this.state.Title} onChange={this.handleChangeTitle}/>
									</td>
								</tr>
								<tr>
									<th>Email: </th>
									<td>
										<input type="email" value={this.state.Email} onChange={this.handleChangeEmail}/>
									</td>
								</tr>
								<tr>
									<td colSpan="2" className="editForm">
										<input type= "submit" value= "Ενημέρωση" />
									</td>
									<td colSpan="2" className="editForm">
										<button onClick={() => this.Cancel()}>Άκυρο</button>
									</td>
								</tr>
								</tbody>
							</table>
						</form>;
						
				return(editTemp);
		}	
};

function Delete(tempDel){
	var firstconfirmation = confirm("You are about to delete this item.");
	if(firstconfirmation){
		var secondconfirmation = confirm("The data cannot be restored after removing. For continue press OK");
	}
	// The function bellow it's similar function of jQuery $.post() but with different syntax
	if(firstconfirmation == true && secondconfirmation == true){
		$.ajax({
			type: 'POST',
			url: 'delete.php',
			data: {id: tempDel},
			success: function(result){
				console.log("The model with id: "+ result +" DELETED!");
				console.log("The requested id: " + tempDel + " The result from DB: " + result);
				var foundIndex = sortedStudents.findIndex(x => x.id == tempDel);
				sortedStudents.splice(foundIndex, 1);
				ReactDOM.render(registerButton, document.getElementById('add-button-title'));
				ReactDOM.unmountComponentAtNode(document.getElementById('content'));
				ReactDOM.render(<StudentList students ={sortedStudents} />, document.getElementById('list'));
			}
		});
	}else{
		alert("The delete process canceled");
	}
}

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			Name: '',
			Title: '',
			Email: ''
		};
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
	}
	
	handleChangeName(event) {
		this.setState({
					Name: CapitalizeName(event.target.value)
		});
	}
	handleChangeTitle(event) {
		this.setState({
			Title: CapitalizeFirstLetter(event.target.value)
		});
	}
	handleChangeEmail(event) {
		this.setState({
			Email: event.target.value
		});
	}

	render(){
		var regform = 	
					<div>
						<button className="back-button" onClick={BacktoList}>Πίσω</button>
						<h3>Όλα τα πεδία συμπληρώνονται υποχρεωτικά</h3>
						<form onSubmit={addStudent}>
							<table>
								<tbody>
								<tr>
									<th>Name: </th>
									<td>
										<input type="text" className="model-Name" value={this.state.Name} onChange={this.handleChangeName} placeholder="Name" required />
									</td>
								</tr>
								<tr>
									<th>Title: </th>
									<td>
										<input type="text" className="model-Title" value={this.state.Title} onChange={this.handleChangeTitle} placeholder="Title" required/>
									</td>
								</tr>
								<tr>
									<th>Email: </th>
									<td>
										<input type="email" className="model-Email" value={this.state.Email} onChange={this.handleChangeEmail} placeholder="Email" required/>
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
		return (regform);
	}
};

// Set function for add new student in the list(DB)
function newStudentForm(){
	ReactDOM.unmountComponentAtNode(document.getElementById('list'));
	ReactDOM.render(<Register />, document.getElementById('add-button-title'));
}
// Here im adding the new person into the DB with SEND method and updating the studentsList with the new updated list
function addStudent(event){
	event.preventDefault();
	var CapName = CapitalizeFirstLetter(event.target[0].value);
	var CapTitle = CapitalizeFirstLetter(event.target[1].value);
	var tempstvar = { Name: CapName, Title: CapTitle, Email: event.target[2].value };
	sendfn(tempstvar);
	$('.model-Name').val('');
	$('.model-Title').val('');
	$('.model-Email').val('');
	alert("The new Student just inserted to the DB");
}
function CapitalizeName(val){
	var CapitalizedValue = val.toLowerCase().split(' ');
	for(var i=0; i < CapitalizedValue.length; i++){
		CapitalizedValue[i] = CapitalizedValue[i].charAt(0).toUpperCase() + CapitalizedValue[i].substring(1);
	}
	//console.log(splittedData.join(' '));
	//console.log(CapitalizedValue);
	return CapitalizedValue.join(' ');
}

function CapitalizeFirstLetter(val){
	var CapitalizedValue = val.charAt(0).toUpperCase() + val.slice(1);
	return CapitalizedValue;
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

function BacktoList(){
	ReactDOM.render(registerButton, document.getElementById('add-button-title'));
	ReactDOM.render(<StudentList students ={sortedStudents} />, document.getElementById('list'));
}

$( document ).ready(function() {
	// Render the add button and the list of the students
	ReactDOM.render(registerButton, document.getElementById('add-button-title'));
	ReactDOM.render(<StudentList students ={sortedStudents} />, document.getElementById('list'));
});
//});