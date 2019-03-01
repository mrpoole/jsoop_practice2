class Input {
	//constructor takes in a a target input element
	//should also construct variables for the range, the pattern, and the element that will hold the error message
	//range min and max should default to null
	constructor(target_input) {
		this.range = {
			min: null,
			max: null
		};
		this.regex = null;
		this.targetInput = $(target_input);

		// this.regex_test = this.targetInput.val();
	}
	//setRange sets the minimum and maximum range, if necessary, for the input
	//arguments : min (a number), and max (a number)
	//returns: nothing
	//purpose: sets the min and max values for the object
	setRange(min, max) {
		this.range.min = min;
		this.range.max = max;
	}
	//getRange gets the minimum and maximum range.
	//arguments: nothing
	//returns: an object with a property of min, and a property of max, containing the minimum and maximum numbers
	getRange() {
		var new_object = {
			min: this.range.min,
			max: this.range.max
		}
		return new_object;
	}
	//setPattern saves a regex pattern into the object
	//arguments: pattern (a regular expression.  if you don't know what it is, you will learn it soon)
	//returns: nothing
	//saves the given pattern into the object
	setPattern(regex) {
		this.regex = regex;
	}
	//getPattern returns the currently stored pattern of the input object
	//arguments: nothing
	//returns: the currently stored regex pattern
	getPattern() {
		return this.regex;
	}
	//test runs all current tests on the target input and returns an object with data about whether the input passed or not
	//arguments: nothing
	//returns: an objct with a property of result (true/false), and an optional property of "error" if result was false
	//if the input's value failed because it didn't match the regex pattern, error will be "pattern"
	//if the input's value failed because it didn't match the range, error will be "range"
	/*notes:
		let's say your property for youregex pattren was this.regex, 
		and your property for your input was this.targetInput
		get the value from the targetInput (or example, this.targetInput.val()) and it put in a variable, 
		you would then use the test method to get true or false if the pattern matched
		https://www.w3schools.com/jsref/jsref_regexp_test.asp
		this.regex.test ( this.targetInput.val() )  would give you true or false

		also needs to test the range, but note that the range is null by default
		if it is still null, no range has been set, so don't test it
			if it is not null, then test the range */
	test() {
		var object = {};
		var newRegex = new RegExp(this.regex);
		var value = this.targetInput.val();

		if (newRegex.test(value) && this.range.min === null) {
			object.result = true;

		} else if (!newRegex.test(value) && this.range.min === null) { 
			object.result = false;
			object.error = "pattern";

		} else if (newRegex.test(value) && this.range.min !== null) {
			if (this.range.min < value && value < this.range.max) {
				object.result = true;
			} else {
				object.result = false;
				object.error = "range";
			}
		}
		return object;
	}
	/*
	showError: takes in a message, creates a dom element, and then positions that dom Element directly below the input
	argument: message (a string)
	returns: nothing
	notes: should create an element and positio it directly beneath the input
		you will need to get the position of the input  (https://www.w3schools.com/jquery/css_position.asp)
		also find the height of the element (https://www.w3schools.com/jquery/css_height.asp)
		make a new dom element
			give it a left CSS property the same as the input's left property
			give it a top property of the input's top property + the input's height (so it appears basically below it)
			give it a class of "inputError"
		make sure to set its text to the incoming text from the argument!
		go to the input's parent (https://www.w3schools.com/jquery/traversing_parent.asp)
		append the newly created element
		MAKE SURE TO STORE the reference to the dom element in the object for later use!
		Don't store the CSS selector, you made the element, store the direct dom object itself!
		*/
	showError(str) {
		var position = this.targetInput.position();
		var height = this.targetInput.height();

		var parentElement = this.targetInput.parent();

		var inputError = $("<div>").addClass("inputError").css({
			left: position.left,
			top: position.top + height,
		}).text(str);


		parentElement.append(inputError);

	}

	/*
	hideError removes the error dom element from the DOM for the given input
	arguments: none
	returns: none
	note: 
		removes the dom element in question (https://www.w3schools.com/jquery/html_remove.asp)
		*/
	hideError() {
		$(".inputError").remove();
	}
}