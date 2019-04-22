# [What's new updates]
[2019-04-22] support external upload file adapter (e.g. custom AWS S3 adapter)

settings.json
```

"control": {
    "file": true,
    "useUploadAdapter": true
}

```

custom.json
```
"adapters": {
  "uploadAdapter": "/src/uploadAdapter.js"
}

```

/src/uploadAdapter.js
```

exports.upload = function ({args, file, type, target, data, fname, cb}) {
    console.log('args.name: ', args.name)
    console.log('data: ', data)
    console.log('fname: ', fname)
    cb(null, fname);
}

```

[2019-01-22] Multiple users login with different tables access right

users.json
```
{
  "user1": {
      "name": "user1",
      "admin": true,
      "salt": "...",
      "hash": "...",
      "dir": "userA"
  },
  "user2": {
      "name": "user2",
      "admin": true,
      "salt": "...",
      "hash": "...",
      "dir": "userB"
  },
}
```

- Create `userA` and `userB` folder in users.json directory level.
- Create `settings.json` file into `userA` and `userB` folders.

---
Express Admin with better defaults. Don't edit your IDs or TimeStamps!

![img-screenshot]

---

[![img-npm-version]][url-npm]
[![img-travis]][url-travis]


# [Introductory Screencast][url-screencast]

# [Documentation][url-docs]

# [Examples][url-examples]

# [Tests][url-tests]


# License

The MIT License (MIT)

Copyright (c) 2012-present Simeon Velichkov <simeonvelichkov@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


  [url-screencast]: https://www.youtube.com/watch?v=1CdoCB96QNk
  [url-docs]: https://simov.github.io/express-admin
  [url-examples]: https://github.com/simov/express-admin-examples
  [url-tests]: https://github.com/simov/express-admin-tests
  [url-npm]: https://www.npmjs.com/package/express-admin
  [url-travis]: https://travis-ci.org/simov/express-admin

  [img-screenshot]: https://i.imgur.com/6wFggqg.png (Express Admin)
  [img-npm-install]: https://nodei.co/npm/express-admin.png?mini=true (NPM Install)
  [img-npm-version]: https://img.shields.io/npm/v/express-admin.svg?style=flat-square (NPM Version)
  [img-npm-downloads]: https://img.shields.io/npm/dm/express-admin.svg?style=flat-square (NPM Downloads)
  [img-travis]: https://img.shields.io/travis/simov/express-admin.svg?style=flat-square (Build Status)
