function load_page(page, content) {
    content.innerHTML = "<iframe  src=" + page + "></iframe>";
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
            if (item.href != null)
                linkEl.href = (item.href.slice(0, 1) == '#') ? item.href : '#' + item.href;
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
