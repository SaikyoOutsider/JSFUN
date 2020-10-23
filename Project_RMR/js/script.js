let end = 0;
let size = 50;
let time = 0.5;
let skin = "#5df5e3";
let form = "50%";
let timer = 30;
let timerMin = 0;
let timerSec = 0;
let best30 = 0;
let best60 = 0;
let best300 = 0;

$('.size-popup__item').click(function(){
	$('.size-popup__item').removeClass('selected');
	$(this).addClass('selected');
	size = +$(this).css('width').replace('px', '');
});
$('.skins-popup__item').click(function(){
	$('.skins-popup__item').removeClass('selected');
	$(this).addClass('selected');
	skin = $(this).css('background');
});
$('.skins-popup__form').click(function(){
	$('.skins-popup__form').removeClass('selected');
	$(this).addClass('selected');
	form = $(this).css('border-radius');
});
$('.skins-popup__bg').click(function(){
	$('.skins-popup__bg').removeClass('selected');
	$(this).addClass('selected');
	$(document.body).css('background', $(this).css('background'));
});
$('.time:nth-child(2)').click(function(){
	time = 0.5;
});
$('.time:nth-child(3)').click(function(){
	time = 1;
});
$('.time:nth-child(4)').click(function(){
	time = 5;
});

function funсOfTimer(){
	setTimeout(function (){
		if(+$('.timer').html().replace(':', '') % 100 == 0){
			timerMin = +$('.timer').html()[0] - 1;
			timerSec = 59;
			$('.timer').html(timerMin + ':' + timerSec);
		}
		else{
			timerMin = +$('.timer').html()[0];
			timerSec = +($('.timer').html()[2] + $('.timer').html()[3]) - 1;
			if(timerSec < 10){
				timerSec = "0" + timerSec;
			}
			$('.timer').html(timerMin + ':' + timerSec);
		}
		if(+$('.timer').html().replace(':', '') != 0){
			funсOfTimer();
		}
		else
		{
			$('.target').remove();
			$('.menu').css('visibility', 'visible');
			if(+$('.score__num').html() > +$('.bestScore__num').html()){
				$('.bestScore__num').html($('.score__num').html());
				if (time == 0.5) {
					localStorage.setItem('bestScore30', $('.bestScore__num').html());
				}
				if (time == 1) {
					localStorage.setItem('bestScore60', $('.bestScore__num').html());
				}
				if (time == 5) {
					localStorage.setItem('bestScore300', $('.bestScore__num').html());
				}
			}
		}
	}, 1000);
}

function start(){
	end = 0;
	timer = time*60;
	if(timer >= 60){
		timer = timer/60 + ":00";
	}
	else
	{
		timer = "0:" + timer;
	}
	$('.score__num').html(0);
	$('.timer').css('visibility', 'visible');
	$('.score').css('visibility', 'visible');
	$('.bestScore').css('visibility', 'visible');
	$('body').append('<div class="target"></div>');
	$('.target').css('width', size + "px");
	$('.target').css('height', size + "px");
	$('.target').css('background', skin);
	$('.target').css('border-radius', form);
	$('.timer').html(timer);
	if(time == 0.5){
		$('.bestScore__num').html(best30);
	}
	if(time == 1){
		$('.bestScore__num').html(best60);
	}
	if(time == 5){
		$('.bestScore__num').html(best300);
	}
	if ((localStorage.getItem('bestScore30') !== null) & (time == 0.5)) {
		$('.bestScore__num').html(localStorage.getItem('bestScore30'));
	}
	if ((localStorage.getItem('bestScore60') !== null) & (time == 1)) {
		$('.bestScore__num').html(localStorage.getItem('bestScore60'));
	}
	if ((localStorage.getItem('bestScore300') !== null) & (time == 5)) {
		$('.bestScore__num').html(localStorage.getItem('bestScore300'));
	}
	funсOfTimer();
	setTimeout(function (){
		end = 1;
	}, time*60000);
	spawn();
	setTimeout(function (){
		end = 1;
	}, time*60000);
	$('.target').click(function(){
		$('.score__num').html(+$('.score__num').html() + 1);
		spawn();
	});
}
function spawn(){
	$('.target').css('top', ((Math.random()*90)+2)+"%");
	$('.target').css('left', ((Math.random()*90)+2)+"%");
}
$('.button__start').click(function(){
	$('.menu').css('visibility', 'hidden');
	start();
});

$('.button__settings').click(function(){
	$('.popup').css('opacity', '1');
	$('.popup').css('z-index', '5');
});
$('.exit').click(function(){
	$('.popup').css('opacity', '0');
	$('.popup').css('z-index', '-5');
});

$('.menu-popup__item:last-child').click(function(){
	$('.settings').css('display', 'none');
	$('.settings').css('opacity', '0');
	$('.skins').css('display', 'flex');
	$('.skins').css('opacity', '1');
	$('.active').removeClass('active');
	$(this).addClass('active');
});
$('.menu-popup__item:first-child').click(function(){
	$('.skins').css('display', 'none');
	$('.skins').css('opacity', '0');
	$('.settings').css('display', 'flex');
	$('.settings').css('opacity', '1');
	$('.active').removeClass('active');
	$(this).addClass('active');
});