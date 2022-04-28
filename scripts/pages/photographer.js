//Mettre le code JavaScript lié à la page photographer.html


// Récuperation des pages des photographes


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_id = urlParams.get("id");
const product_name = urlParams.get("name").split(' ')[0].replace('-', ' ');


// console.log(product_name);


// Encadré de présentation......................................................................


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

            photographerPrice = data.photographers[index].price;

            namePhotographer[0].textContent = data.photographers[index].name;
            cityPhotographer[0].textContent = data.photographers[index].city +', '+ data.photographers[index].country;
            taglinePhotographer[0].textContent = data.photographers[index].tagline;        
            nameModale[0].textContent = data.photographers[index].name; 
          
            photographerImg.src =  './assets/images/' + data.photographers[index].portrait ;
            photographerImg.className = ('presentation__photo--img');
            photographerImg.setAttribute('alt', data.photographers[index].name);
            portraitPhotographer[0].appendChild(photographerImg);

            
         }
    }

    const tarif = document.getElementsByClassName('encart__tarif');
    tarif[0].textContent = photographerPrice +'€/jour';

  });




  // Modale...................................................................


  const modal = document.getElementById("contact_modal");
  const closeBtn = document.querySelector(".modal__entete--icone");
  const contactBtn = document.querySelector(".presentation__contact");
  
  // sélection du paragraphe "merci"
  const submitBtn = document.querySelector('.modal__formulaire--bouton');
  const txtValid = document.getElementById("success"); 
  
  
  contactBtn.addEventListener("click", modalOpen);
  closeBtn.addEventListener("click", modalClose);
  submitBtn.addEventListener("click", validate);
  
  
  
  // Fonction pour ouvrir la modale
  function modalOpen(){
      modal.style.display = "block";
  }
  
  // Fonction pour fermer la modale
  function modalClose(){
      modal.style.display = "none";
  }

  // Fonction qui fait apparaitre le txt de validation
  function txtValidAppear() {
  modal.style.display = "none";
  txtValid.style.display = "block";    
}


// Fonction de vérification du formulaire

