function load_page(page, content) {
    content.innerHTML = '<iframe src="' + page + '"></iframe>';
    // Close mobile nav after navigation
    var ul  = document.querySelector('.topnav ul');
    var btn = document.getElementById('hamburger-btn');
    if (ul)  ul.classList.remove('open');
    if (btn) btn.classList.remove('open');
    // Update active link
    _updateActiveLink();
}

function toggleMobileNav() {
    var ul  = document.querySelector('.topnav ul');
    var btn = document.getElementById('hamburger-btn');
    if (ul)  ul.classList.toggle('open');
    if (btn) btn.classList.toggle('open');
}

function _updateActiveLink() {
    var hash = window.location.hash.replace('#', '');
    document.querySelectorAll('nav li a').forEach(function(a) {
        a.classList.remove('active');
        var href = a.getAttribute('href') || '';
        if (hash && href === '#' + hash) {
            a.classList.add('active');
        }
    });
}

// Re-run on hash change (e.g. links from within iframe pages)
window.addEventListener('hashchange', function() {
    var hash = window.location.hash.replace('#', '');
    if (hash) {
        var content = document.getElementById('content');
        if (content) load_page(hash, content);
    }
    _updateActiveLink();
});

var Menu = (function () {
    function Menu(container, menuItems) {
        this.menuEl = document.createElement('ul');
        container.appendChild(this.menuEl);
        this._populate(this.menuEl, menuItems);
    }
    Menu.prototype._populate = function (parent, menuItems) {
        var self = this;
        menuItems.forEach(function (item) {
            var itemEl = document.createElement('li');
            var linkEl = document.createElement('a');
            linkEl.textContent = item.title;
            if (item.href != null)
                linkEl.href = (item.href.slice(0, 1) === '#') ? item.href : '#' + item.href;
            itemEl.appendChild(linkEl);
            if (item.action != null)
                itemEl.addEventListener('click', function () { item.action(); });
            if (item.subelems) {
                var submenu = document.createElement('ul');
                linkEl.setAttribute('class', 'dropbtn');
                submenu.setAttribute('class', 'dropdown-content');
                itemEl.setAttribute('class', 'dropdown');
                self._populate(submenu, item.subelems);
                itemEl.appendChild(submenu);
            }
            parent.appendChild(itemEl);
        });
    };
    return Menu;
}());
