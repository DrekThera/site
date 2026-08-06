const letter = document.getElementById("letter");
const photo = document.getElementById("memoryPhoto");
const memoryText = document.getElementById("memoryText");
const nextMemoryButton = document.getElementById("nextMemoryButton");

const memories = [

{
photo:"assets/images/foto1.jpg",
title:"🤍 Beyaz Zambağın Anlamı",
text:"Beyaz zambak; saflığın, masumiyetin ve zerafetin simgelerinden biridir. Zaten demiştim sana çok naif sakin birisin diye. Tabi sinir olursan sakin kısmı yalan oluyo ama 😝😝😝. Olsun nolcakk"
},

{
photo:"assets/images/foto2.jpg",
title:"🤍 Minik Detaylar, Kocaman Bir Güzellik",
text:"Tırnaklarını özenle yapmak, renk seçerken heyecanlanmak falan oje arıyosun vs. Bunlar da içindeki o eğlenceli tarafını hatırlatıyor. Ve bence seni güzel yapan şeylerden biri de içindekileri yapmacık olmadan dışına vurman."
},

{
photo:"assets/images/foto3.jpg",
title:"Kedi İnsanı 😸",
text:"Zaten kedileri seviyorum biliyosun bununla ilgili yazıcak bir şey bulamadım ama en azından senden bir şeylerin de burda olması iyi olur."
},

{
photo:"assets/images/foto4.jpg",
title:"Bu senin manzaran 🏞️",
text:"Belki de ilerde hiç hatırlamayacağın sıradan günlük bir şeydi bu fotoğraf."
},

{
photo:"assets/images/foto5.jpg",
title:"Bu da benim manzaram 😝",
text:"Bak ben dedim ama romantik değilim diye ama en azından buraya kadar geldin. İyi ki varsın. 🫶"
}

];

let currentMemory = 0;

letter.addEventListener("click", () => {

letter.style.display="none";

photo.style.display="block";
memoryText.style.display="block";

photo.src=memories[0].photo;

document.querySelector("#memoryText h1").innerHTML=memories[0].title;
document.querySelector("#memoryText p").innerHTML=memories[0].text;

setTimeout(()=>{

photo.style.opacity="1";
memoryText.style.opacity="1";

},100);

});

nextMemoryButton.addEventListener("click",()=>{

if(currentMemory===memories.length-1){

document.body.innerHTML=`
<div style="width:100vw;height:100vh;background:#050914;color:white;display:flex;justify-content:center;align-items:center;font-size:30px;text-align:center;padding:30px;">
Ve son... 🤍<br><br>
Kapatabilirsin.
</div>
`;

return;

}

currentMemory++;

photo.style.opacity="0";
memoryText.style.opacity="0";

setTimeout(()=>{

photo.src=memories[currentMemory].photo;

document.querySelector("#memoryText h1").innerHTML=memories[currentMemory].title;
document.querySelector("#memoryText p").innerHTML=memories[currentMemory].text;

photo.style.opacity="1";
memoryText.style.opacity="1";

if(currentMemory===memories.length-1){

nextMemoryButton.innerHTML="Kapat 🤍";

}

},300);

});