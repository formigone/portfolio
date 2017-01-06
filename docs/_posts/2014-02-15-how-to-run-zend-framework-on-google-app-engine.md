---
layout: post
title: How to run Zend Framework on Google App Engine
author: Rodrigo Silveira
---

If you're trying to deploy a Zend Framework project on Google App Engine for PHP, you may be wondering if this is possible. Or, if you're more hopeful and assume that it is possible, you may be wondering how this can be done. Since I've been successful in deploying a large Zend app on GAE, and since there were little or no resources to help me along the way, I've decided to post my report on how I did this - after spending a weekend beating App Engine over the head.

## How to run Zend Framework on Google App Engine
-----

If you're trying to deploy a Zend Framework project on Google App Engine for PHP, you may be wondering if this is possible. Or, if you're more hopeful and assume that it is possible, you may be wondering how this can be done. Since I've been successful in deploying a large Zend app on GAE, and since there were little or no resources to help me along the way, I've decided to post my report on how I did this - after spending a weekend beating App Engine over the head.

<a href="http://rodrigo-silveira.com/wp-content/uploads/2013/11/google-app-engine-php-zendframework.png"><img src="http://rodrigo-silveira.com/wp-content/uploads/2013/11/google-app-engine-php-zendframework.png" alt="google-app-engine-php-zendframework" width="100%" class="alignleft size-full wp-image-686" /></a>

<h1>.htaccess & Apache rewrite rules</h1>

So you may have noticed by now that App Engine doesn't use Apache virtual host files or .htaccess files. At least none that we know of, or that we can input, change, or control. Instead, your application/website will use a <strong>app.yaml</strong> configuration file. This is what your app.yaml file must look like in order for your Zend Framework project to work properly on GAE:

<div class="i_code"><pre>
application: your-prj-name-here
version: 1
runtime: php
api_version: 1

handlers:
- url: /img
  static_dir: public/img

- url: /js
  static_dir: public/js

- url: /css
  static_dir: public/css

- url: /.*
  script: public/index.php
</pre></div>

Of course, go ahead and replace "your-prj-name-here" with the actual name of your project. What that config file is doing is pretty straight forward: any requests for resources inside the directories <em>img</em>, <em>css</em>, or <em>js</em> will be treated as a direct request for a file in the server (if it exists). Everything else will be forwarded to <em>index.php</em>, which is inside the <em>public</em> directory. 

<h1>Application Configuration (application.ini)</h1>

In Zend Framework, the way you provide some basic configuration to your application is through this applicaiton.ini file, typically found under /app_root/application/configs/application.ini. The important things to note from my application.ini file are:

<ol>
<li>Specify two database connections - one for CloudSQL and a local connection</li>
<li>Specify any information for Google App Engine (and associated services) for convenience</li>
</ol>

<div class="i_code"><pre>
[production]
phpSettings.date.timezone = "America/Denver"
phpSettings.display_startup_errors = 0
phpSettings.display_errors = 1
phpSettings.log_errors = 1
phpSettings.error_log = "/tmp/myfitnessmap.error.log"

includePaths.library               = APPLICATION_PATH "/../library"
bootstrap.path                     = APPLICATION_PATH "/Bootstrap.php"
bootstrap.class                    = "Bootstrap"
appnamespace                       = "Application"
resources.frontController.controllerDirectory      = APPLICATION_PATH "/controllers"
resources.frontController.params.displayExceptions = 0
resources.frontController.params.useDefaultControllerAlways = 1

resources.layout.layoutPath   = APPLICATION_PATH "/layouts/scripts"

resources.db.adapter            = "PDO_MYSQL"
resources.db.params.dbname      = "my_google_cloudsql_db_name"
resources.db.params.username    = "my_google_cloudsql_db_username"
resources.db.params.password    = "my_google_cloudsql_db_password"
resources.db.params.unix_socket = "/cloudsql/my_gae_app_name:my_google_cloudsql_instance_name"
resources.db.params.use_socket  = 1
resources.db.isDefaultAdapter   = true

gae.app_id = "my_gae_app_name"
gae.service_account_name = "my_gae_service_acct_name"
gcs.bucket.media.name = "my_gae_cloud_storage_bucket_name"
gcs.bucket.media.url = "gs://my_gae_cloud_storage_bucket_name"
gcs.media.baseUrl = "//storage.cloud.google.com/my_gae_cloud_storage_bucket_name/"

[development : production]
phpSettings.display_startup_errors = 1
phpSettings.display_errors = 1

resources.db.params.dbname     = "my_local_dev_db_name"
resources.db.params.username   = "root"
resources.db.params.password   = ""
resources.db.params.host       = "localhost"
resources.db.params.use_socket = 0
</pre></div>

<a href="http://rodrigo-silveira.com/wp-content/uploads/2013/11/google-app-engine-php-zend.jpg"><img src="http://rodrigo-silveira.com/wp-content/uploads/2013/11/google-app-engine-php-zend.jpg" alt="google-app-engine-php-support-cloud-computing" width="100%" class="alignleft size-full wp-image-684" /></a>

Note that for the most part, the file is pretty standard. The important bit is where I specify my database information. Since we can't connect to CloudSQL from outside GAE servers, we have to specify and use a fallback connection for the development environment. The information to connect to CloudSQL directly involves the use of a unix_socket, which Zend Framework (at least 1.12, which is what I'm using) doesn't support through their DB interfaces. Thus, we need to do some manual work for that to work in production. The other thing I store in that application.ini config file is for convenience when using CloudStorage throughout the app. Here's how I connect to CloudSQL:

