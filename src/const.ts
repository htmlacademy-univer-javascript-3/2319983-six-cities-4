export enum AppRoute {
    Main = '/',
    Login = '/login',
    Favorite = '/favorite',
    Offer = '/offer/:id',
    PageNotFound = '*'
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum NameCity {
    Paris = 'Paris',
    Cologne = 'Cologne',
    Brussels = 'Brussels',
    Amsterdam = 'Amsterdam',
    Hamburg = 'Hamburg',
    Dusseldorf = 'Dusseldorf',
}

export enum NameSort {
    Popular = 'Popular',
    LowToHigh = 'Price: low to high',
    HighToLow = 'Price: high to low',
    TopRated = 'Top rated first',
  }

export enum APIRoute {
    Offers = '/offers',
    Login = '/login',
    Logout = '/logout',
    Review = '/comments',
    Nearby = '/nearby',

  }

export const Rating: Record<string, number> = {
  'terribly': 1,
  'badly': 2,
  'not bad': 3,
  'good': 4,
  'perfect': 5,
};
