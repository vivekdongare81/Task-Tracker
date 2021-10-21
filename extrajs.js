

module.exports.getDate = getDate;

function getDate() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();
    var day = today.toLocaleDateString("en-US", options);
    return day;
}

module.exports.isWord = isWord;
function isWord(Notee) {
    {
        let ans = false;
        for (let i = 0; i < Notee.length; i++) {
            if (Notee[i] != " ") { ans = true; }
        }
        return ans;
    }
}