var request = require('request');

describe("Node Server Request Listener Function", function() {

  it("Should answer GET requests for /", function(done) {
    request("http://localhost:3000/", function(err, res, body){
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  xit("Should answer GET requests for /tags", function(done) {
    request("http://localhost:3000/tags", function(err, res, body){
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  xit("Should answer GET requests for /search", function(done) {
    request("http://localhost:3000/search", function(err, res, body){
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it("Should answer GET requests for /sample", function(done) {
   request("http://localhost:3000/sample", function(err, res, body){
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it("Should answer GET requests for /column", function(done) {
    request("http://localhost:3000/column", function(err, res, body){
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  xit("Should accept posts to /1/classes/room", function() {
    var req = new StubRequest("http://127.0.0.1:8080/1/classes/room1",
                             "POST",
                            {username: "Jono",
                             message: "Do my bidding!"});
    var res = new StubResponse();

    handler.handleRequest(req, res);

    // Expect 201 Created response status
    expect(res._responseCode).toEqual(201);

    // Testing for a newline isn't a valid test
    // TODO: Replace with with a valid test
    // expect(res._data).toEqual(JSON.stringify("\n"));
    expect(res._ended).toEqual(true);

    // Now if we request the log for that room,
    // the message we posted should be there:
    req = new StubRequest("http://127.0.0.1:8080/1/classes/room1",
                             "GET");
    res = new StubResponse();

    handler.handleRequest(req, res);

    expect(res._responseCode).toEqual(200);
    var messageLog = JSON.parse(res._data);
    expect(messageLog.length).toEqual(1);
    expect(messageLog[0].username).toEqual("Jono");
    expect(messageLog[0].message).toEqual("Do my bidding!");
    expect(res._ended).toEqual(true);
  });


  xit("Should 404 when asked for a nonexistent file", function() {
    var req = new StubRequest("http://127.0.0.1:3000/arglebargle", "GET");
    var res = new StubResponse();

    handler.handleRequest(req, res);
    console.log("Res is " + res);

    // Wait some time before checking results:
    waits(1000);

    runs(function() {
      expect(res._responseCode).toEqual(404);
      expect(res._ended).toEqual(true);
    });
  });

});