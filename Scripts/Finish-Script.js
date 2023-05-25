const params = new URLSearchParams(window.location.search);
let username = params.get("username");
let score = params.get("score");
const button = document.getElementById("retry");

if(score == null){
    score = "0";
}
if(username == null){
    username = "Your Username"
}

leaderboardArray = [
    {
        name: "Mark", lscore: "8", color: ""
    },
    {
        name: "Tracey", lscore: "6", color: ""
    },
    {
        name: "Jacob", lscore: "7", color: ""
    },
    {
        name: "Larry", lscore: "5", color: ""
    },
    {
        name: "Tony", lscore: "3", color: ""
    },
    {
        name: "Melissa", lscore: "2", color: ""
    },
    {
        name: username, lscore: score, color: 'class = "table-dark text-capitalize"'
    }
];

buildTable();
button.onclick = tryAgain;

function buildTable(){
    leaderboardArray.sort((a,b) => parseInt(b.lscore) - parseInt(a.lscore));
    let table = document.getElementById("leaderboard-body");
    for(let i = 0; i < leaderboardArray.length; i++){
        let row = "<tr " + leaderboardArray[i].color + ">\n" +
            "      <th scope=\"row\">" + (i + 1) + "</th>\n" +
            "      <td>" + leaderboardArray[i].name + "</td>\n" +
            "      <td>" + leaderboardArray[i].lscore + "</td>\n" +
            "    </tr>";
        table.innerHTML += row;
    }
}

function tryAgain(){
    window.location.href = "Quiz.html?username=" + encodeURIComponent(username);
}