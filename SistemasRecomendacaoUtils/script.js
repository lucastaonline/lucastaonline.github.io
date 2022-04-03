window.onload = function () {
    document.getElementById("next-step").innerHTML = "Avançar";
    document.getElementById("previous-step").innerHTML = "Voltar";

    var elem = document.querySelector('#codelab-nav-buttons');
    elem.parentNode.removeChild(elem);

    elem = document.querySelector('#codelab-feedback');
    elem.parentNode.removeChild(elem);

    elem = document.querySelector('#done');
    elem.parentNode.removeChild(elem);
}