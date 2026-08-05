/* ==================================
   WHITE LILY
   MAIN.JS - V1
================================== */

const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

// Canvas boyutu
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// -------------------------------
// YILDIZLAR
// -------------------------------

const stars = [];

const STAR_COUNT = 250;

for (let i = 0; i < STAR_COUNT; i++) {

    stars.push({

        x: Math.random() * window.innerWidth,

        y: Math.random() * window.innerHeight,

        radius: Math.random() * 2,

        alpha: Math.random(),

        speed: (Math.random() * 0.02) + 0.005

    });

}

// -------------------------------

function drawStars() {

    for (const star of stars) {

        star.alpha += star.speed;

        if (star.alpha >= 1 || star.alpha <= 0.2) {

            star.speed *= -1;

        }

        ctx.beginPath();

        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;

        ctx.arc(

            star.x,

            star.y,

            star.radius,

            0,

            Math.PI * 2

        );

        ctx.fill();

    }

}

// -------------------------------

function animate() {

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

    drawStars();

    requestAnimationFrame(animate);

}

animate();

const enterButton = document.getElementById("enterButton");

enterButton.addEventListener("click", () => {

    const hero = document.getElementById("hero");

    hero.style.transition = "all .8s";

    hero.style.opacity = "0";

    hero.style.transform = "scale(.96)";

    setTimeout(() => {

        document.getElementById("lilySection")

        .scrollIntoView({

            behavior:"smooth"

        });

    },600);

});

// =========================
// GARDEN BUTTON
// =========================

const gardenButton = document.getElementById("gardenButton");

gardenButton.addEventListener("click", () => {

    document.getElementById("gardenSection")

    .scrollIntoView({

        behavior:"smooth"

    });

});

// =====================================
// WATERING CAN SYSTEM V2
// =====================================

const can = document.getElementById("wateringCan");

can.style.touchAction = "none";

let dragging = false;

let offsetX = 0;

let offsetY = 0;

can.addEventListener("pointerdown", (e) => {

    can.addEventListener("touchstart", (e)=>{
    dragging = true;

    const rect = can.getBoundingClientRect();

    offsetX = e.touches[0].clientX - rect.left;
    offsetY = e.touches[0].clientY - rect.top;
   });

    dragging = true;

    const rect = can.getBoundingClientRect();

    offsetX = e.clientX - rect.left;

    offsetY = e.clientY - rect.top;

});

document.addEventListener("pointerup", () => {

    dragging = false;

});

document.addEventListener("pointermove", (e) => {

    if (!dragging) return;

    can.style.position = "fixed";

    can.style.left = (e.clientX - offsetX) + "px";

    can.style.top = (e.clientY - offsetY) + "px";

    checkCollision();

});

// =====================================
// COLLISION SYSTEM V1
// =====================================

const plant = document.getElementById("plant");

const waterStatus = document.getElementById("waterStatus");

let growLevel = 1;

let waterCount = 0;

let watering = false;

let waterInterval = null;

function checkCollision(){

    const canRect = can.getBoundingClientRect();

    const plantRect = plant.getBoundingClientRect();

    const touching =

        canRect.right > plantRect.left &&
        canRect.left < plantRect.right &&
        canRect.bottom > plantRect.top &&
        canRect.top < plantRect.bottom;

    if(!touching){

    watering = false;

    can.style.transform = "rotate(0deg)";

    if(waterInterval){

        clearInterval(waterInterval);

        waterInterval = null;

    }

    return;

    }

    if (watering) return;

watering = true;

can.style.transform = "rotate(-20deg)";

waterInterval = setInterval(() => {

    waterCount++;

    splashWater();

    if (growLevel == 1) {

    waterStatus.innerHTML =
    `Hadi başlayalım! <span>💧</span> ${waterCount}/20`

}

else if (growLevel == 2) {

    waterStatus.innerHTML =
    `Devam et! <span>🌱</span> ${waterCount}/20`

}

else if (growLevel == 3) {

    waterStatus.innerHTML =
    `İyi gidiyorsun! <span>🍃</span> ${waterCount}/20`
}

else if (growLevel == 4) {

    waterStatus.innerHTML =
    `Son bir adım! <span>😍</span> ${waterCount}/20`

}

    if (waterCount >= 20) {

        clearInterval(waterInterval);

        waterInterval = null;

        waterCount = 0;

        growLevel++;

        switch (growLevel) {

    case 2:
        plant.src = "assets/images/seed2.png";
        waterStatus.innerHTML = "Devam et! 🌱";
        break;

    case 3:
        plant.src = "assets/images/seed3.png";
        waterStatus.innerHTML = "Harika gidiyorsun! 🍃";
        break;

    case 4:
        plant.src = "assets/images/seed4.png";
        waterStatus.innerHTML = "Çok az kaldı! 🌸";
        break;

    case 5:
        plant.src = "assets/images/seed5.png";

        waterStatus.innerHTML = "Harikasın! 🤍🤍🤍";

       waterStatus.classList.add("final");

        break;

        

     }

        if (growLevel < 5) {

    const messages = {
        2: "Devam et! 🌱",
        3: "İyi gidiyorsun! 🍃",
        4: "Son bir adım! 🌸"
    };

    waterStatus.innerHTML =
    `${messages[growLevel]} 0/20 💧`;

}

        watering = false;

 can.style.transform = "rotate(0deg)";

    }

},200);
   
}

