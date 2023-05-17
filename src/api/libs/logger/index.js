class Logger {
  name = ['Logger']

  constructor(name = '') {
    this.name.push(name)
  }

  info(key, ...values) {
    console.info(this.name.join('.'), key, ...values)

    return this
  }
}

module.exports = Logger

