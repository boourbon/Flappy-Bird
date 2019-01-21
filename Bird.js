
var last = null;
var bigTimer = null;
function random(min,max){
	return parseInt(Math.random()*(max-min+1)+min);
};

function setBoom(objA,objB){
	var objBl = objB.offsetLeft;
	var objBt = objB.offsetTop;
	var objBr = objBl+ objB.offsetWidth;
	var objBb = objBt+ objB.offsetHeight;


	var objAt = objA.offsetTop + objA.offsetHeight;
	var objAl = objA.offsetWidth + objA.offsetLeft;
	var objAr = objA.offsetLeft;
	var objAb = objA.offsetTop;

	if(objAt>objBt && objAl>objBl && objBr>objAr && objAb < objBb){

		return true
	}
	else{

		return false;
	}
}

function addZz(){
	var oDiv = document.createElement('div');
	oDiv.className = 'topG';
	oDiv.leftData='105';

	var oDiv2 = document.createElement('div');
	oDiv2.className = 'bottomG';
	oDiv2.leftData='105';

	var h = random(50,300);
	oDiv.style.height = h +'px';
	oDiv2.style.height = innerHeight - h - 150 + 'px';
	oDiv2.style.top = h + 150 + 'px';
	document.body.appendChild(oDiv);
	document.body.appendChild(oDiv2);
}

addZz();

last = setInterval(addZz,1500)

clearInterval(bigTimer);
bigTimer = setInterval(()=>{
	var allTopG = document.querySelectorAll('.topG');
	var allBottomG = document.querySelectorAll('.bottomG');
		for(var i = 0;i < allTopG.length;i++){

			if(setBoom(bird,allTopG[i]) || setBoom(bird,allBottomG[i])){
				die = true;
				clearInterval(bigTimer);
				clearInterval(last);
			}
			if(allTopG[i].leftData == '-20'){
				document.body.removeChild(allTopG[i])
				document.body.removeChild(allBottomG[i]);
				continue;

			}
			allBottomG[i].style.left = allTopG[i].style.left = allTopG[i].leftData-1 + '%';

			allTopG[i].leftData = allTopG[i].leftData-1;
	}
},30);


var timer = null;
var iSpeedY = 0;
var die = false;
clearInterval(timer);
timer = setInterval(()=>{
	iSpeedY+=1.5;
	var t = bird.offsetTop + iSpeedY;

	if(t<0){
		die = true;
		t = 0;
		iSpeedY = 0;
		clearInterval(bigTimer);
		clearInterval(last);
	}
	if(t>innerHeight - bird.offsetHeight){
		die = true;
		iSpeedY = 0;
		clearInterval(bigTimer);
		clearInterval(timer);
		clearInterval(last);
	}
	bird.style.top = t + 'px';
},30);

onkeydown = event =>{
	if(die) {
		alert("Oh, that hurts!");
		return;
	}
	iSpeedY-=28;
}
