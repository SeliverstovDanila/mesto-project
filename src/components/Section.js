export class Section {
    constructor( {render}, container) {
        this._render = render
        this._selector = container // _selector взят из конструктора OOP_Card.js
    }

    tagItem(item) {
        this._selector.prepend(item)
    }

    createItems(items) {
        items.forEach(element => {
            this._render(element)
        })
    }
}