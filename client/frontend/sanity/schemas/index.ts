export const schemaTypes = [
  {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'date',
        title: 'Date',
        type: 'string',
      },
    ],
  },
];