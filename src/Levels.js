import React from 'react'
import RequestPermissions from './components/RequestPermissions'
import SimpleCard from './components/SimpleCard'
import GpsComponent from './components/GpsComponent'
import InputComponent from './components/InputComponent'
import FakeMode from './components/FakeMode'
import { Text, Button } from 'react-native-paper'
const { Speech } = Expo

let GPS_MARCONI = { latitude: 44.431174, longitude: 11.269839 }
let GPS_ALTOPIANO = { latitude: 44.436754, longitude: 11.264497 }
let GPS_SCEICCO_BIANCO = { latitude: 44.484043, longitude: 11.269085 }
let GPS_PIAZZA_MAGGIORE = { latitude: 44.493732, longitude: 11.343135 }
let GPS_PIAZZA_NETTUNO = { latitude: 44.494280, longitude: 11.342671 }
let GPS_CASA_LUCA = { latitude: 44.468682, longitude: 11.373693 }


const Bold = (props) => (
    <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
)

const Italic = (props) => (
    <Text style={{fontStyle: 'italic'}}>{props.children}</Text>
)

const NewLine = () => (
    <Text>{ "\n" }</Text>
)

levels = [
    {
        tag: SimpleCard,
        title: "Alla ricerca dei regali perduti",
        text: <Text>Anche quest'anno Babbo Natale è pronto per portare i suoi regali in giro per il mondo 🎁🎁🎁.
                Il caro vecchio uomo barbuto si è però accorto di quanto tu sia stata una ragazza cattiva quest'anno.
                Nonostante ciò, non ha deciso di non portarti doni (stiamo parlando di Babbo Natale d'altronde!),
                ma ha deciso che per ottenere i suoi regali dovrai sudartela parecchio. In questo modo, la sua coscienza è a posto 
                e il fatto che tu riceva o meno i tanti attesi regali dipendono soltanto dalla tua arguzia e forza di volontà.<NewLine/>
                Durante le sue notti solitarie nell'incontaminata Lapponia, il nostro Santa Claus si è inventato una serie di
                intricati indovinelli che, solo una volta risolti tutti, ti porteranno ai tanto desiderati regali.
                Avanti! Raduna i tuoi migliori pesanti vestiti natalizi, cuffia e sciarpa e preparati per questa avventura!
                </Text>,
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
        text: <Text>Le regole sono molto semplici! Gli indovinelli ti saranno posti uno dopo l'altro, e una volta risolto uno passerai a quello successivo.
                Per tenere traccia dello stato della tua disperata ricerca, potrai sempre visualizzare la barra in alto che
                segnala la percentuale di completamento del gioco. Fin qui tutto semplice no?<NewLine/>
                Siccome Babbo Natale è buono, ha concesso che in momenti di difficoltà tu possa chiedere un aiuto.
                La richiesta di aiuto può essere di ogni tipo, dal non capire un indovinello, dal non riuscire ad arrivare alla soluzione,
                a (soprattutto, ma non succederà) bug nell'applicazione che ti impediscano di proseguire nel gioco. Sarebbe un vero peccato! 
                Ecco quindi che, una volta chiesto aiuto (e a chi se non al tuo meraviglioso fidanzato?), riceverai in risposta un codice che ti
                permetterà di sbloccare indizi o addirittura passare all'indovinello successivo. Dove inserire questo codice? Molto semplice! 
                Clicca sull'icona in alto a sinistra e inserisci il codice! (Ricorda che maiuscole e minuscole contano).<NewLine/>
                Per passare alla prossima schermata, clicca sull'icona in alto a destra e inserisci il codice 'riccardo'
                </Text>,
        image: require('../assets/snoopy-detective.jpg'),
        endHint: "riccardo"
    },
    {
        tag: RequestPermissions,
        text: <Text>Come dicono a Città del Capo, we are all set! Rimane soltanto un passaggio:
                accettare i permessi di accedere alla tua posizione GPS e cominciare a giocare!
                In bocca al lupo e May the Force be with you!
                </Text>,
        title:'Require permissions',
        buttonText:'Grant permissions'
    },
    {
        tag: GpsComponent,
        title: "Comincia l'avventura",
        text: <Text>Sembra che Babbo Natale sia già stato avvistato in zona! Poco fa la sua slitta era parcheggiata a Pontecchio Marconi. 
                    Dirigiti là e comincia a investigare
                </Text>,
        image: require('../assets/marconi.jpg'),
        location: GPS_MARCONI,
        gpsHint: "marconi",
        endHint: "cominciamobene"
    },
    {
        tag: InputComponent,
        title: "Un indovinello da Premio Nobel",
        image: require('../assets/forziere.jpg'),
        text: <Text>
                Niente da fare, Santa Claus è già ripartito!
                Ma a quanto pare ha lasciato un piccolo forziere con un lucchetto a <Bold>4 cifre</Bold> per te. 
                Accanto ad esso, un foglio con scritto:<NewLine/>
                <Italic>
                    I miei indovinelli richiedono molto ingegno: ci vorrebbe un <Bold>Premio Nobel</Bold> per risolverli tutti!
                </Italic>
                </Text>,
        buttonText: "Conferma",
        answer: "1909",
        hint: "Le 4 cifre rappresentano un anno",
        endHint: "1909"
    },
    {
        tag: GpsComponent,
        title: "Entrata nel labirinto",
        image: require('../assets/mappa-tesoro.jpg'),
        text: <Text>Apri il forziere e dentro trovi... un nuovo indovinello! Esso recita:<NewLine/>
                <Italic>
                    E' l'opposto del bassoforte. Entra nel labirinto e trova il 55/9.
                </Italic>
            </Text>,
        location: GPS_ALTOPIANO,
        gpsHint: "altopiano",
        endHint: "cercameglio"
    },
    {
        tag: InputComponent,
        title: "Un'apparizione dal naso rosso",
        image: require('../assets/reindeer.jpg'),
        text: <Text>Nel momento in cui raggiungi il posto designato una renna scende dal cielo e deposita
                    un pacco davanti a te. Chi se lo sarebbe aspettato che questo pacco regalo però fosse protetto
                    da un indistruttibile lucchetto a BEN due cifre?
                    (bisognerebbe spiegare a Babbo Natale gli algoritmi di forza bruta ..)<NewLine/>
                    La renna a questo punto comincia a parlare (niente di strano fin qui) e dopo aver lasciato il suo
                    enigmatico messaggio sfreccia via tra le nuvole lasciando una scia di stelle dorate.
            </Text>,
        children: [
            <Button key={0}
                    style={{ margin: 10 }}
                    onPress={() => Speech.speak("Cara Giulia, so che Babbo Natale é stato un po' antipatico con te quest'anno. " +
                            "Io però sono una renna buona e voglio aiutarti. Non posso darti la combinazione, altrimenti Babbo Natale mi frusterà, " +
                            "ma posso dirti che si aprirà con il numero civico più alto di questo meraviglioso Altopiano. In bocca al lupo!", { language: 'it' })}>
                ASCOLTA LA RENNA
            </Button>
        ],
        buttonText: "Inserisci la combinazione",
        answer: "92",
        endHint: "novantadue"
    },
    {
        tag: GpsComponent,
        title: "Uno strano oggetto e uno strano messaggio",
        image: require("../assets/meridiana.jpg"),
        location: GPS_SCEICCO_BIANCO,
        text: "Apri il forziere, e dentro trovi l'immagine di uno strano oggetto acuminato che proietta la sua ombra per terra. " + 
                "Assieme ad essa, un messaggio che dice di trovare l'insegna di colui che indossa una tunica bianca.",
        gpsHint: "meridiana-casalecchio",
        endHint: "sceicco-bianco"
    },
    {
        tag: GpsComponent,
        image: require("../assets/inferno-dante.jpg"),
        text: <Text>
                <Italic>Vai dove inizia l'arduo percorso che porta alla casa del Padre della nostra volgar lingua</Italic>
            </Text>,
        location: GPS_PIAZZA_MAGGIORE,
        gpsHint: "via-degli-dei",
        endHint: "piazza-maggiore"
    },
    {
        tag: SimpleCard,
        title: "The End",
        text: "Complimenti!",
    }
]

export default levels