/**
 * Central navigation — all page loads go through navigateTo().
 * It sets the hash; the hashchange listener calls _doLoadPage().
 * This guarantees URL and content stay in sync.
 */

function navigateTo(page) {
    var target = page.replace(/^#/, '');
    var current = window.location.hash.replace('#', '');
    if (current === target) {
        // Hash is already correct — hashchange won't fire, so load directly
        _doLoadPage(target);
    } else {
        // Setting the hash triggers the hashchange listener
        window.location.hash = '#' + target;
    }
}

function _doLoadPage(page) {
    var content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = '<iframe src="' + page + '"></iframe>';
    // Close mobile nav after navigation
    var ul  = document.querySelector('.topnav ul');
    var btn = document.getElementById('hamburger-btn');
    if (ul)  ul.classList.remove('open');
    if (btn) btn.classList.remove('open');
    // Update active link
    _updateActiveLink();
}

// Legacy compat — some inline onclick may still call load_page
function load_page(page, content) {
    navigateTo(page);
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
        var href = (a.getAttribute('href') || '').replace('#', '');
        if (hash && href === hash) {
            a.classList.add('active');
        }
    });
}

// Single source of truth — hashchange drives all navigation
window.addEventListener('hashchange', function() {
    var hash = window.location.hash.replace('#', '');
    if (hash) {
        _doLoadPage(hash);
    }
});

/* ── Menu class ────────────────────────────────── */
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

            if (item.href != null) {
                linkEl.href = (item.href.slice(0, 1) === '#') ? item.href : '#' + item.href;
            }

            itemEl.appendChild(linkEl);

            // If no subelems, clicking navigates via the href (hashchange)
            // No need for action — the href does everything.

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
