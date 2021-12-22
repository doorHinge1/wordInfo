var txtInput = document.getElementById("textInput");
var wordC = document.getElementById("wordC");
var charC = document.getElementById("charC");
var charC2 = document.getElementById("charC2");
var voweC = document.getElementById("voweC");
var syllC = document.getElementById("syllC");
var closC = document.getElementById("closC");

var mChar = document.getElementById("mChar");
var mChar2 = document.getElementById("mChar2");
var mVowe = document.getElementById("mVowe");
var mVowe2 = document.getElementById("mVowe2");
var mSyll = document.getElementById("mSyll");
var mSyll2 = document.getElementById("mSyll2");

var infoBody = document.getElementById("information")
const allChars = "abcdefghijklmnopqrstuvwxyz "
const nonSpace = "abcdefghijklmnopqrstuvwxyz"
const vowels = "aeiouy"
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

    var tCharData = getTopVWord(scanData[5],1);
    var lCharData = getBottomVWord(scanData[5],1);
    var tVoweData = getTopVWord(scanData[5],2);
    var lVoweData = getBottomVWord(scanData[5],2);
    var tSyllData = getTopVWord(scanData[5],3);
    var lSyllData = getBottomVWord(scanData[5],3);

    mChar.textContent=tCharData[0];
    mChar2.textContent=tCharData[1];
    lChar.textContent=lCharData[0];
    lChar2.textContent=lCharData[1];

    mVowe.textContent=tVoweData[0];
    mVowe2.textContent=tVoweData[1];
    lVowe.textContent=lVoweData[0];
    lVowe2.textContent=lVoweData[1];

    mSyll.textContent=tSyllData[0];
    mSyll2.textContent=tSyllData[1];
    lSyll.textContent=lSyllData[0];
    lSyll2.textContent=lSyllData[1];

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

    let pChar = "#"
       
    for (let i = 0; i < wChars; i++)
    {
        let char = word.charAt(i);
        let nChar = "";

        if (i+1<wChars)
            nChar = word.charAt(i+1)
        
        if(vowels.includes(char))
        {
            if (char!="y")
                wVowels++;
            if(!vowels.includes(pChar))
            {
                wSylls++;
            }
            if ((char=="a"||char=="o")&&pChar=="i"&&word[i-2]!="t")
                wSylls++;

            if (char=="o"&&pChar=="e")
                wSylls++;
        }            

        if (pChar != char && !lipLetters.includes(pChar) && lipLetters.includes(char))
            wCloses++;

        pChar = char;
    }

    if(word.endsWith("e")&&!vowels.includes(word.charAt(word.length-2)))
        wSylls--;
    if(word.endsWith("le")&&word.length>2&&!vowels.includes(word[-3]))
        wSylls++;   
    if(wSylls==0)
        wSylls=1;

    return [word, wChars, wVowels, wSylls, wCloses];
}

function getTopVWord(data,vIndex)
{
    let topV=0;
    let wrd="?";
    for(let i = 0; i<data.length;i++)
    {
        cData = data[i];
        if (cData[vIndex]>topV)
        {
            topV = cData[vIndex];
            wrd = cData[0];
        }
    }
    return [wrd,topV];
}

function getBottomVWord(data,vIndex)
{
    let topV=20000;
    let wrd="?";
    for(let i = 0; i<data.length;i++)
    {
        cData = data[i];
        if (cData[vIndex]<topV)
        {
            topV = cData[vIndex];
            wrd = cData[0];
        }
    }
    return [wrd,topV];
}