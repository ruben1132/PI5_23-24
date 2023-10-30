#! /bin/sh
echo "LOG: Generate Plantuml Diagrams"

for aFile in `find docs -name "*.puml" -type f`; do
  echo "Processing file: $aFile"
#   java -jar libs/plantuml-1.2023.1.jar $extra -t$exportFormat $aFile
done

# Remove all generated SVG files in the "docs" directory
find docs -name "*.svg" -type f -exec rm -f {} \;
