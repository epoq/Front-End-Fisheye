//Mettre le code JavaScript lié à la page photographer.html


// Récuperation des pages des photographes


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_id = urlParams.get("id");
const product_name = urlParams.get("name").split(' ')[0].replace('-', ' ');


console.log(product_name);


// Encadré de présentation...........................

const namePhotographer = document.getElementsByClassName('presentation__info--name');
const cityPhotographer = document.getElementsByClassName('presentation__info--localisation');
const taglinePhotographer = document.getElementsByClassName('presentation__info--citation');
const portraitPhotographer = document.getElementsByClassName('presentation__photo');
const photographerImg = document.createElement('img');
const nameModale = document.getElementsByClassName('name_modale');



fetch("../../data/photographers.json")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.photographers);
    for (let index = 0; index < data.photographers.length; index++) {
        // const element = data.photographers[index].name;
        // console.log(data.photographers[index].id);
        
        if(product_id == data.photographers[index].id){
            // console.log(data.photographers[index])
            namePhotographer[0].textContent = data.photographers[index].name;
            cityPhotographer[0].textContent = data.photographers[index].city +', '+  data.photographers[index].country;
            taglinePhotographer[0].textContent = data.photographers[index].tagline;        
            nameModale[0].textContent = data.photographers[index].name; 
          
            photographerImg.src =  './assets/images/' + data.photographers[index].portrait ;
            photographerImg.className = ('presentation__photo--img');
            portraitPhotographer[0].appendChild(photographerImg);
         }
    }

  });


  // Modale......................

  const modal = document.getElementById("contact_modal");
  const closeBtn = document.querySelector(".modal__entete--icone");
  const contactBtn = document.querySelector(".presentation__contact");
  
  
  contactBtn.addEventListener("click", modalOpen);
  closeBtn.addEventListener("click", modalClose);
  
  
  // Fonction pour ouvrir la modale
  function modalOpen(){
      modal.style.display = "block";
      console.log("btn cliqué");
  }
  
  // Fonction pour fermer la modale
  function modalClose(){
      modal.style.display = "none";
  }



  // Galerie Photo..................


  // const photoGalerie = document.getElementsByClassName('galerie__picture--modele');

  // const photoGalerieImg = document.createElement('img');
  // const photoGalerieVideo = document.createElement('video');
  // const photoVideoSrc = document.createElement('source');

  // const photoTitle = document.getElementsByClassName('galerie__picture--title');
  // const photoNumber = document.getElementsByClassName('galerie__picture--number');


  // Appel du parent

  const galerie = document.getElementsByClassName('galerie');

  fetch("../../data/photographers.json")
  .then((res) => res.json())
  .then((data) => {
    for (let index = 0; index < data.media.length; index++) {
        
        if(product_id == data.media[index].photographerId){
            console.log(data.media[index])

            // photoGalerieImg.src =  './assets/images/' + data.media[index].image ;
            // photoGalerieImg.className = ('galerie__picture--modeleImg');
            // photoGalerie[0].appendChild(photoGalerieImg);
            // photoGalerie[0].appendChild(photoGalerieVideo);
            // photoGalerieVideo[0].appendChild(photoVideoSrc);
            

            // photoTitle[0].textContent = data.media[index].title;
            // photoNumber[0].textContent = data.media[index].likes; 

            




            if(data.media[index].video){
              const galeriePicture = document.createElement('div');
              galeriePicture.setAttribute('class','galerie__picture');
              galerie[0].appendChild(galeriePicture);
  
              const galeriePictureModel = document.createElement('div');
              galeriePictureModel.setAttribute('class','galerie__picture--modele');
              galeriePicture.appendChild(galeriePictureModel);
  
              const galeriePictureModelVideo = document.createElement('video');
              const galeriePictureModelVideoSrc = document.createElement('source');
              galeriePictureModelVideoSrc.setAttribute('src',`./assets/images/${product_name}/${data.media[index].video}`);
              galeriePictureModel.appendChild(galeriePictureModelVideo);
              galeriePictureModelVideo.appendChild(galeriePictureModelVideoSrc);  
            }

            if(data.media[index].image){
              const galeriePicture = document.createElement('div');
              galeriePicture.setAttribute('class','galerie__picture');
              galerie[0].appendChild(galeriePicture);
  
              const galeriePictureModel = document.createElement('div');
              galeriePictureModel.setAttribute('class','galerie__picture--modele');
              galeriePicture.appendChild(galeriePictureModel);
  
              const galeriePictureModelImg = document.createElement('img');
              galeriePictureModelImg.setAttribute('src',`./assets/images/${product_name}/${data.media[index].image}`);
              galeriePictureModel.appendChild(galeriePictureModelImg);
  
            }
         }
    }

  });
