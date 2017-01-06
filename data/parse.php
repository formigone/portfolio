<?php

require_once __DIR__ . '/vendor/autoload.php';

$params = [
    'host' => 'localhost',
    'username' => 'root',
    'password' => '',
    'dbname' => 'lrscom'
];

$db = \Zend_Db::factory('PDO_MYSQL', $params);

$data = $db->select()->from('wp_posts', [
    'id' => 'ID',
    'title' => 'post_title',
    'date' => 'post_modified',
    'content' => 'post_content'
])->where('post_type = ?', 'post')->query()->fetchAll();

//$data = array_map(function($post) use ($db) {
//    $id = $post['id'];
//    $revs = $db->select()->from('wp_posts', [
//        'title' => 'post_title',
//        'date' => 'post_date',
//        'content' => 'post_content',
//    ])->where('post_parent = ?', $id)->order('post_date desc')->query()->fetchAll();
//    if (!empty($revs)) {
//        $post['rev'] = array_map(function($rev) {
//            return [
//                'title' => $rev['title'],
//                'date' => $rev['date'],
//                'content' => strlen($rev['content']),
//            ];
//        }, $revs);
//
//        if (!empty($rev['content'])) {
//            $post['content'] = $rev['content'];
//        }
//
//        $post['content'] = strlen($post['content']);
//    }
//
//    return $post;
//}, $data);

print_r($data);