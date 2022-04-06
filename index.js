document.getElementById("cosloginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})
document.getElementById("selloginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})


function cos_login(){
    const email = document.getElementById("cos_email").value
    const password = document.getElementById("cos_password").value
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                location.replace("welcome.html")
            }
        })
    })
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
    })
}

function cos_signUp(){
    
    const email = document.getElementById("cos_email").value
    const password = document.getElementById("cos_password").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                db.collection("costumer").doc(email).set({
                    email: email,
                }).then(()=>{
                    console.log("secessfully created")
                    location.replace("welcome.html")
                })
            }
        })
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}

function cos_forgotPass(){
    const email = document.getElementById("email").value
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}

// 
// 
// 
// 

function sel_login(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                location.replace("seller.html")
            }
        })
    })
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
    })
}

function sel_signUp(){
    
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
        
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                db.collection("seller").doc(email).set({
                    name: name,
                    email:email
                }).then(()=>{
                    console.log("secessfully created")
                    location.replace("seller.html")
                })
            }
        })
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}

function sel_forgotPass(){
    const email = document.getElementById("email").value
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}