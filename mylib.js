function load_page(page) {
    document.getElementById("content").innerHTML = "<iframe  src=" + page + "></iframe>";
}
function set_active(href, id) {
    if (id === void 0) { id = 'menu'; }
    var menu = document.getElementById(id);
    Array.from(menu.children).map(function (child) { return child.removeAttribute("class"); });
    var selection = Array.from(menu.children).filter(function (child) { return child.getAttribute("href") == "#" + href; });
    selection.map(function (elem) { return elem.setAttribute('class', 'active'); });
}
