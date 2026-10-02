const startBtn = document.getElementById("startBtn");

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const ending = document.getElementById("ending");

const board = document.getElementById("board");

const pieceName = document.getElementById("pieceName");
const message = document.getElementById("message");


/*
    كل قطعة لها عبارات خاصة بها
*/

const pieces = {

    "♟": {
        name: "البيدق",
        messages: [
            "بدأت بخطوة صغيرة لكنك أصبحت شيئا كبيرا بالنسبة لي."
        ]
    },

    "♞": {
        name: "الحصان",
        messages: [
            "تحركت بطريقة مختلفة ودخلت حياتي بطريقة مختلفة."
        ]
    },

    "♝": {
        name: "الفيل",
        messages: [
            "مهما اختلف الطريق تبقين قريبة مني."
        ]
    },

    "♜": {
        name: "الرخ",
        messages: [
            "وجودك في حياتي شيء ثابت لا يتغير."
        ]
    },

    "♛": {
        name: "الملكة",
        messages: [
            "من بين كل القطع أنت القطعة التي تعني لي أكثر."
        ]
    },

    "♚": {
        name: "الملك",
        messages: [
            "قد تكون حركته قليلة لكنه أهم قطعة، مثلك عندي تماما."
        ]
    }

};


/*
    ترتيب قطع الشطرنج
*/

const layout = [

    "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",

    "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",

    "", "", "", "", "", "", "", "",

    "", "", "", "", "", "", "", "",

    "", "", "", "", "", "", "", "",

    "", "", "", "", "", "", "", "",

    "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙",

    "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"

];


/*
    بدء الموقع
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

    layout.forEach((piece, index) => {

        const square = document.createElement("div");

        square.classList.add("square");

        const row = Math.floor(index / 8);
        const column = index % 8;

        if ((row + column) % 2 === 0) {
            square.classList.add("light");
        } else {
            square.classList.add("dark");
        }


        if (piece !== "") {

            square.textContent = piece;

            square.classList.add("has-piece");

            square.addEventListener("click", () => {

                showPiece(piece, square);

            });

        }

        board.appendChild(square);

    });

}


/*
    إظهار المقولة
*/

function showPiece(piece, square) {

    const data = pieces[piece];

    if (!data) return;


    document.querySelectorAll(".square").forEach(item => {
        item.classList.remove("selected");
    });

    square.classList.add("selected");


    pieceName.textContent = data.name;

    message.textContent = data.messages[0];

}