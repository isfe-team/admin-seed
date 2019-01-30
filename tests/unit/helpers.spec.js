import { expect } from 'chai'
import { getErrorMessage, inArray, generateUID, removeHMS } from '../../src/utils/helpers'

describe('#getErrorMessage', () => {
  describe('no input', () => {
    it('should return empty string', () => {
      expect(getErrorMessage()).to.equal('')
    })
  })

  describe('error is not exist', () => {
    const error = null
    const defaultValue = '0'
    it('should return defaut value', () => {
      expect(getErrorMessage(error, defaultValue)).to.equal(defaultValue)
    })
  })

  describe('error is object and has message', () => {
    const error = { message: '111' }
    const defaultValue = 'default'
    const MESSAGE = 'message'
    const newError = new Error(MESSAGE)
    it('should return message', () => {
      expect(getErrorMessage(error, defaultValue)).to.equal(error.message)
      expect(getErrorMessage(newError, defaultValue)).to.equal(MESSAGE)
    })
  })
})

describe('#generateUID', () => {
  const testResult = generateUID()
  describe('no input', () => {
    it('should return string and not empty', () => {
      expect(testResult).to.be.a('string')
      expect(testResult).to.have.lengthOf.at.least(1)
    })

    it('shouldn\'t return the same value with multiple calls', () => {
      const lastUID = generateUID()
      let testFlag = false
      for (let i = 0; i < 1000; i++) {
        if (generateUID() === lastUID) {
          testFlag = false
        }
        testFlag = true
      }
      expect(testFlag).to.be.true
    })
  })
})

describe('#removeHMS', () => {
  describe('input is not string', () => {
    const param = [111, undefined, null, new Date(), new RegExp(), [111, 222], { a: 1 }]
    it('should return itself', () => {
      const testResult = param.every((x) => removeHMS(x) === x)
      expect(testResult).to.be.true
    })
  })

  describe('input is string', () => {
    const timeString = '111 222 333'
    it('should return value is the first of split space ', () => {
      expect(removeHMS(timeString)).to.be.a('string')
      expect(removeHMS(timeString)).to.equal(timeString.split(' ')[0])
    })
  })
})

describe('#inArray', () => {
  describe('secondParam is any and belong to array and threeParam is not exist', () => {
    const firstParam = ['你好', 'jintian', 3]
    const secondParam = '你好'
    it('firstParam is include secondParam', () => {
      expect(firstParam).to.include(secondParam)
    })

    it('should return true', () => {
      expect(inArray(firstParam, secondParam)).to.equal(true)
    })
  })

  describe('threeParam is exist', () => {
    const firstParam = [2, 4, 6]
    const secondParam = 1
    const threeParam = (xs, y) => xs.every((x) => x % y === 0)
    it('should return boolean', () => {
      expect(inArray(firstParam, secondParam, threeParam)).to.be.a('boolean')
    })

    it('should return value equal threeParam\'s result', () => {
      expect(inArray(firstParam, secondParam, threeParam)).to.equal(threeParam(firstParam, secondParam))
    })
  })
})
