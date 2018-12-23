import React from 'react'
import RequestPermissions from './components/RequestPermissions'
import SimpleCard from './components/SimpleCard'
import GpsComponent from './components/GpsComponent'
import InputComponent from './components/InputComponent'
import FakeMode from './components/FakeMode'
import ListenButton from './components/ListenButton'
import { Text } from 'react-native-paper'
import MapComponent from './components/MapComponent';

let GPS_MARCONI = { latitude: 44.431174, longitude: 11.269839 }
let GPS_ALTOPIANO = { latitude: 44.436754, longitude: 11.264497 }
let GPS_SCEICCO_BIANCO = { latitude: 44.484043, longitude: 11.269085 }
let GPS_PARCHETTO = { latitude: 44.482089, longitude: 11.264395 }
let GPS_PIAZZA_MAGGIORE = { latitude: 44.493732, longitude: 11.343135 }
let GPS_SAN_FRANCESCO = { latitude: 44.494480, longitude: 11.336389 }
let GPS_CASA_GIULIA = { latitude: 44.422362, longitude: 11.260372 }


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
        text: <Text>Anche quest'anno Babbo Natale è pronto per portare i suoi regali in giro per il mondo 🎁🎅🎁.
                Il caro vecchio uomo barbuto si è però accorto di quanto tu sia stata una ragazza cattiva quest'anno.
                Nonostante ciò, non ha deciso di non portarti doni (stiamo parlando di Babbo Natale d'altronde 😇),
                ma ha deciso che per ottenere i suoi regali dovrai sudartela parecchio. In questo modo, la sua coscienza è a posto 
                e il fatto che tu riceva o meno i tanti attesi regali dipendono soltanto dalla tua arguzia e forza di volontà.<NewLine/>
                Durante le sue notti solitarie nell'incontaminata Lapponia, il nostro Santa Claus si è inventato una serie di
                intricati indovinelli che, solo una volta risolti tutti, ti porteranno ai tanto desiderati regali 🕵️‍♀️.
                Avanti! Raduna i tuoi migliori pesanti vestiti natalizi, cuffia e sciarpa e preparati per questa avventura!! 💪💪💪
                </Text>,
        image: require('../assets/babbo-natale-renne.jpg'),
        buttonText: "Ma cosa mi tocca fare"
    },
    {
        tag: FakeMode,
        title: "Preparativi 🚴‍♀️",
        text: "Scegli la modalità di gioco",
        endMessage: "Wow, hai scelto la modalità impossibile!!"
    },
    {
        tag: SimpleCard,
        title: "Come funziona il gioco",
        text: <Text>Le regole sono molto semplici 📝! Gli indovinelli ti saranno posti uno dopo l'altro, e una volta risolto uno passerai a quello successivo.
                Per tenere traccia dello stato della tua disperata ricerca, potrai sempre visualizzare la barra in alto che
                segnala la percentuale di completamento del gioco. Fin qui tutto semplice no?<NewLine/>
                Siccome Babbo Natale è buono, ha concesso che in momenti di difficoltà tu possa chiedere un aiuto.
                La richiesta di aiuto può essere di ogni tipo, dal non capire un indovinello, dal non riuscire ad arrivare alla soluzione,
                a (soprattutto, ma non succederà) bug nell'applicazione che ti impediscano di proseguire nel gioco 🐞🐞. Sarebbe un vero peccato! 
                Ecco quindi che, una volta chiesto aiuto (e a chi se non al tuo meraviglioso fidanzato? 😎), riceverai in risposta un codice che ti
                permetterà di sbloccare indizi o addirittura passare all'indovinello successivo 🔓. Dove inserire questo codice? Molto semplice! 
                Clicca sull'icona in alto a destra ⤴️ e inserisci il codice! (Ricorda che maiuscole e minuscole contano).<NewLine/>
                Per passare alla prossima schermata, inserisci il codice 'riccardo'
                </Text>,
        image: require('../assets/snoopy-detective.jpg'),
        endHint: "riccardo"
    },
    {
        tag: RequestPermissions,
        text: <Text>Come dicono a Città del Capo: "we are all set"! Rimane soltanto un passaggio:
                accettare i permessi di accedere alla tua posizione GPS 📡🗺 e cominciare a giocare!<NewLine/>
                In bocca al lupo e May the Force be with you! 🏋️‍♀️
                </Text>,
        title:"Permessi dell'applicazione",
        buttonText:'Concedi i permessi'
    },
    {
        tag: GpsComponent,
        title: "Comincia l'avventura 🏇",
        text: <Text>Sembra che Babbo Natale sia già stato avvistato in zona 😳! Poco fa la sua slitta era parcheggiata a Pontecchio Marconi. 
                    Dirigiti là e comincia a investigare 🕵️‍♀️🕵️‍♀️
                </Text>,
        image: require('../assets/marconi.jpg'),
        location: GPS_MARCONI,
        gpsHint: "marconi",
        endHint: "cominciamobene"
    },
    {
        tag: InputComponent,
        title: "Un indovinello da Premio Nobel 🤓",
        image: require('../assets/forziere.jpg'),
        text: <Text>
                Niente da fare, Santa Claus è già ripartito 🤦‍♀️!
                Ma a quanto pare ha lasciato un piccolo forziere con un lucchetto a <Bold>4 cifre</Bold> per te 🔒. 
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
        title: "Entrata nel labirinto 🕳",
        image: require('../assets/labirinto.jpg'),
        text: <Text>Apri il forziere 🕋 e dentro trovi... un nuovo indovinello! Esso recita:<NewLine/>
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
        text: <Text>Nel momento in cui raggiungi il posto designato una renna scende dal cielo 🦌 e deposita
                    un pacco davanti a te 📦. Chi se lo sarebbe aspettato che questo pacco regalo però fosse protetto
                    da un indistruttibile lucchetto a BEN due cifre?
                    (bisognerebbe spiegare a Babbo Natale gli algoritmi di forza bruta... 🔩)<NewLine/>
                    La renna a questo punto comincia a parlare (niente di strano fin qui) e dopo aver lasciato il suo
                    enigmatico messaggio sfreccia via tra le nuvole lasciando una scia di stelle dorate 💫.
            </Text>,
        children: [
            <ListenButton key={0}
                buttonText="ASCOLTA LA RENNA"
                speech={"Cara Giulia, so che Babbo Natale é stato un po' antipatico con te quest'anno. " +
                        "Io però sono una renna buona e voglio aiutarti. Non posso darti la combinazione, altrimenti Babbo Natale mi frusterà, " +
                        "ma posso dirti che si aprirà con il numero civico più alto di questo meraviglioso Altopiano. In bocca al lupo!"}>
            </ListenButton>
        ],
        buttonText: "Inserisci la combinazione",
        answer: "92",
        endHint: "novantadue"
    },
    {
        tag: GpsComponent,
        title: "Uno strano oggetto e uno strano messaggio 📜🤔",
        image: require("../assets/meridiana.jpg"),
        location: GPS_SCEICCO_BIANCO,
        text: <Text>Apri il pacco, e dentro trovi l'immagine di uno strano oggetto acuminato che proietta la sua ombra per terra. 
                Assieme ad essa, un messaggio che dice di trovare l'insegna del trafficante di petrolio.
            </Text>,
        gpsHint: "meridiana-casalecchio",
        endHint: "sceicco-bianco"
    },
    {
        tag: GpsComponent,
        title: "Caccia al tesoro",
        image: require("../assets/mappa-tesoro.jpg"),
        text: <Text>Finalmente arrivi in questa terra piena di gioia e spirito natalizio 🎄. Ah, se solo tu potessi godere della
                    stessa gioia del Natale senza tutta questa fatica! Invece ti è toccato questo simpatico fidanz... Babbo Natale! 🤦<NewLine/>
                    Il vecchio barbuto aveva piazzato il prossimo indizio sotto a un caipiroska! 🍹
                    Esso recita:<NewLine/>
                    <Italic>Ho inserito il prossimo indizio qui vicino, nei pressi del regno dei gloriosi rettili.
                            Prendi la pala e preparati a scavare! Muahah!</Italic><NewLine/>
                    (Indizio: la pala è figurata)
            </Text>,
        location: GPS_PARCHETTO,
        gpsHint: "tartarughe",
        endHint: "parco-giochi"
    },
    {
        tag: GpsComponent,
        image: require("../assets/inferno-dante.jpg"),
        title: "I tre Spiriti del Natale",
        text: <Text>
                Senza dubbio il vecchiaccio si è impegnato, ma la tua tenacia sembra essere all'altezza 💪!
                Dall'enigmaticità dell'indizio trovato pare però che le cose cominceranno a farsi più difficili.<NewLine/>
                <Italic>
                    Mia cara Giulia, se sei arrivata fin qui vuol dire che la forza d'animo e lo spirito natalizio non ti mancano.
                    Perché tu sia veramente degna di ricevere i tuoi regali, devi prima dimostrare di aver raggiunto una maturità
                    tale per cui tu possa abbracciare il Natale con pienezza per poterlo poi condividere con le persone che ti
                    circondano.<NewLine/>
                    Ecco quindi che per raggiungere questa maturità riceverai la visita di tre Spiriti, lo Spirito del Natale Passato,
                    lo Spirito del Natale Presente e lo Spirito del Natale Futuro. Ho detto "riceverai" ma è chiaro che gli Spiriti
                    non si spostano solo per venire a casa tua come quelli della Bofrost, nossignori! Sarai tu a doverli cercare,
                    a doverli invocare, e ad ascoltare il loro importante messaggio.<NewLine/>
                    Per primo incontrerai lo Spirito del Natale Passato; per incontrarlo è necessario recarsi nei luoghi dove regna 
                    il passato e l'antichità. Ora parti e <Bold>vai dove inizia l'arduo percorso che porta alla casa del 
                    Padre della nostra volgar lingua</Bold>.
                </Italic>
            </Text>,
        location: GPS_PIAZZA_MAGGIORE,
        gpsHint: "via-degli-dei",
        endHint: "piazza-maggiore"
    },
    {
        tag: SimpleCard,
        image: require("../assets/ego.png"),
        title: "Lo Spirito del Natale Passato 👨‍❤️‍👨",
        text: <Text>
            Ecco che come promesso compare in mezzo alla folla lo Spirito Natale Passato (notare il colore bluastro tipico
            delle apparizioni paranormali)! 😮. Ovviamente solo tu puoi vedere lo Spirito 🙈,
            mentre le altre persone nella piazza continuano le loro faccende in maniera spensierata.<NewLine/>
            Sembra che in realtà lo Spirito non sia uno solo ma ce ne siano ben due! Proviamo ad ascoltare le loro parole:
        </Text>,
        children: [
            <ListenButton key={0}
                buttonText="ASCOLTA LO SPIRITO"
                speech={"Ciao Giulia, come stai? Io e Valentino stiamo componendo un nuovo singolo a tema " + 
                        "natalizio che farà faville in tutto il mondo! Con il mio grande talento alla chitarra " + 
                        "e soprattutto con le grandi capacità ritmiche di Valentino a Natale 2019 tutti " + 
                        "ascolteranno i nostri brani. Valentino smettila di tamburellare le pentole, che sto parlando! " + 
                        "Comunque, volevo dirti che siamo venuti qui per parlarti dei Natali passati, in particolare del Natale 2016. " + 
                        "In quel periodo eri triste e sola, nonostante tu spenda sempre tutte le forze per irradiare il mondo con il tuo sorriso. " + 
                        "Quel Natale, come tante altre volte, decidesti di andare a trovare Riccardo nella speranza che ti fumasse. Speravi di " + 
                        "fare breccia nel suo cuore con la tua dolcezza e la tua simpatia. Le cose non andarono proprio come speravi, e tornasti " + 
                        "a casa a mani vuote. Ma come ben sappiamo il destino ha voluto premiarti poco tempo dopo. " + 
                        "Spero che da questo breve ricordo tu possa capire che per quanto la vita possa sembrare infelice, se le cose si vogliono " + 
                        "ardentemente alla fine si avverano. Bisogna mantenere il fuoco della speranza vivo nei momenti più bui. " +
                        "Adesso dobbiamo andare, perché il talento musicale non si coltiva da solo. Vienici a trovare una di queste volte. A presto!" }>
            </ListenButton>
        ],
        buttonText: "CONTINUA 🎤"
    },
    {
        tag: InputComponent,
        title: "De gustibus...",
        image: require('../assets/canabis.png'),
        text: <Text>
                Nel momento in cui gli spiriti scompaiono, si materializza al loro posto una piccola cartolina ✉️
                con una (sicuramente antica) mappa. Sul retro della cartolina: <NewLine/> 
                <Italic>Rivolgi il tuo sguardo verso l'alto e cerca la parola mancante:<NewLine/>
                    <Bold>Panis vita, _____ protectio, vinum laetitia</Bold>
                </Italic>
            </Text>,
        answer: "canabis",
        endHint: "rizzoli",
        buttonText: "INSERISCI"
    },
    {
        tag: InputComponent,
        title: "... non disputandum est!",
        image: require('../assets/gelati.jpg'),
        text: <Text>
                Indizio trovato, ma ora? Sembra di brancolare nel buio quando un tabaccaio, vedendoti girare a vanvera avanti e indietro,
                si avvicina e ti lascia un messaggio scritto su carta, dicendo che era stato lasciato poco fa da un insolito tizio 🕴:<NewLine/>
                <Italic>Va dove la ricotta stregata è mangiata 🍦, girati, e trova il numero del canto del nostro Poeta</Italic>
            </Text>,
        answer: "XXXI",
        endHint: "garisenda",
        buttonText: "INSERISCI"
    },
    {
        tag: SimpleCard,
        title: "Lo Spirito del Natale Presente 👨🏼‍✈️",
        image: require('../assets/boris.jpg'),
        text: <Text>
            Una volta inserito il codice ecco comparire davanti a te lo Spirito Natale Presente 😮.
            Più che comparire, arriva sfrecciando in mezzo alla folla con il suo possente mezzo 🚍.
        </Text>,
        children: [
            <ListenButton key={0}
                buttonText="ASCOLTA LO SPIRITO"
                speech={"Ciao Giulia, io essere sobrio autista di Romania. Forse mi chiamo Igor ma gente preferisce chiamarmi Furia." + 
                        "Sono partito da Bucarest 2 ore fa con mio pulmino e sono arrivato ora. Tra mezz'ora devo essere di nuovo " + 
                        "a Castello di Bran per ritirare turisti quindi sarò breve. Presente in questo momento è molto bello, perchè " + 
                        "tu avere tuo fidanzato bello e bravo con te. Nonostante futuro possa sembrare incerto, tu preoccupati di " + 
                        "presente e di vivere con pienezza ogni attimo di tua vita. E vedrai che futuro farà meno paura. " +
                        "Anche io vivo in presente e ad ogni curva io essere pronto ad abbandonare vita con serenità. " +
                        "Tuo ragazzo mi sembra persona molto corretta e molto buona. Mi ricordo quando da ritorno di giro di Romania " + 
                        "ha tenuto tua testa con la sua mano mentre dormivi per due ore di fila. Lui si preoccupa di te anche se ogni tanto " + 
                        "sembra burbero e ignorante, un po' come noi rumeni. Divertiti con lui e rendi focoso vostro letto come una " + 
                        "vera babushka. Adesso devo proprio andare, perché forze armate italiane stanno per trovarmi. " + 
                        "Completa tuo cammino spirituale trovando Spirito di Natale Futuro. Credo che questa mappa possa aiutarti. " + 
                        "Ho provato a risolvere indovinello mentre guidavo contromano per passare tempo, ma non sono riuscito a trovare " + 
                        "soluzione. Spero tu essere più intelligente di me. Addio!"}>
            </ListenButton>
        ],
        buttonText: "CONTINUA",
    },
    {
        tag: GpsComponent,
        image: require("../assets/mappa-bologna.jpg"),
        title: "Porte di Bologna",
        text: <Text>
            Una volta terminato il sermone, il simpatico autista riparte con il suo pulmino fatato e sparisce dietro la curva 🚌.
            La mappa che ti ha lasciato 📜 sembra ad occhio intrigante e complicata (oltre ad essere interattiva). 
            L'intestazione di questa mappa recita come segue:<NewLine/>
            <Italic>
                Per trovare lo Spirito del Natale Futuro dovrai portare il tuo corpo intriso di spirito natalizio in una
                nuova posizione segreta. Le Porte ti sapranno indicare la via.
            </Italic> 
        </Text>,
        location: GPS_SAN_FRANCESCO,
        children: [
            <MapComponent key={0} />
        ],
        gpsHint: "porte-bologna",
        endHint: "piazza-malpighi"
    },
    {
        tag: SimpleCard,
        title: "Lo Spirito del Natale Futuro 🏔",
        image: require('../assets/antico-albergo-sant-antonio.jpg'),
        text: <Text>
            Incredibile! Sei riuscita a risolvere questo difficilissimo indovinello e a trovare la posizione segreta 📍!<NewLine/>
            Ecco infatti che appare il gaio Spirito del Natale Futuro davanti ai te. Con grande reverenza e umiltà si presta a parlarti:
        </Text>,
        children: [
            <ListenButton key={0}
                buttonText="ASCOLTA LO SPIRITO"
                speech={"Cara Giulia, spero di trovarti bene e in salute. Mi chiamo Cristiano Vettori e sono il caro ragazzo che gestisce " + 
                        "l'Antico Albergo Sant'Antonio di Fonzaso. Qui a Fonzaso la vita prosegue tranquilla tra un piatto squisito " +
                        "e l'altro. La mia mamma sta bene e continua a sfornare patate al forno come non mai, mentre io mi diverto da matti " + 
                        "con il fantacalcio. Ancora sento la ferita al cuore di quando tu hai rinunciato ad avere il dolce, nonostante il tuo " + 
                        "fidanzato lo desiderasse con insistenza. Ma mettiamo da parte i risentimenti: vengo qui per parlarti dei Natali futuri. " +
                        "Vedo nei tuoi prossimi Natali una casa calda e felice. Vedo tante patate al forno, tanti tortellini ma nessuna frittata. " + 
                        "Vedo tante tartarughine gioiose ma nessun gatto nudo. Vedo, abbracciato a te, il tuo bellissimo Riccardo. " +
                        "Vedo, insomma, la felicità. Ricorda che il tuo Riccardo ti ama tanto e che egli si immagina grandi cose con te. " + 
                        "Lui sa che la vostra vita insieme sarà splendida." +
                        "Adesso ti devo salutare, perché per la prima volta da quando ve ne siete andati sono arrivati dei nuovi clienti. " +  
                        "La tua ricerca è ormai volta al termine, torna a casa e goditi questo giorno beato. Addio, e che la vita possa sempre sorriderti."}>
            </ListenButton>
        ],
        buttonText: "CONTINUA",
    },
    {
        tag: GpsComponent,
        image: require('../assets/albero-di-natale.jpg'),
        title: "Torna a casa Lessie 🐶",
        location: GPS_CASA_GIULIA,
        text: <Text>
            Come ordinato dallo Spirito del Natale Futuro, è ora di tornare a casa! 🏡
        </Text>,
        gpsHint: 'casa-san-michele',
        endHint: 'the-end'
    },
    {
        tag: SimpleCard,
        image: require('../assets/christmas-poem.jpg'),
        title: "The End",
        text: <Text>
                Sembra che Babbo Natale avesse lasciato fin dall'inizio i suoi doni al tuo caro e bel fidanzato 🙈🙉🙊
                Perché non gli dai un bacio e li chiedi a lui? 😘 <NewLine/>
                Per quanto riguarda questo gioco, complimenti per aver superato tutte le prove! 🌟🥇🌟
                Che il Natale possa portare tanta felicità e serenità a te e ai tuoi cari. Buone Feste e... arrivederci! 🧛🦇
            </Text>
    }
]

export default levels