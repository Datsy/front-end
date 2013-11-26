## The following is the structure of the fake JSON data

Master Object
  datasets: array of objects
    dataset: string
    ranking: int
    tags: array of string
    columns: array of string
    meta: object
      num records: int
      num columns: int
    records: array of objects -- this is actual record data
      object:
          individual row, broken down by each column in dataset