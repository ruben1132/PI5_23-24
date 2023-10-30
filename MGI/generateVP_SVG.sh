#! /bin/sh
# Define the path to the Visual Paradigm installation directory
VP_INSTALL_DIR="C:/Program Files/Visual Paradigm 17.1"

# Define the input directory containing .vpp files
INPUT_DIR="F:\ensino superior\Disciplinas - LEI\3ANO\PI5\docs"

# Loop through .vpp files in the input directory
for vpp_file in "$INPUT_DIR"/*.vpp; do
  # Get the filename without extension
  filename=$(basename -- "$vpp_file")
  filename_no_extension="${filename%.*}"

  # Run Visual Paradigm server to export diagrams to SVG and save in the same folder
  "$VP_INSTALL_DIR"/bin/"visual paradigm.exe" -application export-diagrams-to-svg -project "$vpp_file" -output "$INPUT_DIR/$filename_no_extension"

  # Print a message for each exported project
  echo "Diagrams from $vpp_file exported to SVG in $INPUT_DIR/$filename_no_extension"
done
