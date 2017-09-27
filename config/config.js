


var in_client_id = '5ee0174a2eb840f88cee2f37ab75d02b',
    in_client_secret = '79a26b125d0843f1baa21e2a9e82afee',
    in_redirect_uri = 'https://glacial-garden-26289.herokuapp.com/api/auth',
    in_auth_url = 'https://api.instagram.com/oauth/authorize/?client_id='
                  + in_client_id + '&redirect_uri='
                  + in_redirect_uri + '&response_type=code';

var db_uri = 'mongodb://kavi:Strictly@ds135594.mlab.com:35594/gameapp';

module.exports = {
  db: {
    uri: db_uri
  },
  instagram: {
    client_id: in_client_id,
    client_secret: in_client_secret,
    auth_url: in_auth_url,
    redirect_uri: in_redirect_uri
  }
};


