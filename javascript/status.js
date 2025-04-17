const digitMap = {
    '0': '０',
    '1': '１',
    '2': '２',
    '3': '３',
    '4': '４',
    '5': '５',
    '6': '６',
    '7': '７',
    '8': '８',
    '9': '９'
};

const stylizedDigits = {
    '0': '𝟎',
    '1': '𝟏',
    '2': '𝟐',
    '3': '𝟑',
    '4': '𝟒',
    '5': '𝟓',
    '6': '𝟔',
    '7': '𝟕',
    '8': '𝟖',
    '9': '𝟗'
};

function getCurrentTime() {
    const currentDate = new Date();
    const timeOptions = {
        'timeZone': "Asia/Bangkok",
        'hour': "2-digit",
        'minute': "2-digit",
        'hour12': false
    };
    let timeString = currentDate.toLocaleTimeString('th-TH', timeOptions);
    return timeString.replace(/[0-9]/g, digit => digitMap[digit]);
}

const monthNames = ['𝟎𝟏', "𝟎𝟐", "𝟎𝟑", "𝟎𝟒", '𝟎𝟓', '𝟎𝟔', "𝟎𝟕", "𝟎𝟖", "𝟎𝟗", '𝟏𝟎', "𝟏𝟏", '𝟏𝟐'];

function getCurrentDay() {
    const currentDate = new Date();
    const dateOptions = {
        'timeZone': "Asia/Bangkok",
        'day': "2-digit",
        'month': "2-digit",
        'year': "numeric"
    };
    const dateString = new Intl.DateTimeFormat('th-TH', dateOptions).format(currentDate);
    const [day, month, year] = dateString.split('/');
    const monthIndex = parseInt(month, 10) - 1;
    return '' + stylizedDigits[day[0]] + stylizedDigits[day[1]] + '/' + monthNames[monthIndex] + '/' + 
           stylizedDigits[year[0]] + stylizedDigits[year[1]] + stylizedDigits[year[2]] + stylizedDigits[year[3]];
}

const thaiDayNames = ["อาทิตย์", "จันทร์", "อังคาร", 'พุธ', "พฤหัสบดี", "ศุกร์", "เสาร์"];

function getCurrentDayThai() {
    const currentDate = new Date();
    const dayOptions = {
        'timeZone': "Asia/Bangkok",
        'weekday': 'long'
    };
    const thaiDay = new Intl.DateTimeFormat("th-TH", dayOptions).format(currentDate);
    const dayIndex = thaiDayNames.indexOf(thaiDay);
    return thaiDayNames[dayIndex] || thaiDay;
}

const englishDayNames = ['Sunday', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getCurrentDayEG() {
    const currentDate = new Date();
    const dayOptions = {
        'timeZone': "Asia/Bangkok",
        'weekday': "long"
    };
    const englishDay = new Intl.DateTimeFormat("en-US", dayOptions).format(currentDate);
    const dayIndex = englishDayNames.indexOf(englishDay);
    return englishDayNames[dayIndex];
}

function getPing() {
    const pingValue = Math.round(Math.random() * 100);
    return '' + pingValue;
}

function getTemperature() {
    const temperature = 25 + (Math.random() * 5 * 2 - 5);
    return '' + temperature.toFixed(1);
}

let textIndex1 = 0;
let textIndex2 = 0;
let textIndex3 = 0;
let imageIndex = 0;
let texts1 = [];
let texts2 = [];
let texts3 = [];
let imageList = [];
let namebutton1;
let LinkButton1;
let namebutton2;
let LinkButton2;

async function updateTexts() {
    try {
        const response = await fetch("config.json");
        const config = await response.json();
        texts1 = config.texts1 || [];
        texts2 = config.texts2 || [];
        texts3 = config.texts3 || [];
        imageList = config.imageste || [];
        namebutton1 = config.namebutton1 || "DISCORD";
        LinkButton1 = config.LinkButton1 || "https://discord.com/";
        namebutton2 = config.namebutton2 || 'GOOGLE';
        LinkButton2 = config.LinkButton2 || "https://discord.com/";
        loadContent();
    } catch (error) {
        console.error("❌ Error loading config.json:", error);
    }
}

function replacePlaceholders(text, replacements) {
    return text.replace(/\b(time:t|date:n|ping:ms|temp:c|day:th|day:eg)\b/g, key => replacements[key] || key);
}

updateTexts();

function LinkBio1() {
    window.location.href = LinkButton1;
}

function LinkBio2() {
    window.location.href = LinkButton2;
}

function loadContent() {
    const ping = getPing();
    const temperature = getTemperature();
    const currentTime = getCurrentTime();
    const currentDate = getCurrentDay();
    const thaiDay = getCurrentDayThai();
    const englishDay = getCurrentDayEG();
    
    const replacements = {
        'time:t': currentTime,
        'date:n': currentDate,
        'ping:ms': ping,
        'temp:c': temperature,
        'day:th': thaiDay,
        'day:eg': englishDay
    };

    document.getElementById("name-button1").innerText = namebutton1;
    document.getElementById("name-button2").innerText = namebutton2;
    document.getElementById("name-ste1").innerText = replacePlaceholders(texts1[textIndex1], replacements);
    document.getElementById('name-ste2').innerText = replacePlaceholders(texts2[textIndex2], replacements);
    document.getElementById("name-ste3").innerText = replacePlaceholders(texts3[textIndex3], replacements);
    document.getElementById("imageste").src = imageList[imageIndex];
}

function updateUI() {
    updateTexts();
    const ping = getPing();
    const temperature = getTemperature();
    const currentTime = getCurrentTime();
    const currentDate = getCurrentDay();
    const thaiDay = getCurrentDayThai();
    const englishDay = getCurrentDayEG();
    
    const replacements = {
        'time:t': currentTime,
        'date:n': currentDate,
        'ping:ms': ping,
        'temp:c': temperature,
        'day:th': thaiDay,
        'day:eg': englishDay
    };

    document.getElementById('name-button1').innerText = namebutton1;
    document.getElementById('name-button2').innerText = namebutton2;
    document.getElementById("name-ste1").innerText = replacePlaceholders(texts1[textIndex1], replacements);
    document.getElementById("name-ste2").innerText = replacePlaceholders(texts2[textIndex2], replacements);
    document.getElementById('name-ste3').innerText = replacePlaceholders(texts3[textIndex3], replacements);
    document.getElementById('imageste').src = imageList[imageIndex];
    
    textIndex1 = (textIndex1 + 1) % texts1.length;
    textIndex2 = (textIndex2 + 1) % texts2.length;
    textIndex3 = (textIndex3 + 1) % texts3.length;
    imageIndex = (imageIndex + 1) % imageList.length;
}

setInterval(async function () {
    updateUI();
}, 3000);