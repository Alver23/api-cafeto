const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const shell = require('gulp-shell');

const PATHS = {
  server: './src',
  tsconfig: './tsconfig.json',
};

gulp.task('server:ts', (done) => {
  const tsProject = ts.createProject(PATHS.tsconfig);
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('build'))
    .on('error', (error) => done(error))
    .on('end', () => done());
});

gulp.task('server:swagger', () =>
  gulp
    .src([`${PATHS.server}/api/swagger/**/*`])
    .pipe(gulp.dest('build/api/swagger')),
);

gulp.task('server:watch', (done) => {
  const stream = nodemon({
    script: 'build/bin/www.js',
    env: { NODE_ENV: 'development' },
    ext: 'ts',
    watch: PATHS.server,
    tasks: ['server:ts'],
    stdout: true,
  });
  return stream.on('quit', function () {
    done();
  });
});


gulp.task('server:folder-upload', shell.task('mkdir build/public'))

gulp.task('server:build', gulp.series('server:ts', 'server:swagger', 'server:folder-upload'));
gulp.task('server:dev', gulp.series('server:ts', 'server:swagger', 'server:folder-upload', 'server:watch'));
