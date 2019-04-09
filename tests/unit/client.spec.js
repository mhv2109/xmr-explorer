import chai from 'chai'
import axios from 'axios'
import sinon from 'sinon'

import client from '@/client'

const assert = chai.assert

function stubAxios (fn = function () {
  return {
    data: {
      result: {}
    }
  }
}) {
  sinon.stub(axios, 'post').callsFake(fn)
}

describe('client', function () {

  beforeEach(function () {
    stubAxios()
  })

  afterEach(function () {
    sinon.restore()
  })

  describe('getBlockCount', function () {
    it('Should call /json_rpc', function () {
      client.getBlockCount()
      assert(axios.post.calledWith('/json_rpc'))
    })
  })

  describe('getBlock', function () {
    it('Should call /json_rpc', function () {
      client.getBlock()
      assert(axios.post.calledWith('/json_rpc'))
    })
  })

  describe('getBlockHeaderByHeight', function () {
    it('Should call /json_rpc', function () {
      client.getBlockHeaderByHeight()
      assert(axios.post.calledWith('/json_rpc'))
    })
  })

  describe('getBlockHeaderByHash', function () {
    it('Should call /json_rpc', function () {
      client.getBlockHeaderByHash()
      assert(axios.post.calledWith('/json_rpc'))
    })
  })

  describe('getBlockSize', function () {
    it('Should call /json_rpc', function () {
      client.getBlockSize()
      assert(axios.post.calledWith('/json_rpc'))
    })
  })

  describe('getCoinbaseTxSum', function () {
    it('Should call /json_rpc', function () {
      client.getCoinbaseTxSum()
      assert(axios.post.calledWith('/json_rpc'))
    })
  })

  describe('getTxFeeSum', function () {
    it('Should call /json_rpc', function () {
      client.getTxFeeSum()
      assert(axios.post.calledWith('/json_rpc'))
    })
  })

  describe('getTxFee', function () {
    it('Should call /json_rpc', function () {
      client.getTxFee()
      assert(axios.post.calledWith('/json_rpc'))
    })
  })

})