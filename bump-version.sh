#!/bin/sh
# Adds/updates ?v=<timestamp> on the site's own CSS and JS files in every page,
# so browsers load the new files right after an update instead of an old saved copy.
V=$(date -u +%Y%m%d%H%M)
for f in *.html; do
  sed -i -E "s#(src|href)=\"(styles\.css|[a-z0-9-]+\.js)(\?v=[0-9]+)?\"#\1=\"\2?v=$V\"#g" "$f"
done
echo "version $V"
