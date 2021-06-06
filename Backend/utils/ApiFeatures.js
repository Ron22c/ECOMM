class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({...keyword});
        console.log(keyword);
        return this;
    }

    filter() {
        let queryString = {...this.queryStr};
        const exceptions = ['keyword', 'limit', 'page'];
        exceptions.forEach(element => {
            delete queryString[element];
        })
        let str = JSON.stringify(queryString);
        str = str.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`)
        queryString = JSON.parse(str);

        this.query = this.query.find(queryString);
        return this;
    }

    pagination(itemsPerPage) {
        let currentPage = this.queryStr.page || 1;
        let skip = itemsPerPage * (currentPage - 1);

        this.query = this.query.limit(itemsPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures