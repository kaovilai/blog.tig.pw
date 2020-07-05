/**
 * Author: Passawit Kaovilai
 * Purpose: To customize a blogger.com blog's html without using built in edit-html for portability between themes
 */
const interestingTagNames = ["button","a"];
const interestingClassNames = ["widget"];
const interestingAttributes = ["onclick","onfocus","onmouseover","onmousedown"];
var gaTrackerName = "blogger";
const cardHeightDefault = 175;

function adjsloaded(){
    for(i in interestingTagNames){
        sendElements(document.getElementsByTagName(interestingTagNames[i]));
    }
    for(i in interestingClassNames){
        sendElements(document.getElementsByClassName(interestingClassNames[i]));
    }
    cardStack();
}

/**
 * Perform card stacking if ad is a credit card.
 */
function cardStack(cardHeight){
    cardHeight = (typeof cardHeight == "undefined") ? cardHeightDefault : cardHeight;
    var adjs = document.getElementsByClassName('adjs');
    var cardstackStyle = document.createElement('style');
    cardstackStyle.id = "cardstack-style";
    var cardHeight;
    if(adjs.length == 0) return;
    for(var i = 0; i < adjs.length; i++){
        if(typeof adjs[i].src != "string") continue;
        if(isCardStackElement(adjs[i])){
            if(!adjs[i].classList.contains('cardstack')) adjs[i].className += ' cardstack';
            if(!isCardStackElement(adjs[Number(i)+1])){
                if(!adjs[i].classList.contains('lastcard')) adjs[i].className += ' lastcard';
                //cardHeight = adjs[i].height;
                //console.log('cardHeight is' + cardHeight);
            }
        }
    }
    if(document.getElementById(cardstackStyle.id) == null){
        cardstackStyle.innerHTML = '\
        .adjs.cardstack:hover { \
            margin-bottom: 0;\
            -webkit-transform:rotate(15deg) scale(1.05);\
        } \
        .adjs.cardstack { \
            margin-bottom: -' + cardHeight*.7 + 'px;\
            transition: .35s;\
        }\
        .adjs.cardstack.lastcard { \
            margin-bottom: 0;\
        }'
        document.head.insertAdjacentElement('afterbegin',cardstackStyle);
    }
}
/**
 * check if is card stack
 * @param {*} element element to check
 * @returns boolean
 */
function isCardStackElement(element){
    var curSrc = element.src;
    if(typeof curSrc == 'undefined') return false;
    var checkfor = [
        'aexp-static.com',
        'discovercard.com',
        'deserve.com'
    ];
    for (var i = 0; i < checkfor.length; i++){
        if(curSrc.includes(checkfor[i])) return true;
    }
    return false;
}
    /**
 * Send element to GA
 * @param {*} elements 
 */
function sendElements(elements){
    for(j in elements){ //element = single button
        var element = elements[j];
        if(typeof element == "undefined" || typeof element.tagName == "undefined" || typeof element == "function") continue;
        for(i in interestingAttributes){
            if(element.id == '' && element.className == '') continue;
            element.setAttribute(interestingAttributes[i],gaSendElement(element,interestingAttributes[i]));
        }
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