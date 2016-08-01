import sinon from 'sinon';

export default {
  getMockEndpoint(result = 'result', error = null) {
    const stubs = {
        transform: sinon.stub().returnsArg(0),
        query: sinon.stub().callsArgWith(1, error, result)
      },
      endpoint = sinon.stub().returns(stubs);

    return {stubs, endpoint};
  }
};
