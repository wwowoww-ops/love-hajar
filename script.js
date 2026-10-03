const startBtn =
    document.getElementById(
        "startBtn"
    );

const intro =
    document.getElementById(
        "intro"
    );

const game =
    document.getElementById(
        "game"
    );

const board =
    document.getElementById(
        "board"
    );

const pieceName =
    document.getElementById(
        "pieceName"
    );

const message =
    document.getElementById(
        "message"
    );


/* =========================================================
   AUDIO
========================================================= */

let audioContext = null;

let musicGain = null;

let musicTimer = null;

let soundEnabled = true;


function initAudio() {

    if (audioContext) return;

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContext) return;

    audioContext =
        new AudioContext();

    musicGain =
        audioContext.createGain();

    musicGain.gain.value =
        0.055;

    musicGain.connect(
        audioContext.destination
    );

}


/* =========================================================
   POP SOUND
========================================================= */

function cutePop() {

    if (
        !soundEnabled ||
        !audioContext
    ) return;

    const now =
        audioContext.currentTime;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type =
        "sine";

    oscillator.frequency.setValueAtTime(
        560,
        now
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        820,
        now + 0.09
    );

    gain.gain.setValueAtTime(
        0.0001,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        0.22,
        now + 0.015
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.20
    );

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start(now);

    oscillator.stop(
        now + 0.21
    );

}


/* =========================================================
   CHIME
========================================================= */

function cuteChime() {

    if (
        !soundEnabled ||
        !audioContext
    ) return;

    const now =
        audioContext.currentTime;

    const notes = [
        659,
        784,
        988
    ];

    notes.forEach(
        function (
            frequency,
            index
        ) {

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();

            oscillator.type =
                "sine";

            oscillator.frequency.value =
                frequency;

            const start =
                now +
                index * 0.08;

            gain.gain.setValueAtTime(
                0.0001,
                start
            );

            gain.gain.exponentialRampToValueAtTime(
                0.10,
                start + 0.025
            );

            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                start + 0.42
            );

            oscillator.connect(gain);

            gain.connect(
                audioContext.destination
            );

            oscillator.start(start);

            oscillator.stop(
                start + 0.43
            );

        }
    );

}


/* =========================================================
   BACKGROUND MUSIC
========================================================= */

const melody = [

    523.25,
    659.25,
    783.99,
    659.25,

    587.33,
    698.46,
    880,
    698.46

];

let melodyIndex = 0;


function playBackgroundNote() {

    if (
        !soundEnabled ||
        !audioContext ||
        !musicGain
    ) return;

    const now =
        audioContext.currentTime;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type =
        "sine";

    oscillator.frequency.value =
        melody[melodyIndex];

    gain.gain.setValueAtTime(
        0.0001,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        0.028,
        now + 0.12
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 1.25
    );

    oscillator.connect(gain);

    gain.connect(
        musicGain
    );

    oscillator.start(now);

    oscillator.stop(
        now + 1.3
    );

    melodyIndex++;

    if (
        melodyIndex >=
        melody.length
    ) {

        melodyIndex = 0;

    }

}


function startMusic() {

    if (!audioContext) return;

    if (musicTimer) return;

    playBackgroundNote();

    musicTimer =
        setInterval(
            playBackgroundNote,
            900
        );

}


/* =========================================================
   SOUND BUTTON
========================================================= */

function createSoundButton() {

    if (
        document.getElementById(
            "soundButton"
        )
    ) return;

    const button =
        document.createElement(
            "button"
        );

    button.className =
        "sound-button";

    button.id =
        "soundButton";

    button.textContent =
        "♪";

    document.body.appendChild(
        button
    );


    button.onclick =
        function () {

            soundEnabled =
                !soundEnabled;


            if (soundEnabled) {

                button.textContent =
                    "♪";

                if (musicGain) {

                    musicGain.gain.value =
                        0.055;

                }

                startMusic();

                cutePop();

            } else {

                button.textContent =
                    "×";

                if (musicGain) {

                    musicGain.gain.value =
                        0;

                }

            }

        };

}


/* =========================================================
   PIECES
========================================================= */

