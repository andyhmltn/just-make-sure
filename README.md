# justmakesure.js

justmakesure is an EXTREMELY minimal javascript testing tool.   
I was working on a small-ish project and just wanted to make sure a few things were working as intended. I had no internet access to download a library so I wrote this tool.   
It is meant to be as easy and quick as possible to test really basic functionality for small projects.   

## Usage
Add justmakesure.js and justmakesure.css to an html page along with the file you want to test and a test file (or write your tests in your html), open up the html file in your favorite browser and see the results.    
__For example:__   
 
	var a = 3;
                
	MAKE_SURE.after_each = function() { a = 3 };
                
	// This will pass
	makeSure("Multiplying 3 by 4 gives 12", function() {
		a *= 4;
 		return a === 12;
	});
                
	// This will fail
	makeSure("Adding 17 to 3 gives 21", function() {
		a += 17;
		return a === 21;
	});
                
	// This will throw an exception
	makeSure("Calling plusOne on 3 gives 4", function() {
		a.plusOne();
		return a === 4;
	});
                
	// Testing objects
	makeSure("An array of numbers is sorted correctly", function() {
		var actual   = [2, 1, 4, 3].sort(),
		expected = [1, 2, 3, 4];
		return JSON.stringify(actual) === JSON.stringify(expected);
	});

---

Please feel free to use and imporove this tool!
Email me with ideas or fork and pull.
