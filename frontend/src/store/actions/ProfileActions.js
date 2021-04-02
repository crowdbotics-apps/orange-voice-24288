import { ProfileTypes } from '../action-types/ProfileTypes';

export class ProfileActions {
    static editProfile(body, id) {
        return {
            type: ProfileTypes.PROFILE_EDIT_PROG,
            payload: {body, id}
        }
    }
}