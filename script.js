//seleziono l'elemento di container dove verrano stampate le card 
const output = document.querySelector(".main-container");

//creo riferimento a endpoint per chiamata API
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";


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
    })

    .catch(error => {
        //codice da eseguire in caso di errore
        console.log("Errore nel recupero dei dati", error);

    })
    .finally(() => {
        //codice da esegiure sempre 
        console.log("Operazione andata a buon fine");
    }); 