function validate(event) {
  event.preventDefault()
  console.log('test');

  const firstName = document.getElementById("prenom");
  const firstValid = document.getElementById("firstValid");

  const lastName = document.getElementById("nom");
  const lastValid = document.getElementById("lastValid");

  const mail = document.getElementById("email");
  const mailValid = document.getElementById("mailValid");


  let isValid = true;
  firstValid.style.display = "none";
  lastValid.style.display = "none"; 
  mailValid.style.display = "none";


  // Vérification Prénom
  if (firstName.value.match(/^[A-zéèê'-]{2,}$/)===null){               
    firstValid.style.display = "block";
    isValid = false;
  }
  
  // Vérification Nom
  if(lastName.value.match(/^[A-zéèê'-]{2,}$/)===null){                 
    lastValid.style.display = "block";
    isValid = false;
  }
  
  // Vérification email
  if(mail.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)=== null){        
    mailValid.style.display = "block";
    isValid = false;
  }

  if(isValid){
    txtValidAppear();
  }
}



  // Galerie Photos.......................................................


  // Appel du parent

  const galerie = document.getElementById('galerie');
  

  // Structure et récupération données photos/vidéos

  fetch("../../data/photographers.json")
  .then((res) => res.json())
  .then((data) => {
    let ensemblePhotos = [];
  
    let totalLikes = 0;
    for (let index = 0; index < data.media.length; index++) {

        
        if(product_id == data.media[index].photographerId){
            // console.log(data.media[index])
          
            
            totalLikes = totalLikes + data.media[index].likes; 

            
            if(data.media[index].video){
        
              var galeriePicture = document.createElement('div');
              galeriePicture.setAttribute('class','galerie__picture');
              galerie.appendChild(galeriePicture);
  
              var galeriePictureModel = document.createElement('div');
              galeriePictureModel.setAttribute('class','galerie__picture--modele');  
              galeriePicture.appendChild(galeriePictureModel);
  
              var galeriePictureModelVideo = document.createElement('video');
              galeriePictureModelVideo.setAttribute('role','button');
              galeriePictureModelVideo.setAttribute('controls','controls');
              galeriePictureModelVideo.dataset.id = data.media[index].video;
              galeriePictureModelVideo.setAttribute('class', 'galerie__picture--modeleVideo');
              var galeriePictureModelVideoSrc = document.createElement('source');
              galeriePictureModelVideoSrc.setAttribute('src',`./assets/images/${product_name}/${data.media[index].video}`);
              galeriePictureModel.appendChild(galeriePictureModelVideo);
              galeriePictureModelVideo.appendChild(galeriePictureModelVideoSrc);

              const photoLegend = document.createElement('div');
              photoLegend.setAttribute('class', 'galerie__picture--legend');
              galeriePicture.appendChild(photoLegend);

              const photoLegendTitle = document.createElement('p');
              photoLegendTitle.innerHTML = data.media[index].title;
              photoLegend.appendChild(photoLegendTitle);

              const photoLegendLikes = document.createElement('div');
              photoLegendLikes.setAttribute('class', 'galerie__picture--likes');
              photoLegend.appendChild(photoLegendLikes);

              const photoLegendNumber = document.createElement('p'); 
              photoLegendNumber.setAttribute('class', 'galerie__picture--number');        
              photoLegendNumber.innerHTML = data.media[index].likes;
              photoLegendLikes.appendChild(photoLegendNumber);

              const photoLegendIcone = document.createElement('i');
              photoLegendIcone.setAttribute('class', 'fas fa-heart heart');
              photoLegendLikes.appendChild(photoLegendIcone);            

            }

            if(data.media[index].image){
              const galeriePicture = document.createElement('div');
              galeriePicture.setAttribute('class','galerie__picture');
              galerie.appendChild(galeriePicture);
  
              const galeriePictureModel = document.createElement('div');
              galeriePictureModel.setAttribute('class','galerie__picture--modele');
              galeriePicture.appendChild(galeriePictureModel);
  
              const galeriePictureModelImg = document.createElement('img');
              galeriePictureModelImg.setAttribute('src',`./assets/images/${product_name}/${data.media[index].image}`);
              galeriePictureModelImg.dataset.id = data.media[index].image;
              galeriePictureModelImg.className = 'galerie__picture--modeleImg';
              galeriePictureModel.appendChild(galeriePictureModelImg);

              const photoLegend = document.createElement('div');
              photoLegend.setAttribute('class', 'galerie__picture--legend');
              galeriePicture.appendChild(photoLegend);


              const photoLegendTitle = document.createElement('p');
              photoLegendTitle.innerHTML = data.media[index].title;
              photoLegend.appendChild(photoLegendTitle);

              const photoLegendLikes = document.createElement('div');
              photoLegendLikes.setAttribute('class', 'galerie__picture--likes');
              photoLegend.appendChild(photoLegendLikes);

              const photoLegendNumber = document.createElement('p');
              photoLegendNumber.setAttribute('class', 'galerie__picture--number');            
              photoLegendNumber.innerHTML = data.media[index].likes;
              photoLegendLikes.appendChild(photoLegendNumber);

              const photoLegendIcone = document.createElement('i');
              photoLegendIcone.setAttribute('class', 'fas fa-heart heart');
              photoLegendLikes.appendChild(photoLegendIcone);            
            }

            // Tri en fonction des parametres de l'image.......

            const menuPop = document.querySelector('.menuPop');
            menuPop.addEventListener('click', triByPop);

            function triByPop(){
              var pop1 = [data.media[index].likes];
              var pop2 = pop1.sort();
              console.log(pop2);
            }

            const menuDate = document.querySelector('.menuDate');
            menuDate.addEventListener('click', triByDate);

            function triByDate(){
              var date1 = [data.media[index].date];
              var date2 = date1.sort();
              console.log(date2);
            }

            const menuTitre = document.querySelector('.menuTitre');
            menuTitre.addEventListener('click', triByTitre);

            function triByTitre(){
              var titre1 = [data.media[index].title];
              var titre2 = titre1.sort();
              console.log(titre2);
            }


        // Modale de défilement de la galerie...........................................

            const modalGalerie = document.getElementById('modalGalerie');
            const modalGalerieDefilement = document.getElementsByClassName('modalGalerie__defilement');
            const modalGaleriePhoto = document.getElementsByClassName('galerie__picture--modeleImg');
            const modalGalerieVideo = document.getElementsByClassName('galerie__picture--modeleVideo');
        
        
        
            if(data.media[index].image){
                Array.prototype.forEach.call(modalGaleriePhoto, function(modalGaleriePhoto){
                modalGaleriePhoto.addEventListener("click", () => modalGalerieOn(modalGaleriePhoto.dataset.id)); 
                // console.log(modalGaleriePhoto.dataset.id); 
                });
            }
        
            if(data.media[index].video){
                Array.prototype.forEach.call(modalGalerieVideo, function(modalGalerieVideo){
                modalGalerieVideo.addEventListener("click", () => modalGalerieOn(modalGalerieVideo.dataset.id));  
                });
            }
        
        
            function modalGalerieOn(id){
              console.log(id);
              modalGalerie.style.display = 'block';
              // console.log(typeof modalGalerieDefilement);
              // console.log(typeof modalGalerieDefilement[0]);
        
                if(data.media[index].image){
                const big = document.createElement('img');
                big.setAttribute('class', 'modalGalerie__defilement--big');
                big.setAttribute('src', `./assets/images/${product_name}/${id}`);
                modalGalerieDefilement[0].innerHTML = '';   
                modalGalerieDefilement[0].appendChild(big);
                modalGalerie.appendChild(modalGalerieDefilement[0]);
                
              }
        
              if(data.media[index].video){
                const bigvideo = document.createElement('video');
                bigvideo.setAttribute('class', 'modalGalerie__defilement--bigvideo');
                bigvideo.setAttribute('src', `./assets/images/${product_name}/${id}`);
                bigvideo.setAttribute('role','button');
                bigvideo.setAttribute('controls','controls');                
                modalGalerieDefilement[0].innerHTML = '';   
                modalGalerieDefilement[0].appendChild(bigvideo);
                modalGalerie.appendChild(modalGalerieDefilement[0]);
              }
          
            }

          // Fermeture de la modale de galerie..........

              const closeModalGalerie = document.querySelector(".modalGalerie__iconeClose");
   
              closeModalGalerie.addEventListener("click", modalGalerieOff);
  
  
              function modalGalerieOff(){
              modalGalerie.style.display = "none";
              }
        
          // Défilement au clic..............

              if(data.media[index].image){
              ensemblePhotos.push(data.media[index].image);
              }

              if(data.media[index].video){
              ensemblePhotos.push(data.media[index].video);  
              }


              const left = document.querySelector('.modalGalerie__fleche--iconeLeft');
              const right = document.querySelector('.modalGalerie__fleche--iconeRight');
              // const big = document.getElementsByClassName('modalGalerie__defilement--big');
              // const bigvideo = document.getElementsByClassName('modalGalerie__defilement--bigvideo');
              
              left.addEventListener('click', slidePhotoLeft);
              right.addEventListener('click', () => slidePhoto(1));
              
              var numero = 0;

              function slidePhoto(sens) {
                numero = numero + sens;
                
                if(sens>0) numero += 1;
                if(sens<0) numero -= 1;
                if(numero<0) numero = ensemblePhotos.length - 1;

                // if (numero < 0)
                //     numero = ensemblePhotos.length -1;

                // if (numero > ensemblePhotos.length -1)
                //     numero = 0;

                    // big.src = ensemblePhotos[numero];
                    // bigvideo.src = ensemblePhotos[numero];
                  document.getElementsByClassName('modalGalerie__defilement--big').src = ensemblePhotos[numero];
              }

              function slidePhotoLeft() {

                var sens = -1;
                numero = numero + sens;

                
                if(sens>0) numero += 1;
                if(sens<0) numero -= 1;
                if(numero<0) numero = ensemblePhotos.length - 1;

                // if (numero < 0)
                //     numero = ensemblePhotos.length -1;

                // if (numero > ensemblePhotos.length -1)
                //     numero = 0;

                    // big.src = ensemblePhotos[numero];
                    // bigvideo.src = ensemblePhotos[numero];
                  document.getElementsByClassName('modalGalerie__defilement--big').src = ensemblePhotos[numero];
              }
         }
        
    }


    // Encart de bas de page..........

    const totalChiffre = document.getElementsByClassName('encart__total--chiffre');
    totalChiffre[0].textContent = totalLikes;



    // Incrémentation des likes.........


    var els = document.getElementsByClassName('heart');

    Array.prototype.forEach.call(els, function(els){
    els.addEventListener('click', function() {
    const listChild = els.closest('.galerie__picture--likes').children;


    for(var i = 0; i < listChild.length; i++) {
      if(listChild[i].getAttribute('class') ==='galerie__picture--number'){
        // obtenir les likes
        const getLikeDefault = listChild[i].textContent;
        // ajouter un like
        const addLikePlus = parseInt(getLikeDefault) + 1;
        // inserer un nouveau like
        listChild[i].textContent = addLikePlus;

        // compte total addLikePlus
 
        const totalChiffre2 = document.getElementsByClassName('encart__total--chiffre');
        const initTotalLike = totalChiffre2[0].textContent;
        const addLikeTotal = parseInt(initTotalLike) + 1;
        totalChiffre2[0].textContent = addLikeTotal;


        console.log(totalChiffre[0]);
        
      }
    }

    });

  
    });  


  });

      
  



  // Bouton de tri.................................................


  const menuTri = document.getElementsByClassName('tri__btn--back');
  const divTri = document.querySelector(".tri__btn");
  const btnTri = document.querySelector(".btn_tri");
  
  
  
  btnTri.addEventListener("mouseenter", menuTriOpen);
  divTri.addEventListener("mouseleave", menuTriClose);
 
 
  // Fonction pour ouvrir le menu de tri
  function menuTriOpen(){
    menuTri[0].style.display = "block";
    menuTri[0].style.display = "flex";
    menuTri[0].style.flexDirection = "column";
  }

  function menuTriClose(){
    menuTri[0].style.display = "none";
  }




   
  






