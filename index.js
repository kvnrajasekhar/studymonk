

// validation

const form = document.getElementById('form');
const uname = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
var isValid1 = false;
var isValid2 = false;
var isValid3 = false;
var isValid4 = false;


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}


function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}
// if(re.test(input.value.trim()) && input.value.trim() !== '' && (!((input.value.length < min)&&(input.value.length > max))) &&  (input1.value === input2.value)){
//     $(function(){
//         $("body").load("submit.html");
//     })
// }
$("button").click(function () {
    if (isValid1 && isValid2 && isValid3 && isValid4) {
        this.submit();
        window.load("submit.html");
    }
})



function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        isValid1 = true;
        showSucces(input)
    } else {
        isValid1 = false;
        showError(input, 'Email is not invalid');
    }
}



function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            isValid2 = false;
            showError(input, `${getFieldName(input)} is required`)
        } else {
            isValid2 = true;
            showSucces(input);
        }
    });
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        isValid3 = false;
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        isValid3 = false;
        showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    } else {
        isValid3 = true;
        showSucces(input);
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        isValid4 = false;
        showError(input2, 'Passwords do not match');

    }
}


//Event Listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([uname, email, password, password2]);
    checkLength(uname, 3, 50);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});
// Searching 


var searchTerm = document.getElementById("search-term");
var location = document.getElementById("location");
var jobRole = document.getElementById("job-role");
var resultsContainer = document.getElementById("results-container");

var xhr = new XMLHttpRequest();
xhr.open("GET", "/candidates?searchTerm=" + searchTerm.value + "&location=" + location.value + "&jobRole=" + jobRole.value);
xhr.onload = function () {
    if (xhr.status === 200) {
        var results = JSON.parse(xhr.responseText);
        var html = "";
        for (var i = 0; i < results.length; i++) {
            html += "<div class='result'>";
            html += "<h3>" + results[i].name + "</h3>";
            html += "<p>" + results[i].location + "</p>";
            html += "<p>" + results[i].jobRole + "</p>";
            html += "</div>";
        }
        resultsContainer.innerHTML = html;
    } else {
        alert("Error: " + xhr.status);
    }
};

xhr.send();

