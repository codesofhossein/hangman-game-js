// tolid kalame random
const randomWord = ["you" , "never" , "hi" , "mother" , "sibling" , "love"];

let word = "" ;
let clicked = [] ;
let result = "" ;
let jon = 0 ;


// tabe asli va tolid kalame random
function selectWord () {

    word = randomWord[Math.floor(Math.random()*randomWord.length)];
    const lete = document.querySelector(".letters").querySelectorAll("div");

    for (let i of lete)
    {
        i.addEventListener("click" , mouseHandeler) ;
    }

    window.addEventListener("keydown" , keyHandeler);

}





// tabe update kalame
function setUnderLine(){

    const joda = word.split("");
    const mapJoda = joda.map(item => (clicked.indexOf(item) >= 0 ? item : "_"));
    result = mapJoda.join("");
    document.querySelector(".clue").innerHTML = `<p>${result}</p>` ;
}




// tabe shoro dobare
function tryagain(){

    document.querySelector(".gameend").querySelector(".reload").querySelector("span").addEventListener("click" ,function(){

        window.location.reload();
    })
}




//tabe barresi bordan
function ifWon (){

    if (result === word) {

        document.querySelector(".image").querySelector("img").src = `./assets/winner.png` ;
        document.querySelector(".gameend").style.display = "block";
        tryagain();

        dorost.innerText = "You win :)" ;
    }
    
}



// tabe barresi bakhtan
function ifLose(){

    if (jon >= 6) {
         
        document.querySelector(".gameend").style.display = "block";
        document.querySelector(".clue").innerHTML = `<p>Word was : ${word}</p>` ;
        document.querySelector(".clue").querySelector("p").style.letterSpacing = "20px";
        tryagain();

        
        eshtebah.innerText = `You Lose :(` ;

    }
}

  // motaghayer haye global baraye namayesh dorost ya ghalat bodan entekhab
    const dorost = document.querySelector(".alert").querySelector(".dorost") ;
    const eshtebah = document.querySelector(".alert").querySelector(".eshtebah");



// handel kardan entekhab karbar che ba mouse va che keyboard
function letterHandeler(letter) {

    
    // baraye barresi tamam shodan bazi
    if (jon >=6 || result === word)
    {
        const res = confirm("Bazi Tama shode.\nDobare Bazi mikonid ?"); 
        if (res === true) window.location.reload();
        return ;
    }
    
    // baraye harfe tekrari
    if (clicked.indexOf(letter) >= 0) {
            
            alert("Harf Tekrari ast.");
            return;
    }

    // tabdil be horof kochak va rikhtan dar araye kontoroli clicked va az beyn bordan dokme
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null ;
    document.getElementById(letter.toUpperCase()).className= "used" ;
    

    
    
    // darsorar dorost bodan harf
    if (word.indexOf(letter) >= 0)
    {
        setUnderLine(); 
       
       eshtebah.style.display = "none" ;
       dorost.style.display = "block" ;
       dorost.innerText = `${letter.toUpperCase()} doroste :)`;
        
       ifWon();
        

    }//dar sorat ghalat bodan harf
    else if (word.indexOf(letter) === -1)
    {      
        jon ++ ;

        document.querySelector(".image").querySelector("img").src = `./assets/hangman${jon}.png` ;

      
        dorost.style.display = "none";
        eshtebah.style.display = "block" ;
        eshtebah.innerText = `${letter.toUpperCase()} Eshtebah :(` ;

        ifLose();

        
    }
}





// baraye entekhab haye ba mouse
function mouseHandeler(event) {

    letterHandeler (event.target.id);
   
}


//baraye entekhab haye ba keyboard
function keyHandeler (event){

    letterHandeler(event.key);
}


// ejraye koli barname va update kalame
selectWord();
setUnderLine();