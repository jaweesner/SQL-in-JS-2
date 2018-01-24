var prompt = require('prompt');

// to implement
//create (table)
//select...from
//insert into...values
//where
//set 
//update
//alter table
// handle wildcards: *, between..and
//
//Class prototypes:

//Globals

//contains user supplied tables. 
//var tables = {NAME:{ column:'', data:''};

//contains supported SQL functions
var sqlFunctions = {
    SELECT: {
        name: 'Select rows from a particular table with or without criteria.',
        description: 'Statement must take form:\n \
                SELECT + * or column names delimited by commas + FROM + table name\
                + (optional) WHERE + column name + operator + arguement + AND/OR/NOT + additional column/op/arg statement',
        func:''

    }
};

//contains supported user commands

var userOptions ={
    Q: {name: 'Quit application'}, //quit is handled in parent function
    H: {
        name: 'List user interface options',
        func: listCommands
    },
    S: {
        name: 'List supported SQL statements ',
        func: listSQLCommands
    },
    D: {
        name: 'Get additional details about a SQL statement',
        func: SQLDetails
    },
    T: {
        name: 'List names of all current tables.',
        func: listTables
    },

    C: {
        name: 'List columns in a particular table',
        func: listColumns
    }
};
/*
Function: main
Description: Main Entry point into function
Side Effects: populates global table object and logs to console
*/
function entryPt(){
    var isQuit = function (input) {
        return input.toUpperCase === 'Q'
    };
    console.log('--JSSQL--');
    console.log('Welcome to the JS SQL application. \n At the prompt, enter a single SQL line, or a program command. Available commands:');
    listCommands();
 
    while(getInput("SQL Phrase>")){
        if (input.length == 1){
            if (isQuit(input)){
            console.log("Exiting SQL application");
             return;
            }
         performCommand(input);
        };
        parse(input);

    } 
};


//Parser function to break up statement into actions and parameters
//how? 
/*
SELECT EMP_ID, LAST_NAME
FROM EMPLOYEE_TBL
WHERE CITY = 'INDIANAPOLIS'

slice into array
[select] (first word, check for word in reserved words)
[clmn1,] (can be column or *) 
(if * or no comma go to 'from')
{verify in table}
(put value into select parameter array)
(look to next parameter and repeat)
[clmn2 ] (no comma, so verify next is 'from')
[from]
[table] put into parameter array, verify where is next
[where] 
parsedetails--verify each operator
{[columnname] (verify real column name)
[operator] (verri)
[value]}
[and](parse details ad infinitum)

reservedWords object mapped to a settings object;
Words{
    reservedWordA:{
        function: actionFunc(),
        numberParams:
        verificationfunction: veriFunc();
    }
}

need to crea
*/
//action function 
//display function




//Helper functions


function listCommands(){return listNames(userOptions);}

function listSQLCommands(){return listNames(sqlFunctions);}

function listTables(){
    for (i in obj){
    console.log(i);
    }
}
function listColumns(){
    var input = getInput("Enter the table you would like to see the columns for:");
    input.column.each( ()=>{
        console.log(this);
    });

}

function SQLDetails(){
    var input = getInput("Enter the command you would like to see details for:");
    

    
}
/*
listNames
Description: For each subobject, print its name/description to the console
Input: a global object that contains named subobjects
 */

function listNames(obj){
    for (i in obj){
        console.log(i + ': '+ i.name);
    }
    return;
}
/*
getInput
Description: I'll create my own prompt()! with blackjack! and hookers!
Input: user prompt
Returns: user input
*/
var input = ''
function getInput(userPrompt){
    var finishCallback = 0;
    var tmp=getInputBase(userPrompt, function(result){
        input = result;
        finishCallback = 1;
    });

    console.log('sync');
}

function getInputBase(userPrompt, fnTemp){
    prompt.message=userPrompt;
    prompt.start();
    prompt.get(['in'], function (err, result) {
        fnTemp(result.in);
    });

}



/*
performCommand
Description: Perform user specified command
Input: user's single character command. not case sensative
*/

function performCommand(command){
    command =command.toUpperCase();
    if (!(command in userOptions)){
        console.log('Error: unrecognized command. Try again or enter "H" for help');
        return;
    } 
    var func = userOptions[command].func;
    func(); 
    return;
}
//call Entry
entryPt();