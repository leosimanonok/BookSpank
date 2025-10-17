import { BackendService } from "../service/impl/BackendServiceImpl";

export const useBackendService = () => {
    return new BackendService();
};