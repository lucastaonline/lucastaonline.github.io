var ongoingTouches = new Array;

function copyTouch(touch) {
    return {
        identifier: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY
    };
}

function colorForTouch(touch) {
    var r = touch.identifier % 16;
    var g = Math.floor(touch.identifier / 3) % 16;
    var b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16); // make it a hex digit
    g = g.toString(16); // make it a hex digit
    b = b.toString(16); // make it a hex digit
    var color = "#" + r + g + b;
    //log("color for touch with identifier " + touch.identifier + " = " + color);
    return color;
}
/*function log(msg) {
  var p = document.getElementById('//log');
  p.innerHTML = msg + "\n" + p.innerHTML;
}*/
function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;

        if (id == idToFind) {
            return i;
        }
    }
    return -1; // não econtrado
}

function handleStart(evt) {
    evt.preventDefault();
    //log("touchstart.");
    var canvas = document.getElementById("quadro");;
    var ctx = canvas.getContext("2d");
    var touches = evt.changedTouches;
    var rect = canvas.getBoundingClientRect();

    for (var i = 0; i < touches.length; i++) {
        //log("touchstart:"+i+"...");
        ongoingTouches.push(copyTouch(touches[i]));
        var color = colorForTouch(touches[i]);
        ctx.beginPath();
        //ctx.arc(((touches[i].pageX - rect.left) / (rect.right - rect.left) * canvas.width), ((touches[i].pageY - rect.top) / (rect.bottom - rect.top) * canvas.height), 4, 0, 2 * Math.PI, false); // a circle at the start
        ctx.fillStyle = color;
        //ctx.fill();
        //log("touchstart:"+i+".");
    }
}

function handleMove(evt) {
    evt.preventDefault();
    var canvas = document.getElementById("quadro");;
    var ctx = canvas.getContext("2d");
    var touches = evt.changedTouches;
    var rect = canvas.getBoundingClientRect();

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            //log("continuing touch "+idx);
            ctx.beginPath();
            //log("ctx.moveTo("+ongoingTouches[idx].pageX+", "+ongoingTouches[idx].pageY+");");
            ctx.moveTo(((ongoingTouches[idx].pageX - rect.left) / (rect.right - rect.left) * canvas.width), ((ongoingTouches[idx].pageY - rect.top) / (rect.bottom - rect.top) * canvas.height));
            //log("ctx.lineTo("+touches[i].pageX+", "+touches[i].pageY+");");
            ctx.lineTo(((touches[i].pageX - rect.left) / (rect.right - rect.left) * canvas.width), ((touches[i].pageY - rect.top) / (rect.bottom - rect.top) * canvas.height));
            ctx.lineWidth = 3;
            ctx.strokeStyle = color;
            ctx.stroke();

            ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
            //log(".");
        } else {
            //log("can't figure out which touch to continue");
        }
    }
}


function handleEnd(evt) {
    evt.preventDefault();
    //log("touchend/touchleave.");
    var canvas = document.getElementById("quadro");;
    var ctx = canvas.getContext("2d");
    var touches = evt.changedTouches;
    var rect = canvas.getBoundingClientRect();

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ctx.lineWidth = 3;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(((ongoingTouches[idx].pageX - rect.left) / (rect.right - rect.left) * canvas.width), ((ongoingTouches[idx].pageY - rect.top) / (rect.bottom - rect.top) * canvas.height));
            ctx.lineTo(((touches[i].pageX - rect.left) / (rect.right - rect.left) * canvas.width), ((touches[i].pageY - rect.top) / (rect.bottom - rect.top) * canvas.height));
            //ctx.fillRect(((touches[i].pageX - rect.left) / (rect.right - rect.left) * canvas.width) - 4, ((touches[i].pageY - rect.top) / (rect.bottom - rect.top) * canvas.height) - 4, 8, 8); // and a square at the end
            ongoingTouches.splice(idx, 1); // remove it; we're done
        } else {
            //log("can't figure out which touch to end");
        }
    }
}

window.addEventListener('orientationchange', function () {
    //Event
});

function handleCancel(evt) {
    evt.preventDefault();
    //log("touchcanccanvas.");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.splice(i, 1); // remove it; we're done
    }
}

$(document).ready(function () {
    var canvas = document.getElementById("quadro");
    var context = canvas.getContext("2d");
    context.fillStyle = 'beige';
    context.fillRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchleave", handleEnd, false);
    canvas.addEventListener("touchmove", handleMove, false);

});


/*var quadro = document.getElementById("quadro");
quadro.setAttribute("width", largura);
quadro.setAttribute("height", altura);*/

$(document).on("click", "#apagar", function () {
    var canvas = document.getElementById("quadro");;
    var context = canvas.getContext("2d");
    context.fillStyle = 'beige';
    context.fillRect(0, 0, canvas.width, canvas.height);
});

$(document).on("click", "#salvar", function () {
    var canvas = document.getElementById("quadro");
    var lnk = document.createElement('a'),
        e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = "Sua assinatura";

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL('image/png;base64');

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);
        lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
});
