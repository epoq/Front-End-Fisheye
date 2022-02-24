//Mettre le code JavaScript lié à la page photographer.html


// Récuperation des pages des photographes


const queryString = window.location.search;
// console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const product_id = urlParams.get("id");

console.log(product_id);

const namePhotographer = document.getElementsByClassName('presentation__info--name');
const cityPhotographer = document.getElementsByClassName('presentation__info--localisation');
const taglinePhotographer = document.getElementsByClassName('presentation__info--citation');
const portraitPhotographer = document.getElementsByClassName('presentation__photo--img');
const nameModale = document.getElementsByClassName('name_modale');



fetch("../../data/photographers.json")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.photographers);
    for (let index = 0; index < data.photographers.length; index++) {
        const element = data.photographers[index].name;

        // console.log(data.photographers[index].id);

        if(product_id == data.photographers[index].id){
            console.log(data.photographers[index])
            namePhotographer[0].textContent = data.photographers[index].name;
            cityPhotographer[0].textContent = data.photographers[index].city +', '+  data.photographers[index].country;
            taglinePhotographer[0].textContent = data.photographers[index].tagline;        
            nameModale[0].textContent = data.photographers[index].name;        
            portraitPhotographer[0].img = data.photographers[index].portrait;
            console.log(data.photographers[index].portrait);
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