module.exports = {
    launch: function(app, gcp) {
        var error = function(res) {
            return function() {
                console.log(arguments);
                res.status(500).send("ERROR");
            }
        }
        app.get('/api/traps', function(req, res) {
            gcp.getEvents().then(function(data) {
                res.send(data);
            }, error(res));
        });
        //app.get('/api/devices', function(req, res) {
        //    gcp.getDevices().then(function(data) {
        //        res.send(data);
        //    }, error(res));
        //});
        app.listen(3000, function() {
            console.log('Example app listening on port 3000!')
        });
    }
}

