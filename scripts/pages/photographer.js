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
  
  
  contactBtn.addEventListener("click", modalOpen);
  closeBtn.addEventListener("click", modalClose);
  
  
  // Fonction pour ouvrir la modale
  function modalOpen(){
      modal.style.display = "block";
  }
  
  // Fonction pour fermer la modale
  function modalClose(){
      modal.style.display = "none";
  }





  // Galerie Photos.......................................................


  // Appel du parent

  const galerie = document.getElementById('galerie');
  

  // Structure et récupération données photos/vidéos

  fetch("../../data/photographers.json")
  .then((res) => res.json())
  .then((data) => {
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
              console.log(data.media[index].likes);
            }

            const menuDate = document.querySelector('.menuDate');

            menuDate.addEventListener('click', triByDate);

            function triByDate(){
              console.log(data.media[index].date);
            }

            const menuTitre = document.querySelector('.menuTitre');

            menuTitre.addEventListener('click', triByTitre);

            function triByTitre(){
              console.log(data.media[index].title);
            }

            // const dates_photos = 

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

    // Ouverture de la modale de galerie..........

    const modalGalerie = document.getElementById('modalGalerie');
    const modalGaleriePhoto = document.getElementsByClassName('galerie__picture--modeleImg');

    // const ModalGalerieContenu = document.getElementsByClassName('modalGalerie__contenu');
    // ModalGalerieContenu.setAttribute('src',`./assets/images/${product_name}/${data.media[index].image}`);
    
 
    Array.prototype.forEach.call(modalGaleriePhoto, function(modalGaleriePhoto){
      modalGaleriePhoto.addEventListener("click", modalGalerieOn);    
    });

    function modalGalerieOn(){
    modalGalerie.style.display = 'block';
    }


    // Fermeture de la modale de galerie..........

    const closeModalGalerie = document.querySelector(".modalGalerie__iconeClose");
   
    closeModalGalerie.addEventListener("click", modalGalerieOff);
  
  
    function modalGalerieOff(){
      modalGalerie.style.display = "none";
    }


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






