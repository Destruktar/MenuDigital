import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function js(done) {

    src('src/js/**/*.js')
        .pipe(dest('build/js'));
    done();
}

export function json (done){
    src('src/json/**/*.json')
        .pipe(dest('build/json'));
    
    done();
}

export function css(done) {

    src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css'));

    done();
}

export function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/json/**/*.json', json);
    watch('src/js/**/*.js', js);

    done();

}

export default series(css, json, js, dev);
