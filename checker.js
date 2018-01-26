
const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {
    var fullurl = url + '?';
    var chiavi = Object.keys(invocationParameters);
    for(var i = 0; i < chiavi.length - 1; i++) {
        fullurl += chiavi[i] + '=' + invocationParameters[chiavi[i]] + '&';
    }
    fullurl += chiavi[chiavi.length - 1] + '=' + invocationParameters[chiavi[chiavi.length - 1]];
    console.log(fullurl); //ok

    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }

    return fetch(fullurl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(risultato => {
        checkResult.resultStatus = risultato.status;
        checkResult.statusTestPassed = risultato.status == expectedResultStatus;
        return risultato.json();
    })
    .then(res => {
        console.log(res);
        checkResult.urlChecked = fullurl;
        checkResult.resultData = res;
        checkResult.resultDataAsExpected = compareResults(expectedResultData, res);
        console.log("Risultato");
        console.log(checkResult);
    })
    ;

}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check;