import * as __ from './../../js/nElement.js'

const LETTERS = ['X', 'X', 'B', 'B', 'Y', 'Y', 'D', 'D', 'Z', 'Z']

__.nElement.fromElement(document.body)
  .setStyle('margin', '0')

const app = __.nElement.fromId('app')

const header = new __.nElement()
header.setStyle('padding', '1rem')
header.setStyle('background-color', '#003399')
app.append(header)

const title = new __.nH1()
title.setText('Speed Match')
title.setStyle('color', '#FFFFFF')
title.setStyle('text-align', 'center')
header.append(title)

const body = new __.nElement()
app.append(body)

class Game {
  dom = null

  card = null
  buttons = null

  ix = 0
  selecteds = []

  constructor({
    dom,
    letters,
  }) {
    this.dom = dom
    //
    this.createStartButton()
    //
    this.setLetters(letters)
  }

  createStartButton() {
    // FIXME
  }

  setLetters(letters = []) {
    this.letters = letters.sort(() => Math.floor(Math.random() * 2) - 1)
    //
    return this
  }

  clear() {
    this.dom.clear()
    //
    return this
  }

  createCard() {
    this.card = new __.nElement()
    this.card.setStyle('width', '20rem')
    this.card.setStyle('height', '20rem')
    this.card.setStyle('display', 'block')
    this.card.setStyle('font-size', '10rem')
    this.card.setStyle('margin', '2rem auto')
    this.card.setStyle('text-align', 'center')
    this.card.setStyle('line-height', '20rem')
    this.card.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #003399')
    this.dom.append(this.card)
    //
    return this
  }

  createButton({
    text = 'button',
    color = null,
    onClick = null,
  } = {}) {
    const button = new __.nButton()
    button.setText(text)

    button.setStyle('padding', '1rem')

    if (color) {
      button.setStyle('background-color', color)
      button.setStyle('color', '#FFFFFF')
    }

    if (typeof onClick === 'function') {
      button.on('click', () => onClick())
    }

    return button
  }

  onButtonClick(option) {
    this.selecteds.push({ option })
    //
    this.nextCard()
  }

  createButtons() {
    const self = this

    self.buttons = new __.nFlex()
    self.buttons.setStyle('width', '20rem')
    self.buttons.setStyle('margin', '0 auto')

    self.buttons.append(
      self.createButton({
        text: 'wrong',
        color: '#CC0000',
        onClick: () => self.onButtonClick('wrong')
      })
    )

    self.buttons.append(
      self.createButton({
        text: 'right',
        color: '#009900',
        onClick: () => self.onButtonClick('right')
      })
    )

    self.dom.append(self.buttons)
  }

  addCards() {
    this.createCard()
    this.createButtons()
  }

  finishGame() {
    console.log('finish game')
  }

  nextCard() {
    const letter = this.letters[this.ix++]
    if (letter) {
      this.card.setText(letter)
    } else {
      this.finishGame()
    }
  }

  start() {
    this.clear()
    this.addCards()
    this.nextCard()
  }
}

const game = new Game({
  dom: body,
  letters: LETTERS,
})
game.start()
