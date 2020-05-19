def add_attribute(line, position, attribute):
  return " ".join([line[:position], attribute, line[position:]])

def find_fill_positions(line):
  position = line.find("fill=")
  if position > -1:
    start_position = position + 7
    end_position = start_position + 6
    return {'orig': position, 'start': start_position, 'end': end_position}
  else:
    return {'orig': -1}

def update_path_color(line, position):
  color = line[position['start']:position['end']]
  return str(line.replace(color, "000000"))

def format_line(line):
  if line.endswith('>'):
    return str(line + "\n")
  else:
    return str(line)
    
def update_file(line):
  if line == "<g>":
    class_tag = "class='Color'"
    new_line = add_attribute(line, 2, class_tag)
    return format_line(new_line)
  elif 'fill="#FFFFFF"' in line:
    match_tag = 'data-match-color="$placeholder" '
    position = find_fill_positions(line)
    new_line = add_attribute(line, position['orig'], match_tag)
    return format_line(new_line)
  elif 'fill=' in line and 'fill="#FFFFFF"' not in line:
    position = find_fill_positions(line)
    class_tag = 'class="locked"'
    new_color_line = update_path_color(line, position)
    new_complete_line = add_attribute(new_color_line, position['orig'], class_tag)
    return format_line(new_complete_line)
  else:
    return format_line(line)


with open('flower.svg', 'r+') as f:
  svg = f.read().splitlines()
  
  new_svg = map(update_file,svg)

with open('new_flower.svg', 'w+') as f:
  f.writelines(new_svg)