const pieces = {

    pawn: {

        name: "البيدق",

        messages: [

            "بدأت بخطوة صغيرة لكنك أصبحت شيئا كبيرا بالنسبة لي.",

            "كل شيء جميل يبدأ بخطوة بسيطة.",

            "ربما هي أصغر قطعة لكنها تذكرني ببداية قصتنا."

        ]

    },


    knight: {

        name: "الحصان",

        messages: [

            "تحركت بطريقة مختلفة ودخلت حياتي بطريقة مختلفة.",

            "طريقك مختلف عن الجميع وهذا ما جعلني أتعلق بك.",

            "الحصان يقفز فوق كل شيء، وأنت تخطيت كل المسافات ووصلت إلي."

        ]

    },


    bishop: {

        name: "الفيل",

        messages: [

            "مهما اختلف الطريق تبقين قريبة مني.",

            "طريقه مختلف، لكن نهايته دائما تصل إلى مكان ما.",

            "حتى عندما لا يكون الطريق مستقيما، وجودك يجعل الوصول جميلا."

        ]

    },


    rook: {

        name: "الرخ",

        messages: [

            "وجودك في حياتي شيء ثابت لا يتغير.",

            "الرخ يبقى ثابتا وقويا، وهذا ما أتمناه لوجودك معي.",

            "أحب الأشياء التي تبقى، وأنت واحدة منها."

        ]

    },


    queen: {

        name: "الملكة",

        messages: [

            "من بين كل القطع أنت القطعة التي تعني لي أكثر.",

            "الملكة تستطيع الوصول إلى كل مكان، وأنت وصلت إلى قلبي.",

            "لو كانت لهذه الرقعة قطعة تشبهك، فستكون الملكة."

        ]

    },


    king: {

        name: "الملك",

        messages: [

            "قد تكون حركته قليلة لكنه أهم قطعة، مثلك عندي تماما.",

            "ليس المهم عدد الخطوات، بل المكانة التي تملكها.",

            "هناك قطع كثيرة في الرقعة، لكن عيني دائما تبحث عنك."

        ]

    }

};


/* =========================================================
   BOARD LAYOUT
========================================================= */

const layout = [

    "rook",
    "knight",
    "bishop",
    "queen",
    "king",
    "bishop",
    "knight",
    "rook",

    "pawn",
    "pawn",
    "pawn",
    "pawn",
    "pawn",
    "pawn",
    "pawn",
    "pawn",

    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",

    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",

    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",

    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",

    "pawn",
    "pawn",
    "pawn",
    "pawn",
    "pawn",
    "pawn",
    "pawn",
    "pawn",

    "rook",
    "knight",
    "bishop",
    "queen",
    "king",
    "bishop",
    "knight",
    "rook"

];


const messageIndex = {};


/* =========================================================
   SVG ELEMENT
========================================================= */

function svgElement(
    svgNS,
    name,
    attributes
) {

    const element =
        document.createElementNS(
            svgNS,
            name
        );


    for (
        const key in attributes
    ) {

        element.setAttribute(
            key,
            attributes[key]
        );

    }


    return element;

}


/* =========================================================
   CREATE CHESS SVG
========================================================= */

