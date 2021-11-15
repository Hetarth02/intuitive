function copyMessage() {
    var copyText = document.getElementById("raw-answer");
    navigator.clipboard.writeText(copyText.textContent);
    alert("Copied the text: " + copyText.textContent);
}
function search_text() {
    let key = document.getElementById('search_text').value;
    document.getElementById('body-wrapper').classList.remove("errorWrapper");
    document.getElementById('body-wrapper').classList.remove("successWrapper");
    key = key.trimStart();
    key = key.trimEnd();
    let result;
    if (key.length != 0) {
        const newKey = key.toLowerCase();
        const info = './info.json';
        let request = new XMLHttpRequest();
        request.open('GET', info);
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            document.getElementById("answer").style.display = "block";
            const data = request.response;
            const filteredData = data.filter(item => item.keywords.includes(newKey))
            const errorMessage = "<span style='color:red'>Error code 101 : No record found ! <br/><br/> Error info : It is currently undefined/Not found, contribute by adding this word's definition and keywords<span/>"
            filteredData.length === 0 ?
                result = errorMessage
                : result = `<span style='color:green'>Code compiled sucessfully ......<span/><br/><span style='color:white'> ${filteredData[0].description}<span/>`;
            document.getElementById("answer-sheet").innerHTML = result;
            document.getElementById('body-wrapper').classList.add(filteredData.length === 0 ? "errorWrapper" : "successWrapper");
            document.getElementById("raw-answer").innerHTML = filteredData.length === 0 ? errorMessage : filteredData[0].description;
        }
    } else {
        result = "<span style='color:red'> Error code 404 : intuitive() missing required parameters ! <span/>";
        document.getElementById("answer-sheet").innerHTML = result;
        document.getElementById("raw-answer").innerHTML = result;
        document.getElementById('body-wrapper').classList.add("errorWrapper");
        document.getElementById("answer").style.display = "block";
    }
}
function themeFunction() {
    var element = document.body;
    element.classList.toggle("light-mode");
}
