<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitf4612c8dd05ab540a78abba3776bcba4
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInitf4612c8dd05ab540a78abba3776bcba4', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitf4612c8dd05ab540a78abba3776bcba4', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitf4612c8dd05ab540a78abba3776bcba4::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
