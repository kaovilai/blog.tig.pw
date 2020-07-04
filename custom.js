/**
 * Author: Passawit Kaovilai
 * Purpose: To customize a blogger.com blog's html without using built in edit-html for portability between themes
 */
const interestingTagNames = ["button","a"];
const interestingClassNames = ["widget"];
const interestingAttributes = ["onclick","onfocus","onmouseover","onmousedown"];
var gaTrackerName = "blogger";

function adjsloaded(){
    for(i in interestingTagNames){
        sendElements(document.getElementsByTagName(interestingTagNames[i]));
    }
    for(i in interestingClassNames){
        sendElements(document.getElementsByClassName(interestingClassNames[i]));
    }
}
    /**
 * Send element to GA
 * @param {*} elements 
 */
function sendElements(elements){
    for(j in elements){ //element = single button
        var element = elements[j];
        if(typeof element == "undefined" || typeof element.tagName == "undefined" || typeof element == "function") continue;
        for(i in interestingAttributes)
            element.setAttribute(interestingAttributes[i],gaSendElement(element,interestingAttributes[i]));
    }
}

/**
 * String for onclick for Send to google analytics
 * @param {*} element 
 */
function gaSendElement(element,hit){
    hit = (typeof hit != "undefined") ? hit : "onclick";
    return gaSend('event',hit,element.tagName,'id: '+ element.id +' class: ' + element.className);
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