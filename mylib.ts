interface ArrayConstructor {
     from(arrayLike: any, mapFn?, thisArg?): Array<any>;
 }

function load_page(page: string): void {
     document.getElementById("content").innerHTML=`<iframe  src=${page}></iframe>`;
}

function set_active(href: string, id: string = 'menu'): void {
     const menu = document.getElementById(id)
     Array.from(menu.children).map((child: any) => child.removeAttribute("class"))
     const selection = Array.from(menu.children).filter((child: any) => child.getAttribute("href")==`#${href}`)
     selection.map((elem: any) => elem.setAttribute('class', 'active'))
 }