function createChessSVG(
    type,
    white
) {

    const svgNS =
        "http://www.w3.org/2000/svg";


    const svg =
        document.createElementNS(
            svgNS,
            "svg"
        );


    svg.setAttribute(
        "viewBox",
        "0 0 100 100"
    );

    svg.setAttribute(
        "class",
        "svg-chess-piece"
    );


    const fill =
        white
            ? "#ffffff"
            : "#18121d";


    const stroke =
        white
            ? "#71577e"
            : "#050308";


    function path(d) {

        return svgElement(
            svgNS,
            "path",
            {

                d: d,

                fill: fill,

                stroke: stroke,

                "stroke-width": "1.8",

                "stroke-linejoin":
                    "round"

            }
        );

    }


    function ellipse(
        cx,
        cy,
        rx,
        ry
    ) {

        return svgElement(
            svgNS,
            "ellipse",
            {

                cx: cx,
                cy: cy,

                rx: rx,
                ry: ry,

                fill: fill,

                stroke: stroke,

                "stroke-width": "1.8"

            }
        );

    }


    function circle(
        cx,
        cy,
        r
    ) {

        return svgElement(
            svgNS,
            "circle",
            {

                cx: cx,
                cy: cy,

                r: r,

                fill: fill,

                stroke: stroke,

                "stroke-width": "1.8"

            }
        );

    }


    function base() {

        svg.appendChild(
            ellipse(
                50,
                87,
                32,
                6
            )
        );


        svg.appendChild(
            path(
                "M22 86 " +
                "Q24 78 32 76 " +
                "L68 76 " +
                "Q76 78 78 86 " +
                "Z"
            )
        );

    }


    /* =====================================
       PAWN
    ===================================== */

    if (type === "pawn") {

        svg.appendChild(
            circle(
                50,
                24,
                12
            )
        );


        svg.appendChild(
            path(
                "M42 34 " +
                "Q46 39 43 48 " +
                "L37 68 " +
                "Q35 73 30 77 " +
                "L70 77 " +
                "Q65 73 63 68 " +
                "L57 48 " +
                "Q54 39 58 34 " +
                "Z"
            )
        );


        base();

    }


    /* =====================================
       ROOK
    ===================================== */

    else if (type === "rook") {

        svg.appendChild(
            path(
                "M29 20 " +
                "L29 31 " +
                "L35 31 " +
                "L35 20 " +
                "L43 20 " +
                "L43 31 " +
                "L50 31 " +
                "L50 20 " +
                "L57 20 " +
                "L57 31 " +
                "L65 31 " +
                "L65 20 " +
                "L71 20 " +
                "L70 38 " +
                "L65 41 " +
                "L64 67 " +
                "Q65 72 72 77 " +
                "L28 77 " +
                "Q35 72 36 67 " +
                "L35 41 " +
                "L30 38 " +
                "Z"
            )
        );


        base();

    }


    /* =====================================
       BISHOP
    ===================================== */

    else if (type === "bishop") {

        svg.appendChild(
            path(
                "M50 12 " +
                "Q63 20 61 32 " +
                "Q60 40 55 46 " +
                "L62 67 " +
                "Q64 73 72 77 " +
                "L28 77 " +
                "Q36 73 38 67 " +
                "L45 46 " +
                "Q40 40 39 32 " +
                "Q37 20 50 12 Z"
            )
        );


        svg.appendChild(
            path(
                "M44 34 L56 20"
            )
        );


        base();

    }


    /* =====================================
       KNIGHT
    ===================================== */

    else if (type === "knight") {

        svg.appendChild(
            path(
                "M31 77 " +
                "Q39 69 40 57 " +
                "Q40 48 34 39 " +
                "Q29 30 35 18 " +
                "Q45 22 52 20 " +
                "Q63 17 69 25 " +
                "Q75 34 68 42 " +
                "Q63 48 56 51 " +
                "Q60 60 67 67 " +
                "Q71 72 77 77 " +
                "Z"
            )
        );


        svg.appendChild(
            path(
                "M38 26 " +
                "Q49 32 61 28"
            )
        );


        svg.appendChild(
            circle(
                58,
                29,
                2
            )
        );


        base();

    }


    /* =====================================
       QUEEN
    ===================================== */

    else if (type === "queen") {

        svg.appendChild(
            path(
                "M27 29 " +
                "L35 44 " +
                "L43 22 " +
                "L50 43 " +
                "L57 22 " +
                "L65 44 " +
                "L73 29 " +
                "L68 54 " +
                "L32 54 " +
                "Z"
            )
        );


        svg.appendChild(
            circle(
                27,
                29,
                4
            )
        );


        svg.appendChild(
            circle(
                43,
                22,
                4
            )
        );


        svg.appendChild(
            circle(
                57,
                22,
                4
            )
        );


        svg.appendChild(
            circle(
                73,
                29,
                4
            )
        );


        svg.appendChild(
            path(
                "M35 54 " +
                "L65 54 " +
                "L63 68 " +
                "Q64 73 72 77 " +
                "L28 77 " +
                "Q36 73 37 68 " +
                "Z"
            )
        );


        base();

    }


    /* =====================================
       KING
    ===================================== */

    else if (type === "king") {

        svg.appendChild(
            path(
                "M45 9 " +
                "L55 9 " +
                "L55 19 " +
                "L64 19 " +
                "L64 28 " +
                "L55 28 " +
                "L55 37 " +
                "L45 37 " +
                "L45 28 " +
                "L36 28 " +
                "L36 19 " +
                "L45 19 " +
                "Z"
            )
        );


        svg.appendChild(
            path(
                "M38 39 " +
                "L62 39 " +
                "L64 55 " +
                "L67 68 " +
                "Q68 73 74 77 " +
                "L26 77 " +
                "Q32 73 33 68 " +
                "L36 55 " +
                "Z"
            )
        );


        base();

    }


    return svg;

}


