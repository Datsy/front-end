describe('Song', function() {
  var model;

  beforeEach(function() {
    model = new Song({
      artist: 'data',
      url: '/test/testsong.mp3',
      title:'test song'
    });
    spyOn(model, 'trigger').andCallThrough();
  });

  describe('play', function() {
    it('triggers a "play" event', function() {
      model.play();
      expect(model.trigger).toHaveBeenCalledWith('play', model);
    });
  });

  describe('enqueue', function() {
    it('triggers an "enqueue" event', function() {
      model.enqueue();
      expect(model.trigger).toHaveBeenCalledWith('enqueue', model);
    });
  });

  describe('dequeue', function() {
    it('triggers a "dequeue" event', function() {
      model.dequeue();
      expect(model.trigger).toHaveBeenCalledWith('dequeue', model);
    });
  });
});
