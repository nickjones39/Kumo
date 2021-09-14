exports.handler = (event, context, callback) => {
    const response = { 'message': 'Hello World!'};
    callback(null, response);
};