/**
 * Author: Passawit Kaovilai
 * Purpose: To customize a blogger.com blog's html without using built in edit-html for portability between themes
 */
const interestingTagNames = ["button"];
const interestingClassNames = ["widget"];
var gaTrackerName = "blogger";
for(i in interestingTagNames){
    var elements = document.getElementsByTagName(interestingTagNames[i]);
    for(j in elements){ //element = single button
        var element = elements[j];
        if(typeof element == undefined || element.tagName == undefined) continue;
        element.setAttribute("onclick",gaSendElement(element));
    }
}
for(i in interestingClassNames){
    var elements = document.getElementsByClassName(interestingClassNames[i]);
    for(j in elements){ //element = single button
        var element = elements[j];
        if(typeof element == undefined || element.tagName == undefined) continue;
        element.setAttribute("onclick",gaSendElement(element));
    }
}

/**
 * String for onclick for Send to google analytics
 * @param {*} element 
 */
function gaSendElement(element){
    return gaSend('event','click',element.tagName,'id: '+ element.id +' class: ' + element.className);
}
/**
 * String for onclick for Send to google analytics
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#the_send_method
 * @param {*} hit 
 * @param {*} cat 
 * @param {*} act 
 * @param {*} lab 
 */
function gaSend(hit,cat,act,lab){
    return 'ga('+'\''+gaTrackerName+'.send' +'\',\''+ hit+'\',\''+cat+'\',\''+act+'\',\''+lab+'\')';
}

/**
 * Setter
 * @param {string} trackerName 
 */
function setGATrackerName(trackerName){
    gaTrackerName = trackerName;
}