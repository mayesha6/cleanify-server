"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(queryModel, query) {
        this.queryModel = queryModel;
        this.query = query;
    }
    //   Searching method
    searchQuery(searchableFields) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.queryModel = this.queryModel.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    //   Filter method
    filterQuery() {
        const _a = this.query, { priceRange } = _a, restQuery = __rest(_a, ["priceRange"]);
        const queryObj = Object.assign({}, restQuery);
        const excludedFields = ['searchTerm', 'page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);
        this.queryModel = this.queryModel.find(queryObj);
        // Apply price range filtering if provided
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split(',').map(Number);
            this.queryModel = this.queryModel
                .where('price')
                .gte(minPrice)
                .lte(maxPrice);
        }
        return this;
    }
    //   Sort method
    sortQuery() {
        var _a, _b, _c;
        const sort = ((_c = (_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-createdAt';
        this.queryModel = this.queryModel.sort(sort);
        return this;
    }
    // Paginate method
    paginateQuery() {
        var _a, _b, _c;
        const page = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) ? Number((_b = this.query) === null || _b === void 0 ? void 0 : _b.page) : 1;
        const limit = Number((_c = this.query) === null || _c === void 0 ? void 0 : _c.limit) || 10;
        const skip = (page - 1) * limit;
        this.queryModel = this.queryModel.limit(limit).skip(skip);
        return this;
    }
    // Field filtering
    fieldFilteringQuery() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.queryModel = this.queryModel.select(fields);
        return this;
    }
    // Populate query
    populateQuery(populateOptions) {
        this.queryModel = this.queryModel.populate(populateOptions);
        return this;
    }
}
exports.default = QueryBuilder;
