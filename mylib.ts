interface ArrayConstructor {
  from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

function load_page(page: string, content:HTMLElement): void {
  content.innerHTML = `<iframe  src=${page}></iframe>`;
}

function set_active(href: string, id: string = 'menu'): void {
  const menu = document.getElementById(id)
  Array.from(menu.children).map((child: any) => child.removeAttribute("class"))
  const selection = Array.from(menu.children).filter((child: any) => child.getAttribute("href") == `#${href}`)
  selection.map((elem: any) => elem.setAttribute('class', 'active'))
}

type MenuItems = {
  title: string
  action: CallableFunction | null
  subelems?: MenuItems[]
}


class Menu {
  menuEl: HTMLUListElement

  constructor(container: HTMLElement, menuItems: MenuItems[]) {
    this.menuEl = document.createElement('ul')
    container.appendChild(this.menuEl)
    this._populate(this.menuEl, menuItems)
  }

  _populate(parent: HTMLUListElement, menuItems: MenuItems[]){
    for(let item of menuItems){
      const itemEl: HTMLLIElement = document.createElement('li')
      const linkEl: HTMLAnchorElement = document.createElement('a')
      linkEl.text = item.title
      itemEl.appendChild(linkEl)
      if(item.action != null)
        itemEl.addEventListener('click', () => item.action())
      
      if(item.subelems){
        const submenu: HTMLUListElement = document.createElement('ul')
        linkEl.setAttribute("class", "dropbtn")
        submenu.setAttribute("class", "dropdown-content")
        itemEl.setAttribute("class","dropdown")
        this._populate(submenu, item.subelems)
        itemEl.appendChild(submenu)
      }
      parent.appendChild(itemEl)
    }
  }
}


