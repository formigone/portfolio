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

array_map(function($post) {
    $filename = trim(strtolower($post['title']));
    $filename = preg_replace('|[^\s\w\d]+|', '', $filename);
    $filename = preg_replace('|\s+|', '-', $filename);

    $date = explode(' ', $post['date']);

    $title = preg_replace('|\:|', '', $post['title']);
    $summary = explode(PHP_EOL, $post['content'])[0];

    $content = '---
layout: post
title: '.$title.PHP_EOL.
'author: Rodrigo Silveira
---

'.$summary.PHP_EOL.
'
## '.$title .PHP_EOL.
'-----

'.$post['content'];
    file_put_contents(__DIR__ . '/../docs/_posts/'.implode('-', [$date[0], $filename]).'.md', $content);
}, $data);

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

//print_r($data);