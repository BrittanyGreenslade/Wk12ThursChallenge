//question 1
//success fn for getting all users
function getUsersSuccess(res) {
  //if you console.log(res) you can see that 'data' a key in the object 'res'
  let users = res.data;
  console.log(users);
  let userDataContainer = document.getElementById("userData");
  for (let i = 0; i < users.length; i++) {
    //we made this div so that it was easier to delete the entire div in the 'delete' fn
    //we need the id because it deletes the users by that id number
    userDataContainer.innerHTML += `<div id="user${users[i].id}"> 
    <h3>Name: ${users[i].name}</h3> 
    <h4>Username: ${users[i].username}</h4>
    <p>Email: ${users[i].email}</p>
    <button onclick="deleteUser(${users[i].id})">Delete User</button>
    <br></div>`;
    //Alex said "I know I told you guys not to use onclick in html but this is the easiest way"
  }
}
//failure fn for getting all users
function getUsersFailure(err) {
  console.log(err);
  document.getElementById(
    "userData"
  ).innerHTML = `<p>Please refresh and try again</p>`;
  //you can make a function that refreshes the page here if you want
}
//sending the request to get all users
axios
  .request({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/users",
  })
  .then(getUsersSuccess)
  .catch(getUsersFailure);

//question 2-3
function deleteUser(id) {
  axios
    .request({
      method: "DELETE",
      url: `https://jsonplaceholder.typicode.com/users/${id}`,
      headers: { "Content-Type": "application/json" },
    })
    .then(deleteUserSuccess)
    .catch(deleteUserError);
}
function deleteUserSuccess(res) {
  //grab the url
  //if you console.log(res) you can see that 'url' a key in the object 'res'
  let url = res.config.url;

  //this will split the url into sections at every /
  let urlSections = url.split("/");
  // console.log(urlSections);
  //now just need to get that element out of the page
  //pop the id off the end of the url
  let id = "user" + urlSections.pop();
  let userDiv = document.getElementById(id);
  //can do this:
  //   userDiv.remove();
  //or this to make it look nicer:
  userDiv.innerHTML = `<p>${id} was deleted!</p>`;
}
//in case stg goes wrong
function deleteUserError(res) {
  //add error message here
  console.log(res);
}
