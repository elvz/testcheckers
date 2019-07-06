'use strict';

const app = require('./functions/server');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Local app listening on port ' + PORT + '!'));