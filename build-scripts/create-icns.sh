#!/bin/bash

cd ../build-resources

ORIGINAL_FILE=icon.png
ICONSET_FILE=icon.iconset

mkdir ${ICONSET_FILE}

sips -z 16 16     ${ORIGINAL_FILE} --out ${ICONSET_FILE}/icon_16x16.png
sips -z 32 32     ${ORIGINAL_FILE} --out ${ICONSET_FILE}/icon_16x16@2x.png
sips -z 32 32     ${ORIGINAL_FILE} --out ${ICONSET_FILE}/icon_32x32.png
sips -z 64 64     ${ORIGINAL_FILE} --out ${ICONSET_FILE}/icon_32x32@2x.png
sips -z 128 128   ${ORIGINAL_FILE} --out ${ICONSET_FILE}/icon_128x128.png
sips -z 256 256   ${ORIGINAL_FILE} --out ${ICONSET_FILE}/icon_128x128@2x.png
sips -z 256 256   ${ORIGINAL_FILE} --out ${ICONSET_FILE}/icon_256x256.png
sips -z 512 512   ${ORIGINAL_FILE} --out ${ICONSET_FILE}/icon_256x256@2x.png
sips -z 512 512   ${ORIGINAL_FILE} --out ${ICONSET_FILE}/icon_512x512.png

cp ${ORIGINAL_FILE} ${ICONSET_FILE}/icon_512x512@2x.png
iconutil -c icns ${ICONSET_FILE}
rm -R ${ICONSET_FILE}
