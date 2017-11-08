import csv
import json

def csv_to_json(csv_file, json_file, columns):
    '''
    csv_file and json_file are filepaths (strings)
    columns is a tuple of column names
    '''

    csvfile = open(csv_file, 'r')
    jsonfile = open(json_file, 'w')

    cols = columns
    reader = csv.DictReader(csvfile, cols)

    for i, row in enumerate(reader):
        if i > 0:
            json.dump(row, jsonfile)
            jsonfile.write('\n')

if __name__ == '__main__':
    csv_file = '../data/count_by_type.csv'
    json_file = '../data/count_by_type.json'
    columns = ('type', 'count')

    csv_to_json(csv_file, json_file, columns)
