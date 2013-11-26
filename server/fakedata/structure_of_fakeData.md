## The following is the structure of the fake JSON data

Master Object
  datasets: array of objects
    id: unique id for dataset
    dataset: string
    ranking: int
    tags: array of string
    columnNames: array of objects
      name: string
      columnTags: array of strings
    meta: object
      num records: int
      num columns: int
    records: array of objects -- this is actual record data
      object:
          individual row, broken down by each column in dataset