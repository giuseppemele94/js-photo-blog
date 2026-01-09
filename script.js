//seleziono l'elemento di container dove verrano stampate le card 
const output = document.querySelector(".main-container");

//creo riferimento a endpoint per chiamata API
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

//creo riferimento a overlay container 
const overlayContainer = document.querySelector(".overlay-container");

//creo riferimento al botton dell'overlay
const buttonOverlay = document.querySelector(".overlay-close"); 

//riferimento alle immagini in overlay per la stampa
const overlayImg = document.querySelector(".overlay-img");

//chiamata ajax all'end point 
axios.get(endpoint)
    .then(response => {

        //ottengo l'array di oggetti dall'API 
        const picArrayObjects = response.data;
        //console.log(picArrayObjects); 

        //variabile di accumulo stinga output
        let picArrayOutput = "";

        //ciclo su array per estrapolare title,date,url foto
        picArrayObjects.forEach((obj) => {

            //destruttiriamo l'oggetto
            const { title, date, url } = obj;
            //console.log(title,date,url); 

            picArrayOutput += `
             <div class="card">
                <div class="img-container">
                    <img src="${url}" alt="">
                    <img class ="pin"src="./img/pin.svg" alt="">
                </div>
                <div class="title-img title-font">${title.toUpperCase()}</div>
                <div class="date-img date-font">${date}</div>
            </div>
        `;

        });

        //inserimento in pagina card accumulate
        output.innerHTML = picArrayOutput;



        /* al click sulle card tolgo il d-none di overlay container **/
        const allCards = document.querySelectorAll(".card");
        
        allCards.forEach((card) => {
            //al click rimuovo la classe d-none
            card.addEventListener("click", () => {

                //prendo l'immagine dentro la card che ho gia
                const imgCard = card.querySelector(".img-container img");

                //imposto nell'overlay la stessa immagine cliccata
                overlayImg.src = imgCard.src ; 
                
                overlayContainer.classList.remove("d-none"); 
            })
        })

    })

    .catch(error => {
        //codice da eseguire in caso di errore
        console.log("Errore nel recupero dei dati", error);

    })
    .finally(() => {
        //codice da esegiure sempre 
        console.log("Operazione andata a buon fine");
    }); 


    //al click del pulsante chiudi , nascondo overlay container 

    buttonOverlay.addEventListener("click",() => {
        overlayContainer.classList.add("d-none"); 
    })