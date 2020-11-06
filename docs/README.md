# Urban

Web Agency themed business template for Jekyll. Browse through a [live demo](https://teal-worm.cloudvent.net/).
Increase the web presence of your agency with this configurable theme.

![Urban template screenshot](images/_screenshot.png)

Urban was made by [CloudCannon](https://cloudcannon.com/), the Cloud CMS for Jekyll.

Find more templates, themes and step-by-step Jekyll tutorials at [CloudCannon Academy](https://learn.cloudcannon.com/).

## Adapted to my needs

This theme is great, and I thank the good folks that put it together. I've changed some of it to fit my needs, so my workflow is only:

 + Install dependencies (if this is the first time setting this up)

```
bundle install
```

 + Run local server

```
bundle exec jekyll serve
```

## Fighting Ruby, Jekyll, and my faulty memory

Things I needed to do to get this thing to run (November, 2020):

 * Use RVM
    * curl -sSL https://raw.githubusercontent.com/rvm/rvm/master/binscripts/rvm-installer | bash -s stable
    * See https://stackoverflow.com/a/38194139/774907
 * Use Ruby 2.7
 * Follow instructions here https://jekyllrb.com/docs/installation/macos/
 * Follow instructions here https://www.digitalocean.com/community/tutorials/how-to-set-up-a-jekyll-development-site-on-ubuntu-16-04
 * From `/docs` directory, `jekyll serve`
