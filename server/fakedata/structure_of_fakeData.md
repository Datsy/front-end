## The following is the structure of the fake JSON data

Master Object
  datasets: array of objects
    id: unique id for dataset
    dataset: string
    ranking: int
    meta: object
      num records: int
      num columns: int
    tags: array of strings
    columns: array of objects
      name: string
      description: string
      columnTags: array of strings
      datatype: type
      data: array of values for said column
  