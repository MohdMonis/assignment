document.getElementById("sellerproductForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})

let uemail;
let uname;

firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }else{
        var q1 = db.collection("seller").doc(user.email)
        q1.get().then((querySnapshot) => {
            if(user.emailVerified){
                document.getElementById("verifybtn").style.display="none"
            }else{
                document.getElementById("verifybtn").style.display="initial"
            }
            uemail = user.email;
            uname = querySnapshot.data().name;
            document.getElementById("user").innerHTML = `Hello ${uname},<br>your email is ${uemail} <br>verified : ${user.emailVerified}`;
            var q1 = db.collection("sd").doc(uemail).collection(uname)
            q1.get().then((querySnapshot) => {
                let acc="";
                let i=0;
                querySnapshot.forEach((doc) => {
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
            });
        })
        
    }
})

// 
// 

function addprd() {

    const brand = document.getElementById("brand").value
    const category = document.getElementById("category").value
    const name = document.getElementById("name").value
    const price = document.getElementById("price").value

    db.collection("sd").doc(uemail).collection(uname).doc().set({
        brand: brand,
        category:category,
        name: name,
        price: price,
    })
    .then(()=>{
        location.replace("seller.html")
    })
}

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