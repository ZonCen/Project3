/* Notes
	I have been working on this project and tried to use Jquery and javascript as much as i can instead of inserting the extra functions (such as className and other stuffs) into the DOM instead of writing directly on the DOM. 
	The project is filled with comments to make it easier to know what section this code are excecuted on. For an example: Between Basic Info and T-shirt Info is all the code neccesary for the Basic Info div. 
	In Misc there is an function to make it easy to change the label color and text. It takes 4 different arguments.
		*arg = an argument to be made, note that this is only one path in the code, so only one argument are available.
		*targetElement = targets the element´s label for color change and text change.
		*txt = what the basic text are.
		*error = What kind of text that should be shown besides the txt when its not correct.
	I have added an validation code in the Basic Info part of the code, just to show how to do it. The base value is keyup.
	If you find any problems with the code or something i can do better. Please get back to me @ rinbladtomas@gmail.com.
	Thank you for reading my code!
*/

/*Misc */
function labelColor(arg, targetElement, txt, error ) {
	let label = $(targetElement).prev();
	if(arg){
		$(label).css("color", "red");
		$(label).text(txt +" "+ error);
	} else {
		$(label).css("color", "black");
		$(label).text(txt);
		return true
	}
};

/*Basic Info*/
$("#name").keyup(() => { //If #name is empty this will turn the label red and write out that its empty.
	let name = $("#name").prev();
	let value = $("#name").val();
	labelColor(value === "", $("#name"), "Name:", "This is Empty:");
});
$("#name").focus(); //Focusing on the name input field when page is loaded

/*FUNCTIONS*/
function nameVal() {
	return labelColor($("#name").val() === "", "#name", "Name:", "This is Empty");
};
function mailVal() {
	var emailInput = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var email = $("#mail");
	return labelColor(email[0].value.length === 0 || !emailInput.test(email[0].value), email, "Email:", "You need to enter a Email adress");

}

//Code for Job role
$("#other-title").hide(); //Hides the other-title input field.
$("#title").change(function() { //Show or hide the input field based on if you choice other in the job role.
	const other = $("#other-title");
	if($("#title").val() === "other"){
		$(other).show();
		$(other).focus();
	}else {
		$(other).hide();
	}
});

/*T-shirt Info*/
let options = $("#color").children(); //Collecting all the children of the #color select.
const parentColor = $("#color").parent();
for(let i =0; i <options.length; i++) { //Adding a className to the options and changing the text content.
	if(options[i].textContent.indexOf("Puns") !== -1) {
		options[i].className="Puns";
		options[i].textContent = options[i].value;
	} else if(options[i].textContent.indexOf("I") !== -1) {
		options[i].className="heart";
		options[i].textContent = options[i].value;
	}
}
parentColor.hide(); //Hides the color div until js puns or i love js is picked in design.
$("#design").change(function(e) {
	if(e.target.value === "js puns"){
		parentColor.show(); //shows the color div. 
		$("#color").val(function() { //Decides what should be showned when this Design is picked.
			for(let i =0; i < options.length; i++){
				if(options[i].className === "Puns") {
					return options[i].value;
				}
			}
		})
		for(let i = 0; i < options.length; i++){
			if(options[i].className === "heart"){ //Hides all options with className heart.
				$(options[i]).hide();
			}
			else{
				$(options[i]).show();
			}
		}
	} else if(e.target.value === "heart js"){
		parentColor.show(); //shows the color div. 
		$("#color").val(function() { //Decides what should be showned when this Design is picked.
			for(let i =0; i < options.length; i++){
				if(options[i].className === "heart") {
					return options[i].value;
				}
			}
		})
		for(let i = 0; i < options.length; i++){
			if(options[i].className === "Puns"){ //Hides all options with className Puns
				$(options[i]).hide();
			}
				else{
					$(options[i]).show();
			}
		}
	} else {
		parentColor.hide(); //Hides the color div if anything else is picked.
	}
});
/*FUNCTIONS*/
function tShirt() {
	return labelColor($("#design option:selected").val() === "Select Theme", $("#design"), "Design", "");
};

