#! /usr/bin/python

OUTPUT_FILE_NAME = 'pmvis.js'
SOURCELIST_FILE_NAME = 'sourcelist'

OUTPUT_LIBS_NAME = "libs.js"
LIBSLIST_FILE_NAME = "liblist"

def _build_source_files():
    print "Build source files:"
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

def _build_libs():
    print "Build libs:"
    source_list_file = open(LIBSLIST_FILE_NAME)
    source_list = source_list_file.readlines();
    source_list_file.close()

    output_file = open(OUTPUT_LIBS_NAME, 'w')
    for f in source_list:
        f = f.strip()
        if not f.startswith('#'):
            print f
            source_file = open(f)
            source = source_file.readlines()
            source_file.close()
            output_file.write("".join(source))
            output_file.flush()
            output_file.write("\n")

    output_file.close()


def build():
    _build_source_files()

    print "\n"

    _build_libs()

if __name__ == '__main__':
    build()

