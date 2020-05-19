let direction = 'North';
let stout = [], stdin = [];
let width, height, x, y;

function calctable () {

    //Get width, height, x, y and check that it's the correct input
    let response = getParameters();

    width = response[0];
    height = response[1];
    x = parseInt(response[2]);
    y = parseInt(response[3]);

    console.log(`Size of the matrix is is [${height}, ${width}]`);
    console.log(`Starting position is [${x}, ${y}]`);

    stout.push([x, y]);

    //create the matrix/object
    createMatrix();

    let input = getCommands();
    

    for (let i = 0; i < input.length; i++) { 
        
        switch (input[i]) {
            case '0':
                i = input.length;
                break;
            case '1':
                //Move forward
                getResult(true);
                break;
            case '2':
                //Move backwards
                getResult(false);
                break;
            case '3':
                //rotate clockwise
                rotateDirection(true)
                break;
            case '4':
                //rotate counterclockwise
                rotateDirection(false); 
                break;
            default:
                console.log(`Wrong input, you entered ${input[i]}.`);
                return;
        }
    }

    console.log(stout);

}

function getParameters () {

    //Function to check if parameters are correct

    let response = '', correctInput = false;

    let string = 'Please enter the size of the object and the position (width, height, start row, start column. e.g. 4,4,4,4)';

    while (!correctInput) {

        response = prompt(string);

        if(response === null || response === '') {
            alert("You didn't enter any data. Please try input again!")
        } 
        else {
            //Remove all non-numbers and then get the width, height, x, and y
            response = getNumbers(response);
            
            if(response.length > 4) {
                alert('Too many numbers entered! ' + string);
            } else if(response.length < 4) {
                alert('Not enough numbers entered! ' + string);
            } else {
                correctInput = true;
            }
        }
    }

    return response;
}

function getCommands() {

    //Function to get list of commands

    let input = '', correctInput = false;

    while (!correctInput) {

        input = prompt(`Wrong input, commands are:
        0: Cancel and print results
        1: Move forward one step
        2: Move backwards one step
        3: Rotate clockwise 90 degrees (eg north to east)
        4: Rotate counterclockwise 90 degrees (eg west to south)`);

        if(input === null || input === '') {
            alert("You didn't enter any data. Please try again!");
        } else {
            input = getNumbers(input);
            
            console.log(`Commands inputed are: ${input}`);
            correctInput = true;
        }
    }

    return input;
}

function createMatrix() {
    
    for (let row = 0; row < width; ++row) {
        for (let col = 0; col < height; ++col) {
            if (!stdin[row]) stdin[row] = [];
            stdin[row][col] = row + ", " + col;
        }
    }
}

function getNumbers(s) {

    //Removes all non-number characters from the input

    var numbers = s.match(/\d+/g).map(Number);

    let results = '';
    for (let i = 0; i < numbers.length; i++) results += numbers[i];

    return results;
}

function getResult(forward) {

    //Move forwards or backwards

    switch (direction) {
        case 'North':
            if (forward) {
                y--;
            } else {
                y++;
            }
            break;
        case 'East':
            if (forward) {
                x++;
            } else {
                x--;
            }
            break;
        case 'South':
            if(forward) {
                y++;
            } else {
                y--;
            }
            break;
        case 'West':
            if (forward) {
                x--;
            } else {
                x++;
            }
            break;
        default:
            break;
    }
    
    //Check if move is valid
    if (y < 0 || x > width - 1 || y > height - 1 || x < 0) {
        stout.push([-1, -1]);
    } else {
        stout.push([x, y]);
    }
}

function rotateDirection(clockwise) {
    switch (direction) {
        case "North":
            direction = clockwise ? "East" : "West";
            break;
        case "East":
            direction = clockwise ? "South" : "North";
            break;
        case "South":
            direction = clockwise ? "West" : "East";
            break;
        case "West":
            direction = clockwise ? "North" : "South";
            break;
        default:
            break;
    }
}