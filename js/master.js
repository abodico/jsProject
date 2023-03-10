let rand = true;
let backInterval;
let landing = document.querySelector(".landing");
let spans = document.querySelectorAll(".random-background span");
// Set Background Random Type In Local Storage
if (window.localStorage.getItem("randBack")) {
    if (window.localStorage.getItem("randBack") === "yes") {
        rand = true;
        background();
        spans.forEach(span => {
            span.classList.remove("active");
            if (span.dataset.background == "yes") {
                span.classList.add("active");
            }
        });
    }
    else if(window.localStorage.getItem("randBack") === "no") {
        rand = false;
        spans.forEach(span => {
            span.classList.remove("active");
            if (span.dataset.background == "no") {
                span.classList.add("active");
            }
        });
        clearInterval("backInterval");
    }
    landing.style.backgroundImage = window.localStorage.getItem("backgroundImg");
}
else {
    background();
}
// Switch background randomly
let backgrounds = ["background-01.jpg", "background-02.jpg", "background-03.jpg", "background-04.jpg", "background-05.jpg"];
function background() {
    if (rand) {
        backInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * backgrounds.length);
            landing.style.backgroundImage = 'url("../imgs/' + backgrounds[randomNumber] + '")';
            window.localStorage.setItem("backgroundImg", 'url("../imgs/' + backgrounds[randomNumber] + '")');
        }, 3000);
    }
    else { clearInterval(backInterval); }
}
//Settings-box click event
let gearContainer = document.querySelector(".gear-container");
let settings = document.querySelector(".settings-box");
let gear = document.querySelector(".icon");
gearContainer.onclick = function () {
    gear.classList.toggle("fa-spin");
    settings.classList.toggle("open");
}
// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
if (window.localStorage.getItem("mainColor")) {
    colorsLi.forEach(li => {
        li.classList.remove("active");
        if (li.dataset.color === window.localStorage.getItem("mainColor")) {
            li.classList.add("active");
            document.documentElement.style.setProperty("--main-color", li.dataset.color);
        }
    });
}
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        window.localStorage.setItem("mainColor", e.target.dataset.color);
        activeClassAdder(e);
    })
});
// Random Background
// background();
spans.forEach(span => {
    span.addEventListener("click", (e) => {
        activeClassAdder(e);
        if (e.currentTarget.dataset.background == "yes" && rand == false) {
            rand = true;
            window.localStorage.setItem("randBack", "yes");
            background();
        }
        else if (e.currentTarget.dataset.background == "no") {
            rand = false;
            window.localStorage.setItem("randBack", "no");
            clearInterval("backInterval");
            background();
        }
    });
});
// show bullets
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsSpan = document.querySelectorAll(".bullets-display span");
let bulletsOptionBox = document.querySelector(".bullets-display");
if (window.localStorage.getItem("bulletsShow"))
{
    if (window.localStorage.getItem("bulletsShow") == "yes")
    {
        bulletsSpan.forEach(span => {
            span.classList.remove("active");
        });
        bulletsOptionBox.querySelector(".yes").classList.add("active");
        bulletsContainer.style.display = "block";
    }    
    else 
    {
        bulletsSpan.forEach(span => {
            span.classList.remove("active");
        });
        bulletsOptionBox.querySelector(".no").classList.add("active");
        bulletsContainer.style.display = "none";
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        activeClassAdder(e);
        if (e.target.dataset.bullets == "no") {
            bulletsContainer.style.display = "none";
        }
        else {
            bulletsContainer.style.display = "block";
        }
        window.localStorage.setItem("bulletsShow", e.target.dataset.bullets);
    });
});
// Reset Box
let resetDiv = document.querySelector(".reset-default");
resetDiv.onclick = function(){
    window.localStorage.clear();
    window.location.reload();
}
// Our Skills Spans
let skills = document.querySelector(".our-skills");
let sizes = document.querySelectorAll(".skill-progress span.width span");
let bool = false;
let mySpans = document.querySelectorAll(".skill-progress span.width");
function count(one)
{   
    let goal = one.dataset.size;
    let spanSize= setInterval(() => {
        one.textContent++;
        if (one.textContent === goal)
        {
            clearInterval(spanSize);
        }
    }, ( goal / 1000 ));
}
window.onscroll = function () {
    if ((window.scrollY >= skills.offsetTop - 100) && !bool) {
        bool = true;
        sizes.forEach(one => {count(one)});
        mySpans.forEach(el => {
            el.style.width = el.dataset.width;
        });
    }
};
// Gallery popup
let gallery = document.querySelector(".gallery");
let imgs = document.querySelectorAll(".gallery .images-box img");
imgs.forEach(img => {
    img.addEventListener("click", (e)=>{
        let overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        let closeSpan = document.createElement("span");
        closeSpan.append("x");
        closeSpan.classList.add("close-span");
        popupBox.appendChild(closeSpan);
        if (img.alt !== null)
        {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.prepend(imgHeading);
        }
    });
    }
);
//Close Popup
document.addEventListener("click", (e) => {
    if (e.target.className == "close-span") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
    else if (e.target.className == "popup-overlay") {
        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove();
        
    }
});
// scroll function 
function scrollToSection(elements) {
    elements.forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        })
    });
};
// bullets Logic
const bullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSection(bullets);
// header Links
const links = document.querySelectorAll(".header ul li a");
scrollToSection(links);
//active class function 
function activeClassAdder(event)
{
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active"); 
    });
    event.target.classList.add("active");
}
//Toggle Menu
let toggleBtn = document.querySelector("button.toggle-menu");
let tLinks = document.querySelector(".links-container ul");
toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
}
document.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target !== toggleBtn && e.target !== tLinks) {
        tLinks.classList.remove("open");
        toggleBtn.classList.remove("menu-active");
    }
});
tLinks.onclick= function (e){
    e.stopPropagation();
}