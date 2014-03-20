#! /usr/bin/python

OUTPUT_FILE_NAME = 'pmvis.js'
SOURCELIST_FILE_NAME = 'sourcelist'

def build():
    source_list_file = open(SOURCELIST_FILE_NAME)
    source_list = source_list_file.readlines();
    source_list_file.close()

    output_file = open(OUTPUT_FILE_NAME, 'w')
    for f in source_list:
        f = f.strip()
        if not f.startswith('#'):
            print f
            source_file = open(f)
            source = source_file.readlines()
            source_file.close()
            output_file.write("".join(source))
            output_file.flush()

    output_file.close()

if __name__ == '__main__':
    build()

