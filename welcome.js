firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }else{

        var q1 = db.collection("costumer").doc(user.email)
        q1.get().then((querySnapshot) => {
            if(user.emailVerified){
                document.getElementById("verifybtn").style.display="none"
            }else{
                document.getElementById("verifybtn").style.display="initial"
            }
            uemail = user.email;
            document.getElementById("user").innerHTML = `Hello ,<br>your email is ${user.email} <br>verified : ${user.emailVerified}`;
            db.collection("seller").get()
            .then((d1)=>{
                var i=0;
                d1.forEach((d1val)=>{
                    var q = db.collection("sd").doc(d1val.data().email).collection(d1val.data().name)
                    var acc="";
                    q.get().then((va)=>{
                        va.forEach(doc=>{
                            i+=1
                            // console.log(doc.data().name);
                            // doc.data() is never undefined for query doc snapshots
                            acc +=`
                            <div class="card mt-5">
                                <h4 class="heading">product no. ${i}</h4>
                                <p class="brand">brand : <span>${doc.data().brand}</span></p>
                                <p class="category">category : <span>${doc.data().category}</span></p>
                                <p class="name">name : <span>${doc.data().name}</span></p>
                                <p class="price">price : <span>${doc.data().price}</span></p>
                            </div>
                            `
                        });
                        document.getElementById("cards").innerHTML += acc;
                    })
                })
            })
        })
    }
})


function logout(){
    firebase.auth().signOut()
}


function verify() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(()=>{
        console.log("verification send");
    }).catch((error)=>{
        console.log(error.message);
    })
}