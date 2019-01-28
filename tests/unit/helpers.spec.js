import { expect } from 'chai'
import { getErrorMessage, inArray, generateUID, removeHMS } from '../../src/utils/helpers'

describe('no value specific', () => {
  // getErrorMessage
  it('should return empty string', () => {
    expect(getErrorMessage()).to.be.a('string')
    expect(getErrorMessage()).to.have.lengthOf(0)
  })

  // generateUID
  it('should return string and not empty', () => {
    expect(generateUID()).to.be.a('string')
    expect(generateUID()).to.have.lengthOf.at.least(1)
  })

  it('shouldn\'t return the same value with multiple calls', () => {
    const orginalValue = generateUID()
    expect(generateUID()).to.not.equal(orginalValue)
  })

  // removeHMS
  it('should return undefined', () => {
    expect(removeHMS()).to.be.a('undefined')
  })
})

// getErrorMessage
describe('firstParam is notExist', () => {
  const firstParam = null
  const secondParam = '111'
  it('should return secondParam', () => {
    expect(getErrorMessage(firstParam, secondParam)).to.equal(secondParam)
  })
})

describe('firstParam is object and has a key is message', () => {
  const param = { message: '111', value: '222' }
  const defaultParam = 'message'
  it('firstParam\'s include messsge', () => {
    expect(param).to.have.a.property('message')
  })

  it('should return a string', () => {
    expect(getErrorMessage(param, defaultParam)).to.be.a('string')
  })

  it('should return messagekey\'s value', () => {
    expect(getErrorMessage(param, defaultParam)).to.equal(param.message)
  })
})

// inArray
describe('secondParam is any and belong to array', () => {
  const firstParam = ['你好', 'jintian', 3]
  const secondParam = '你好'
  it('firstParam is include secondParam', () => {
    expect(firstParam).to.include(secondParam)
  })

  it('should return boolean', () => {
    expect(inArray(firstParam, secondParam)).to.be.a('boolean')
  })

  it('should return true', () => {
    expect(inArray(firstParam, secondParam)).to.equal(true)
  })
})

// removeHMS
describe('typeof param is not string', () => {
  const param = [111, undefined, null, new Date(), new RegExp(), [111, 222], { a: 1 }]
  it('should return itself', () => {
    const testResult = param.every((x) => removeHMS(x) === x)
    expect(testResult).to.equal(true)
  })
})

describe('typeof param is string', () => {
  const param = '111 222 333'
  it('should return string', () => {
    expect(removeHMS(param)).to.be.a('string')
  })

  it('should return value is not space', () => {
    expect(removeHMS(param)).not.to.include(' ')
  })
})
