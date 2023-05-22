let username;
document.getElementById("start").onclick = function (){
    username = document.getElementById("username").value;
    if(username == ""){
        window.alert("You need to enter a user name to proceed")
    }else{
        window.location.href = "Quiz.html?username=" + encodeURIComponent(username)
    }
}