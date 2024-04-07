const squares = document.querySelectorAll('.square')

let x = new Array, 
    o = new Array, 
 used = new Array;
//x - player1, o - player2, used - well, used squares!
const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let turn = 1;

// board
// 0 1 2
// 3 4 5
// 6 7 8

const check = () => {
    winning.forEach(wins => {
        if(x.includes(wins[0]) &&
           x.includes(wins[1]) &&
           x.includes(wins[2])
        ){
            over('x')
        }
        if(o.includes(wins[0]) &&
           o.includes(wins[1]) &&
           o.includes(wins[2])
        ){
            over('o')
        }
    })
    if(used.length == 9) over('tie')
}

const place = (symbol, pos) => {
    function X(){
        x.push(pos)
        squares[pos].innerHTML += '<p>X</p>'
    }
    function O(){
        o.push(pos)
        squares[pos].innerHTML += '<p>O</p>'
    }
    symbol == 'x' ? X() : O()

    setTimeout(() => {
        check()
        turn++;
    }, 300)
    //Timeout because in css its 0.4 transition time
}

const over = (symbol) => {
    if(symbol == 'x') alert('player1 won!')
    else if(symbol == 'o') alert('player2 won!')
    else alert('tie!')
    window.open('./index.html', '_parent')
}

for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => {
        if(!used.includes(i)){
            place(turn %2 == 0 ? 'o' : 'x', i)
            used.push(i)
        }
    })
    //all squares now have their own click Event
}