// ##############################
// Darkmode Switch
// ##############################

// Console Style
const console_styles_light = [
    'color: #da2f2f', 
    'background: #f0f0f0', 
    "padding: 10px", 
    "border: 2px solid #da2f2f", 
    "border-radius: 20px"
].join(';');

const console_styles_dark = [
    'color: #f0f0f0', 
    'background: #363636', 
    "padding: 10px", 
    "border: 2px solid #da2f2f", 
    "border-radius: 20px"
].join(';');

const DarkmodeSwitcher = document.querySelector('.darkmode_schalter');
const Schalter = document.querySelector('#Schalter')
const Logo = document.querySelector('.logo')
DarkmodeSwitcher.addEventListener("click", SwitchMode);

var DarkmodeActive = false;


document.documentElement.style.setProperty('--color_lightw', "#3f3f3f");
document.documentElement.style.setProperty('--color_lightd', "#e2e2e2");
function SwitchMode() {
    DarkmodeActive = !DarkmodeActive


    if (DarkmodeActive == true) {
        Schalter.classList.add('SchalterActive')
        document.documentElement.style.setProperty('--color_3', "#363636");
        document.documentElement.style.setProperty('--color_3_number', "54, 54, 54");
        document.documentElement.style.setProperty('--color_4', "#f0f0f0");
        document.documentElement.style.setProperty('--color_p', "#F3D93A");
        document.documentElement.style.setProperty('--color_h', "#fbf1b0");
        document.documentElement.style.setProperty('--color_lightw', "#e2e2e2");
        document.documentElement.style.setProperty('--color_lightd', "#3f3f3f");
        
        Logo.src="./img/icon/logo_darkmode.svg"
        console.log('%c%s', console_styles_dark, "Darkmode is enabled");


    } else {
        Schalter.classList.remove('SchalterActive')
        document.documentElement.style.setProperty('--color_3', "#f0f0f0");
        document.documentElement.style.setProperty('--color_4', "#363636");
        document.documentElement.style.setProperty('--color_3_number', "240, 240, 240");
        document.documentElement.style.setProperty('--color_p', "#da2f2f");
        document.documentElement.style.setProperty('--color_h', "#e95548");
        document.documentElement.style.setProperty('--color_lightw', "#3f3f3f");
        document.documentElement.style.setProperty('--color_lightd', "#e2e2e2");
        
        Logo.src="./img/icon/logo.svg"
        console.log('%c%s', console_styles_light, "Lightmode is enabled");
    }
}



// ##############################
// Mobile Menu
// ##############################
const MobileMenu = document.querySelector('.MobileButton')
const NavElements = document.querySelector(".Nav_Elements");
const MenuAnimation = lottie.loadAnimation({
    container: MobileMenu, 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: './img/icon/mobile_menu.json'
});



var MobileMenuState = false;

MobileMenu.addEventListener("click", () => {

    MobileMenuState = !MobileMenuState;
    if (MobileMenuState == true) {
        MenuAnimation.goToAndPlay(0, true)
        MenuAnimation.setDirection(1)
        MenuAnimation.setSpeed(1)
        NavElements.classList.add("ActiveMobileMenu")
    } else {
        MenuAnimation.setDirection(-1)
        MenuAnimation.play()
        NavElements.classList.remove("ActiveMobileMenu");
    }



})


// ##############################
// Image/Boxen Animation
// ##############################
const AnimImage = document.querySelectorAll('.AnimImage')

//Triggert erst sobald Klassenname drin ist.
const isTrigger = (element, className) => {
    return element.classList.contains(className);
}

//Scroll Steps
const generateThresholds =() =>{
    const threshold = [];

    for(let i=1; i< 101; i++){
        threshold.push((i - 1)/100);
    }
    return threshold
}

//Spielt nur bei Sichbarkeit eine Animation ab
const startAnimation = (element, status) => {
    if(status){
        element.classList.add('animShow')
    }else{
        element.classList.remove('animShow')
    }
}

//Animiert abhängig von der Scroll Position
const startMove = (element, ratio) =>{
    var w = window.innerWidth;
    element.style.opacity = ratio;
    
    if(w < "1030"){
        element.style.transform = `scale(${0.75+1*(ratio/4)}) translateY(0%)`
    }else{
        element.style.transform = `scale(${0.75+1*(ratio/4)}) translateY(-50%)`
    }
}

/* Checkt ob ein Objekt in abhängigkeit ob es Sichbar ist im Bildschirm 
und gibt dieses einen Wert von 0-1 je nachdem wie viel % zu sehen ist. */  
const ObserverWatch = new IntersectionObserver(SelectedElement => {
    SelectedElement.forEach(getElement =>{
        if (isTrigger(getElement.target, 'img_side')) {
            startMove(getElement.target, getElement.intersectionRatio);
        }

        if (isTrigger(getElement.target, 'feature_box')) {
            startAnimation(getElement.target, getElement.isIntersecting);
        }

        if (isTrigger(getElement.target, 'GoogleMaps')) {
            startAnimation(getElement.target, getElement.isIntersecting);
        }
    })
}, {
    root: window.document,
    rootMargin: '-100px 0px -100px 0px',
    threshold: generateThresholds()
})

//Alle Elemente mit der Klasse AnimImage werden überprüft. Spart Performance ;)  
AnimImage.forEach(elm =>{
    ObserverWatch.observe(elm);
})



// ##############################
// Animations
// ##############################
const waterdrops = document.querySelector('.waterdrops')
const timeshift = document.querySelector('.timeshift')
const hdr = document.querySelector('.hdr')
const voice = document.querySelector('.voice')
const track = document.querySelector('.track')
const stick = document.querySelector('.stick')

lottie.loadAnimation({
    container: waterdrops, 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './img/icon/features/water_drops.json'
});

lottie.loadAnimation({
    container: timeshift, 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './img/icon/features/clock.json'
});

lottie.loadAnimation({
    container: hdr, 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './img/icon/features/hdr.json'
});

lottie.loadAnimation({
    container: voice, 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './img/icon/features/voice.json'
});


lottie.loadAnimation({
    container: track, 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './img/icon/features/tracking.json'
});


lottie.loadAnimation({
    container: stick, 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './img/icon/features/selfie_stick.json'
});




// ##############################
// Credits
// ##############################

const info = [
    'color: #f0f0f0',  
    'background: #192836', 
    "padding: 20px 10% 20px 10px",
    "font-size: 1.2rem",
    "font-weigth: bold",
    "border-radius: 0px"
].join(';');

const info_social = [
    'color: #f0f0f0', 
    'background: #192836', 
    "padding: 10px",
    "margin: -10px 0px",
    "font-size: 1rem",
    "font-weigth: bold",
    "border-radius: 0px"
].join(';');



console.log('%c%s', info, "created by Marcus Harting")
console.log('%c%s', info_social, "↓ Social Media Links ↓")
const SocialMediaLinks = {
    Artstation: "https://www.artstation.com/marcustutorials",
    YouTube: "https://www.youtube.com/user/MarcusTutorials1",
    Instagram: "https://www.instagram.com/marcustutorials/"
}
console.table(SocialMediaLinks)