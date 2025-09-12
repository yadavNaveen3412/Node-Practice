class ApiFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    let queryObject = { ...this.queryObj };
    const allowedFilterFields = ["sort", "fields", "page", "limit"];
    allowedFilterFields.forEach((el) => {
      delete queryObject[el];
    });

    let queryStr = JSON.stringify(queryObject);
    queryObject = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );  

    this.query = this.query.find(queryObject);

    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryObj.fields) {
      const Fields = this.queryObj.fields.split(",").join(" ");
      this.query = this.query.select(Fields);
    }

    return this;
  }

  paginate() {
    const page = +this.queryObj.page || 1;
    const limit = +this.queryObj.limit || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
