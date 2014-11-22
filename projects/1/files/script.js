//============
// Constants
//============

var SLIDE_TIME = 400;
var NAV_ANIM_TIME = 250;


//
var isSmall = false;


// Runs on page load
$(function() {
	scaleNavigation();
	hashChanged(window.location.hash);

	// If it's not a tiny window, add the page background sketch in
	if(!isSmall)
		$("body").prepend('<canvas id="PortfolioBackground" data-processing-sources="js/PortfolioBackground.pde" width=window.innerWidth height=window.innerHeight style="position:fixed; left:0; top:0;"></canvas>');
});

// Allows for use of back / forward browser buttons and direct linking to a page
if("onhashchange" in window)
{
    window.onhashchange = function() {
        hashChanged(window.location.hash);
    }
}

function hashChanged(hashVal)
{
	if(hashVal == "#works")
		loadWorks();
	else if(hashVal == "#about")
		loadAbout();
	else
		loadHome();

	updateNavColors();
}

function loadHome()
{
	$("#content").slideUp(SLIDE_TIME / 2, function() { $(this).load("pages/home.html", function() { $(this).slideDown(SLIDE_TIME / 2); }); });
	$(".nav_link").attr("data-current-page", 0);
	$("#nav_home").attr("data-current-page", 1);
}

function loadWorks()
{
	$("#content").slideUp(SLIDE_TIME / 2, function() { $(this).load("pages/works.html", function() { $(this).slideDown(SLIDE_TIME / 2); }); });
	$(".nav_link").attr("data-current-page", 0);
	$("#nav_home").attr("data-current-page", 0);
	$("#nav_works").attr("data-current-page", 1);
}

function loadAbout()
{
	$("#content").slideUp(SLIDE_TIME / 2, function() { $(this).load("pages/about.html", function() { $(this).slideDown(SLIDE_TIME / 2); }); });
	$(".nav_link").attr("data-current-page", 0);
	$("#nav_home").attr("data-current-page", 0);
	$("#nav_about").attr("data-current-page", 1);
}


// Navigation bar functionality
$(".nav_link").mouseover(function() {
	$(this).stop();
	$(this).css({
		"background-color": "#b9cede",
		"color": "#092b46"
	});

	$(this).css("text-decoration", "underline");
});

$(".nav_link").mouseout(function() {
	updateNavColors();
	$(this).css("text-decoration", "none");
});


// Update navigation link colors and stuff
function updateNavColors()
{
	var navLinks = $(".nav_link").add("#nav_home");

	navLinks.each(function() {
		$(this).stop();

		var isCurrentPage = $(this).attr("data-current-page") == 1;

		var bg_col = isCurrentPage ? "#b9cede" : "#212833";
		var col = isCurrentPage ? "#092b46" : "#b9cede";

		$(this).animate({
			"padding-bottom": isCurrentPage ? "6px" : "2px",
			"top": isSmall ? "-5px" : "-1px",
			"background-color": bg_col,
			"color": col
		}, NAV_ANIM_TIME);
	});
}


// Home button clicked
$("#nav_home").click(function() {
	if($(this).attr("data-current-page") != 1)
		loadHome();
});

// Works button clicked
$("#nav_works").click(function() {
	if($(this).attr("data-current-page") != 1)
		loadWorks();
});

// About me button clicked
$("#nav_about").click(function() {
	if($(this).attr("data-current-page") != 1)
		loadAbout();
});

// Resize navigation if needed
$(window).resize(function() {
	scaleNavigation();
});

function scaleNavigation()
{
	if($("#content").outerWidth() < 800)
	{
		$(".nav_link").css({
			"font-size": "16px",
			"top": "-5px"
		});

		$("#nav_home").css({
			"font-size": "32px",
			"top": "-5px"
		});

		isSmall = true;
	} else {
		$(".nav_link").css({
			"font-size": "22px",
			"top": "-1px"
		});

		$("#nav_home").css({
			"font-size": "48px",
			"top": "-1px"
		});

		isSmall = false;
	}
}