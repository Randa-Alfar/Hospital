
export default interface IRouter {
    routes(): void
};

export interface IRoutesRegistration {
    path: string,
    router: string,
}

