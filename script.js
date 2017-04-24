var mq = window.matchMedia( "(min-width: 1080px)" );
var ms = window.matchMedia( "(min-width: 600px)" );

var m=['march','april','may'];
var mn=['03','04','05'];

function find_course_by_month(array,month){
	f=[];
	for (var i=0;i<array.length;i++) {
		if (array[i].className=="month "+month){
			f.push(array[i])
		}
	}
	return f
}

function define_height(){
	var months=document.querySelectorAll(".month");

	for (var i=0;i<m.length;i++){
		var cur_m=find_course_by_month(months,m[i]);
		max_height=0;
		for (var j=0;j<cur_m.length;j++){
			cur_m[j].removeAttribute('style');
			h=$(cur_m[j]).height();
			if (h>max_height){
				max_height=h;				
			}
		}
		for (var j=0;j<cur_m.length;j++){
			cur_m[j].setAttribute("style","height:" + max_height + "px");			
		}
	}
};

var now=new Date();

/*Доступ для скачивания, если лекция прошла*/
var current_month=now.getMonth()+1;
var current_day=now.getDate();

function lecture_pass(){
	var passed_dates=document.querySelectorAll(".picked .date");
	console.log(passed_dates)
	for (i=0;i<passed_dates.length;i++){
	cur_m=passed_dates[i].parentElement.parentElement.parentElement.className.substr(6);
  	ind_m=m.indexOf(cur_m);
  	if (mn[ind_m]<current_month){
  		el=passed_dates[i].parentElement.nextElementSibling.querySelector(".download");
  		el.style.display="flex";
  		el.parentElement.parentElement.style.justifyContent="space-between";
  		continue;
  	}
  	value=passed_dates[i].firstElementChild.innerHTML;
  	day=value.substring(0,value.indexOf(' '));
  	if (mn[ind_m]==current_month){
  		if (day<current_day){
  			el=passed_dates[i].parentElement.nextElementSibling.querySelector(".download");
  			el.style.display="flex"
  			el.parentElement.parentElement.style.justifyContent="space-between";
  			continue;
  		}
  		else{
  			break;
  		}
  	}

}
}

function scrollToElement(theElement) {
var selectedPosX = 0;
var selectedPosY = 0;
	while (theElement != null) {
	selectedPosX += theElement.offsetLeft;
	selectedPosY += theElement.offsetTop;
	theElement = theElement.offsetParent;
	}
	window.scrollTo(selectedPosX,selectedPosY);
}


/*Выставление высоты по месяцам*/
if (mq.matches) {
	
    define_height();
}

if (ms.matches){
	lecture_pass();
}

/*Выбор курса*/
$('.course_title').click(function(e){
	$(document.querySelector('.picked')).removeClass('picked');
	$(e.currentTarget.parentNode).addClass('picked');
	
	if (ms.matches){
		lecture_pass();
	}
	if (mq.matches) {
		define_height();		
	}
	else{
		scrollToElement(e);
	}
});

/*Информация о лекторах*/
var showingTip;
$('.lecturer').mouseover(function(e){
	var target=e.target;

	var tip=target.getAttribute('data-info');
	if (!tip) return;

	var tipElem=document.createElement('div');
	tipElem.className='lect_about';
	tipElem.innerHTML=tip;
	document.body.appendChild(tipElem);

	var coords=target.getBoundingClientRect();

	var left=coords.left+(target.offsetWidth - tipElem.offsetWidth)/2;

	if (left < 0) left = 0; // не вылезать за левую границу окна

      var top = coords.top - tipElem.offsetHeight - 5;
      if (top < 0) { // не вылезать за верхнюю границу окна
        top = coords.top + target.offsetHeight + 5;
      }

      tipElem.style.left = left + 'px';
      tipElem.style.top = top + 'px';

      showingTip = tipElem;
});


$('.lecturer').mouseout(function(e){
	if (showingTip){
		document.body.removeChild(showingTip);
		showingTip=null;
	}

});


if (!ms.matches) {
  dates=document.getElementsByClassName('date');
  for (i=0;i<dates.length;i++){
  	cur_m=dates[i].parentElement.parentElement.parentElement.className.substr(6);
  	ind_m=m.indexOf(cur_m);
  	value=dates[i].firstElementChild.innerHTML;
  	dates[i].firstElementChild.innerHTML=value.substring(0,value.indexOf(' '))+"."+mn[ind_m];
  }
}

$( window ).resize(function() {
    define_height();
});




