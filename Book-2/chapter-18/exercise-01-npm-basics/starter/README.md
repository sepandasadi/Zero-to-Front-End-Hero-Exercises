# npm Basics Exercise

## Instructions

1. Open terminal in this directory

2. Initialize npm project:
```bash
npm init -y
```

3. Install dependencies:
```bash
npm install lodash
npm install --save-dev jest
```

4. Add scripts to package.json:
```json
{
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  }
}
```

5. Create `index.js` and use lodash:
```js
const _ = require('lodash');
const numbers = [1, 2, 3, 4, 5];
console.log(_.sum(numbers));
```

6. Run it:
```bash
npm start
```

## Tasks Checklist

- [ ] Run `npm init -y`
- [ ] Install lodash
- [ ] Install jest as dev dependency
- [ ] Add npm scripts
- [ ] Create index.js using lodash
- [ ] Run `npm start`
- [ ] Explore package.json and package-lock.json
- [ ] Try `npm update` and `npm audit`

## Questions to Answer

1. What's in package.json?
2. What's in package-lock.json?
3. What's in node_modules/?
4. Difference between dependencies and devDependencies?
5. What does `^1.2.3` mean?
