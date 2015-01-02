<?php

$defaultLocale = 'en';
$url = $_SERVER["REQUEST_URI"];
$host = $_SERVER["HTTP_HOST"];
$lang = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) : $defaultLocale;

function url_redirect($url, $header = true)
{
    if ($header) {
        header('HTTP/1.1 301 Moved Permanently', false, 301);
    }

    header("Location: {$url}");
    die();
}

if (!in_array($lang, array('fr', 'en'))) {
    $lang = $defaultLocale;
}

// redirect all urls that does not contain locale in url to same url with locale
if (0 === preg_match('/\/(fr|en)\//i', $url)) {
    url_redirect($mainHost.'/'.$lang.$url);
}

// redirect to proper url with locale
if ('/' === $url) {
    url_redirect($mainHost.'/'.$lang.$url);
}

// after all that, did not find your page?? DAMN!
url_redirect($lang.'index.html', false);
