Svg editor widget
=================

A simple editor widget to create svg.

Requirements
------------

You'll need either **docker** and **docker-compose**, or **node** and **npm** along with **bower** and **gulp-cli**.

Installation
------------

### Build javascripts file with babel

If you want to build files manually, run:

```bash
bower install
npm install
npm run build
```

### Use gulp

If you want gulp to build the files automatically on file change then livereload the page, run:

```
bower install
npm install
npm install --global gulp-cli
gulp watch
```

### Use docker

The gulp watch command is always executed whenever not running.

```
docker-compose up -d
docker exec -it svgeditorwidget_app_1 npm install
docker exec -it svgeditorwidget_app_1 bower install --allow-root
```
