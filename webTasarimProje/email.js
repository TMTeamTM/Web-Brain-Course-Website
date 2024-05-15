function SendMail(){
    var params = {
        from_name : document.getElementById("fullName").value,
        email_id : document.getElementById("email_id").value,
        message : document.getElementById("message").value
    }
    emailjs.send("service_hh38pfc", "template_1xfp0go", params).then(function (res) {
        alert("Mesaj Başarıyla iletildi!");
    })
}