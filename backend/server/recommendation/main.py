import argparse


class Range(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end

    def __eq__(self, other):
        return self.start <= other <= self.end

    def __repr__(self):
        return '{0}-{1}'.format(self.start, self.end)


def setup_parser(min_value, max_value):
    # Initialize argument parser
    parser = argparse.ArgumentParser(description="Task recommender. ")

    # Define arguments
    parser.add_argument('--train', action='store_const', dest='train',
                        const=True, default=False, help="Train the recommendation model")

    parser.add_argument('query', type=float, nargs='+', metavar='N',
                        choices=[Range(min_value, max_value)], help="Values of the query vector")

    return parser

if __name__ == '__main__':
    # Define range for input of user query
    min_value = 0.0
    max_value = 10.0 

    parser = setup_parser(min_value, max_value)

    args = parser.parse_args()
    print(args)

    if not args.train and args.query is None:
        parser.parse_args(['-h'])
    elif args.train:
        # Train model
        print("Train model and store somewhere")
    else:
        # Load model and run in background so we can query against it?
        print("Load model and run query against it")