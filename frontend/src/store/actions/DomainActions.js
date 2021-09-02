import {DomainTypes} from '../action-types/DomainTypes';

export class DomainActions {
  static getDomain() {
    return {
      type: DomainTypes.GET_DOMAIN_PROG,
      payload: {},
    };
  }

  static editDomain(body) {
    return {
      type: DomainTypes.ADD_DOMAIN_PROG,
      payload: {body},
    };
  }
}
