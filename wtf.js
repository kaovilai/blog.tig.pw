/**
 * Author: Passawit Kaovilai (Tiger)
 * Repository: github.com/kaovilai/adjs
 * License: see github.com/kaovilai/adjs/LICENSE
 */

/** default ad url */
const adjsonurl ="https://adjs.tig.pw/ad.json";
const promoElement = '<a href="https://github.com/kaovilai/adjs" target="_blank"><p style="text-align: right; margin: 0; font-size: small"><i>populated by AdJS</i></p></a>';
/**
 * Populate ad
 * NOTE: Take care to use undefined without quotes in `onload` instead of null
 *       because null is an object
 * here's an example from console
 * >> typeof undefined
 * << "undefined"
 * >> typeof null
 * << "object"
 * @param {string} elementid id of element to populate
 * @param {string} adkey key to retrieve data from json
 * @param {URL} jsonurl json location of ad data
 */
function populateKey(elementid, adkey, jsonurl){
    adkey = (typeof adkey != "undefined") ? adkey : elementid; //allow adkey to default to element id
    jsonurl = (typeof jsonurl != "undefined") ? jsonurl : adjsonurl; //allow jsonurl to default to adjsonurl const
    var adjson = get(jsonurl,'json',populateJSON,elementid,adkey);
}
/**
 * Use to populate array of element ids with json data at url
 * @param {URL} jsonurl json location of ad data
 * @param {Array} elementIdArray array of element ids
 */
function populateKeysURL(jsonurl, elementIdArray){
    for(i in elementIdArray) populateKey(elementIdArray[i], undefined, jsonurl);
}
/**
 * Use to populate array of element ids
 * @param {Array} elementIdArray array of element ids
 */
function populateKeys(elementIdArray){
    for(i in elementIdArray) populateKey(elementIdArray[i]);
}
/**
 * * Populate ad
 * @param {string} elementid element to populated
 * @param {JSON} adjson json to populate element
 */
function populateJSON(elementid, adkey, adjson){
    var element = document.getElementById(elementid);
    //if elementid does not exist on page, quit immediately.
    if(element == null) {
        console.warn(elementid + ' is not a valid elementid on this page');
        return;
    }
    var adsets = getVal(adkey,adjson);
    if(typeof adsets == "undefined" || adsets.length == 0) return; //don't populate empty adsets
    var adelementsets = getAdElementSets(adsets);
    var style = document.createElement('style');
    style.id='adjs-style';
    element.innerHTML=promoElement;
    if(document.getElementById(style.id) == null){
    style.innerHTML = '\
        img.adjs { \
            max-width: 100%; \
            width: 100%; \
            height: auto; \
            -webkit-filter: drop-shadow(2px 2px 10px orange);\
            transition: .15s;\
            transition-timing-function: ease-out;\
        }\
        img.adjs:hover {\
            -webkit-filter: drop-shadow(0px 0px 40px white);\
            -webkit-transform: scale(1.05);\
            animation: wiggle 1s infinite;\
            \
        }\
        @keyframes wiggle{\
            0%{\
                    -webkit-transform:rotate(0deg);\
                }    \
            25%{\
                    -webkit-transform:rotate(2deg);\
                }    \
            50%{\
                    -webkit-transform:rotate(0deg);\
                }    \
            75%{\
                    -webkit-transform:rotate(-2deg);\
                }    \
            100%{\
                    -webkit-transform:rotate(0deg);\
                }    \
        }\
        ';
        element.insertAdjacentHTML('beforeend',style.outerHTML);
    }
    element.insertAdjacentHTML('beforeend',adelementsets);
    if(typeof loaded == 'function') loaded();
}
/**
 * Generate AdElementSets
 * @param {JSON} adsets Sets of ads JSON
 */
function getAdElementSets(adsets){
    var adelementsets = "";
    for(i in adsets){
        if(adsets[i].expire) continue; //don't show expired ad
        var adelement = document.createElement("a");
        adelement.href = adsets[i]['href'];
        adelement.target = "_blank";
        adelement.className = adsets[i]['network']+'-'+ adsets[i]['company']+'-'+ adsets[i]['campaign'];
        adelement.rel='sponsored';
        var img = document.createElement('img');
        img.src = adsets[i]['img'];
        img.className = "adjs";
        adelement.insertAdjacentElement('afterbegin',img);
        adelementsets+=adelement.outerHTML + "<br>";
    }
    return adelementsets;
}
/**
 * calls populate to populate sidebar-ad
 */
function populateSidebar(){
    populateKey("sidebar-ad","sidebar");
}
/**
 * Helper function to retrieve response from URL
 * @param {string} url URL to retrieve response from
 * @param {string} type type of response
 */
function get(url,type,returningfunction,param1,param2){
    var httpreq = new XMLHttpRequest();
    var response = "";
    httpreq.responseType = type;
    httpreq.open("GET",url,true);
    // httpreq.onprogress = function () {
        //     console.log('LOADING', httpreq.readyState); // readyState will be 3
        // };
    httpreq.onload = function() {
        response = httpreq.response;
        returningfunction(param1,param2,response);
    };
    httpreq.send();
}
/**
 * Helper function to retrieve object given key in a JSON array
 * @param {string} key Key
 * @param {JSON} obj JSON Array
 */
function getVal(key, obj){
    for(i in obj){
        if(!obj.hasOwnProperty(i)) continue;
        if(i == key) return obj[i];
    }
}
/**
 * Tell other scripts we are done here
 */
function loaded(){
    if(typeof adjsloaded == "function") adjsloaded();
}
