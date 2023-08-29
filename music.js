let options = document.getElementById("opt");
let TLBtn = document.getElementById("tl_btn")
let playBtn = document.getElementById("play");
let coverImg = document.getElementById("cover_img");
let songDetails = document.getElementById("details");
let playlist = document.getElementById("playlist");
let songName = document.getElementById("songName");
let artistName = document.getElementById("artistName");
let audio = document.createElement('audio');
let list = document.getElementById("list");
let progress = document.getElementById("progress");



let loaded = false;
let topBarHidden = true;
let songRunning = false;
let listHidden = true;
let songNo = 0 ;
let currSong = "";
let NAME = "";

// windows.addEventListener("load", ()=>{
//     coverImg.src = "./music.gif";
//     songName.innerHTML = "";
//     artistName.innerHTML = "";

// })

let Songs = [
    // {
    //     name : ,
    //     artist : ,
    // }
    {
        name : "Namo Namo",
        artist : "Amit Trivedi",
    },
    {
        name : "Apna Bana Le",
        artist : "Arijit Singh",
    },
    {
        name : "Dil Diyan Gallan",
        artist : "Atif Aslam",
    },
    {
        name : "Ikko Mikke",
        artist : "Satinder Sartaaj",
    },
    {
        name : "Jannat",
        artist : "B Praak",
    },
    {
        name : "Jogi",
        artist : "Yasser Desai | Aakanksha Sharma",
    },
    {
        name : "Lover",
        artist : "Taylor Swift",
    },
    {
        name : "You Belong With Me",
        artist : "Taylor Swift",
    },
    {
        name : "Perfect",
        artist : "Ed Sheeran",
    },
    {
        name : "Phir Kabhi",
        artist : "Arijit Singh",
    },
    {
        name : "Tera Hone Laga Hoon",
        artist : "Atif Aslam",
    },
    {
        name : "Tu Itni Khoobsurat Hai",
        artist : "Rahat Fateh Ali Khan",
    },
    {
        name : "Tujhme Rab Dikhta Hai",
        artist : "Roopkumar Rathod, Jay Kadn",
    },
    {
        name : "Tum Se Hi",
        artist : "Mohit Chauhan",
    },
    
];

    for(var i=0; i < Songs.length ; i++)
    {
        let DIV = document.createElement("div");
        let PS = document.createElement("p");
        let PA = document.createElement("p");
        DIV.classList.add("pSong");
        PS.classList.add("psName");
        PA.classList.add("paName");
        PS.innerText = Songs[i].name;
        PA.innerText = Songs[i].artist;
        DIV.appendChild(PS);
        DIV.appendChild(PA);
        DIV.setAttribute("id", i);
        let LI = document.createElement("li");
        LI.appendChild(DIV);
        LI.setAttribute("id", "LI");
        LI.setAttribute("class", "clsLI");
        list.appendChild(LI);

    }

/*let currSong = "song" + songNo;
let path = "./Songs/Tracks/" + currSong.name + ".mp3"; 
const audio = new Audio(path);*/



function loadOptions()
{   
    if(topBarHidden)
    {
        options.style.visibility = "visible";
        options.style.transform = "translateX(0px)";
        options.style.transition = "0.2s";
        TLBtn.innerHTML = "<i class=' bx bxs-chevrons-left' id='tl_icon'></i>";
        topBarHidden = false;
    }  else {
        options.style.visibility = "hidden";
        options.style.transform = "translateX(-50px)";
        options.style.transition = "0.1s";
        
        TLBtn.innerHTML = "<i class=' bx bxs-chevrons-right' id='tl_icon'></i>";
        topBarHidden = true;
    }
  
}

function showPlaylist()
{
    if(listHidden)
    {
        playlist.style.visibility = "visible";
        playlist.style.transform = "translateX(0px)";
        playlist.style.transition = "0.2s";
        listHidden =false;
    }
}

function hidePlaylist()
{
    if(!listHidden)
    {
        playlist.style.visibility = "hidden";
        playlist.style.transform = "translateX(250px)";
        playlist.style.transition = "0.1s";
        listHidden =true;   
    }
}

function playpauseSong()
{
        songRunning ? pauseSong():  playSong();
}

function loadSong(index)
{ 
    NAME = Songs[index].name;
    songName.innerText = NAME;
    artistName.innerText = Songs[index].artist;

    audio.src = "./Songs/Tracks/"+NAME+".mp3";
     
}

loadSong(songNo);

audio.addEventListener("timeupdate", ()=>
{ 
    progress.value = parseInt((audio.currentTime/audio.duration)*100);
})

progress.addEventListener("change", ()=>
{
    audio.currentTime = parseInt((progress.value * audio.duration)/100);
})

// progress.addEventListener("input", (event) => {
//     const tempSliderValue = event.target.value; 
   
//     const progress = (tempSliderValue / progress.max) * 100;
   
//     progress.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
//   })

function playSong()
{   coverImg.src = "./Songs/Covers/"+NAME+".jpg"; 
    audio.play();
    songRunning = true;
    playBtn.innerHTML = "<i class='bx bx-pause' ></i>";
    coverImg.style.animation = 'rotation 10s infinite linear';
    songDetails.style.visibility = "visible"; 

}



function pauseSong()
{       
    audio.pause();
    songRunning = false;
   playBtn.innerHTML = "<i class='bx bx-play' ></i>";
   coverImg.style.animationPlayState = 'paused';
}

function nextSong()
{
    songNo > Songs.length ? songNo = 0 : songNo++;
    loadSong(songNo);
    playSong();
}
function prevSong()
{
    songNo < 0 ? songNo = Songs.length-1 : songNo--;
    loadSong(songNo);
    playSong();
}

let y = document.querySelectorAll("#LI");
y.forEach(s =>{
    s.addEventListener("click", ()=>
{
    songNo = s.querySelector(".pSong").getAttribute('id');
    loadSong(songNo); playSong();
    
})
})