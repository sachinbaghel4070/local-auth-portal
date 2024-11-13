function saveData(){
    let email,password;
    email=document.getElementById("email").value;
    password=document.getElementById("password").value;
    let user_records= new Array();
    user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    if(user_records.some((v)=>{
        return v.email==email&&v.password==password;
    })){
        let current_records=user_records.filter((v)=>{
            return v.email==email&&v.password==password;

        })[0]
        localStorage.setItem("username",current_records.username);
        localStorage.setItem("email",current_records.email);
        window.location.href="dashboard/index.html";
        

    }
    else{
        alert("Invalid E-mail or Password " )
    }
}
