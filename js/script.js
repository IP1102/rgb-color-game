//Generating colors and picking a random goal
var square_count = 9;
var colors = [];
var picked_color;
var already_set_up = false;
var seconds = 30;
var centi_second = 0;
var max_retries = 30;
var max_point = 9;
var player_score = 0;
var retries = 0;
var game_mode = "Practice";
var timeout_clear;
var display_animation = false;



//Selection of various DOM elements
var squares = document.querySelectorAll(".square");
var color_display = document.querySelector("#color-goal");
var h1 = document.querySelector("h1");
var btn_help = document.querySelector("#help");
var btns_mode = document.querySelectorAll(".mode");
var display = document.querySelector("#display");
init();

function init()
{
	
	setUpButtonListeners();
	setUpSquares();
	reset();
}

function setUpButtonListeners()
{
	//Adding event listeners on mode buttons
	for(var i = 0; i < btns_mode.length; i++)
	{
			btns_mode[i].addEventListener("click", function(){
			btns_mode[0].classList.remove("selected");
			btns_mode[1].classList.remove("selected");
			this.classList.add("selected");
            display_animation = false;
            if(this.textContent === "Practice")
                game_mode = "Practice";
            if(this.textContent === "Time Trial" ||       this.textContent === "Start?" || this.textContent === "Play Again?")
            {
                game_mode = "Time Trial";
                timeTrialMode();
            }
            else
            {
                reset();
                already_set_up = false;
                btns_mode[1].textContent = "Time Trial";
                display.innerHTML = "Color Game";
            }
		});
	}
}

function setUpSquares()
{
	for(var i = 0; i < squares.length; i++)
	{
		//Adding click listeners to squares
		squares[i].addEventListener("click", handleSquares);
	}
}

function handleSquares()
{
    var clicked_color = this.style.backgroundColor;
    if(clicked_color === picked_color)
    {
        if(game_mode === "Practice")
        {
            changeColors(picked_color);
            btn_reset.textContent = "Play Again?"
            h1.style.backgroundColor = picked_color;
        }
        else
        {
            reset();
            player_score += max_point;
        }
    }
    else
    {
        this.style.backgroundColor = "#232323";
        retries++;
    }
}

function displayAnimation()
{
    var set_val = setTimeout(displayAnimation, 2000);
    if(display_animation)
    {
         reset();
    }
    else
    {
        clearInterval(set_val);
    }
}

function reset()
{
	colors = generateRandomColors(square_count);
	picked_color = pickColor();
	color_display.textContent = picked_color;
	for(var i = 0; i < squares.length; i++)
	{
		if(colors[i])
		{
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else
			squares[i].style.display = "none";
	}
	h1.style.backgroundColor = "steelblue";
}

function changeColors(color) 
{
	for(var i = 0; i < square_count; i++)
	{
		squares[i].style.backgroundColor = color;
	}
}

function pickColor()
{
	return colors[Math.floor(Math.random() * (colors.length - 1))];
}

function generateRandomColors(num)
{
	var arr = [];
	for(var i = 0; i < num; i++)
	{
		arr.push(randomColor());
	}
	return arr;
}


function countDown()
{
    var second_field = document.querySelector("#seconds");
    var centi_field = document.querySelector("#centi-sec");
    if(retries === max_retries)
    {
        player_score -= retries;
        display.innerHTML = "<strong>SCORE: </strong>" + player_score;
        btns_mode[1].textContent = "Play Again?";
        enableButtons([btns_mode[0], btns_mode[1], btn_help]);
        already_set_up = false;
        seconds = 30;
        centi_second = 0;
        clearTimeout(timeout_clear);
        player_score = 0;
        retries = 0;
        reset();
        var rand_color = randomColor();
        changeColors(rand_color);
        display_animation = true;
        displayAnimation();
        color_display.textContent = rand_color;
        $('#game-over').modal('toggle');
        return;
    }
    if(seconds === 0)
    {
//        console.log("Score: " + player_score);
//        console.log("Retries: " + retries);
        player_score -= retries;
        display.innerHTML = "<strong>SCORE: </strong>" + player_score + " <strong>RETRIES: </strong>" + retries;
        btns_mode[1].textContent = "Play Again?";
        enableButtons([btns_mode[0],btns_mode[1], btn_help]);
        already_set_up = false;
        seconds = 30;
        centi_second = 0;
        clearTimeout(timeout_clear);
        player_score = 0;
        retries = 0;
        reset();
        var rand_color = randomColor();
        changeColors(rand_color);
        display_animation = true;
        displayAnimation();
        color_display.textContent = rand_color;
        return;
    }
    if(centi_second === 0)
    {
        seconds--;
        centi_second = 99;
    }
    second_field.textContent = seconds;
    centi_field.textContent = centi_second;
    centi_second--;
    timeout_clear = setTimeout(countDown, 10);
}

function disableButtons(btns)
{
    btns.forEach(function(element){
        element.disabled = true;
        element.classList.remove("hover");
    });
}

function enableButtons(btns)
{
    btns.forEach(function(element){
        element.disabled = false;
        element.classList.add("hover");
    });
}

function timeTrialMode()
{
    if(!already_set_up)
    {
        var rand_color = randomColor();
        color_display.textContent = rand_color;
        for(var i = 0; i < squares.length; i++)
        {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = rand_color;
        }
        already_set_up = true;
        btns_mode[1].textContent = "Start?";
        btns_mode[1].classList.remove("selected");
        display.innerHTML = "Color Game";
        player_score = 0;
    }
    else
    {
        //player_score += max_point;
        btns_mode[1].textContent = "Started";
        disableButtons([btns_mode[0],btns_mode[1], btn_help]);
        btns_mode[1].classList.add("selected");
        display.innerHTML = '<span id="seconds">10</span>.<span id="centi-sec">0</span>';
        reset();
        countDown();
    }
}

function randomColor()
{
	var red = Math.floor((Math.random() * 256));
	var green = Math.floor((Math.random() * 256));
	var blue = Math.floor((Math.random() * 256));
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}

