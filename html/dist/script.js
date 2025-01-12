// Ratings

let cfrating = document.getElementById("cfrating");
const rating = async () => {
    let p = fetch("https://codeforces.com/api/user.info?handles=Tejash.exe");
    return p.then((response) => {
        return response.json();
    }).then((d) => {
        return d["result"][0]["maxRating"];
    }).catch((e) => {
        return "1000+";
    })
}
const cf = async () => {
    rating().then((maxRating) => {
        cfrating.innerText = maxRating;
    })
}
cf();

// Dark mode

let moonicon = document.body.getElementsByClassName("fa-moon");
let isDarkmode = window.matchMedia("(prefers-color-scheme:dark)").matches;
if (isDarkmode) {
    moonicon[0].classList.add("fa-solid");
    moonicon[1].classList.add("fa-solid");
    document.head.insertAdjacentHTML("beforeend", `<link id="darkcss" rel="stylesheet" href="style_dark.css">`);
}
const darkmode = () => {
    isDarkmode = !isDarkmode;
    // console.log("Darkmode =", isDarkmode);
    moonicon[0].classList.toggle("fa-solid");
    moonicon[1].classList.toggle("fa-solid");
    if (isDarkmode) {
        document.head.insertAdjacentHTML("beforeend", `<link id="darkcss" rel="stylesheet" href="style_dark.css">`);
    }
    else {
        document.getElementById("darkcss").remove();
    }
}

moonicon[0].addEventListener("click", darkmode);
moonicon[1].addEventListener("click", darkmode);

// Toggle menu 

let menu = document.getElementById("menu");
let tglmenubox = document.getElementById("tglmenubox");

let isTogglemenu = false;

const x = () => {
    tglmenubox.style.display = "none";
    tglmenubox.classList.toggle("tglmenuboxoff");
}

const togglemenu = () => {
    isTogglemenu = !isTogglemenu;
    // console.log("Togglemenu =", isTogglemenu);
    if (isDarkmode && isTogglemenu) {
        menu.classList.add("colormenu");
    }
    if (isTogglemenu) {
        tglmenubox.style.display = "flex";
    }
    else {
        menu.classList.remove("colormenu");
        tglmenubox.classList.toggle("tglmenuboxoff");
        setTimeout(x, 200);
    }
}

document.getElementById("cnttgl").addEventListener("click", togglemenu);
menu.addEventListener("click", togglemenu);
document.addEventListener("click", function (exit) {
    if (!menu.contains(exit.target) && !tglmenubox.contains(exit.target)) {
        isTogglemenu = false;
        // console.log("Togglemenu =", isTogglemenu);
        menu.classList.remove("colormenu");
        tglmenubox.classList.toggle("tglmenuboxoff");
        setTimeout(x, 200);
    }
});

// Go to top

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Event listener for scrolling

let gtt = document.getElementById("gtt");
window.addEventListener('scroll', function () {
    // Get the distance scrolled from the top of the page
    const scrollDistance = window.scrollY;
    if (scrollDistance > 50) {
        gtt.style.display = "flex";
    }
    else {
        gtt.style.display = "none";
    }
});

// Contact button

const opencontact = () => {
    document.getElementById("contactwindow").style.display = "flex";
}

const contactexit = () => {
    document.getElementById("contactwindow").style.display = "none";
    document.getElementById("contactbox").classList.toggle("closecontactbox");
}

document.getElementById("contactbtn").addEventListener("click", opencontact);
document.getElementById("cntexit").addEventListener("click", function () {
    document.getElementById("contactbox").classList.toggle("closecontactbox");
    setTimeout(contactexit, 270);
});
document.addEventListener("click", function (closecontact) {
    if (!document.getElementById("contactbox").contains(closecontact.target) && !contactbtn.contains(closecontact.target)) {
        document.getElementById("contactbox").classList.toggle("closecontactbox");
        setTimeout(contactexit, 270);
    }
});

//Form submission

let disablebtn = false;
const disable = (disablebtn) => {
    if(disablebtn){
        document.getElementById("send").disabled = true;
    }
    else{
        document.getElementById("send").disabled = false;
    }
};

const form = document.getElementById("contactdetails");
form.addEventListener("submit", async (event) => {
    disablebtn = true;
    disable(disablebtn);
    document.getElementById("responsemsg").innerHTML = `<img id="loader" src="Circle-Loader.gif" alt="">`;
    event.preventDefault();
    const formData = new FormData(event.target);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    fetch('/.netlify/functions/api/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        console.log(responseData);
        if(responseData.status == 1){
            console.log("Form filled successfully!");
            document.getElementById("responsemsg").innerText = "Form filled successfully! Thank you!";
        }
        else{
            document.getElementById("responsemsg").innerText = "Couldn't able to send! Please try again!";
            console.log("Server down!!");
        }
    })
    .catch(error => {
        document.getElementById("responsemsg").innerText = "Couldn't able to send! Please try again!";
        console.error('Error:', error);
    })
    .finally(()=>{
        disablebtn = false;
        disable(disablebtn);
    });
});

//Check connection
const check = async () => {
    fetch('/.netlify/functions/api/check',{
        method: "POST"
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log("Connected to server successfully!");
    })
    .catch((err) => {
        console.log("Could not connect! Hit Refresh!");
    });
};
setTimeout(check, 3000);