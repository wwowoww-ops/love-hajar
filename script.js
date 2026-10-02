const intro = document.getElementById("intro");
const game = document.getElementById("game");
const ending = document.getElementById("ending");

const startBtn = document.getElementById("startBtn");
const againBtn = document.getElementById("againBtn");
const nextBtn = document.getElementById("nextBtn");

const board = document.getElementById("board");
const message = document.getElementById("message");
const moveCount = document.getElementById("moveCount");

let selected = null;
let moves = 0;
let messageIndex = 0;


// ============================
// الرسائل
// ============================

const messages = [

    "بدأت اللعبة ببيدق صغير، لكن وجودك عندي ليس شيئا صغيرا",

    "الحصان يتحرك بطريقة مختلفة، وأنت أيضا دخلت حياتي بطريقة لم أتوقعها",

    "الفيل لا يسير في طريق مستقيم، لكن طريقي معك كان أجمل مما توقعت",

    "الرخ يتحرك بخط مستقيم، وأنا أحب أن تكون مشاعري تجاهك واضحة",

    "الملكة أهم قطعة في الرقعة، لكن بالنسبة لي أنت أهم من أي قطعة",

    "يمكن أن تحمي الملك طوال اللعبة، لكن لا أعرف من سيحمي قلبي منك",

    "كل حركة تقربنا من النهاية، وأنا بصراحة لا أريد أن أصل إليها",

    "هل تعرفين ما القطعة التي أحبها أكثر؟ القطعة التي تحركت بيدك",

    "حتى عندما أخسر في اللعب، وجودك يجعلني أشعر أنني ربحت شيئا أهم",

    "في الشطرنج توجد قطع كثيرة، لكنني كنت أبحث عن شخص واحد فقط",

    "هذه ليست لعبة للفوز والخسارة، أنا فقط أردت أن ألعبها معك",

    "كل قطعة لها مكانها، وأنت وجدت مكانا خاصا عندي",

    "ربما لا تعرفين، لكن كل حركة هنا كانت سببا لأقول لك شيئا",

    "وأعتقد أن أجمل حركة في هذه اللعبة كانت عندما ضغطت على أول قطعة",

    "إذا وصلت إلى هنا، فأظن أن الوقت حان لأقولها بوضوح",

    "أنا سعيد جدا لأنني عرفتك"
];


// ============================
// القطع
// ============================

const originalPieces = [

    "♜","♞","♝","♛","♚","♝","♞","♜",

    "♟","♟","♟","♟","♟","♟","♟","♟",

    "","","","","","","","",

    "","","","","","","","",

    "","","","","","","","",

    "","","","","","","","",

    "♙","♙","♙","♙","♙","♙","♙","♙",

    "♖","♘","♗","♕","♔","♗","♘","♖"

];


// نسخة العمل
let pieces = [...originalPieces];


// ============================
// البداية
// ============================

startBtn.addEventListener("click", () => {

    intro.classList.add("hidden");

    game.classList.remove("hidden");

    createBoard();

    createHeart();

});


// ============================
// إنشاء اللوحة
// ============================

function createBoard() {

    board.innerHTML = "";

    pieces.forEach((piece, index) => {

        const square = document.createElement("div");

        square.classList.add("square");

        // ألوان الرقعة
        const row = Math.floor(index / 8);
        const col = index % 8;

        if ((row + col) % 2 === 0) {

            square.classList.add("light");

        } else {

            square.classList.add("dark");

        }


        square.dataset.index = index;


        if (piece !== "") {

            const span = document.createElement("span");

            span.classList.add("piece");

            span.textContent = piece;

            square.appendChild(span);

        }


        square.addEventListener("click", () => {

            handleSquare(square);

        });


        board.appendChild(square);

    });

}


// ============================
// الضغط والتحريك
// ============================

function handleSquare(square) {

    const piece = square.querySelector(".piece");


    // اختيار قطعة
    if (piece && selected === null) {

        selected = square;

        selected.classList.add("selected");

        showMessage();

        createHeart();

        return;

    }


    // إلغاء الاختيار
    if (selected === square) {

        selected.classList.remove("selected");

        selected = null;

        return;

    }


    // تحريك القطعة
    if (selected !== null) {

        const selectedPiece =
            selected.querySelector(".piece");


        if (selectedPiece) {

            square.innerHTML = "";

            square.appendChild(selectedPiece);


            selected.classList.remove("selected");

            selected = null;


            moves++;

            moveCount.textContent = moves;


            showMessage();

            createHeart();


            // بعد عدد معين تظهر النهاية
            if (moves >= 12) {

                setTimeout(() => {

                    game.classList.add("hidden");

                    ending.classList.remove("hidden");

                    createManyHearts();

                }, 1200);

            }

        }

    }

}


// ============================
// عرض رسالة
// ============================

function showMessage() {

    messageIndex =
        Math.min(moves, messages.length - 1);


    message.textContent =
        messages[messageIndex];


    // إعادة تشغيل animation
    message.style.animation = "none";

    void message.offsetWidth;

    message.style.animation =
        "message 0.35s ease";

}


// ============================
// رسالة أخرى
// ============================

nextBtn.addEventListener("click", () => {

    messageIndex++;

    if (messageIndex >= messages.length) {

        messageIndex = 0;

    }

    message.textContent =
        messages[messageIndex];

    createHeart();

});


// ============================
// قلب واحد
// ============================

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart";

    heart.textContent = "♥";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        14 + Math.random() * 18 + "px";


    document.body.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 4000);

}


// ============================
// مجموعة قلوب
// ============================

function createManyHearts() {

    for (let i = 0; i < 18; i++) {

        setTimeout(() => {

            createHeart();

        }, i * 180);

    }

}


// ============================
// إعادة اللعب
// ============================

againBtn.addEventListener("click", () => {

    pieces = [...originalPieces];

    selected = null;

    moves = 0;

    messageIndex = 0;

    moveCount.textContent = "0";

    message.textContent =
        "اختاري قطعة وابدئي";


    ending.classList.add("hidden");

    game.classList.remove("hidden");

    createBoard();

});
