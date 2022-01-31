function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}



const modal = document.getElementById("contact_modal");
const closeBtn = document.querySelector(".modal__entete--icone");
const contactBtn = document.querySelector(".photograph__contact");


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
