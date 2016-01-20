/**
 * Created by pjpandey on 1/19/2016.
 */
var queryStrategy = require('./Strategy/DbController/QueryStrategy')(),
    service = require('./Strategy/QueryController/serviceRegistry')(queryStrategy).registerServices();

module.exports = function() {

    function query(req, res) {
        var connectionString = JSON.parse(req.body.connectionString);
        var queryString = req.body.queryString;
        queryStrategy.query(connectionString, queryString, function (err, response) {
            if (err) {
                return res.json({error : err});
            }
            res.json({output : response})
        });
    }

    function testConnection(req, res) {
        queryStrategy.testConnection(req.body, function (err, response) {
            if (err) {
                res.status(500).json({
                    error: 'some internal issue ' + err
                });
            }
            return res.json(response)
        });
    }

    return {
        query : query,
        testConnection : testConnection
    };
};