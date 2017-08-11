module.exports = {
    launch: function(app, gcp) {
        app.get('/api/traps', function(req, res) {
            gcp.getEvents().then(function(events) {
                res.send(events);
            });
        });

        app.listen(3000, function() {
            console.log('Example app listening on port 3000!')
        });
    }
}

