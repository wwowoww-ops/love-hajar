const startBtn = document.getElementById("startBtn");

const intro = document.getElementById("intro");
const game = document.getElementById("game");

const board = document.getElementById("board");

const pieceName = document.getElementById("pieceName");
const message = document.getElementById("message");


/* عبارات القطع */

const pieces = {

    pawn: {
        name: "البيدق",
        symbol: "♟",
        message: "بدأت بخطوة صغيرة لكنك أصبحت شيئا كبيرا بالنسبة لي."
    },

    knight: {
        name: "الحصان",
        symbol: "♞",
        message: "تحركت بطريقة مختلفة ودخلت حياتي بطريقة مختلفة."
    },

    bishop: {
        name: "الفيل",
        symbol: "♝",
        message: "مهما اختلف الطريق تبقين قريبة مني."
    },

    rook: {
        name: "الرخ",
        symbol: "♜",
        message: "وجودك في حياتي شيء ثابت لا يتغير."
    },

    queen: {
        name: "الملكة",
        symbol: "♛",
        message: "من بين كل القطع أنت القطعة التي تعني لي أكثر."
    },

    king: {
        name: "الملك",
        symbol: "♚",
        message: "قد تكون حركته قليلة لكنه أهم قطعة، مثلك عندي تماما."
    }

};


/*
    ترتيب الرقعة

    نستخدم اسم نوع القطعة
    وليس رمزها حتى تعمل
    القطع البيضاء والسوداء بنفس الطريقة
*/

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


/*
    بدء اللعبة
*/

startBtn.addEventListener("click", () => {

    intro.classList.add("hidden");

    game.classList.remove("hidden");

    createBoard();

});


/*
    إنشاء الرقعة
*/

function createBoard() {

    board.innerHTML = "";

    layout.forEach((type, index) => {

        const square = document.createElement("div");

        square.classList.add("square");

        const row = Math.floor(index / 8);
        const column = index % 8;


        /*
            ألوان الرقعة
        */

        if ((row + column) % 2 === 0) {

            square.classList.add("light");

        } else {

            square.classList.add("dark");

        }


        /*
            إذا كانت هناك قطعة
        */

        if (type !== "") {

            const piece = document.createElement("span");

            piece.classList.add("chess-piece");

            piece.textContent = pieces[type].symbol;

            /*
                القطع السفلية تكون بيضاء بصريا
            */

            if (index >= 48) {

                piece.classList.add("white-piece");

            } else {

                piece.classList.add("black-piece");

            }


            square.appendChild(piece);

            square.classList.add("has-piece");


            /*
                الضغط على المربع نفسه
                وليس الرمز فقط
            */

            square.addEventListener("click", () => {

                showPiece(type, square);

            });

        }


        board.appendChild(square);

    });

}


/*
    إظهار المقولة
*/

function showPiece(type, square) {

    const data = pieces[type];

    if (!data) return;


    /*
        إزالة التحديد القديم
    */

    document.querySelectorAll(".square").forEach(item => {

        item.classList.remove("selected");

    });


    /*
        تحديد القطعة الحالية
    */

    square.classList.add("selected");


    /*
        عرض المعلومات
    */

    pieceName.textContent = data.name;

    message.textContent = data.message;

}