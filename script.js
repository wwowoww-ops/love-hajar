const startBtn = document.getElementById("startBtn");

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const board = document.getElementById("board");

const pieceName = document.getElementById("pieceName");
const message = document.getElementById("message");


/* =========================
   الأصوات
========================= */

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

    audioContext = new AudioContext();

    musicGain = audioContext.createGain();
    musicGain.gain.value = 0.035;

    musicGain.connect(audioContext.destination);
}


function cutePop() {

    if (!soundEnabled || !audioContext) return;

    const now = audioContext.currentTime;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(520, now);

    oscillator.frequency.exponentialRampToValueAtTime(
        760,
        now + 0.08
    );

    gain.gain.setValueAtTime(0.0001, now);

    gain.gain.exponentialRampToValueAtTime(
        0.13,
        now + 0.015
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.16
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.17);
}


function cuteChime() {

    if (!soundEnabled || !audioContext) return;

    const now = audioContext.currentTime;

    [659, 784].forEach(function (frequency, index) {

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        const start = now + index * 0.07;

        gain.gain.setValueAtTime(0.0001, start);

        gain.gain.exponentialRampToValueAtTime(
            0.055,
            start + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            start + 0.35
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(start);
        oscillator.stop(start + 0.36);
    });
}


/* =========================
   موسيقى الخلفية
========================= */

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

    const now = audioContext.currentTime;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value =
        melody[melodyIndex];

    gain.gain.setValueAtTime(
        0.0001,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        0.018,
        now + 0.12
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 1.2
    );

    oscillator.connect(gain);
    gain.connect(musicGain);

    oscillator.start(now);
    oscillator.stop(now + 1.25);

    melodyIndex++;

    if (melodyIndex >= melody.length) {
        melodyIndex = 0;
    }
}


function startMusic() {

    if (!audioContext) return;

    if (musicTimer) return;

    playBackgroundNote();

    musicTimer = setInterval(
        playBackgroundNote,
        900
    );
}


/* =========================
   زر الصوت
========================= */

function createSoundButton() {

    if (document.getElementById("soundButton")) {
        return;
    }

    const button = document.createElement("button");

    button.className = "sound-button";
    button.id = "soundButton";
    button.textContent = "♪";

    document.body.appendChild(button);

    button.onclick = function () {

        soundEnabled = !soundEnabled;

        if (soundEnabled) {

            button.textContent = "♪";

            if (musicGain) {
                musicGain.gain.value = 0.035;
            }

            startMusic();
            cutePop();

        } else {

            button.textContent = "×";

            if (musicGain) {
                musicGain.gain.value = 0;
            }
        }
    };
}


/* =========================
   بيانات القطع
========================= */

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


/* =========================
   ترتيب الرقعة
========================= */

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


/* =========================
   آخر مقولة
========================= */

const messageIndex = {};


/* =========================================================
   SVG CHESS PIECES
========================================================= */

