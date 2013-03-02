/*
 *
 * justmakesure 0.0
 * SUPER minimal javascript testing tool.
 * USAGE: Include a link in an html page to this file and the css file
 *        and call makeSure with a description of what you are testing
 *        and a method that tests it.
 *        Tests which return true will be considered passing.
 *
 * justmakesure can be found at: www.github.com/agelber/just-make-sure
 *
 */

var CONTAINER_ID    = 'makesure';
var RESULTS_ID      = 'makesure-results';
var TOTALS_ID       = 'makesure-totals';
var RESULT_CLASS    = 'makesure-results';
var PASSED_CLASS    = 'makesure-passed';
var FAILED_CLASS    = 'makesure-failed';
var EXCEPTION_CLASS = 'makesure-exception';

var MAKE_SURE = {
    
    // Configurable methods to run before and after each test
    before_each : null,
    after_each  : null,
    
    _tests  : {},
    _total  :  0,
    _passed :  0
}

// Method for users to add test case
var makeSure = function(description, test) {
    MAKE_SURE._tests[description] = test;
}

// Runs all the test cases and displays results
var runTests = function() {
    var resultList = document.getElementById(RESULTS_ID);
    
    for (var description in MAKE_SURE._tests) {
        
        if (typeof(MAKE_SURE.before_each) === 'function') { MAKE_SURE.before_each(); }
        
        var testResult = document.createElement('li');
        testResult.classList.add(RESULT_CLASS);
        testResult.textContent = description + ' -> ';
        try {
            var result = MAKE_SURE._tests[description]();
            if (result) {
                testResult.classList.add(PASSED_CLASS);
                testResult.textContent += 'PASSED!';
                MAKE_SURE._passed++;
            } else {
                testResult.classList.add(FAILED_CLASS);
                testResult.textContent += 'FAILED!';
            }
        } catch(e) {
            testResult.classList.add(EXCEPTION_CLASS);
            testResult.textContent += e.toString();
        }
        resultList.appendChild(testResult);
        MAKE_SURE._total++;
        
        if (typeof(MAKE_SURE.after_each) === 'function') { MAKE_SURE.after_each(); }
    }
    updateTotals();
}

// Updates '#makesure-totals' with the results of the tests
var updateTotals = function() {
    var totals = document.getElementById(TOTALS_ID),
        percentPassed = Math.round(MAKE_SURE._passed / MAKE_SURE._total * 100);
    totals.textContent = percentPassed + '% (' + MAKE_SURE._passed + '/' + MAKE_SURE._total + ') of your tests passed.';
    if (percentPassed === 100) {
        totals.textContent += ' GOOD JOB!';
    } else if (percentPassed === 0) {
        totals.textContent += ' Better start working..';
    }
}

// when the document has finished loading, creates divs in which the results will be displayed and runs the tests
document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        var container = document.createElement('div'),
            results   = document.createElement('ul'),
            totals    = document.createElement('div');
        container.setAttribute('id', CONTAINER_ID);
        results.setAttribute('id', RESULTS_ID);
        totals.setAttribute('id', TOTALS_ID);
        document.body.appendChild(container);
        container.appendChild(results);
        container.appendChild(totals);
        runTests();
    }
}