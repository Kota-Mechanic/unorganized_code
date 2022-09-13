from PIL import Image
import PIL
import os
import glob

print("type source name")
source_name = input("")

base_width = 120
image = Image.open(source_name)
p = (base_width / float(image.size[1]))
print(p)
hsize = int((float(image.size[0]) * p))
image = image.resize((hsize, base_width), PIL.Image.ANTIALIAS)
image.save('result_pic.jpeg')
