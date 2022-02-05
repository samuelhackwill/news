module.exports = {
  servers: {
    news6: {
      host: '217.182.252.49',
      username: 'samuel',
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
      opts: {
        port: 11142
      },
    },
  },

  meteor: {
    name: 'news6',
    path: '../',
    docker: {
      image: 'abernix/meteord:node-12-base', // (optional)
    },
    servers: {
      news6: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: 3004,
      ROOT_URL: 'http://news.shh.ovh',
      MONGO_URL: 'mongodb://localhost:27017/news6'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    servers: {
      news6: {},
    },
  },
};