// =========================
// WATER EFFECT
// =========================

const waterDrops = document.getElementById("waterDrops");

function splashWater(){

    const rect = can.getBoundingClientRect();

    for(let i=0;i<5;i++){

        const drop = document.createElement("div");

        drop.className="drop";

        drop.style.left=(rect.left+35+(Math.random()*20-10))+"px";

        drop.style.top=(rect.top+40)+"px";

        waterDrops.appendChild(drop);

        setTimeout(()=>{

            drop.remove();

        },700);

    }

}
        
       waterStatus.addEventListener("click", () => {

    // Sadece son aşamada tıklanabilir olsun
    if (growLevel !== 5) return;

    can.style.display = "none";

    document
        .getElementById("finalSection")
        .scrollIntoView({
            behavior: "smooth"
        });

});

const letter = document.getElementById("letter");
const photo = document.getElementById("memoryPhoto");
const memoryText = document.getElementById("memoryText");

const nextMemoryButton = document.getElementById("nextMemoryButton");

const memories = [

    {
        photo: "assets/images/foto1.jpg",
        title: "🤍 Beyaz Zambağın Anlamı",
        text: "Beyaz zambak; saflığın, masumiyetin ve zerafetin simgelerinden biridir. Zaten demiştim sana çok naif sakin birisin diye. Tabi sinir olursan sakin kısmı yalan oluyo ama 😝😝😝. Olsun nolcakk "
    },

    {
        photo: "assets/images/foto2.jpg",
        title: "🤍 Minik Detaylar, Kocaman Bir Güzellik",
        text: "Tırnaklarını özenle yapmak, renk seçerken heyecanlanmak falan oje arıyosun vs. Bunlar da içindeki o eğlenceli tarafını hatırlatıyor. Ve bence seni güzel yapan şeylerden biri de içindekileri yapmacık olmadan dışına vurman ki zaten söylemişimdir mıy mıy kasıntı insanlardan nefret ederim abi. Demiştim ya (sana baktığımda çocukluğunu görüyorum). Çok hoş bence böyle olman.🥱😉😉 "
    },

    {
        photo: "assets/images/foto3.jpg",
        title: "Kedi İnsanı.😸",
        text: "Zaten kedileri seviyorum biliyosun bununla ilgili yazıcak bir şey bulamadım ama en azından senden bir şeylerin de burda olması iyi olur yani olsun bence olmasın mı?"
    },

    {
       photo: "assets/images/foto4.jpg",
       title: "Bu senin manzaran 🏞️",
       text: "Belki de ilerde hiç hatırlamayacağın sıradan günlük bir şeydi bu fotoğraf ama sana o an güzel geldiği için çekmişsin ve yahut paylaşmak için estetik açıdan fena olmayan bir şey detaylara önem veriyosun işte bravo beğendim. "
    },

    {
    photo: "assets/images/foto5.jpg",
    title: "Bu da benim manzaram 😝😕😱",
    text:  "Bak ben dedim ama romantik değilim diye ama en azından buraya kadar geldin yani. Bu da demek oluyo ki benim için gerçekten değerlisin. İyi ki varsın.🫶"
    }

];

let currentMemory = 0;

letter.addEventListener("click", () => {

    letter.style.display = "none";

    photo.style.display = "block";
    memoryText.style.display = "block";

    photo.src = memories[0].photo;

 document.querySelector("#memoryText h1").innerHTML =
 memories[0].title;

 document.querySelector("#memoryText p").innerHTML =
 memories[0].text;

    setTimeout(() => {

        photo.style.opacity = "1";
        if(window.innerWidth < 768){

     photo.style.transform = "translateX(0) scale(1)";

     }else{

     photo.style.transform = "translateX(-280px) scale(1)";

     }

        memoryText.style.opacity = "1";

    },50);

});

nextMemoryButton.addEventListener("click", () => {

    if (currentMemory === memories.length - 1) {

    window.close();

    return;

  }
    currentMemory++;

    photo.style.opacity = "0";
    memoryText.style.opacity = "0";

    setTimeout(() => {

        photo.src = memories[currentMemory].photo;

        document.querySelector("#memoryText h1").innerHTML =
        memories[currentMemory].title;

        document.querySelector("#memoryText p").innerHTML =
        memories[currentMemory].text;

        photo.style.opacity = "1";
        memoryText.style.opacity = "1";

        if (currentMemory === memories.length - 1) {

        nextMemoryButton.innerHTML = "Kapat 🤍";

     }

    },500);

});

const bgMusic = document.getElementById("bgMusic");
      bgMusic.volume = 0.2;

document.addEventListener("click", () => {

    bgMusic.play();

}, { once: true });

