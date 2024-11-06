// ==UserScript==
// @name         Compliance Check TM1
// @namespace    http://tampermonkey.net/
// @version      2024-10-01
// @description  try to take over the world!
// @author       Joseph Rutherford, Teya Jackson, Derian Middleton, Nik Coleman
// @match        https://fclm-portal.amazon.com/employee/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    const specificNames = [
         "C-Returns Support♦Water Spider",
        "C-Returns Support♦Unloader",
        "C-Returns Support♦C-Returns_EndofLine",
        "C-Returns Support♦C-Returns_StowSweep",
        "WHD Grading Support♦Water Spider",
        "V-Returns Support♦Vreturns WaterSpider",
    ];
    const targetTdIndex = 3;
    const fiveHoursInSeconds = 5 * 60 * 60;
    let isBelowFiveHours = true;
    let banner = document.getElementById('time-banner');
    if (!banner) {
            banner = document.createElement('div');
            banner.id = 'time-banner';
            banner.innerText = `AA is eligible for a high stress indirect path!`;
            banner.style.backgroundColor = 'green';
            banner.style.top = '0';
            banner.style.width = '100%';
            banner.style.padding = '10px';
            banner.style.textAlign = 'center';
            banner.style.zIndex = '1000';
            banner.style.fontSize = '20px';
            document.body.prepend(banner);
        }
    function UpdateBanner(banner1, time) {
        if (5 > time > 0) {
            banner1.innerText = `WARNING: AA not eligible for a high stress indirect path, but within compliance`;
            banner1.style.backgroundColor = 'red';
            banner1.style.color = 'white';
            console.log(banner1);
        } else {
            banner1.innerText = `WARNING: AA not eligible for a high stress indirect path`;
            banner1.style.backgroundColor = 'red';
            banner1.style.color = 'white';
            console.log(banner1);}
        row.appendChild(resultText);
    }
    function convertToSeconds(timeStr) {
        const [minutes, seconds] = timeStr.split(':').map(Number);
        return (minutes * 60) + seconds;
    }
    function displayResult(timeStr, isBelowFiveHours, row) {
        const resultText = document.createElement('p');
        resultText.style.padding = '10px';
        resultText.style.fontWeight = 'bold';
        if (!isBelowFiveHours) {
            resultText.innerText = `Time: ${timeStr} - Above 5 hours`;
            resultText.style.backgroundColor = 'red';
            resultText.style.color = 'white';
        } else {
            resultText.innerText = `Time: ${timeStr} - Below 5 hours`;
            resultText.style.backgroundColor = 'green';
            resultText.style.color = 'white';
        }
        row.appendChild(resultText);
    }
    const tableRows = document.querySelectorAll("tr");
    tableRows.forEach((row) => {
        specificNames.forEach((name) => {
            if (row.innerText.includes(name)) {
                console.log(`Found row with name: ${name}`);
                const tds = row.querySelectorAll("td");
                if (tds.length > targetTdIndex) {
                    const timeStr = tds[targetTdIndex].innerText.trim();
                    const totalSeconds = convertToSeconds(timeStr);
                    const isBelowFiveHours = totalSeconds < fiveHoursInSeconds;
                    console.log(`Time for ${name}: ${timeStr} (${totalSeconds} seconds)`);
                    displayResult(timeStr, isBelowFiveHours, row);
                    const totalTimeInHoursAndMinutes = `${Math.floor(totalSeconds / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m`;
                    banner.innerText = `Total time: ${totalTimeInHoursAndMinutes}`;
                    UpdateBanner(banner, totalSeconds);
                } else {
                    console.log(`Row for ${name} does not have a 4th <td>.`);
                }
            }
        });
    });
})();
