#! /bin/sh
rsync --rsync-path="sudo rsync" -r cocohub coco.a-i.com:/opt/bitnami/apps/wordpress/htdocs/wp-content/plugins/
