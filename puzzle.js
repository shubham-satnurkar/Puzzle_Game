let size  = 4;
let numOfBox = size**2;
let highlighted= numOfBox;
let shuffled = false;
const container = document.getElementById("container");
let winPopUp = document.getElementById("winPop")
let closePopUp = document.querySelector(".close");
let ok =  document.getElementById("ok")

newPuzzle();

function newPuzzle() {
    loadBoxes(size);
    setTimeout(() => {
        shuffle();
    }, 200);
}
// Create Numbers boxes
function loadBoxes(n){
    for(let i= 1; i<= numOfBox; i++){
        let newBox = document.createElement('button');
        newBox.id = `btn${i}`;
        newBox.setAttribute('index', i);
        newBox.innerHTML = i;
        newBox.classList.add('btn');
        newBox.addEventListener('click', function(){
            swap(parseInt(this.getAttribute('index')));
        });
        container.append(newBox);
        console.log(i)
    }
    selectedBoxId = 'btn' + highlighted;
    selectedBox = document.getElementById(selectedBoxId);
    selectedBox.classList.add("selected");
    
}


function shuffle(){
    let minShuffle =10;
    let totlaShuffle = minShuffle + Math.floor(Math.random()*(200-100)+100);
    for(let i = minShuffle; i<=totlaShuffle; i++){
        setTimeout(function timer(){
            let x = Math.floor(Math.random() * size);
            let direction =0;
            if(x==0){
                direction = highlighted + 1;
            }
            else if(x==1){
                direction =  highlighted - 1;
            }
            else if(x==2){
                direction =  highlighted + size;
            }
            else if(x==3){
                direction =  highlighted - size;
            }

            swap(direction);
            if(i>=totlaShuffle -1){
                shuffled = true;
            }
        }, i * 10);
    }
}

// Swap Box
function swap(clicked){
    if(clicked< 1 || clicked > (numOfBox)){
        return;
    }

        // check for move right
    if(clicked== highlighted + 1){
        if(clicked % size!=1){
            setSelected(clicked);
        }
    }
    // check for move left
    else if(clicked==highlighted -1){
        if(clicked % size !=0){
            setSelected(clicked);
        }
    }
    // check for move up
    else if(clicked==highlighted + size){
        setSelected(clicked);
    }
    // check for move down
    else if(clicked==highlighted - size){
        setSelected(clicked);
    }

    if(shuffled){
        if(checkHasWon()){
            winPopUp.animate({
                'display': 'block',
            },500)
            if(winPopUp.style.display="block"){
                closePopUp.addEventListener('click', function(){
                    winPopUp.style.display="none"
                })
            }
            ok.addEventListener('click', function(){
                return shuffle()
            })

        }
        else{
            winPopUp.style.display="none"
        }
    }

}

function checkHasWon(){
    for(let i = 1; i<= numOfBox; i++){
        currentBox = document.getElementById(`btn${i}`);
        currentBoxIndex = currentBox.getAttribute('Index');
        currentBoxValue = currentBox.innerHTML; 
        if(parseInt(currentBoxIndex) != parseInt(currentBoxValue)){
            return false;
        }
    }
    return true;
}


function setSelected(index){
    currentBox = document.getElementById(`btn${highlighted}`);
    currentBoxText = currentBox.innerHTML;
    currentBox.classList.remove('selected');
    newBox = document.getElementById(`btn${index}`);
    currentBox.innerHTML = newBox.innerHTML;
    newBox.innerHTML = currentBoxText;
    newBox.classList.add('selected');
    highlighted = index;
}