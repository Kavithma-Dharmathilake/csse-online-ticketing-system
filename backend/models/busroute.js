class BusRoute {
    constructor( id, routeNo, start, end, fee ) {
        this.id = id,
        this.routeNo = routeNo;
        this.start = start;
        this.end = end;
        this.fee = fee;
    }
}

module.exports = BusRoute;