#!/bin/sh
# Usage: ./set-domain.sh example.com
# Points the site's built-in links (share image, sitemap, Google data, verify address) at your own domain.
D="$1"; [ -z "$D" ] && { echo "usage: $0 yourdomain.com"; exit 1; }
OLD="https://muhammadhaiderabbas.github.io/AliComplex/"
NEW="https://$D/"
for f in *.html *.js sitemap.xml README.md; do sed -i "s#$OLD#$NEW#g" "$f"; done
echo "Links now point to $NEW"
