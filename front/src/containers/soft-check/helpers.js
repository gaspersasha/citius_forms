import {
  CarCity,
  CarConvertible,
  CarCoupe,
  CarEstate,
  CarHatchback,
  CarMPV,
  CarSaloon,
  CarSUV,
} from '~assets/svg';

export const bodyStylesData = [
  {
    name: 'Hatchback',
    link: '/cars/family-cars/hatchbacks',
    icon: CarHatchback,
  },
  {
    name: 'Estate',
    link: '/cars/family-cars/estate-cars',
    icon: CarEstate,
  },
  {
    name: 'SUV',
    link: '/cars/family-cars/suvs',
    icon: CarSUV,
  },
  {
    name: 'Saloon',
    link: '/cars/family-cars/saloon-cars',
    icon: CarSaloon,
  },
  {
    name: 'Coupe',
    link: '/cars/sports-cars/coupes',
    icon: CarCoupe,
  },
  {
    name: 'Convertible',
    link: '/cars/sports-cars/convertibles',
    icon: CarConvertible,
  },
  {
    name: 'MPV',
    link: '/cars/family-cars/mpvs',
    icon: CarMPV,
  },
  {
    name: 'City car',
    link: '/cars?f[0]=body:city-car&f[1]=vehicle_type:car',
    icon: CarCity,
  },
];
