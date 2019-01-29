import { expect } from 'chai'
import { getErrorMessage, inArray, generateUID, removeHMS } from '../../src/utils/helpers'

describe('#getErrorMessage', () => {
  describe('no input', () => {
    it('should return empty string', () => {
      expect(getErrorMessage()).to.equal('')
    })
  })

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
    it('should return a string', () => {
      expect(getErrorMessage(param, defaultParam)).to.be.a('string')
    })

    it('should return messagekey\'s value', () => {
      expect(getErrorMessage(param, defaultParam)).to.equal(param.message)
    })
  })
})

describe('#generateUID', () => {
  describe('no input', () => {
    it('should return string and not empty', () => {
      expect(generateUID()).to.be.a('string')
      expect(generateUID()).to.have.lengthOf.at.least(1)
    })

    it('shouldn\'t return the same value with multiple calls', () => {
      const orginalValue = generateUID()
      expect(generateUID()).to.not.equal(orginalValue)
    })
  })
})

describe('#removeHMS', () => {
  describe('no input', () => {
    it('should return undefined', () => {
      expect(removeHMS()).to.be.a('undefined')
    })
  })

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

    it('should return value is the first of split space ', () => {
      expect(removeHMS(param)).to.equal(param.split(' ')[0])
      expect(removeHMS(param)).not.to.include(' ')
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
      expect(inArray(firstParam, secondParam, (xs, y) => xs.every((x) => x % y === 0))).to.be.a('boolean')
    })

    it('should return value equal threeParam\'s result', () => {
      expect(inArray(firstParam, secondParam, threeParam)).to.equal(threeParam(firstParam, secondParam))
    })
  })
})
