function showUI(id) {
    ID(`UI_${id}`).style.display = "";
}

/********************************************************************************************/
var panelIndex = 10;

function dragFunc(triggerFrom, triggerTo) {
    document.getElementById(triggerTo).addEventListener("mousedown", (e) => {
        document.getElementById(triggerTo).style.zIndex = panelIndex++;
    });

    var object = document.getElementById(triggerFrom),
        initX, initY, firstX, firstY;
    var drgThis = document.getElementById(triggerTo);
    object.addEventListener('mousedown', function (e) {
        e.preventDefault();
        initX = drgThis.offsetLeft;
        initY = drgThis.offsetTop;
        firstX = e.pageX;
        firstY = e.pageY;
        // initX = drgThis.offsetLeft;
        // initY = drgThis.offsetTop;
        // firstX = e.pageX;
        // firstY = e.pageY;
        drgThis.parentElement.addEventListener('mousemove', dragIt, false); //drgThis.parentElement
        window.addEventListener('mouseup', function () { //window
            drgThis.parentElement.removeEventListener('mousemove', dragIt, false); //drgThis.parentElement
        }, false);
    }, false);
    function dragIt(e) {
        var xOff = initX + e.pageX - firstX;
        var yOff = initY + e.pageY - firstY;
        // if( (xOff > 0) && (xOff < 405) ) drgThis.style.left = xOff + 'px';
        // if( (yOff > 0) && (yOff < 405) ) drgThis.style.top = yOff + 'px';
        drgThis.style.left = xOff + 'px';
        drgThis.style.top = yOff + 'px';
    }
}

function openPanel(id, displayAs) {
    var disArr = ["", "grid", "flex", "inline", "none"];
    document.getElementById(id).style.display = disArr[displayAs];
    document.getElementById(id).style.transition = "0.1s ease-in-out";
    document.getElementById(id).style.zIndex = panelIndex++;
    setTimeout(() => {
        document.getElementById(id).style.opacity = "1";
    }, 1);
    setTimeout(() => {
        document.getElementById(id).style.transition = "none";
    }, 500);
}

function closePanel(id) {
    document.getElementById(id).style.transition = "0.1s ease-in-out";
    document.getElementById(id).style.opacity = "0";
    setTimeout(() => {
        document.getElementById(id).style.display = "none";
        document.getElementById(id).style.transition = "none";
    }, 500);
}
/********************************************************************************************/
function folderOnClickCallback(e) {
    //console.log(e.classList[0]);

    document.querySelectorAll("#userInputContainer [id^='UI_']").forEach((element) => {
        element.style.display = "none";
    });

    var isDefaultTriggered = false;
    var paramName = e.classList[0];
    // console.warn(paramName);
    switch (paramName) {
        case "current": break;
        case "voltage": break;
        case "power": break;

        default:
            isDefaultTriggered = true;
            alert("Settings Panel Not Found For This Parameter !");
    }
    if (!isDefaultTriggered) {
        ID("userInputContainer").style.display = "";
        showUI(paramName);
    }
}//folderOnClickCallback
/********************************************************************************************/
function parents(el, selector) {
    var parent_container = el;
    do {
        parent_container = parent_container.parentNode;
    }
    while (!parent_container.matches(selector) && parent_container !== document.body) {
    }
    return parent_container;
}
/********************************************************************************************/
function fileOnClickCallback(e) {
    //console.error(e.getAttribute('datavalue'));
    var paramValue = e.getAttribute('datavalue');
    var val = prompt("Enter Value");
    if (val.length < 1) {
        alert(`Invalid Input !`)
        return;
    }
    //e.innerText = val;

    var nodeDir = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    var mainNode = parents(e, "details");
    var indx = 0;
    while (mainNode !== document.body) {
        indx++;
        nodeDir[indx] = mainNode.firstChild.classList[0];
        mainNode = parents(mainNode, "details");
    }
    nodeDir[0] = --indx;
    nodeDir[indx] = nodeDir[indx] + ((nodeDir[0] > 1) ? "[0]" : "");
    nodeDir[++indx] = '';

    var dir = "";
    for (var dirInd = nodeDir[0]; dirInd > 0; dirInd--) {
        dir += `${nodeDir[dirInd]}${(dirInd > 1) ? "." : ""}`;
    }
    val = isNaN(val) ? `${val}` : parseFloat(val);
    updateJSON_OBJ(dir, val);
    userInputUpdate(dir, val);
}//fileOnClickCallback
/********************************************************************************************/
function userInputUpdate(dir, value) {
    var newDir = dir.replace(/\[[0-9]+\]/, "").split(".");
    var finalDir = "";

    var lastIndex;
    newDir.forEach(function (item, i) {
        if (i < (newDir.length - 1))
            finalDir += `.${item} ~ details `;
        lastIndex = i;
    });
    finalDir += `.${newDir[lastIndex]} + font`;
    //console.log(finalDir);
    document.querySelector(finalDir).setAttribute("datavalue", value);
    document.querySelector(finalDir).innerText = isNaN(value) ? `"${value}"` : parseFloat(value);
    var val = isNaN(value) ? `${value}` : parseInt(value);
    updateJSON_OBJ(dir, val);
    //console.log(document.querySelector(finalDir));
}
/********************************************************************************************/
function updateValue(location, concatStr = "") {
    var val = event.target.value;

    var prefix = "", suffix = "";
    if (concatStr.startsWith("^")) {
        prefix = concatStr.substring(1);
    }
    else if (concatStr.startsWith("$")) {
        suffix = concatStr.substring(1);
    }
    if (/^(13|0)$/.test("" + event.keyCode)) {//If 'Enter' key pressed
        try {
            if ((val.length < 1) || (event.target.type == "number") && (isNaN(val))) {
                event.target.style.background = "pink";
                return;
            }
            event.target.style.background = "white";
            userInputUpdate(location, `${prefix}${val}${suffix}`);
        }
        catch (err) {
            log('<b class=red >Key Not Found !</b>');
            console.warn('Key Not Found !');
        }
    }
}
/********************************************************************************************/
function folderOnToggleCallback(e) {
    //console.warn(e.classList[0]);
}//folderOnToggleCallback
/********************************************************************************************/
