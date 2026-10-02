const startBtn = document.getElementById("startBtn");

const intro = document.getElementById("intro");
const game = document.getElementById("game");

const board = document.getElementById("board");

const pieceName = document.getElementById("pieceName");
const message = document.getElementById("message");


/* مقولات القطع */

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
    الرقعة

    0 - 7   الصف العلوي
    8 - 15  البيادق
    ...
    48 - 55 البيادق السفلية
    56 - 63 القطع السفلية
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


        /* نوع القطعة */

        const type = layout[i];


        if (type !== "") {

            square.classList.add("has-piece");


            /*
                إنشاء القطعة
            */

            const piece = document.createElement("span");

            piece.className = "chess-piece";


            /*
                رمز القطعة
            */

            piece.textContent = pieces[type].symbol;


            /*
                القطع السفلية بيضاء
            */

            if (i >= 48) {

                piece.classList.add("white-piece");

            } else {

                piece.classList.add("black-piece");

            }


            square.appendChild(piece);


            /*
                الضغط على المربع نفسه
            */

            square.onclick = function (event) {

                event.stopPropagation();

                showPiece(type, square);

            };

        }


        board.appendChild(square);

    }

}


/* عرض المقولة */

function showPiece(type, square) {

    const data = pieces[type];

    if (!data) return;


    /*
        إزالة التحديد
    */

    const allSquares = document.querySelectorAll(".square");

    allSquares.forEach(function (item) {

        item.classList.remove("selected");

    });


    /*
        تحديد القطعة
    */

    square.classList.add("selected");


    /*
        عرض اسم القطعة
    */

    pieceName.textContent = data.name;


    /*
        عرض المقولة
    */

    message.textContent = data.message;

}