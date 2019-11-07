function load_page(page, content) {
    content.innerHTML = "<iframe  src=" + page + "></iframe>";
}
function set_active(href, id) {
    if (id === void 0) { id = 'menu'; }
    var menu = document.getElementById(id);
    Array.from(menu.children).map(function (child) { return child.removeAttribute("class"); });
    var selection = Array.from(menu.children).filter(function (child) { return child.getAttribute("href") == "#" + href; });
    selection.map(function (elem) { return elem.setAttribute('class', 'active'); });
}
var Menu = /** @class */ (function () {
    function Menu(container, menuItems) {
        this.menuEl = document.createElement('ul');
        container.appendChild(this.menuEl);
        this._populate(this.menuEl, menuItems);
    }
    Menu.prototype._populate = function (parent, menuItems) {
        var _loop_1 = function (item) {
            var itemEl = document.createElement('li');
            var linkEl = document.createElement('a');
            linkEl.text = item.title;
            itemEl.appendChild(linkEl);
            if (item.action != null)
                itemEl.addEventListener('click', function () { return item.action(); });
            if (item.subelems) {
                var submenu = document.createElement('ul');
                linkEl.setAttribute("class", "dropbtn");
                submenu.setAttribute("class", "dropdown-content");
                itemEl.setAttribute("class", "dropdown");
                this_1._populate(submenu, item.subelems);
                itemEl.appendChild(submenu);
            }
            parent.appendChild(itemEl);
        };
        var this_1 = this;
        for (var _i = 0, menuItems_1 = menuItems; _i < menuItems_1.length; _i++) {
            var item = menuItems_1[_i];
            _loop_1(item);
        }
    };
    return Menu;
}());
