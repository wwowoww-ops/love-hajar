const startBtn = document.getElementById("startBtn");

const intro = document.getElementById("intro");
const game = document.getElementById("game");

const board = document.getElementById("board");

const pieceName = document.getElementById("pieceName");
const message = document.getElementById("message");


/* مقولات كل قطعة */

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


/* ترتيب الرقعة */

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


/* حفظ آخر مقولة لكل قطعة */

const messageIndex = {};


/* بدء الموقع */

startBtn.onclick = function () {

    intro.classList.add("hidden");

    game.classList.remove("hidden");

    createBoard();

};


/* إنشاء الرقعة */

function createBoard() {

    board.innerHTML = "";

    for (let i = 0; i < 64; i++) {

        const square = document.createElement("div");

        square.className = "square";


        /* لون المربع */

        const row = Math.floor(i / 8);
        const col = i % 8;

        if ((row + col) % 2 === 0) {

            square.classList.add("light");

        } else {

            square.classList.add("dark");

        }


        const type = layout[i];


        if (type !== "") {

            square.classList.add("has-piece");


            /* إنشاء القطعة */

            const piece = document.createElement("span");

            piece.className = "chess-piece";

            piece.textContent = pieces[type].symbol;


            /* القطع السفلية بيضاء */

            if (i >= 48) {

                piece.classList.add("white-piece");

            } else {

                piece.classList.add("black-piece");

            }


            square.appendChild(piece);


            /* الضغط على القطعة */

            square.onclick = function (event) {

                event.stopPropagation();

                showPiece(type, square);

            };

        }


        board.appendChild(square);

    }

}


/* إظهار المقولة */

function showPiece(type, square) {

    const data = pieces[type];

    if (!data) return;


    /* إزالة التحديد السابق */

    document.querySelectorAll(".square").forEach(function (item) {

        item.classList.remove("selected");

    });


    square.classList.add("selected");


    /* تحديد رقم المقولة */

    if (messageIndex[type] === undefined) {

        messageIndex[type] = 0;

    } else {

        messageIndex[type]++;

    }


    if (messageIndex[type] >= data.messages.length) {

        messageIndex[type] = 0;

    }


    /* عرض اسم القطعة */

    pieceName.textContent = data.name;


    /* عرض المقولة */

    message.textContent =
        data.messages[messageIndex[type]];

}