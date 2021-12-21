var txtInput = document.getElementById("textInput");
var wordC = document.getElementById("wordC");
var charC = document.getElementById("charC");
var charC2 = document.getElementById("charC2");
var voweC = document.getElementById("voweC");
var syllC = document.getElementById("syllC");
var closC = document.getElementById("closC");

var infoBody = document.getElementById("information")
const allChars = "abcdefghijklmnopqrstuvwxyz "
const nonSpace = "abcdefghijklmnopqrstuvwxyz"
const vowels = "aeiou"
const lipLetters = "bfmpv"

function genInfo()
{
    var txt = cleanTxt(txtInput.value);
    console.log(txt);
    let scanData = scanWords(txt);
    wordC.textContent = scanData[0];
    charC.textContent = txtInput.value.length;
    charC2.textContent = scanData[1];
    voweC.textContent = scanData[2];
    syllC.textContent = scanData[3];
    closC.textContent = scanData[4];

    infoBody.style.display = "block";
}

function cleanTxt(txtVal) // Make the text easier for a computer to read
{
    var regex = new RegExp('[^' + allChars + ']', 'g');
    var lower = txtVal.toLowerCase();
    lower = lower.replace(/\n/g, " ");
    return lower.replace(regex,'')
}

function scanWords(str)
{
    let tCloses = 0;
    let tSyllables = 0;
    let tVowels = 0;
    let tCharacters = 0;

    let words = str.split(" ");
    let tWords = 0;

    let wordData = [];

     for (i = 0; i <words.length; i++)
     {
        let word = words[i];
        if (word.length==0) continue;
        let data = scanCharacters(word);
        tCharacters += data[1];
        tVowels += data[2];
        tSyllables += data[3];
        tCloses += data[4];
        tWords++;
        wordData.push(data);
    }
    return [tWords,tCharacters,tVowels,tSyllables,tCloses,wordData];
}

function scanCharacters(word) 
{
    let wChars = word.length;
    let wVowels = 0;
    let wSylls = 0;
    let wCloses = 0;

    let pChar = ""
    for (let i = 0; i < wChars; i++)
    {
        let char = word.charAt(i);
        let nChar = "";

        if (i+1<wChars)
            nChar = word.charAt(i+1)
        
        if (vowels.includes(char))
            wVowels++;

        if (pChar != char && lipLetters.includes(char))
            wCloses++;

        if (syllCheck(pChar,char,nChar))
            wSylls++;
        
        pChar = char;
    }
    return [word, wChars, wVowels, wSylls, wCloses];
}

function syllCheck(pChar,char,nChar)
{
    if (!vowels.includes(pChar)&&vowels.includes(char))
    {
        if (char != "e")
            return true;
    }

    if (pChar=="i"&&(char=="a"||char=="o"))
        return true;
    if (pChar=="e"&&char=="o")
        return true;
}