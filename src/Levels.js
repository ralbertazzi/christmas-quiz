import RequestPermissions from './components/RequestPermissions'
import SimpleCard from './components/SimpleCard'
import GpsComponent from './components/GpsComponent'
import InputComponent from './components/InputComponent'
import FakeMode from './components/FakeMode'

let GPS_PIAZZA_NETTUNO = { latitude: 44.494280, longitude: 11.342671 }
let GPS_CASA_LUCA = { latitude: 44.468682, longitude: 11.373693 }


levels = [
    {
        tag: SimpleCard,
        title: "Alla ricerca dei regali perduti",
        text: "Anche quest'anno Babbo Natale è pronto per portare i suoi regali in giro per il mondo 🎁🎁🎁." +
                "Il caro vecchio uomo barbuto si è però accorto di quanto tu sia stata una ragazza cattiva quest'anno. " +
                "Nonostante ciò, non ha deciso di non portarti doni (stiamo parlando di Babbo Natale d'altronde!), " +
                "ma ha deciso che per ottenere i suoi regali dovrai sudartela parecchio . In questo modo, la sua coscienza è a posto " + 
                "e il fatto che tu riceva o meno i tanti attesi regali dipendono soltanto dalla tua arguzia e forza di volontà.\n" +
                "Durante le sue notti solitarie nell'incontaminata Lapponia, il nostro Santa Claus si è inventato una serie di " +
                "intricati indovinelli che, solo una volta risolti tutti, ti porteranno ai tanto desiderati regali. " +
                "Avanti! Raduna i tuoi migliori pesanti vestiti natalizi, cuffia e sciarpa e preparati per questa avventura",
        image: require('../assets/babbo-natale-renne.jpg'),
        buttonText: "Ma cosa mi tocca fare"
    },
    {
        tag: FakeMode,
        title: "Preparativi",
        text: "Scegli la modalità di gioco",
        endMessage: "Wow, hai scelto la modalità impossibile!!"
    },
    {
        tag: SimpleCard,
        title: "Come funziona il gioco",
        text: "Le regole sono molto semplici! Gli indovinelli ti saranno posti uno dopo l'altro, e una volta risolto uno passerai a quello successivo." +
                "Per tenere traccia dello stato della tua disperata ricerca, potrai sempre visualizzare la barra in alto che " +
                "segnala la percentuale di completamento del gioco. Fin qui tutto semplice no?\n" +
                "Siccome Babbo Natale è buono, ha concesso che in momenti di difficoltà tu possa chiedere un aiuto. " +
                "La richiesta di aiuto può essere di ogni tipo, dal non capire un indovinello, dal non riuscire ad arrivare alla soluzione, " +
                "a (soprattutto, ma non succederà) bug nell'applicazione che ti impediscano di proseguire nel gioco. Sarebbe un vero peccato!" + 
                "Ecco quindi che, una volta chiesto aiuto (e a chi se non al tuo meraviglioso fidanzato?), riceverai in risposta un codice che ti " +
                "permetterà di sbloccare indizi o addirittura passare all'indovinello successivo. Dove inserire questo codice? Molto semplice! " + 
                "Clicca sull'icona in alto a sinistra e inserisci il codice! (Ricorda che maiuscole e minuscole contano).\n\n" +
                "Per passare alla prossima schermata, clicca sull'icona in alto a destra e inserisci il codice 'riccardo'",
        image: require('../assets/snoopy-detective.jpg'),
        endHint: "riccardo"
    },
    {
        tag: RequestPermissions,
        text: "Come dicono a Città del Capo, we are all set! Rimane soltanto un passaggio: " +
                "accettare i permessi di accedere alla tua posizione GPS e cominciare a giocare!" +
                "In bocca al lupo e May the Force be with you!",
        title:'Require permissions',
        buttonText:'Grant permissions'
    },
    {
        tag: SimpleCard,
        text: "Thanks for accepting the permissions",
        buttonText: "Move on"
    },
    {
        tag: SimpleCard,
        title: "What a nice title!",
        image: require("../assets/torri2.jpg"),
        text: "Thanks for moving on!",
        buttonText: "Please, enough."
    },
    {
        tag: GpsComponent,
        title: "My Gps component!",
        text: "Find the location of Ginza restaurant",
        showDistance: false,
        location: GPS_CASA_LUCA,
        gpsHint: "pippo1",
        endHint: "pippo"
    },
    {
        tag: InputComponent,
        title: "The answer to all your problems",
        text: "You found me!",
        answer: "1234",
        buttonText: "Check"
    }
]

export default levels