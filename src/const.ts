export const LocationPlaces = [{name:'Paris', active: false}, {name:'Cologne', active: false}, {name:'Brussels', active: false}, {name:'Amsterdam', active: true}, {name:'Hamburg', active: false}, {name:'Dusseldorf', active: false}];


export enum AppRoute {
    Main = '/',
    Login = '/login',
    Favorite = '/favorite',
    Offer = '/offer/:id',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',

}