function createChessSVG(type, white) {

    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(
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

    svg.setAttribute(
        "aria-hidden",
        "true"
    );

    svg.style.width = "82%";
    svg.style.height = "82%";
    svg.style.display = "block";
    svg.style.overflow = "visible";
    svg.style.pointerEvents = "none";

    const mainColor = white
        ? "#ffffff"
        : "#17101f";

    const strokeColor = white
        ? "#6f587e"
        : "#000000";

    function element(name, attributes) {

        const el =
            document.createElementNS(
                svgNS,
                name
            );

        Object.keys(attributes).forEach(function (key) {

            el.setAttribute(
                key,
                attributes[key]
            );

        });

        return el;
    }


    function addBase() {

        const base = element(
            "path",
            {
                d:
                    "M18 88 Q18 83 25 81 " +
                    "L75 81 Q82 83 82 88 " +
                    "Q82 92 76 93 " +
                    "L24 93 Q18 92 18 88 Z",

                fill: mainColor,
                stroke: strokeColor,
                "stroke-width": "2"
            }
        );

        svg.appendChild(base);
    }


    /* =========================
       البيدق
    ========================= */

    if (type === "pawn") {

        const body = element(
            "path",
            {
                d:
                    "M39 35 " +
                    "Q32 28 36 21 " +
                    "Q40 14 50 14 " +
                    "Q60 14 64 21 " +
                    "Q68 28 61 35 " +
                    "L67 59 " +
                    "Q69 66 76 75 " +
                    "L24 75 " +
                    "Q31 66 33 59 Z",

                fill: mainColor,
                stroke: strokeColor,
                "stroke-width": "2"
            }
        );

        svg.appendChild(body);

        addBase();
    }


    /* =========================
       الرخ
    ========================= */

    else if (type === "rook") {

        const top = element(
            "path",
            {
                d:
                    "M25 20 L25 30 " +
                    "L31 30 L31 20 " +
                    "L39 20 L39 30 " +
                    "L47 30 L47 20 " +
                    "L55 20 L55 30 " +
                    "L63 30 L63 20 " +
                    "L75 20 " +
                    "L72 38 L68 38 " +
                    "L68 67 " +
                    "L76 81 L24 81 " +
                    "L32 67 L32 38 L28 38 Z",

                fill: mainColor,
                stroke: strokeColor,
                "stroke-width": "2",
                "stroke-linejoin": "round"
            }
        );

        svg.appendChild(top);

        addBase();
    }


    /* =========================
       الفيل
    ========================= */

    else if (type === "bishop") {

        const body = element(
            "path",
            {
                d:
                    "M50 13 " +
                    "Q61 20 61 30 " +
                    "Q61 39 55 45 " +
                    "L65 69 " +
                    "Q67 74 74 81 " +
                    "L26 81 " +
                    "Q33 74 35 69 " +
                    "L45 45 " +
                    "Q39 39 39 30 " +
                    "Q39 20 50 13 Z",

                fill: mainColor,
                stroke: strokeColor,
                "stroke-width": "2"
            }
        );

        svg.appendChild(body);

        const slash = element(
            "path",
            {
                d: "M44 33 L57 20",
                fill: "none",
                stroke: white
                    ? "#8c729c"
                    : "#8f789c",
                "stroke-width": "4",
                "stroke-linecap": "round"
            }
        );

        svg.appendChild(slash);

        addBase();
    }


    /* =========================
       الحصان
    ========================= */

    else if (type === "knight") {

        const body = element(
            "path",
            {
                d:
                    "M30 82 " +
                    "Q39 70 40 58 " +
                    "Q39 48 34 39 " +
                    "Q30 31 35 19 " +
                    "Q45 24 54 19 " +
                    "Q66 16 70 26 " +
                    "Q73 34 67 41 " +
                    "Q62 47 57 51 " +
                    "Q61 60 67 67 " +
                    "Q71 73 78 82 Z",

                fill: mainColor,
                stroke: strokeColor,
                "stroke-width": "2",
                "stroke-linejoin": "round"
            }
        );

        svg.appendChild(body);

        const mane = element(
            "path",
            {
                d:
                    "M38 25 Q48 32 62 28",

                fill: "none",
                stroke: white
                    ? "#8c729c"
                    : "#8f789c",
                "stroke-width": "2",
                "stroke-linecap": "round"
            }
        );

        svg.appendChild(mane);

        const eye = element(
            "circle",
            {
                cx: "58",
                cy: "29",
                r: "2.2",
                fill: white
                    ? "#6d547c"
                    : "#ffffff"
            }
        );

        svg.appendChild(eye);

        addBase();
    }


    /* =========================
       الملكة
    ========================= */

    else if (type === "queen") {

        const crown = element(
            "path",
            {
                d:
                    "M25 25 " +
                    "L34 39 " +
                    "L42 21 " +
                    "L50 39 " +
                    "L58 21 " +
                    "L66 39 " +
                    "L75 25 " +
                    "L69 55 " +
                    "L31 55 Z",

                fill: mainColor,
                stroke: strokeColor,
                "stroke-width": "2",
                "stroke-linejoin": "round"
            }
        );

        svg.appendChild(crown);

        [25, 42, 58, 75].forEach(function (x) {

            const ball = element(
                "circle",
                {
                    cx: x,
                    cy: x === 25 || x === 75
                        ? "25"
                        : "21",
                    r: "4",
                    fill: mainColor,
                    stroke: strokeColor,
                    "stroke-width": "2"
                }
            );

            svg.appendChild(ball);
        });

        const body = element(
            "path",
            {
                d:
                    "M32 55 " +
                    "L68 55 " +
                    "L65 69 " +
                    "Q67 75 75 81 " +
                    "L25 81 " +
                    "Q33 75 35 69 Z",

                fill: mainColor,
                stroke: strokeColor,
                "stroke-width": "2"
            }
        );

        svg.appendChild(body);

        addBase();
    }


    /* =========================
       الملك
    ========================= */

    else if (type === "king") {

        const cross = element(
            "path",
            {
                d:
                    "M45 9 L55 9 " +
                    "L55 18 L64 18 " +
                    "L64 27 L55 27 " +
                    "L55 36 L45 36 " +
                    "L45 27 L36 27 " +
                    "L36 18 L45 18 Z",

                fill: mainColor,
                stroke: strokeColor,
                "stroke-width": "2",
                "stroke-linejoin": "round"
            }
        );

        svg.appendChild(cross);

        const body = element(
            "path",
            {
                d:
                    "M39 38 " +
                    "L61 38 " +
                    "L64 56 " +
                    "L67 69 " +
                    "Q69 75 76 81 " +
                    "L24 81 " +
                    "Q31 75 33 69 " +
                    "L36 56 Z",

                fill: mainColor,
                stroke: strokeColor,
                "stroke-width": "2"
            }
        );

        svg.appendChild(body);

        addBase();
    }


    return svg;
}


/* =========================
   بدء الموقع
========================= */

startBtn.onclick = function () {

    initAudio();

    if (
        audioContext &&
        audioContext.state === "suspended"
    ) {
        audioContext.resume();
    }

    cutePop();

    setTimeout(function () {
        startMusic();
    }, 250);

    intro.classList.add("hidden");

    game.classList.remove("hidden");

    createSoundButton();

    const soundButton =
        document.getElementById(
            "soundButton"
        );

    if (soundButton) {
        soundButton.classList.add("show");
    }

    createBoard();
};


/* =========================
   إنشاء الرقعة
========================= */

function createBoard() {

    /*
       تنظيف كامل للرقعة
    */

    board.replaceChildren();


    /*
       إنشاء 64 خانة فقط
    */

    for (let i = 0; i < 64; i++) {

        const square =
            document.createElement("div");

        square.className = "square";


        /*
           لون الخانة
        */

        const row =
            Math.floor(i / 8);

        const col =
            i % 8;

        if ((row + col) % 2 === 0) {

            square.classList.add("light");

        } else {

            square.classList.add("dark");

        }


        /*
           نوع القطعة
        */

        const type = layout[i];


        /*
           خانة فارغة
        */

        if (!type) {

            board.appendChild(square);

            continue;
        }


        /*
           التحقق من القطعة
        */

        if (!pieces[type]) {

            console.error(
                "نوع قطعة غير معروف:",
                type
            );

            board.appendChild(square);

            continue;
        }


        square.classList.add(
            "has-piece"
        );


        /*
           القطعة SVG
        */

        const isWhite = i >= 48;

        const svg =
            createChessSVG(
                type,
                isWhite
            );


        /*
           إضافة class حسب اللون
        */

        if (isWhite) {

            svg.classList.add(
                "white-piece"
            );

        } else {

            svg.classList.add(
                "black-piece"
            );

        }


        /*
           إضافة القطعة للخانة
        */

        square.appendChild(svg);


        /*
           الضغط
        */

        square.addEventListener(
            "click",
            function () {

                showPiece(
                    type,
                    square
                );

            }
        );


        board.appendChild(square);
    }


    /*
       فحص نهائي
    */

    if (board.children.length !== 64) {

        console.error(
            "خطأ: عدد الخانات:",
            board.children.length
        );

    }
}


/* =========================
   إظهار المقولة
========================= */

function showPiece(type, square) {

    const data = pieces[type];

    if (!data) return;


    document
        .querySelectorAll(
            ".square.selected"
        )
        .forEach(function (item) {

            item.classList.remove(
                "selected"
            );

        });


    square.classList.add(
        "selected"
    );


    if (
        messageIndex[type] === undefined
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


    setTimeout(function () {

        cuteChime();

    }, 80);
}