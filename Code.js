function verifi() {
var number = document.getElementById("singupNumber").value;
//225422
var UserID = number;
var MyPath = firebase.database().ref('Users/'+ UserID);
MyPath.once('value')
  .then(function(GetData) {

    var Data = GetData.val();

    document.getElementById("singupClass").value = Data.class ;
    document.getElementById("singupName").value = Data.name ;
    document.getElementById("validNumber").value = Data.valid ;
    document.getElementById("info").innerHTML = "الإسم :" + Data.name + "<br/> القسم: " + Data.class;
    document.getElementById("SUUser").style.display = "block";
    document.getElementById("codeUser").style.display = "none";
    document.getElementById("BSUUser").style.display = "block";
    document.getElementById("BcodeUser").style.display = "none";
    document.getElementById("singupError").innerHTML = "";
  }).catch(function(error) {document.getElementById("singupError").innerHTML = "كود المشرفين غير موجود، أحصل على واحد من عند ليوبي عربي، شكرا."});

} 
 
function singup() {  
  	var email = document.getElementById("singupEmail").value;
	var password = document.getElementById("singupPassword").value;
	var singupName = document.getElementById("singupName").value;
	var singupClass = document.getElementById("singupClass").value;
	var validNumber = document.getElementById("validNumber").value;
	var number = document.getElementById("singupNumber").value;
	
	if(validNumber == "yes"){
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
	var user = firebase.auth().currentUser;
	user.updateProfile({
	displayName: singupName,
	displayClass: singupClass
	}).then(function() {
	console.log("Update successful " + singupName);
	var data = { valid:"no" ,name:singupName ,class:singupClass};
	var UserID = number;
	var MyPath = firebase.database().ref('Users/'+ UserID);
	MyPath.set(data)
	}, function(error) {
	document.getElementById("singupError").innerHTML = "An error happened."
	});}).catch(function(error) {
	var errorMessage = error.message;
	document.getElementById("singupError").innerHTML = errorMessage ;
	});
	}
	else{
	 document.getElementById("singupError").innerHTML ="لقد ثم إستخدام هذا الكود، خد واحدا من عند ليوبي عربي" ;
	}
	
	
	

}
 
 function login() {
var email = document.getElementById("loginEmail").value;
var password = document.getElementById("loginPassword").value;

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  
  var errorMessage = error.message;
document.getElementById("loginError").innerHTML = errorMessage ;
});
 

 }
firebase.auth().onAuthStateChanged(function(user) {
 if (user) {
 document.getElementById("user").style.display = 'block';
 document.getElementById("singupAndLogin").style.display = 'none';
 }
 else {
 document.getElementById("user").style.display = 'none';
 document.getElementById("singupAndLogin").style.display = 'block';
 
 }
 });
 
 
