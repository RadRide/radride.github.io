const username = document.getElementById("username");
let enteredName;
document.getElementById("start").onclick = checkUsername;

username.addEventListener("keydown", event=>{
    if(event.key == "Enter"){
        event.preventDefault();
        checkUsername();
    }
})

function checkUsername(){
    enteredName = username.value;
    if(enteredName == ""){
        window.alert("You need to enter a user name to proceed")
    }else{
        window.location.href = "Quiz.html?username=" + encodeURIComponent(enteredName)
    }
}