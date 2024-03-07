import Hyatt from '../images/Hyatt.png';
import QueenMary from '../images/Queen Mary.png';
import Renaissance from '../images/Renaissance.png';
import Residence from '../images/Residence Inn.png';

const hotelSchemas = [
  [
    { id: "1", name: "Hyatt", rating: 4.3, priceAverage: 375, location: "Long Beach", image: Hyatt },
    { id: "2", name: "Queen Mary", rating: 2.6, priceAverage: 250, location: "Long Beach", image: QueenMary }
  ],
  [
    { id: "3", name: "Renaissance", rating: 3.6, priceAverage: 125, location: "Long Beach", image: Renaissance },
    { id: "4", name: "Residence Inn", rating: 4.6, priceAverage: 500, location: "Long Beach", image: Residence }
  ]
];

export default hotelSchemas;