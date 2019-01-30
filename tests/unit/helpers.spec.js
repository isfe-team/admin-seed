import { expect } from 'chai'
import range from 'lodash/range'
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
    const defaultValue = 'default'
    const MESSAGE = 'message'
    it('should return message', () => {
      expect(getErrorMessage({ message: MESSAGE }, defaultValue)).to.equal(MESSAGE)
      expect(getErrorMessage(new Error(MESSAGE), defaultValue)).to.equal(MESSAGE)
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
      const uids = range(0, 10000).map(() => generateUID())
      const deduped = [ ...new Set(uids) ]

      const noDuped = uids.length === deduped.length

      expect(noDuped).to.be.true
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
      expect(removeHMS(timeString)).to.equal('111')
    })
  })
})

describe('#inArray', () => {
  describe('item is any and belong to array and pred is not exist', () => {
    const xs = ['你好', 'jintian', 3]
    const x = '你好'
    it('firstParam is include secondParam', () => {
      expect(xs).to.include(x)
    })

    it('should return true', () => {
      expect(inArray(xs, x)).to.equal(true)
    })
  })

  describe('pred is exist', () => {
    const xs = [ { uid: 1 }, { uid: 2 }, { uid: 4 } ]
    const x = { uid: 1 }
    const pred = (xs, y) => xs.some((x) => x.uid === y.uid)
    it('should return true if exist', () => {
      expect(inArray(xs, x, pred)).to.be.true
    })
  })
})
