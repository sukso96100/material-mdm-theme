//Credit - http://thecodeplayer.com/walkthrough/javascript-color-clock

//lets display the current time
var d, h, m, s, color;
function displayTime() {
	d = new Date(); //new data object
	h = d.getHours();
	m = d.getMinutes();
	s = d.getSeconds();

	//add zero to the left of the numbers if they are single digits
	if(h <= 9) h = '0'+h;
	if(m <= 9) m = '0'+m;
	if(s <= 9) s = '0'+s;

	color = "#"+h+m+s;
	//set background color
	document.body.style.background = color;
	document.getElementById("avatar-big-bg").style.background = color;
	//set time
	// document.getElementById("hex").innerHTML = color;

	//retrigger the function every second
	setTimeout(displayTime, 1000);
}

//call the function
