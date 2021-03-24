# note-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Theme customization:
cd node_modules\onsenui\css-components-src
open gulpfile.js
Uncomment In the 95 line and 68 line.
```
 // .pipe(plumber()) // this was causing the task to never complete with gulp 4, but why...?
    .pipe(postcss(plugins))
 //  .pipe(gulp.dest('./build/'))
    .pipe(gulp.dest(prefix))
    .pipe(browserSync.stream());
```
to

```
 // .pipe(plumber()) // this was causing the task to never complete with gulp 4, but why...?
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./build/'))
    .pipe(gulp.dest(prefix))
    .pipe(browserSync.stream());
```
exec
```
yarn run serve
or
npm run serve
```

[back-end](https://github.com/Ftrybe/note-server-public)

[online](https://bujishi.cn/)