/*Register for Activities*/
let counter = 0; //Total cost.
$(".activities").append("<label id='count'>Total Cost:</label>"); //adding a label to the DOM
$(".activities").on("change", (e) => {
	function updateTotal() { // update the total sum shown to the user.
		$("#count").text("Total Cost: " + counter );
	};
	function math(check, e) { // Updates the counter based on value.
		if(check){
			counter += parseInt(e.target.value);
			updateTotal();
		} else {
			counter -= parseInt(e.target.value);
			updateTotal();
		}
	};
	const isChecked = e.target.checked;
	if(e.target.className === "all") {
		math(isChecked, e);
	} else {
		math(isChecked, e);
	}
});
$(".activities").on("change", (e) => {
	function loop(size, e) { /*To check if we get any matches when we click one of the radiobuttons*/
		let Class = e.target.className;
		let check = e.target.checked;
		if(Class && check) {
		for(let i = 0; i < size.length; i++) {
			if(Class === size[i].className && size[i].checked === false) {
				size[i].disabled = true;
			}
		}
	}else if(Class && !check) {
			for(let i = 0; i < size.length; i++) {
				if(Class === size[i].className && size[i].disabled === true) {
					size[i].disabled = false;
				}
			}
		}
	};
	loop($(".activities > label > input"), e);
});
/*FUNCTIONS*/
function register() {
	return labelColor($("input:checked").length === 0, $("#target"), "Register for Activities:", "You need to check one of the activities" );
}

/*Payment Info*/

document.getElementById("cc-num").maxLength = 16;
document.getElementById("zip").maxLength = 5;
document.getElementById("cvv").maxLength = 3;
function numbersOnly(ele) {
	$("#" + ele).on("keypress", function(e){
	 if(e.charCode >= 48 && e.charCode <= 57){
	 } else {
	   e.preventDefault();  // Cancel the event
	 }
	});
};
numbersOnly("cc-num");
numbersOnly("zip");
numbersOnly("cvv");
const payment = $("#payment"); //targets the payment div.
const paymentOptions = $("#payment > option"); //Target the options of the payment div.
const pDiv = $("p").parent(); //targets the parent divs of the p´s
$(payment).val(function() { //puts the value of the payment div to Credit Card
	return $(paymentOptions[1]).val();
})

divHide(); //Hides the P divs.

$(payment).on("change", (e) => {
	const target = e.target.value;
	function creditHide() { // Hides the creditcard div.
		$(".credit-card").hide();
	};
	function args(num) { // What to display in the creditcard div.
		return target === paymentOptions[num].value
	};
	if(args(0)) {
		creditHide();
		divHide();
	}if(args(1)) {
		$(".credit-card").show();
		divHide();
	}if(args(2)) {
		creditHide()
		divHide();
		$(pDiv[0]).show();
	} if(args(3)) {
		creditHide()
		divHide();
		$(pDiv[1]).show();
	}
});
function creditCard() { //To check that every rule are in place.
	let creditCard = $("#cc-num");
	let creditValue = $(creditCard).val();
	let label = $(payment).prev();				
	function args(num, e, txt) { //to check the creditcard information is valid.
		let arguments = [$("#cc-num").val() === "" || creditValue.length < 13,
				$("#zip").val() === "" || $("#zip").val().length < 5,
				$("#cvv").val() === "" || $("#cvv").val().length !== 3]; //A array with the arguments to check for.
		if(arguments[num]) {
			document.getElementById(e).placeholder = txt
			$("#"+e).prev().css("color", "red");
			return true;
		}else {
			document.getElementById(e).placeholder = "";
			$("#"+e).prev().css("color", "black");
			return false;
		}
	}
	if($(payment).val() === paymentOptions[1].value) { //if the credit card is shown.
		payment.prev().css("color", "black");
		payment.prev().text("I'm going to pay with:")
		let ccNum = args(0,"cc-num", "Need between 13 and 16 digits");
		let zip = args(1, "zip", "Need 5 digits");
		let cvv = args(2, "cvv", "Need 3 digits");
		if(!ccNum && !zip && !cvv) {
			return true;	
		} 	
	}else { //If anything else is showned. Return false if "Select Payment Method is picked."
		return labelColor($(payment).val() === paymentOptions[0].value , payment, "I'm going to pay with:", "you need to pick one" );
	}

};
/*FUNCTIONS*/
	function divHide() { // To hide the pDiv
		$(pDiv).hide();
	};

/*Validation*/
$("button").on("click", (event) => { 
	if(nameVal() && mailVal() && tShirt() && register() && creditCard()) { //resets the homepage by not prevent the default use of button / submit.

	} else { //Prevents the information to be removed and tells the user what went wrong.
		event.preventDefault();
		nameVal();
		mailVal();
		tShirt();
		register();
		creditCard();
		
	}
});






