import {StripeTypes} from '../action-types/StripeTypes'

export class StripeActions {
	static stripeConnect(body) {
		return {
			type: StripeTypes.STRIPE_CONNECT,
			payload: {body}
		}
	}
}