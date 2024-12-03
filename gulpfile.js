import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import {src, dest, watch, series} from "gulp";

const sass = gulpSass(dartSass);

export function sassTask(done) {
    src("src/scss/app.scss", {sourcemaps: true})
        .pipe( sass().on("error", sass.logError) )
        .pipe( dest("build/css", {sourcemaps: true}) );
    done();
}

export function jsTask(done) {
    src("src/js/app.js")
        .pipe( dest("build/js") );

    done();
}

export function watchTask() {
    watch("src/scss/**/*.scss", sassTask);
    watch("src/js/**/*.js", jsTask);
}

export default series(jsTask, sassTask, watchTask); 

