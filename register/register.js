function saveData(){
    let username, email, password, confirm_password;
    username=document.getElementById("username").value;
    email=document.getElementById("email").value;
    password=document.getElementById("password").value;
    confirm_password=document.getElementById("confirm-password").value;
    console.log(username+email+password+confirm_password);
    // localStorage.setItem("name",username);
    // localStorage.setItem("pass",password);

    let user_records=new Array();
    user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    
    if (!username || !email || !password || !confirm_password) {
        alert("All fields are required.");
        return;
    }

    if (password !== confirm_password) {
        alert("Passwords do not match.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }
    if(user_records.some((v)=>{
        return v.email==email;
    })){
        alert("Already existed, Use other E-mail address");}
    else{
        user_records.push({
            "username":username,
            "email":email,
            "password":password,
            "confirm-password":confirm_password 
        })
        localStorage.setItem("users",JSON.stringify(user_records));

        alert("Registration successful!");
        document.getElementById("username").value = '';
        document.getElementById("email").value = '';
        document.getElementById("password").value = '';
        document.getElementById("confirm-password").value = '';
    }

}
