export const Places = [
    
    {
        isPremium: true,
        previewImage: "img/apartment-01.jpg",
        price: 120,
        isFavorite: false,
        rating: 4,
        title: "Beautiful &amp; luxurious apartment at great location",
        type: "Apartment",

    },

    {
        isPremium: false,
        previewImage: "img/room.jpg",
        price: 80,
        isFavorite: true,
        rating: 4,
        title: "Wood and stone place",
        type: "Room"
    },

    {
        isPremium: false,
        previewImage: "img/apartment-02.jpg",
        price: 132,
        isFavorite: false,
        rating: 4,
        title: "Canal View Prinsengracht",
        type: "Apartment"
    },

    {
        isPremium: true,
        previewImage: "img/apartment-03.jpg",
        price: 180,
        isFavorite: false,
        rating: 4,
        title: "Nice, cozy, warm big bed apartment",
        type: "Apartment"
    },

    {
        isPremium: false,
        previewImage: "img/room.jpg",
        price: 80,
        isFavorite: true,
        rating: 4,
        title: "Wood and stone place",
        type: "Room"
    },
    
];

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