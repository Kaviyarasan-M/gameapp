


var in_client_id = '3798d1b023474acc8caa2051aaf21457',
    in_client_secret = '548fb12dd1cd4133bd662be7aa4e0460',
    in_redirect_uri = 'https://glacial-garden-26289.herokuapp.com/api/auth',
    in_auth_url = 'https://api.instagram.com/oauth/authorize/?client_id='
                  + in_client_id + '&redirect_uri='
                  + in_redirect_uri + '&response_type=code';              ;

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



//https://api.instagram.com/oauth/authorize/?client_id=5ee0174a2eb840f88cee2f37ab75d02b&redirect_uri=https://glacial-garden-26289.herokuapp.com/api/auth&response_type=code


    //in_client_id = '5ee0174a2eb840f88cee2f37ab75d02b',
    //in_client_secret = '79a26b125d0843f1baa21e2a9e82afee',