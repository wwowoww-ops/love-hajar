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

    const notes = [659, 784];

    notes.forEach(function (frequency, index) {

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        const start = now + index * 0.07;

        gain.gain.setValueAtTime(
            0.0001,
            start
        );

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
    880.00,
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

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

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

    if (
        document.getElementById("soundButton")
    ) {
        return;
    }

    const button =
        document.createElement("button");

    button.className = "sound-button";
    button.textContent = "♪";
    button.id = "soundButton";

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
        symbol: "♟",

        messages: [
            "بدأت بخطوة صغيرة لكنك أصبحت شيئا كبيرا بالنسبة لي.",
            "كل شيء جميل يبدأ بخطوة بسيطة.",
            "ربما هي أصغر قطعة لكنها تذكرني ببداية قصتنا."
        ]
    },

    knight: {
        name: "الحصان",
        symbol: "♞",

        messages: [
            "تحركت بطريقة مختلفة ودخلت حياتي بطريقة مختلفة.",
            "طريقك مختلف عن الجميع وهذا ما جعلني أتعلق بك.",
            "الحصان يقفز فوق كل شيء، وأنت تخطيت كل المسافات ووصلت إلي."
        ]
    },

    bishop: {
        name: "الفيل",
        symbol: "♝",

        messages: [
            "مهما اختلف الطريق تبقين قريبة مني.",
            "طريقه مختلف، لكن نهايته دائما تصل إلى مكان ما.",
            "حتى عندما لا يكون الطريق مستقيما، وجودك يجعل الوصول جميلا."
        ]
    },

    rook: {
        name: "الرخ",
        symbol: "♜",

        messages: [
            "وجودك في حياتي شيء ثابت لا يتغير.",
            "الرخ يبقى ثابتا وقويا، وهذا ما أتمناه لوجودك معي.",
            "أحب الأشياء التي تبقى، وأنت واحدة منها."
        ]
    },

    queen: {
        name: "الملكة",
        symbol: "♛",

        messages: [
            "من بين كل القطع أنت القطعة التي تعني لي أكثر.",
            "الملكة تستطيع الوصول إلى كل مكان، وأنت وصلت إلى قلبي.",
            "لو كانت لهذه الرقعة قطعة تشبهك، فستكون الملكة."
        ]
    },

    king: {
        name: "الملك",
        symbol: "♚",

        messages: [
            "قد تكون حركته قليلة لكنه أهم قطعة، مثلك عندي تماما.",
            "ليس المهم عدد الخطوات، بل المكانة التي تملكها.",
            "هناك قطع كثيرة في الرقعة، لكن عيني دائما تبحث عنك."
        ]
    }

};


/* =========================
   الرقعة
   64 خانة فقط
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


/* حماية إضافية */

if (layout.length !== 64) {
    console.error(
        "خطأ: الرقعة يجب أن تحتوي على 64 خانة."
    );
}


/* =========================
   حفظ آخر مقولة
========================= */

const messageIndex = {};


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
        document.getElementById("soundButton");

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
       تنظيف الرقعة بالكامل
       قبل إنشاء أي شيء جديد
    */

    board.replaceChildren();

    /*
       التأكد من وجود 64 خانة
    */

    for (let i = 0; i < 64; i++) {

        const square =
            document.createElement("div");

        square.classList.add("square");

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
           لا توجد قطعة
        */

        if (!type) {

            board.appendChild(square);

            continue;
        }


        /*
           التأكد من أن النوع موجود
        */

        if (!pieces[type]) {

            console.error(
                "قطعة غير معروفة:",
                type
            );

            board.appendChild(square);

            continue;
        }


        /*
           وضع علامة أن الخانة تحتوي قطعة
        */

        square.classList.add("has-piece");


        /*
           إنشاء عنصر القطعة
        */

        const piece =
            document.createElement("span");

        piece.classList.add(
            "chess-piece"
        );


        /*
           إضافة اللون
        */

        if (i < 16) {

            piece.classList.add(
                "black-piece"
            );

        } else if (i >= 48) {

            piece.classList.add(
                "white-piece"
            );

        }


        /*
           الرمز
        */

        piece.textContent =
            pieces[type].symbol;


        /*
           منع القطعة من التأثير
           على الضغط
        */

        piece.setAttribute(
            "aria-hidden",
            "true"
        );

        piece.style.pointerEvents =
            "none";


        /*
           إضافة القطعة للخانة
        */

        square.appendChild(piece);


        /*
           الضغط على القطعة
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


        /*
           إضافة الخانة للرقعة
        */

        board.appendChild(square);

    }


    /*
       حماية إضافية:
       الرقعة يجب أن تحتوي على 64
       خانة فقط
    */

    if (board.children.length !== 64) {

        console.error(
            "خطأ: عدد الخانات هو",
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


    /*
       إزالة التحديد القديم
    */

    document
        .querySelectorAll(
            ".square.selected"
        )
        .forEach(function (item) {

            item.classList.remove(
                "selected"
            );

        });


    /*
       تحديد القطعة
    */

    square.classList.add(
        "selected"
    );


    /*
       اختيار المقولة التالية
    */

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