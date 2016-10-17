const gulp            = require('gulp');
const handlebars      = require('gulp-handlebars');
const wrap            = require('gulp-wrap');
const declare         = require('gulp-declare');
const concat          = require('gulp-concat');
const fs              = require('fs');
const uglify          = require('gulp-uglify');
const watch           = require('gulp-watch');
const less            = require('gulp-less');

gulp.task('build', function(){

  // Build
  gulp.src([

    'styles/main.less'

  ])
  .pipe(less())
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./build'))
  .on('end', function() {

    gulp.src('templates/*.hbs')
      .pipe(handlebars())
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
        
        namespace: 'templates',
        noRedeclare: true, // Avoid duplicate declarations

      }))
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('build/'))
      .on('end', function(){

        // file to load in 
        var loadingFiles = [

          './vendor/*.js',
          './build/templates.js',
          './src/api.js',
          './src/events.js',
          './src/issue.js',
          './src/balance.js',
          './src/user.js',
          './src/occurrence.js',
          './src/page.js',
          './src/log.js',
          './src/utils.js',
          './src/report.js',
          './src/channel.js',
          './src/widget.js',
          './src/main.js'

        ];

        gulp.src(loadingFiles)
        .pipe(concat({ path: 'passmarked.min.js', stat: { mode: 0666 }}))
        .pipe(uglify())
        .pipe(wrap('/**0.1**/(function(){<%= contents %>})();'))
        .pipe(gulp.dest('./output/'));

        gulp.src(loadingFiles)
        .pipe(concat({ path: 'passmarked.js', stat: { mode: 0666 }}))
        .pipe(wrap('/**0.1**/(function(){<%= contents %>})();'))
        .pipe(gulp.dest('./output/'));

      });

  });

});

// watch for dev
gulp.task('watch', function() {

  gulp.watch('src/**/**.js', [ 'build' ]);
  gulp.watch('templates/*.hbs', [ 'build' ]);

});