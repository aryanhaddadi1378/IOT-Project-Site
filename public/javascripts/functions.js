var usersNum = 1;
var loggedUser;

function showHidePassword() {
    var icon = document.querySelector(".js-show-password-icon");
    var password = document.querySelector(".js-password-login");
    if (password.type == "password") {
        password.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
        icon.title = "Hide Password";
    }
    else {
        password.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
        icon.title = "Show Password";
    }
}

function addUser() {
        usersNum ++;
        var div = document.createElement("div");
        div.innerHTML = '<div class="css-info-box">\
                            <i class="fa fa-user css-info-icon"></i>\
                            <input class="js-member-' + usersNum + '-name css-input" type="text" placeholder="Member ' + usersNum + ' Name">\
                        </div>';
        document.querySelector(".js-add-user").appendChild(div);
        if (usersNum == 2){
            document.querySelector(".js-user-minus-btn").disabled = false;
        }
}

function removeUser() {
    var string = ".js-member-" + usersNum + "-name";
    var node = document.querySelector(string);
    node.parentNode.parentNode.innerHTML ="";
    usersNum --;
    if (usersNum == 1){
        document.querySelector(".js-user-minus-btn").disabled = true;
    }
}


function login() {
    document.querySelector(".css-loader").style.display = "none";
    var groupName1 = document.querySelector(".js-group-name-login").value;
    var password1 = document.querySelector(".js-password-login").value;
    if (groupName1 == "" || password1 == "") {
        alertify.notify("Please Complete all fields.",10);
    }
    else {
        $.ajax({
            method:"POST",
            url:"/attempt/login",
            data:{
                groupName1,
                password1
            }
        })
        .done(function(result){
            if (result.status == 200) {
               window.open("/", "_self");
            }
            else {
                alertify.notify(result.message, 10);
            }
        })
        .fail(function(err){
            console.log(err);
            alertify.notify("Login Request Failed", 10);
        })
    }


}

function signup() {
    document.querySelector(".css-loader").style.display = "none";
    var members1 = [];
    var emptyMember = false;
    var groupName = document.querySelector(".js-group-name").value;
    var channelId = document.querySelector(".js-channel-id").value;
    var password = document.querySelector(".js-password-login").value;
    i = 1;
    while (i <= usersNum) {
        var str = ".js-member-" + i + "-name";
        members1[i-1] = document.querySelector(str).value;
        if (members1[i-1] == "") {
            emptyMember = true;
        }
        i++;
    }
    if (emptyMember == true || groupName == "" || channelId == "" || password == "") {
        alertify.notify("Please Complete all fields.",10);
    }
    else {
       // var r = {m:members1};
       // var s = JSON.stringify(r)
        $.ajax({
            method:"POST",
            url:"/attempt/signup",
            data:{
                members1,
                groupName,
                channelId,
                password
            }
        })
        .done(function(res){
            if ( res.status === 200 ) {
                alertify.notify(res.message,10);
            }
            else {
                alertify.notify(res.message,10);
            }
        })
        .fail(function(err){
            console.log(err);
        });
    }
}


function loginLoad() {
    document.querySelector(".css-loader").style.display = "inline-flex";
    setTimeout(login, 500);
}


function signupLoad() {
    document.querySelector(".css-loader").style.display = "inline-flex";
    setTimeout(signup, 500);
}
 
