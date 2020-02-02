#! /bin/sh
rsync --rsync-path="sudo rsync" -r coco-bot coco.a-i.com:/opt/bitnami/apps/wordpress/htdocs/wp-content/plugins/
