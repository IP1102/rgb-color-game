//Generating colors and picking a random goal
var square_count = 9;
var colors = [];
var picked_color;


//Selection of various DOM elements
var squares = document.querySelectorAll(".square");
var color_display = document.querySelector("#color-goal");
var message_display = document.querySelector("#message");
var h1 = document.querySelector("h1");
var btn_reset = document.querySelector("#reset");
var btns_mode = document.querySelectorAll(".mode");
// var btn_easy = document.querySelector("#btn-easy");
// var btn_hard = document.querySelector("#btn-hard");

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
			btns_mode[2].classList.remove("selected");
			this.classList.add("selected");
			if(this.textContent === "Easy")
				square_count = 3;
			else if(this.textContent === "Medium")
				square_count = 6;
			else
				square_count = 9;
			// square_count = this.textContent === "Easy" ? 3 : this.textContent === "Medium" ? 6 : 9;
			reset();
		});
	}
	//Adding event listener on reset button
	btn_reset.addEventListener("click", reset);
}

function setUpSquares()
{
	for(var i = 0; i < squares.length; i++)
	{
		//Adding click listeners to squares
		squares[i].addEventListener("click", function(){
			var clicked_color = this.style.backgroundColor;
			//alert(clicked_color);
			if(clicked_color === picked_color)
			{
				message_display.textContent = "Correct!";
				changeColors(picked_color);
				h1.style.backgroundColor = picked_color;
				btn_reset.textContent = "Play Again?"
			}
			else
			{
				message_display.textContent = "Try again!";
				this.style.backgroundColor = "#232323";
			}
		});
	}
}

function reset()
{
	btn_reset.textContent = "New Colors";
	message_display.textContent = "";
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

function randomColor()
{
	var red = Math.floor((Math.random() * 256));
	var green = Math.floor((Math.random() * 256));
	var blue = Math.floor((Math.random() * 256));
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// btn_easy.addEventListener("click", function(){
// 	this.classList.add("selected");
// 	btn_hard.classList.remove("selected");
// 	message_display.textContent = "";
// 	square_count = 3;
// 	colors = generateRandomColors(square_count);
// 	picked_color = pickColor();
// 	color_display.textContent = picked_color;
// 	for(var i = 0; i < squares.length; i++)
// 	{
// 		if(colors[i]) //if(i < square_count)
// 			squares[i].style.backgroundColor = colors[i];
// 		else
// 			squares[i].style.display = "none";
// 	}
// 	h1.style.backgroundColor = "steelblue";
// });

// btn_hard.addEventListener("click", function(){
// 	this.classList.add("selected");
// 	btn_easy.classList.remove("selected");
// 	message_display.textContent = "";
// 	square_count = 6;
// 	colors = generateRandomColors(square_count);
// 	picked_color = pickColor();
// 	color_display.textContent = picked_color;
// 	for(var i = 0; i < squares.length; i++)
// 	{
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = "block";
// 	}
// 	h1.style.backgroundColor = "steelblue";
// });

// function()
// {
// 	btn_reset.textContent = "New Colors";
// 	message_display.textContent = "";
// 	colors = generateRandomColors(square_count);
// 	picked_color = pickColor();
// 	color_display.textContent = picked_color;
// 	for(var i = 0; i < squares.length; i++)
// 	{
// 		if(colors[i])
// 			squares[i].style.backgroundColor = colors[i];
// 		else
// 			squares[i].style.display = "none";
// 	}
// 	h1.style.backgroundColor = "steelblue";
// }
