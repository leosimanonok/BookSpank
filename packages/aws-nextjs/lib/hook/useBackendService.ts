import { BackendService } from "../service/server/impl/BackendServiceImpl";

export const useBackendService = () => {
    return new BackendService();
};