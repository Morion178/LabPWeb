function submitForm() {
    const nume = document.getElementById("name").value;
    if(nume.length < 2){
        document.getElementById('response').style.color = "red";
        document.getElementById('response').innerText = "Numele trebuie să aibă cel puțin 2 caractere!";
        return;
    }
    const email = document.getElementById("email").value;
    if(email.includes("@") === false){
        document.getElementById('response').style.color = "red";
        document.getElementById('response').innerText = "Email-ul nu este valid!";
        return;
    }
    const mesaj = document.getElementById("message").value;
    if(mesaj.length < 10){
        document.getElementById('response').style.color = "red";
        document.getElementById('response').innerText = "Mesajul trebuie să aibă cel puțin 10 caractere!";
        return;
    }
    console.log(nume, email, mesaj);
    document.getElementById('response').innerText = "Formularul a fost trimis cu succes!";
}

function getGreeting(){
    const date = new Date();
    const greetingText = document.getElementById("greeting_text");
    let message = "";
    if(date.getHours() >= 6 && date.getHours() < 11){
        greetingText.textContent = "Bună dimineața! Bine ai venit pe pagina mea!";
    }
    else if(date.getHours() >= 12 && date.getHours() < 18){
        greetingText.textContent = "Bună ziua! Bine ai venit pe pagina mea!";
    }
    else greetingText.textContent = "Bună seara! Bine ai venit pe pagina mea!";
}
getGreeting();