<div class="i_code"><pre>
function getDefaultDb() {
   $config = Zend_Registry::get("config");
   $dbConfig = $config["resources"]["db"]["params"];

   $options = array(
      "username" => $dbConfig["username"],
      "password" => $dbConfig["password"],
      "dbname" => $dbConfig["dbname"]
   );

   if ($dbConfig["use_socket"]) {
      $options["unix_socket"] = $dbConfig["unix_socket"];
   } else {
      $options["host"] = $dbConfig["host"];
   }

   return Zend_Db::factory("Pdo_Mysql", $options);
}
</pre></div>

Since I'm using a dependency injection container in my app, the above function is inside my container class. However, the key to remember is that you must create your particular database instance (in my case, a regular MYSQL PDO) specifying that you're using unix_socket when in GAE servers.

<h1>Boostrap.php</h1>

One other thing I learned about the PHP runtime in Google App Engine is that saving your sessions to Memcached may not satisfy your needs. In my case, the sessions were timing out way too soon, since the data in Memcached would get evicted. So the solution to this problem, since I wanted more control over session timeouts, as well as much longer session TTLs, is to store your session data right on CloudSQL. For those of you on a budget, this may not be good news, since you'll be paying extra for all those reads and writes to your database because of its use as the session manager.

Since Zend Framework provides a very nice session manager abstraction, we can easily configure it to use CloudSQL at bootstrap:

<div class="i_code"><pre>
<?php

date_default_timezone_set("America/Denver");

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

   // Aqui eu estou usando uma classe pra fazer dependency injection
   protected function _initInjector() {
      $ioc = null;
      require_once LIBRARY_PATH . "/MFM/Injector/ioc.php";
      Zend_Registry::set("ioc", $ioc);
   }

   // Aqui eu estou configurando o session manager pra usar CloudSQL e nao Memcached 
   // pra salvar os sessions (porque Memcached nao armazena por muito tempo no GAE)
   protected function _initSession() {
      $ioc = Zend_Registry::get("ioc");
      $db = $ioc["default-db"];

      $config = array(
         "name" => "session",
         "primary" => "id",
         "modifiedColumn" => "modified",
         "dataColumn" => "data",
         "lifetimeColumn" => "lifetime",
         "lifetime" => 680400
      );

      Zend_Db_Table_Abstract::setDefaultAdapter($db);
      Zend_Session::setSaveHandler(new Zend_Session_SaveHandler_DbTable($config));

      Zend_Session::start();
   }
}
</pre></div>

Again, since I'm using a custom dependency injection container, I'm leaving out the parts of my bootstrap file that handle that. The important part to note is that I use a Zend_Session_SaveHandler_DbTable instance as the Zend_Session::saveHandler. The way it knows to use my local database in development mode, or CloudSQL in production is because of the way the app is configured on the application.ini file. 

<h1>index.php - bringing it all together</h1>

Finally, the way to glue everything together is through the index.php file, where we instantiate and initialize the Zend application. The only thing to note here is that we need to tell Zend Framework whether we're in production or development. In ZF1 (and possibly in ZF2, I'm not sure since I've not yet used it), we tell the engine which configurations to use by setting an environment variable called <b>APPLICATION_ENV</b>. Based on the value of this variable, Zend will use a different configuration from application.ini (it'll use the value of APPLICATION_ENV to match a configuration block preceded by that keyword in square brackets).

<div class="i_code"><pre>
<?php

session_name("APPSID");

$env = getenv("SERVER_SOFTWARE");
if ($env !== false) {
   if ((bool)preg_match("/development/", strtolower($env))) {
      define("APPLICATION_ENV", "development");
   }
}

define("MEDIA_LIB_PATH", realpath(dirname(__FILE__) . "/media"));
define("MEDIA_LIB_URL", "/media");

// Define path to application directory
defined('APPLICATION_PATH')
|| define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

define("LIBRARY_PATH", realpath(dirname(__FILE__) . "/../library"));

// Define application environment
defined("APPLICATION_ENV")
|| define("APPLICATION_ENV", (getenv("APPLICATION_ENV") ? getenv("APPLICATION_ENV") : "production"));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR,
      array(
           realpath(APPLICATION_PATH . "/../library"),
           get_include_path(),
      )
   )
);

set_include_path(implode(PATH_SEPARATOR,
      array(
           ".",
           "./../application",
           "./../library",
           get_include_path(),
      )
   )
);

require_once "Zend/Loader/Autoloader.php";
$loader = Zend_Loader_Autoloader::getInstance();
$loader->registerNamespace("MFM_");

/** Zend_Application */
require_once "Zend/Application.php";

// Create application, bootstrap, and run
$application = new Zend_Application(
   APPLICATION_ENV,
   APPLICATION_PATH . "/configs/application.ini"
);
$application->bootstrap()
   ->run();
</pre></div>

Again, most of this file is pretty standard ZF1 setup. The part to make a note of is where we look for the environment variable named <b>SERVER_SOFTWARE</b>, which Google App Engine sets in production. Thus, if this variable is present, we know we're in production mode, thus we set APPLICATION_ENV as "production". If the variable is not set (unless you manually set it in your development environment, in which case you'll need to check for its value as well), then we know we're in development, and set the value of APPLICATION_ENV accordingly.