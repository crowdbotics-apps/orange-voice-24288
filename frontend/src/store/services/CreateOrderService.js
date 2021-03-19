import { HttpService } from './HttpService';

export class CreateOrderService {
    static getLov() {
        return HttpService.get('/lov/all/');
    }
    static getAddress(userId) {
        return HttpService.get(`/Address/all?filters[userId]=${userId}`);
    }
}