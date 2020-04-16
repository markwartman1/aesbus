let users = [
	{
		name: 'Tom Smith',
		company: 'Abc Corp',
		role: 'CEO',
		tenure: 15,
	},
	{
		name: 'John Doe',
		company: 'Xyz Corp',
		role: 'CEO',
		tenure: 10,
	},
	{
		name: 'Marcus Gutierrez',
		company: 'Abc Corp',
		role: 'Manager',
		tenure: 13,
	},
	{
		name: 'Janice Cooper',
		company: '123 Corp',
		role: 'CEO',
		tenure: 17,
	},
	{
		name: 'Tina Aldridge',
		company: 'Xyz Corp',
		role: 'Manager',
		tenure: 5,
	},
	{
		name: 'Cindy Nguyen',
		company: 'Xyz Corp',
		role: 'Programmer',
		tenure: 3,
	},
	{
		name: 'Jackson Green',
		company: 'Abc Corp',
		role: 'Programmer',
		tenure: 2,
	},
	{
		name: 'Adam Palmer',
		company: '123 Corp',
		role: 'Programmer',
		tenure: 1,
	},
];
let sortedUsers;
let totalUsers;
const usersPerPage = 3;
let curPage = 1;				// start on page 1
let totalPages;
let allCompanies;

(() => {
	sortedUsers = sortUsers(users);
	totalUsers = users.length; // update to set this as the total number of users
	totalPages = determineTotalNumberOfPages(totalUsers, usersPerPage);
	allCompanies = generateArrayOfUniqueCompanies(users);

	populateCurrentUsersIntoHtml();
	populateAllCompaniesIntoCompaniesDiv();
	//setupButtons();
})();


function sortUsers(users) {
	// return an array of users sorted by company first, then name
    //return [];
    return users.sort((a, b) => {
        if (a.company === b.company) {
            return a.name > b.name ? 1 : -1;
        }
        return a.company > b.company ? 1 : -1;
    });
}

function determineTotalNumberOfPages(totalUsers, perPage) {
    // return the total number of possible pages
    if (totalUsers > 0) {
        return Math.ceil(totalUsers/perPage);
    } else {
        return 0;
    }
}

function generateArrayOfUniqueCompanies(users) {
	// return an array of unique corporations from all users, sorted
	return [...new Set(users.map(item => item.company))];
}

function populateCurrentUsersIntoHtml() {
	// populate the #usersContent div with the currently visible users based on the pagination and give each user div a class name of user
	// each user should display Company, Name, Role, Tenure, in that order.
	// the currently defined .user class has a css grid setup already
	// add a class to user user sub div where the class equals the key name in the user object

	// once the users have been added, call to update the pagination text

	// RESET HTML
	document.getElementById("company").innerHTML =""
	document.getElementById("name").innerHTML =""
	document.getElementById("role").innerHTML =""
	document.getElementById("tenure").innerHTML ="";

	
    var count = 0;	// this represents: user of sortedUsers OR index of array
    
    while(count < sortedUsers.length){
        if(count >= (usersPerPage * (curPage - 1)) && count < (usersPerPage * curPage)){

			const stop = count + usersPerPage;
			//holderArray.push(sortedUsers.slice(count, count + usersPerPage));
			while (count < (stop) && count < sortedUsers.length) {
				
				document.getElementById("company").innerHTML +=
				"<p class='user'>"+sortedUsers[count].company+"</p>"
				document.getElementById("name").innerHTML +=
				"<p class='user'>"+sortedUsers[count].name+"</p>"
				document.getElementById("role").innerHTML +=
				"<p class='user'>"+sortedUsers[count].role+"</p>"
				document.getElementById("tenure").innerHTML +=
				"<p>"+sortedUsers[count].tenure+"</p>";

				count++;
			}
        }
      count += usersPerPage;
	}
	
	/**
	 * THIS WILL JUST LOOP THROUGH ALL THE USERS
	 */
	// for (let index = 0; index < sortedUsers.length; index++) {
	// 	document.getElementById("company").innerHTML +=
	// 	"<p class='user'>"+sortedUsers[index].company+"</p>"
	// 	document.getElementById("name").innerHTML +=
	// 	"<p class='user'>"+sortedUsers[index].name+"</p>"
	// 	document.getElementById("role").innerHTML +=
	// 	"<p class='user'>"+sortedUsers[index].role+"</p>"
	// 	document.getElementById("tenure").innerHTML +=
	// 	"<p>"+sortedUsers[index].tenure+"</p>"
	// }
	updatePaginationText();
}

function updatePaginationText() {
	// this should update the text inside of #pagText to show current page and total number of pages
	document.getElementById("pagText").innerHTML =
	"<span>"+curPage+" of "+totalPages+"</span>";
}

function populateAllCompaniesIntoCompaniesDiv() {
	// populate the #companies div with the unique companies in the allCompanies array
	for (let i=0; i < allCompanies.length; i++) {
		document.getElementById("companies").innerHTML +=
		"<p>"+allCompanies[i]+"</p>";
	}
}

function setupButtons(id) {
	// setup each button to navigate forward or back within the users pagination when clicked
	
	if (id === 'forward') {
		if (curPage < totalPages) {
			curPage++;
			populateCurrentUsersIntoHtml();
		}
		console.log("yes forward");
	} else if (id === 'back') {
		if (curPage >= 2) {
			curPage--;
			populateCurrentUsersIntoHtml();
		}
		console.log("yes back");
	}
}