/* =========================================================
   START BUTTON
========================================================= */

startBtn.onclick =
    function () {

        initAudio();


        if (
            audioContext &&
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume();

        }


        cutePop();


        setTimeout(
            function () {

                startMusic();

            },
            250
        );


        intro.classList.add(
            "hidden"
        );


        game.classList.remove(
            "hidden"
        );


        createSoundButton();


        const soundButton =
            document.getElementById(
                "soundButton"
            );


        if (soundButton) {

            soundButton.classList.add(
                "show"
            );

        }


        createBoard();

    };


/* =========================================================
   CREATE BOARD
========================================================= */

function createBoard() {

    board.replaceChildren();


    for (
        let i = 0;
        i < 64;
        i++
    ) {

        const square =
            document.createElement(
                "div"
            );


        square.className =
            "square";


        const row =
            Math.floor(
                i / 8
            );


        const col =
            i % 8;


        if (
            (row + col) % 2 ===
            0
        ) {

            square.classList.add(
                "light"
            );

        } else {

            square.classList.add(
                "dark"
            );

        }


        const type =
            layout[i];


        if (!type) {

            board.appendChild(
                square
            );

            continue;

        }


        square.classList.add(
            "has-piece"
        );


        const isWhite =
            i >= 48;


        const svg =
            createChessSVG(
                type,
                isWhite
            );


        svg.classList.add(
            isWhite
                ? "white-piece"
                : "black-piece"
        );


        square.appendChild(
            svg
        );


        square.addEventListener(
            "click",
            function () {

                showPiece(
                    type,
                    square
                );

            }
        );


        board.appendChild(
            square
        );

    }

}


/* =========================================================
   PIECE MESSAGE
========================================================= */

function showPiece(
    type,
    square
) {

    const data =
        pieces[type];


    if (!data) return;


    document
        .querySelectorAll(
            ".square.selected"
        )
        .forEach(
            function (item) {

                item.classList.remove(
                    "selected"
                );

            }
        );


    square.classList.add(
        "selected"
    );


    if (
        messageIndex[type] ===
        undefined
    ) {

        messageIndex[type] = 0;

    } else {

        messageIndex[type]++;

    }


    if (
        messageIndex[type] >=
        data.messages.length
    ) {

        messageIndex[type] = 0;

    }


    pieceName.textContent =
        data.name;


    message.textContent =
        data.messages[
            messageIndex[type]
        ];


    cutePop();


    setTimeout(
        function () {

            cuteChime();

        },
        80
    );

}


/* =========================================================
   SECRET FAKE INTRO
========================================================= */

window.addEventListener(
    "load",
    function () {

        const fakeIntro =
            document.getElementById(
                "fakeIntro"
            );


        const prankScreen =
            document.getElementById(
                "prankScreen"
            );


        const prankText =
            document.getElementById(
                "prankText"
            );


        /*
         * ننتظر قليلا حتى تبدو الصفحة
         * كأنها فعلا فيها مشكلة
         */

        setTimeout(
            function () {

                fakeIntro.classList.add(
                    "hide"
                );


                prankScreen.style.display =
                    "flex";


                /*
                 * بعد ظهور الأسود بقليل
                 * تظهر العبارة
                 */

                setTimeout(
                    function () {

                        prankText.textContent =
                            "لحظة... صدقتِ هذا؟";


                        prankText.classList.add(
                            "show"
                        );

                    },
                    450
                );


                /*
                 * تختفي العبارة
                 */

                setTimeout(
                    function () {

                        prankText.classList.remove(
                            "show"
                        );

                    },
                    2100
                );


                /*
                 * ظهور الموقع الحقيقي
                 */

                setTimeout(
                    function () {

                        prankScreen.style.transition =
                            "opacity 0.8s ease";


                        prankScreen.style.opacity =
                            "0";


                        document.body.classList.add(
                            "reveal"
                        );


                        setTimeout(
                            function () {

                                prankScreen.style.display =
                                    "none";

                            },
                            850
                        );

                    },
                    2600
                );

            },
            2600
        );

    }
);