const autoprefixer = require('autoprefixer');
const gulp = require('gulp');
const babel = require("gulp-babel");
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('node-sass'));
// const sass = require('gulp-ruby-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const pcFocus = require('postcss-focus');
const pcFontpath = require('postcss-fontpath');
const stylelint = require('stylelint');
const extender = require('gulp-html-extend');
const convertEncoding = require('gulp-convert-encoding');
const gulpReplace = require('gulp-replace');

gulp.task('sass', function () {
	return gulp.src('css_dev/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: 'compact'
		}).on('error', sass.logError))
		.pipe(postcss(
			[pcFontpath({
				formats: [{
					type: 'embedded-opentype',
					ext: 'eot'
				},
					{
						type: 'woff2',
						ext: 'woff2'
					},
					{
						type: 'woff',
						ext: 'woff'
					},
					{
						type: 'truetype',
						ext: 'ttf'
					}
				]
			})],
			//[autoprefixer({browsers: ['last 2 versions']})],
			[autoprefixer()],
			[pcFocus()]
		))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulpReplace('@charset "UTF-8";', '@charset "EUC-KR";'))
		.pipe(convertEncoding({
			to: 'EUC-KR'
		}))
		.pipe(gulp.dest('../assets/css'))
});

gulp.task('sass-mrkp', function () {
	return gulp.src('markup_guide_dev/mrkp_assets/css/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: 'compact'
		}).on('error', sass.logError))
		.pipe(postcss(
			[pcFontpath({
				formats: [{
					type: 'embedded-opentype',
					ext: 'eot'
				},
					{
						type: 'woff2',
						ext: 'woff2'
					},
					{
						type: 'woff',
						ext: 'woff'
					},
					{
						type: 'truetype',
						ext: 'ttf'
					}
				]
			})],
			//[autoprefixer({browsers: ['last 2 versions']})],
			[autoprefixer()],
			[pcFocus()]
		))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulpReplace('@charset "UTF-8";', '@charset "EUC-KR";'))
		.pipe(convertEncoding({
			to: 'EUC-KR'
		}))
		.pipe(gulp.dest('../markup_guide/mrkp_assets/css'))
});

gulp.task('extend', function () {
	return gulp.src('pages_dev/**/*.html')
		.pipe(extender({
			annotations: false,
			verbose: false,
			root: "../"
		}))
		.pipe(plumber())
		.pipe(convertEncoding({
			to: 'EUC-KR'
		}))
		.pipe(gulp.dest('../pages/'));
});

gulp.task('extend-mrkp', function () {
	return gulp.src('markup_guide_dev/mrkp_pages/*.html')
		.pipe(extender({
			annotations: false,
			verbose: false,
			root: "../"
		}))
		.pipe(plumber())
		.pipe(convertEncoding({
			to: 'EUC-KR'
		}))
		.pipe(gulp.dest('../markup_guide/mrkp_pages/'));
});
gulp.task('extend-mrkp-root', function () {
	return gulp.src('markup_guide_dev/*.html')
		.pipe(extender({
			annotations: false,
			verbose: false,
			root: "../"
		}))
		.pipe(plumber())
		.pipe(gulpReplace('@charset "UTF-8";', '@charset "EUC-KR";'))
		.pipe(convertEncoding({
			to: 'EUC-KR'
		}))
		.pipe(gulp.dest('../markup_guide/'));
});

gulp.task('babel', function () {
	return gulp.src('js_dev/*.js')
		.pipe(babel({
			presets: ["@babel/preset-env"]
			// presets: ["@babel/preset-env", "@babel/preset-react"]
		}))
		.pipe(plumber())
		.pipe(convertEncoding({
			to: 'EUC-KR'
		}))
		.pipe(gulp.dest('../assets/js/'));
});

gulp.task('babel-mrkp', function () {
	return gulp.src('markup_guide_dev/mrkp_assets/js/*.js')
		.pipe(babel({
			presets: ["@babel/preset-env"]
			// presets: ["@babel/preset-env", "@babel/preset-react"]
		}))
		.pipe(plumber())
		.pipe(convertEncoding({
			to: 'EUC-KR'
		}))
		.pipe(gulp.dest('../markup_guide/mrkp_assets/js/'));
});

gulp.task('watch', function () {
	gulp.watch('css_dev/**/*.scss', gulp.series('sass'));
	gulp.watch('pages_dev/**/*.html', gulp.series('extend'));
	gulp.watch('pages_include/**/*.html', gulp.series('extend'));
	gulp.watch('js_dev/*.js', gulp.series('babel'));

	//markup_guide_dev 폴더가 있는 경우만
	gulp.watch('markup_guide_dev/mrkp_assets/css/*.scss', gulp.series('sass-mrkp'));
	gulp.watch('markup_guide_dev/*.html', gulp.series('extend-mrkp-root'));
	gulp.watch('markup_guide_dev/mrkp_pages/*.html', gulp.series('extend-mrkp'));
	gulp.watch('markup_guide_dev/mrkp_assets/js/*.js', gulp.series('babel-mrkp'));

});

gulp.task('default', gulp.parallel(['watch']));
