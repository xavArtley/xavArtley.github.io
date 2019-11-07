interface ArrayConstructor {
  from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

function load_page(page: string, content:HTMLElement): void {
  content.innerHTML = `<iframe  src=${page}></iframe>`;
}

type MenuItems = {
  title: string
  action: CallableFunction | null
  href: string| null
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
      if (item.href != null) 
        linkEl.href = (item.href.slice(0,1)=='#') ? item.href : '#' + item.href
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


