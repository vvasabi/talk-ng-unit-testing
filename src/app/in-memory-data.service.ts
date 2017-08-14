export class InMemoryDataService {
  createDb() {
    return {
      heroes: [
        { id: 11, name: 'Mr. Nice', email: 'nice@infusion.com' },
        { id: 12, name: 'Narco', email: 'narco@infusion.com' },
        { id: 13, name: 'Bombasto', email: 'bombasto@infusion.com' },
        { id: 14, name: 'Celeritas', email: 'celeritas@infusion.com' },
        { id: 15, name: 'Magneta', email: 'magneta@infusion.com' },
        { id: 16, name: 'RubberMan', email: 'rubberman@infusion.com' },
        { id: 17, name: 'Dynama', email: 'dynama@infusion.com' },
        { id: 18, name: 'Dr IQ', email: 'iq@infusion.com' },
        { id: 19, name: 'Magma', email: 'magma@infusion.com' },
        { id: 20, name: 'Tornado', email: 'tornado@infusion.com' }
      ]
    };
  }
}
