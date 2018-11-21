module.exports = {
  configuration: {
    link: 'http://www.omdbapi.com/?t=harry+potter&apikey=8bdbc1a5',
    postDestination: 'http://mockbin.com/request1',
    maxAttempts: 3,
    retryDelay: 10000
  }
}